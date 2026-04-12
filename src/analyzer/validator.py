"""
Validate generated brand autopsy markdown for quality and completeness.
"""

import re
from dataclasses import dataclass, field


@dataclass
class ValidationResult:
    brand: str
    layer: int
    passed: bool = True
    score: int = 0
    max_score: int = 0
    issues: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def fail(self, msg: str):
        self.passed = False
        self.issues.append(msg)

    def warn(self, msg: str):
        self.warnings.append(msg)

    def check(self, condition: bool, msg: str, points: int = 1):
        self.max_score += points
        if condition:
            self.score += points
        else:
            self.fail(msg)

    @property
    def pct(self) -> int:
        return round(100 * self.score / self.max_score) if self.max_score else 0

    def summary(self) -> str:
        status = "PASS" if self.passed else "FAIL"
        s = f"[{status}] {self.brand} Layer {self.layer}: {self.score}/{self.max_score} ({self.pct}%)"
        for i in self.issues:
            s += f"\n  ERROR: {i}"
        for w in self.warnings:
            s += f"\n  WARN:  {w}"
        return s


def _count_h2(md: str) -> int:
    return len(re.findall(r"^## ", md, re.MULTILINE))


def _has_table(md: str) -> bool:
    return bool(re.search(r"\|.*\|.*\|", md))


def _extract_hex_codes(md: str) -> list[str]:
    return re.findall(r"#[0-9A-Fa-f]{6}\b", md)


def _has_steal_sheet(md: str) -> bool:
    return "Steal Sheet" in md or "훔쳐갈" in md


def validate_layer1(md: str, brand: str) -> ValidationResult:
    """Validate Brand Identity layer."""
    v = ValidationResult(brand=brand, layer=1)

    v.check("존재 이유" in md or "Why" in md, "Missing: 존재 이유 (Why) section", 2)
    v.check("브랜드 약속" in md, "Missing: 브랜드 약속 section", 2)
    v.check("포지셔닝" in md, "Missing: 포지셔닝 문장 section", 2)
    v.check("아키타입" in md, "Missing: 브랜드 아키타입 section", 2)

    # Voice matrix
    vm_scores = re.findall(r"(\d+)/10", md)
    v.check(len(vm_scores) >= 4, f"Voice Matrix: found {len(vm_scores)}/4 scores", 3)
    for s in vm_scores:
        val = int(s)
        if val < 1 or val > 10:
            v.fail(f"Voice Matrix score out of range: {val}")

    v.check("금지어" in md, "Missing: 금지어 리스트", 2)
    v.check("필수어" in md, "Missing: 필수어 리스트", 2)

    ban_count = len(re.findall(r"^- .+금지|^- .+—", md, re.MULTILINE))
    if ban_count < 3:
        v.warn(f"Only {ban_count} keywords found (expected 5+)")

    v.check(_has_steal_sheet(md), "Missing: Steal Sheet", 1)
    v.check(_count_h2(md) >= 4, f"Only {_count_h2(md)} H2 sections (expected 4+)", 1)

    return v


def validate_layer2(md: str, brand: str) -> ValidationResult:
    """Validate Audience Map layer."""
    v = ValidationResult(brand=brand, layer=2)

    v.check("ICP" in md or "Ideal Customer" in md, "Missing: ICP section", 2)
    v.check("페르소나" in md or "Persona" in md, "Missing: 페르소나 section", 2)

    persona_count = len(re.findall(r"### 페르소나|### Persona", md))
    v.check(persona_count >= 2, f"Only {persona_count} personas (expected 3)", 2)

    v.check("구매 여정" in md or "AARRR" in md, "Missing: 구매 여정 section", 2)
    v.check(_has_table(md), "No tables found", 1)
    v.check(_has_steal_sheet(md), "Missing: Steal Sheet", 1)

    return v


def validate_layer3(md: str, brand: str) -> ValidationResult:
    """Validate Competitive Landscape layer."""
    v = ValidationResult(brand=brand, layer=3)

    v.check("경쟁" in md or "Competitive" in md, "Missing: competition section", 2)
    v.check(_has_table(md), "No competitor table found", 2)

    # Count competitor mentions in tables
    table_rows = re.findall(r"^\|[^|]+\|[^|]+\|", md, re.MULTILINE)
    v.check(len(table_rows) >= 5, f"Only {len(table_rows)} table rows (expected 5+)", 2)

    v.check("배틀카드" in md or "Battle" in md, "Missing: 배틀카드 section", 2)
    v.check("위협" in md or "기회" in md, "Missing: 위협/기회 section", 1)
    v.check(_has_steal_sheet(md), "Missing: Steal Sheet", 1)

    return v


def validate_layer4(md: str, brand: str) -> ValidationResult:
    """Validate Content DNA layer."""
    v = ValidationResult(brand=brand, layer=4)

    v.check("필러" in md or "Pillar" in md, "Missing: 콘텐츠 필러 section", 2)
    v.check("훅" in md or "Hook" in md, "Missing: Hook 패턴 section", 2)
    v.check("CTA" in md, "Missing: CTA 패턴 section", 2)
    v.check(_has_table(md), "No tables found", 1)
    v.check("금지" in md, "Missing: 콘텐츠 금지사항", 1)
    v.check(_has_steal_sheet(md), "Missing: Steal Sheet", 1)

    return v


def validate_layer5(md: str, brand: str) -> ValidationResult:
    """Validate Design System layer."""
    v = ValidationResult(brand=brand, layer=5)

    hex_codes = _extract_hex_codes(md)
    v.check(len(hex_codes) >= 4, f"Only {len(hex_codes)} HEX codes (expected 4+)", 3)

    # Validate HEX format
    for h in hex_codes:
        if len(h) != 7:
            v.fail(f"Invalid HEX format: {h}")

    v.check("타이포" in md or "Typography" in md or "폰트" in md,
            "Missing: 타이포그래피 section", 2)
    v.check("레이아웃" in md or "Layout" in md, "Missing: 레이아웃 원칙", 2)
    v.check("금지" in md, "Missing: 디자인 금지사항", 2)
    v.check("채널별 규격" in md or "사이즈" in md, "Missing: 채널별 규격", 1)
    v.check(_has_steal_sheet(md), "Missing: Steal Sheet", 1)

    # Check for color table
    color_table = bool(re.search(r"\|.*HEX.*\|", md, re.IGNORECASE))
    v.check(color_table, "Missing: structured color palette table", 2)

    return v


def validate_layer6(md: str, brand: str) -> ValidationResult:
    """Validate Channel Playbook layer."""
    v = ValidationResult(brand=brand, layer=6)

    v.check(_has_table(md), "No channel table found", 2)

    channels_mentioned = 0
    for ch in ["Instagram", "YouTube", "Twitter", "LinkedIn", "TikTok",
               "이메일", "뉴스레터", "블로그", "웹사이트"]:
        if ch.lower() in md.lower():
            channels_mentioned += 1
    v.check(channels_mentioned >= 4, f"Only {channels_mentioned} channels (expected 4+)", 2)

    v.check("톤" in md, "Missing: 채널별 톤 section", 1)
    v.check("금지" in md, "Missing: 채널별 금지사항", 1)
    v.check(_has_steal_sheet(md), "Missing: Steal Sheet", 1)

    return v


VALIDATORS = {
    1: validate_layer1,
    2: validate_layer2,
    3: validate_layer3,
    4: validate_layer4,
    5: validate_layer5,
    6: validate_layer6,
}


def validate_brand(layers: dict[int, str], brand: str) -> list[ValidationResult]:
    """Validate all layers for a brand."""
    results = []
    for num, md in sorted(layers.items()):
        validator = VALIDATORS.get(num)
        if validator:
            results.append(validator(md, brand))
    return results


def validate_and_report(layers: dict[int, str], brand: str) -> bool:
    """Validate and print report. Returns True if all pass."""
    results = validate_brand(layers, brand)
    all_pass = True
    total_score = 0
    total_max = 0

    print(f"\n{'='*60}")
    print(f"Validation Report: {brand}")
    print(f"{'='*60}")

    for r in results:
        print(r.summary())
        if not r.passed:
            all_pass = False
        total_score += r.score
        total_max += r.max_score

    pct = round(100 * total_score / total_max) if total_max else 0
    print(f"\nOverall: {total_score}/{total_max} ({pct}%)")
    print(f"Status: {'ALL PASS' if all_pass else 'HAS FAILURES'}")

    return all_pass
