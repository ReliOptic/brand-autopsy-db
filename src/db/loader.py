"""
Load existing brand autopsy markdown files into the database.
Parses 6-Layer context files and extracts structured data.
"""

import re
import sys
from pathlib import Path
from datetime import date

from .models import (
    Brand, VoiceMatrix, ColorPalette, Typography, Keyword,
    DesignRule, LayerDocument, init_db, get_session,
)
from .color_utils import hex_to_lab, is_valid_hex


LAYER_NAMES = {
    1: "Brand Identity",
    2: "Audience Map",
    3: "Competitive Landscape",
    4: "Content DNA",
    5: "Design System",
    6: "Channel Playbook",
}


def extract_brand_name(identity_md: str) -> tuple[str, str]:
    """Extract brand name and Korean name from identity markdown."""
    m = re.search(r"#.*?—\s*(.+)", identity_md)
    if not m:
        return "", ""
    full = m.group(1).strip()
    # "젠틀몬스터 (Gentle Monster)" -> ko="젠틀몬스터", en="Gentle Monster"
    paren = re.search(r"(.+?)\s*\((.+?)\)", full)
    if paren:
        return paren.group(2).strip(), paren.group(1).strip()
    return full, ""


def extract_voice_matrix(identity_md: str) -> dict[str, int]:
    """Extract voice matrix scores from identity markdown."""
    scores = {}
    patterns = [
        (r"격식\s*↔\s*캐주얼.*?(\d+)/10", "formal_casual"),
        (r"권위적\s*↔\s*동료적.*?(\d+)/10", "authority_peer"),
        (r"감성적\s*↔\s*이성적.*?(\d+)/10", "emotional_rational"),
        (r"절제\s*↔\s*과장.*?(\d+)/10", "restrained_bold"),
    ]
    for pattern, key in patterns:
        m = re.search(pattern, identity_md)
        if m:
            scores[key] = int(m.group(1))
    return scores


def extract_colors(design_md: str) -> list[dict]:
    """Extract color palette from design system markdown."""
    colors = []
    for m in re.finditer(
        r"\|\s*(?:\*\*)?(.+?)(?:\*\*)?\s*\|\s*(?:\*\*)?(.+?)(?:\*\*)?\s*\|"
        r"\s*(?:\*\*)?`?([#][0-9A-Fa-f]{3,6})`?(?:\*\*)?\s*\|\s*(.+?)\s*\|",
        design_md,
    ):
        role = m.group(1).strip().strip("*")
        name = m.group(2).strip().strip("*")
        hex_val = m.group(3).strip().strip("`").strip("*")
        usage = m.group(4).strip().strip("*")
        if role.lower() in ("용도", "---", "") or not is_valid_hex(hex_val):
            continue
        if not hex_val.startswith("#"):
            hex_val = "#" + hex_val
        colors.append({"role": role, "name": name, "hex": hex_val, "usage": usage})
    return colors


def extract_typography(design_md: str) -> list[dict]:
    """Extract typography info from design system markdown."""
    typos = []
    in_typo_table = False
    for line in design_md.split("\n"):
        if re.search(r"\|\s*용도\s*\|\s*폰트", line):
            in_typo_table = True
            continue
        if in_typo_table and line.strip().startswith("|"):
            if "---" in line:
                continue
            cols = [c.strip().strip("*") for c in line.split("|")[1:-1]]
            if len(cols) >= 4 and cols[0].lower() != "용도":
                typos.append({
                    "role": cols[0],
                    "font_name": cols[1],
                    "weight": cols[2],
                    "size_rule": cols[3] if len(cols) > 3 else "",
                })
        elif in_typo_table and not line.strip().startswith("|"):
            in_typo_table = False
    return typos


def extract_keywords(identity_md: str) -> list[dict]:
    """Extract must/ban keywords from identity markdown."""
    keywords = []
    current_type = None

    for line in identity_md.split("\n"):
        if "금지어" in line and "##" in line:
            current_type = "ban"
            continue
        if "필수어" in line and "##" in line:
            current_type = "must"
            continue
        if current_type and line.strip().startswith("- "):
            # "- "안경" 단독 사용 — 설명" or "- "WORLD / UNIVERSE" — 설명"
            text = line.strip()[2:]
            m = re.match(r'"(.+?)"\s*(?:—\s*(.+))?', text)
            if m:
                keywords.append({
                    "type": current_type,
                    "word": m.group(1),
                    "reason": m.group(2) or "",
                })
            else:
                # Simpler format without quotes
                parts = text.split("—", 1)
                keywords.append({
                    "type": current_type,
                    "word": parts[0].strip().strip('"'),
                    "reason": parts[1].strip() if len(parts) > 1 else "",
                })
        elif current_type and line.strip().startswith("##"):
            current_type = None

    return keywords


def extract_design_rules(design_md: str) -> list[dict]:
    """Extract design principles and prohibitions."""
    rules = []
    in_prohibition = False
    in_layout = False

    for line in design_md.split("\n"):
        if "디자인 금지사항" in line:
            in_prohibition = True
            in_layout = False
            continue
        if "레이아웃 원칙" in line:
            in_layout = True
            in_prohibition = False
            continue
        if line.strip().startswith("##") and ("금지" not in line and "레이아웃" not in line):
            in_prohibition = False
            in_layout = False
            continue

        if (in_prohibition or in_layout) and line.strip().startswith("- "):
            text = line.strip()[2:].strip("**").strip()
            rules.append({
                "type": "prohibition" if in_prohibition else "principle",
                "rule_text": text,
            })

    return rules


def extract_tagline(identity_md: str) -> str:
    """Extract brand promise / tagline."""
    m = re.search(r'>\s*"(.+?)"', identity_md)
    return m.group(1).strip()[:300] if m else ""


def extract_archetype(identity_md: str) -> tuple[str, str]:
    """Extract primary and secondary archetypes."""
    primary, secondary = "", ""
    m = re.search(r"Primary\s*\|\s*(\w+)", identity_md)
    if m:
        primary = m.group(1)
    m = re.search(r"Secondary\s*\|\s*(\w+)", identity_md)
    if m:
        secondary = m.group(1)
    return primary, secondary


def extract_slogan(identity_md: str) -> str:
    """Extract main slogan."""
    m = re.search(r"메인 슬로건\s*\|\s*\"?(.+?)\"?\s*(?:\(|$|\|)", identity_md)
    return m.group(1).strip().strip('"') if m else ""


def load_brand(brand_dir: Path, session_cls) -> Brand | None:
    """Load a single brand from its directory into the DB."""
    context_dir = brand_dir / "context"
    if not context_dir.exists():
        return None

    # Read all layer files
    layer_contents = {}
    for i in range(1, 7):
        filename = f"{i:02d}-{['brand-identity', 'audience-map', 'competitive-landscape', 'content-dna', 'design-system', 'channel-playbook'][i-1]}.md"
        filepath = context_dir / filename
        if filepath.exists():
            layer_contents[i] = filepath.read_text(encoding="utf-8")

    if not layer_contents:
        return None

    identity_md = layer_contents.get(1, "")
    design_md = layer_contents.get(5, "")

    # Extract structured data
    name_en, name_ko = extract_brand_name(identity_md)
    if not name_en:
        name_en = brand_dir.name.split("-", 1)[-1].replace("-", " ").title()

    voice = extract_voice_matrix(identity_md)
    colors = extract_colors(design_md)
    typos = extract_typography(design_md)
    keywords = extract_keywords(identity_md)
    design_rules = extract_design_rules(design_md)
    arch_primary, arch_secondary = extract_archetype(identity_md)
    tagline = extract_tagline(identity_md)
    slogan = extract_slogan(identity_md)

    session = session_cls()
    try:
        # Check if brand already exists
        existing = session.query(Brand).filter_by(name=name_en).first()
        if existing:
            print(f"  [skip] {name_en} already in DB (id={existing.id})")
            return existing

        # Create brand
        brand = Brand(
            ticker=brand_dir.name.split("-", 1)[0],  # "01" as temp ticker
            name=name_en,
            name_ko=name_ko,
            tagline=tagline,
            archetype_primary=arch_primary,
            archetype_secondary=arch_secondary,
            slogan=slogan,
            analysis_date=date.today(),
            status="published",
        )
        session.add(brand)
        session.flush()  # Get brand.id

        # Voice matrix
        if voice:
            vm = VoiceMatrix(brand_id=brand.id, **voice)
            session.add(vm)

        # Colors
        for i, c in enumerate(colors):
            lab = hex_to_lab(c["hex"])
            cp = ColorPalette(
                brand_id=brand.id,
                role=c["role"],
                color_name=c["name"],
                hex=c["hex"],
                lab_l=lab[0], lab_a=lab[1], lab_b=lab[2],
                usage_desc=c["usage"],
                sort_order=i,
            )
            session.add(cp)

        # Typography
        for t in typos:
            session.add(Typography(brand_id=brand.id, **t))

        # Keywords
        for k in keywords:
            session.add(Keyword(brand_id=brand.id, **k))

        # Design rules
        for r in design_rules:
            session.add(DesignRule(brand_id=brand.id, **r))

        # Layer documents (full markdown)
        for num, content in layer_contents.items():
            session.add(LayerDocument(
                brand_id=brand.id,
                layer_num=num,
                layer_name=LAYER_NAMES.get(num, f"Layer {num}"),
                content_md=content,
                word_count=len(content.split()),
            ))

        session.commit()
        print(f"  [loaded] {name_en} (id={brand.id}, "
              f"{len(colors)} colors, {len(typos)} fonts, "
              f"{len(keywords)} keywords, {len(design_rules)} rules)")
        return brand

    except Exception as e:
        session.rollback()
        print(f"  [error] {name_en}: {e}")
        return None
    finally:
        session.close()


def main() -> None:
    """CLI entry: migrate existing brands to DB."""
    import argparse
    parser = argparse.ArgumentParser(description="Load brand context files into DB")
    parser.add_argument("--brands-dir", type=str, required=True,
                        help="Path to brands/ directory")
    parser.add_argument("--db-url", type=str, default=None,
                        help="Database URL (default: sqlite:///data/brand_autopsy.db)")
    args = parser.parse_args()

    brands_dir = Path(args.brands_dir)
    if not brands_dir.exists():
        print(f"Error: {brands_dir} not found")
        sys.exit(1)

    db_url = args.db_url or "sqlite:///data/brand_autopsy.db"
    print(f"DB: {db_url}")

    init_db(db_url)
    Session = get_session(db_url)

    brand_dirs = sorted(d for d in brands_dir.iterdir() if d.is_dir())
    print(f"Found {len(brand_dirs)} brand directories\n")

    loaded = 0
    for brand_dir in brand_dirs:
        result = load_brand(brand_dir, Session)
        if result:
            loaded += 1

    print(f"\nDone: {loaded}/{len(brand_dirs)} brands loaded into DB")


if __name__ == "__main__":
    main()
