"""
Fetch S&P 500 company list from Wikipedia and save as CSV.
"""

import csv
import re
import sys
from pathlib import Path

try:
    from urllib.request import urlopen, Request
except ImportError:
    pass


WIKI_URL = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
OUTPUT = Path(__file__).parent.parent.parent / "data" / "sp500_list.csv"


def fetch_sp500_from_wiki() -> list[dict]:
    """Parse S&P 500 table from Wikipedia HTML."""
    req = Request(WIKI_URL, headers={"User-Agent": "BrandAutopsyBot/1.0"})
    html = urlopen(req, timeout=30).read().decode("utf-8")

    # Find the first wikitable (S&P 500 constituents)
    table_match = re.search(r'<table[^>]*class="[^"]*wikitable[^"]*"[^>]*>(.*?)</table>',
                            html, re.DOTALL)
    if not table_match:
        print("Error: Could not find wikitable")
        return []

    table_html = table_match.group(1)
    rows = re.findall(r'<tr>(.*?)</tr>', table_html, re.DOTALL)

    companies = []
    for row in rows[1:]:  # Skip header
        cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
        if len(cells) < 8:
            continue

        def clean(s):
            s = re.sub(r'<[^>]+>', '', s)  # Remove HTML tags
            s = s.strip().replace('\n', ' ')
            return s

        ticker = clean(cells[0])
        name = clean(cells[1])
        sector = clean(cells[2])
        industry = clean(cells[3])
        hq = clean(cells[4])
        date_added = clean(cells[5])
        cik = clean(cells[6])
        founded = clean(cells[7]) if len(cells) > 7 else ""

        if not ticker or ticker == "Symbol":
            continue

        companies.append({
            "ticker": ticker,
            "name": name,
            "sector": sector,
            "industry": industry,
            "hq": hq,
            "date_added": date_added,
            "cik": cik,
            "founded": founded,
        })

    return companies


def save_csv(companies: list[dict], output: Path = OUTPUT) -> None:
    """Save company list to CSV."""
    output.parent.mkdir(parents=True, exist_ok=True)
    fields = ["ticker", "name", "sector", "industry", "hq", "date_added", "cik", "founded"]
    with open(output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(companies)
    print(f"Saved {len(companies)} companies to {output}")


def main() -> None:
    print("Fetching S&P 500 list from Wikipedia...")
    companies = fetch_sp500_from_wiki()
    if not companies:
        print("Failed to fetch. Exiting.")
        sys.exit(1)

    save_csv(companies)

    # Summary by sector
    sectors = {}
    for c in companies:
        sectors[c["sector"]] = sectors.get(c["sector"], 0) + 1
    print("\nSector breakdown:")
    for s, cnt in sorted(sectors.items(), key=lambda x: -x[1]):
        print(f"  {s:<35s} {cnt:3d}")


if __name__ == "__main__":
    main()
