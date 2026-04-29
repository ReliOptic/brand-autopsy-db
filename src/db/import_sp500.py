"""Import S&P 500 company list from CSV into brands table as stubs."""

import csv
from pathlib import Path
from datetime import date

from .models import Brand, init_db, get_session


CSV_PATH = Path(__file__).parent.parent.parent / "data" / "sp500_list.csv"


def import_sp500(csv_path: Path = CSV_PATH, db_url: str = "sqlite:///data/brand_autopsy.db") -> None:
    init_db(db_url)
    Session = get_session(db_url)
    session = Session()

    # Get existing tickers to avoid duplicates
    existing = {b.ticker for b in session.query(Brand.ticker).all()}

    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        added = 0
        skipped = 0

        for row in reader:
            ticker = row["ticker"].strip()
            if ticker in existing:
                skipped += 1
                continue

            brand = Brand(
                ticker=ticker,
                name=row["name"].strip(),
                sector=row["sector"].strip(),
                industry=row["industry"].strip(),
                hq_country=row["hq"].strip(),
                analysis_date=date.today(),
                status="stub",
            )
            session.add(brand)
            existing.add(ticker)
            added += 1

        session.commit()
        print(f"Imported {added} new companies ({skipped} skipped as duplicates)")

    # Summary
    total = session.query(Brand).count()
    stubs = session.query(Brand).filter_by(status="stub").count()
    published = session.query(Brand).filter_by(status="published").count()
    print(f"DB total: {total} brands ({published} published, {stubs} stubs)")

    # Tech sector preview
    tech = session.query(Brand).filter_by(sector="Information Technology").order_by(Brand.name).all()
    print(f"\nTech sector ({len(tech)} companies):")
    for b in tech[:15]:
        print(f"  {b.ticker:<6s} {b.name}")
    if len(tech) > 15:
        print(f"  ... and {len(tech) - 15} more")

    session.close()


if __name__ == "__main__":
    import_sp500()
