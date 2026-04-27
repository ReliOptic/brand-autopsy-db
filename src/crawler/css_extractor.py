"""
Extract brand colors and fonts from a website's CSS.
Prototype: uses httpx + BeautifulSoup to parse inline/linked styles.
"""

import re
from collections import Counter


def extract_colors_from_css(css_text: str) -> list[dict]:
    """Extract all hex colors from CSS text with frequency."""
    hex_pattern = re.compile(r'#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b')
    matches = hex_pattern.findall(css_text)

    # Normalize to 6-digit uppercase
    normalized = []
    for m in matches:
        if len(m) == 3:
            m = m[0]*2 + m[1]*2 + m[2]*2
        normalized.append("#" + m.upper())

    # Count frequency and filter common defaults
    SKIP = {"#FFFFFF", "#000000", "#333333", "#666666", "#999999",
            "#CCCCCC", "#EEEEEE", "#F5F5F5", "#FAFAFA"}
    counter = Counter(m for m in normalized if m not in SKIP)

    return [{"hex": hex_val, "count": cnt}
            for hex_val, cnt in counter.most_common(20)]


def extract_fonts_from_css(css_text: str) -> list[str]:
    """Extract font-family declarations from CSS."""
    pattern = re.compile(r'font-family\s*:\s*([^;}{]+)', re.IGNORECASE)
    fonts = set()

    for match in pattern.findall(css_text):
        # Parse font stack
        for font in match.split(","):
            font = font.strip().strip("'\"")
            # Skip generic families
            if font.lower() in ("serif", "sans-serif", "monospace", "cursive",
                                "fantasy", "system-ui", "inherit", "initial",
                                "-apple-system", "blinkmacsystemfont"):
                continue
            if font and len(font) > 1:
                fonts.add(font)

    return sorted(fonts)


def extract_from_html(html: str) -> dict:
    """Extract colors and fonts from full HTML page."""
    # Collect all CSS: inline styles + <style> blocks
    css_parts = []

    # <style> blocks
    for m in re.finditer(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE):
        css_parts.append(m.group(1))

    # style="" attributes
    for m in re.finditer(r'style\s*=\s*"([^"]*)"', html, re.IGNORECASE):
        css_parts.append(m.group(1))

    css_text = "\n".join(css_parts)

    return {
        "colors": extract_colors_from_css(css_text),
        "fonts": extract_fonts_from_css(css_text),
    }


async def fetch_and_extract(url: str) -> dict:
    """Fetch a URL and extract CSS data. Requires httpx."""
    import httpx

    headers = {"User-Agent": "BrandAutopsyBot/1.0 (research)"}
    async with httpx.AsyncClient(follow_redirects=True, timeout=30) as client:
        resp = await client.get(url, headers=headers)
        resp.raise_for_status()
        result = extract_from_html(resp.text)
        result["url"] = str(resp.url)
        result["status"] = resp.status_code

        # Also fetch linked CSS files
        css_links = re.findall(
            r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\']',
            resp.text, re.IGNORECASE,
        )
        for link in css_links[:5]:  # Limit to 5 CSS files
            if not link.startswith("http"):
                from urllib.parse import urljoin
                link = urljoin(url, link)
            try:
                css_resp = await client.get(link, headers=headers)
                if css_resp.status_code == 200:
                    extra = extract_colors_from_css(css_resp.text)
                    result["colors"].extend(extra)
                    result["fonts"].extend(extract_fonts_from_css(css_resp.text))
            except Exception:
                continue

        # Deduplicate
        seen_hex = set()
        unique_colors = []
        for c in result["colors"]:
            if c["hex"] not in seen_hex:
                seen_hex.add(c["hex"])
                unique_colors.append(c)
        result["colors"] = unique_colors[:15]
        result["fonts"] = sorted(set(result["fonts"]))

        return result


if __name__ == "__main__":
    import asyncio
    import sys
    import json
    url = sys.argv[1] if len(sys.argv) > 1 else "https://www.notion.so"
    result = asyncio.run(fetch_and_extract(url))
    print(json.dumps(result, indent=2, ensure_ascii=False))
