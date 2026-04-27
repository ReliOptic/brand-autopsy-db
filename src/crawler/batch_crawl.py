"""
Batch crawl S&P 500 websites for CSS colors and fonts.
Saves results to data/raw/{ticker}/css_data.json
"""

import asyncio
import json
import csv
import sys
from pathlib import Path

try:
    import httpx
except ImportError:
    print("pip install httpx required")
    sys.exit(1)

from .css_extractor import extract_from_html, extract_colors_from_css, extract_fonts_from_css

DATA_DIR = Path(__file__).parent.parent.parent / "data"
CSV_PATH = DATA_DIR / "sp500_list.csv"
RAW_DIR = DATA_DIR / "raw"

# Known website URLs for companies where Wikipedia doesn't provide them
KNOWN_URLS = {
    "AAPL": "https://www.apple.com",
    "MSFT": "https://www.microsoft.com",
    "GOOGL": "https://about.google",
    "AMZN": "https://www.aboutamazon.com",
    "META": "https://about.meta.com",
    "NVDA": "https://www.nvidia.com",
    "NFLX": "https://www.netflix.com",
    "CRM": "https://www.salesforce.com",
    "ADBE": "https://www.adobe.com",
    "INTC": "https://www.intel.com",
    "CSCO": "https://www.cisco.com",
    "ORCL": "https://www.oracle.com",
    "IBM": "https://www.ibm.com",
    "NOW": "https://www.servicenow.com",
    "QCOM": "https://www.qualcomm.com",
    "TXN": "https://www.ti.com",
    "AVGO": "https://www.broadcom.com",
    "AMD": "https://www.amd.com",
    "AMAT": "https://www.appliedmaterials.com",
    "ADI": "https://www.analog.com",
    "LRCX": "https://www.lamresearch.com",
    "MU": "https://www.micron.com",
    "KLAC": "https://www.kla.com",
    "SNPS": "https://www.synopsys.com",
    "CDNS": "https://www.cadence.com",
    "MRVL": "https://www.marvell.com",
    "ADSK": "https://www.autodesk.com",
    "PANW": "https://www.paloaltonetworks.com",
    "FTNT": "https://www.fortinet.com",
    "CRWD": "https://www.crowdstrike.com",
    "WDAY": "https://www.workday.com",
    "PLTR": "https://www.palantir.com",
    "SHOP": "https://www.shopify.com",
    "SQ": "https://squareup.com",
    "SNOW": "https://www.snowflake.com",
    "DDOG": "https://www.datadoghq.com",
    "ZS": "https://www.zscaler.com",
    "NET": "https://www.cloudflare.com",
    "TEAM": "https://www.atlassian.com",
    "HUBS": "https://www.hubspot.com",
    "ZM": "https://zoom.us",
    "DOCU": "https://www.docusign.com",
    "OKTA": "https://www.okta.com",
    "MDB": "https://www.mongodb.com",
    "TWLO": "https://www.twilio.com",
    "U": "https://unity.com",
    "PATH": "https://www.uipath.com",
    "DT": "https://www.dynatrace.com",
    "PAYC": "https://www.paycom.com",
    "PCTY": "https://www.paylocity.com",
    "INTU": "https://www.intuit.com",
    "ANET": "https://www.arista.com",
    "ACN": "https://www.accenture.com",
    "IT": "https://www.gartner.com",
    "CDW": "https://www.cdw.com",
    "HPQ": "https://www.hp.com",
    "HPE": "https://www.hpe.com",
    "DELL": "https://www.dell.com",
    "WDC": "https://www.westerndigital.com",
    "STX": "https://www.seagate.com",
    "ENPH": "https://www.enphase.com",
    "ON": "https://www.onsemi.com",
    "MPWR": "https://www.monolithicpower.com",
    "SWKS": "https://www.skyworks.com",
    "QRVO": "https://www.qorvo.com",
    "TER": "https://www.teradyne.com",
    "ZBRA": "https://www.zebra.com",
    "KEYS": "https://www.keysight.com",
    "AKAM": "https://www.akamai.com",
    "EPAM": "https://www.epam.com",
    "GEN": "https://www.gendigital.com",
    "CIEN": "https://www.ciena.com",
    "FFIV": "https://www.f5.com",
    "JNPR": "https://www.juniper.net",
    "APP": "https://www.applovin.com",
    "APH": "https://www.amphenol.com",
    "GLW": "https://www.corning.com",
    "TRMB": "https://www.trimble.com",
    "PTC": "https://www.ptc.com",
    "ANSS": "https://www.ansys.com",
    "CTSH": "https://www.cognizant.com",
    "ROP": "https://www.ropertech.com",
    "FSLR": "https://www.firstsolar.com",
    "GPN": "https://www.globalpayments.com",
    "FIS": "https://www.fisglobal.com",
    "FISV": "https://www.fiserv.com",
    "MA": "https://www.mastercard.com",
    "V": "https://www.visa.com",
    "PYPL": "https://www.paypal.com",
    "AXP": "https://www.americanexpress.com",
    "JPM": "https://www.jpmorganchase.com",
    "BAC": "https://www.bankofamerica.com",
    "GS": "https://www.goldmansachs.com",
    "MS": "https://www.morganstanley.com",
    "WFC": "https://www.wellsfargo.com",
    "C": "https://www.citigroup.com",
    "BLK": "https://www.blackrock.com",
    "SCHW": "https://www.schwab.com",
    "JNJ": "https://www.jnj.com",
    "UNH": "https://www.unitedhealthgroup.com",
    "PFE": "https://www.pfizer.com",
    "LLY": "https://www.lilly.com",
    "MRK": "https://www.merck.com",
    "ABBV": "https://www.abbvie.com",
    "TMO": "https://www.thermofisher.com",
    "ABT": "https://www.abbott.com",
    "NKE": "https://www.nike.com",
    "SBUX": "https://www.starbucks.com",
    "MCD": "https://www.mcdonalds.com",
    "DIS": "https://www.thewaltdisneycompany.com",
    "PG": "https://www.pg.com",
    "KO": "https://www.coca-colacompany.com",
    "PEP": "https://www.pepsico.com",
    "WMT": "https://www.walmart.com",
    "HD": "https://www.homedepot.com",
    "COST": "https://www.costco.com",
    "TGT": "https://www.target.com",
    "LOW": "https://www.lowes.com",
    "TSLA": "https://www.tesla.com",
    "F": "https://www.ford.com",
    "GM": "https://www.gm.com",
    "BA": "https://www.boeing.com",
    "CAT": "https://www.caterpillar.com",
    "GE": "https://www.ge.com",
    "XOM": "https://www.exxonmobil.com",
    "CVX": "https://www.chevron.com",
}


def get_company_url(ticker: str, name: str) -> str:
    """Get website URL for a company."""
    if ticker in KNOWN_URLS:
        return KNOWN_URLS[ticker]
    # Generate likely URL from company name
    clean = name.lower().replace(",", "").replace(".", "").replace("'", "")
    clean = clean.split(" inc")[0].split(" corp")[0].split(" co ")[0]
    clean = clean.split(" group")[0].split(" holdings")[0]
    clean = clean.strip().replace(" ", "")
    return f"https://www.{clean}.com"


async def crawl_one(client: httpx.AsyncClient, ticker: str, url: str,
                    semaphore: asyncio.Semaphore) -> dict | None:
    """Crawl one website with rate limiting."""
    async with semaphore:
        try:
            headers = {"User-Agent": "Mozilla/5.0 (compatible; BrandAutopsyBot/1.0)"}
            resp = await client.get(url, headers=headers, follow_redirects=True, timeout=15)
            if resp.status_code != 200:
                return {"ticker": ticker, "url": url, "error": f"HTTP {resp.status_code}"}

            result = extract_from_html(resp.text)

            # Try to fetch main CSS files too
            import re
            from urllib.parse import urljoin
            css_links = re.findall(
                r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\']',
                resp.text, re.IGNORECASE,
            )
            for link in css_links[:3]:
                if not link.startswith("http"):
                    link = urljoin(url, link)
                try:
                    css_resp = await client.get(link, headers=headers, timeout=10)
                    if css_resp.status_code == 200:
                        result["colors"].extend(extract_colors_from_css(css_resp.text))
                        result["fonts"].extend(extract_fonts_from_css(css_resp.text))
                except Exception:
                    continue

            # Deduplicate
            seen = set()
            unique_colors = []
            for c in result["colors"]:
                if c["hex"] not in seen:
                    seen.add(c["hex"])
                    unique_colors.append(c)
            result["colors"] = unique_colors[:20]
            result["fonts"] = sorted(set(result["fonts"]))

            return {
                "ticker": ticker,
                "url": str(resp.url),
                "colors": result["colors"],
                "fonts": result["fonts"],
                "status": resp.status_code,
            }

        except Exception as e:
            return {"ticker": ticker, "url": url, "error": str(e)[:200]}


def _has_good_css(path: Path) -> bool:
    if not path.exists():
        return False
    try:
        import json as _json
        return "error" not in _json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return False


async def batch_crawl(sector: str | None = None, limit: int | None = None, skip_existing: bool = True):
    """Crawl all companies, optionally filtered by sector."""
    # Load company list
    companies = []
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if sector and row["sector"] != sector:
                continue
            companies.append(row)

    if limit:
        companies = companies[:limit]

    if skip_existing:
        raw_dir = RAW_DIR
        companies = [
            c for c in companies
            if not _has_good_css(raw_dir / c["ticker"] / "css_data.json")
        ]

    print(f"Crawling {len(companies)} companies...")

    # Rate limit: 10 concurrent requests
    semaphore = asyncio.Semaphore(10)
    results = {"success": 0, "failed": 0, "companies": []}

    async with httpx.AsyncClient() as client:
        tasks = []
        for comp in companies:
            ticker = comp["ticker"]
            url = get_company_url(ticker, comp["name"])
            tasks.append(crawl_one(client, ticker, url, semaphore))

        batch_results = await asyncio.gather(*tasks)

        for r in batch_results:
            if r is None:
                results["failed"] += 1
                continue

            ticker = r["ticker"]
            out_dir = RAW_DIR / ticker
            out_dir.mkdir(parents=True, exist_ok=True)

            with open(out_dir / "css_data.json", "w", encoding="utf-8") as f:
                json.dump(r, f, indent=2, ensure_ascii=False)

            if "error" in r:
                results["failed"] += 1
                print(f"  FAIL {ticker}: {r['error'][:60]}")
            else:
                results["success"] += 1
                nc = len(r.get("colors", []))
                nf = len(r.get("fonts", []))
                print(f"  OK   {ticker:<6s} {nc:2d} colors, {nf:2d} fonts")

    print(f"\nDone: {results['success']} success, {results['failed']} failed "
          f"out of {len(companies)}")
    return results


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--sector", type=str, default=None)
    parser.add_argument("--limit", type=int, default=None)
    args = parser.parse_args()
    asyncio.run(batch_crawl(args.sector, args.limit))


if __name__ == "__main__":
    main()
