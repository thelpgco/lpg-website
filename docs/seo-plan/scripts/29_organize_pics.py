"""Rename and sort lpg-website/pics into public/images/. Writes MEDIA_MANIFEST.csv."""
from __future__ import annotations

import csv
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / "pics"
DEST = ROOT / "public" / "images"
MANIFEST = ROOT / "docs" / "seo-plan" / "MEDIA_MANIFEST.csv"

# (source_filename, dest_relpath, status, pages, notes)
# status: use | backup | hold | collage
MAP: list[tuple[str, str, str, str, str]] = [
    # --- already numbered ---
    ("61-lpg-heater-front.png", "appliances/61-lpg-heater-front.png", "use", "/lpg-heaters-in-pakistan/,/", "AI product; illustrative"),
    ("62-lpg-heater-angle-detail.png", "appliances/62-lpg-heater-angle.png", "use", "/lpg-heaters-in-pakistan/", "AI; ignore garbled side label"),
    ("63-lpg-hose-pigtail.png", "accessories/63-lpg-hose-regulator-kit.png", "use", "/lpg-safety/,/shop/", "AI product kit"),
    ("64-lpg-engineering-project.png", "projects/64-bulk-tanks-yard.png", "hold", "/services/", "AI plant; not a verified project"),
    ("65-lpg-engineering-detail.png", "projects/65-manifold-gauges.png", "hold", "/services/", "AI detail; needs real project"),
    # --- batch 12_25 ---
    ("ChatGPT Image Oct 27, 2026, 12_25_33 AM-1.png", "cylinders/01-steel-cylinder-studio-plain.png", "backup", "/lpg-cylinders/", "Plain red; no stamps"),
    ("ChatGPT Image Oct 27, 2026, 12_25_34 AM-2.png", "hold-ai/02-warehouse-14-2kg-indane-style.png", "hold", "", "14.2 kg Indane-style; wrong market cue"),
    ("ChatGPT Image Oct 27, 2026, 12_25_35 AM-3.png", "hold-ai/03-delivery-unload-face.png", "hold", "", "AI face; unbranded truck"),
    ("ChatGPT Image Oct 27, 2026, 12_25_36 AM-4.png", "cylinders/04-steel-cylinder-closeup-lpg-logo.png", "backup", "/lpg-cylinders/", "Generic LPG print; 15.8 shoulder"),
    # --- office exteriors (AI fake HQ — do not present as G-12) ---
    ("ChatGPT Image Oct 27, 2026, 12_26_01 AM-1.png", "hold-ai/05-office-exterior-ai-hq-1.png", "hold", "", "AI HQ; not proven G-12 office"),
    ("ChatGPT Image Oct 27, 2026, 12_26_02 AM-2.png", "hold-ai/06-office-exterior-ai-hq-2.png", "hold", "", "AI HQ duplicate"),
    ("ChatGPT Image Oct 27, 2026, 12_26_03 AM-3.png", "hold-ai/07-office-exterior-ai-hq-3.png", "hold", "", "AI HQ duplicate"),
    ("ChatGPT Image Oct 27, 2026, 12_26_05 AM-4.png", "hold-ai/08-office-reception-ai-1.png", "hold", "", "AI reception; not real office proof"),
    ("ChatGPT Image Oct 27, 2026, 12_26_06 AM-5.png", "hold-ai/09-office-lobby-ai.png", "hold", "", "AI lobby"),
    ("ChatGPT Image Oct 27, 2026, 12_26_07 AM-6.png", "hold-ai/10-office-staff-faces-ai.png", "hold", "", "AI staff faces"),
    # --- cylinders Pakistan branded ---
    ("ChatGPT Image Oct 27, 2026, 12_26_08 AM-7.png", "cylinders/11-domestic-cylinder-branded-front.png", "use", "/,/lpg-cylinders/,/order-lpg/", "AI product hero"),
    ("ChatGPT Image Oct 27, 2026, 12_26_10 AM-8.png", "cylinders/12-domestic-cylinder-branded-alt.png", "backup", "/lpg-cylinders/", "Near-duplicate of 11"),
    ("ChatGPT Image Oct 27, 2026, 12_26_11 AM-9.png", "cylinders/13-cylinder-shoulder-stamp-tw.png", "use", "/lpg-cylinders/,/licences-and-compliance/,/lpg-safety/", "Embossed TW; still AI; not real OGRA seal photo"),
    ("ChatGPT Image Oct 27, 2026, 12_26_12 AM-10.png", "cylinders/14-cylinder-printed-spec-label.png", "use", "/lpg-cylinder-sizes-in-pakistan/,/lpg-safety/", "Printed specs; AI"),
    ("ChatGPT Image Oct 27, 2026, 12_27_09 AM-1.png", "cylinders/15-commercial-45-4kg-full.png", "use", "/lpg-cylinders/,/lpg-cylinder-sizes-in-pakistan/", "45.4 kg AI"),
    ("ChatGPT Image Oct 27, 2026, 12_27_11 AM-2.png", "cylinders/16-commercial-45-4kg-specs.png", "use", "/lpg-cylinder-price-in-pakistan/", "45.4 specs"),
    ("ChatGPT Image Oct 27, 2026, 12_27_13 AM-3.png", "cylinders/17-size-lineup-5-118-15-454.png", "use", "/,/lpg-cylinder-sizes-in-pakistan/,/lpg-cylinders/", "Best lineup hero"),
    ("ChatGPT Image Oct 27, 2026, 12_27_15 AM-4.png", "cylinders/18-size-lineup-alt.png", "backup", "/lpg-cylinder-sizes-in-pakistan/", "Duplicate lineup"),
    ("ChatGPT Image Oct 27, 2026, 12_27_16 AM-5.png", "hold-ai/19-empty-vs-filled-graphic-gauges.png", "hold", "", "Fake EMPTY/FILLED gauges"),
    ("ChatGPT Image Oct 27, 2026, 12_27_17 AM-6.png", "cylinders/20-composite-cylinder-front.png", "use", "/lpg-cylinders/,/lpg-cylinders/composite-fiber-cylinder/", "Composite AI"),
    ("ChatGPT Image Oct 27, 2026, 12_27_20 AM-7.png", "cylinders/21-composite-liquid-level.png", "use", "/lpg-cylinders/composite-fiber-cylinder/", "Level window demo"),
    ("ChatGPT Image Oct 27, 2026, 12_27_21 AM-8.png", "cylinders/22-composite-label-12-5kg.png", "use", "/lpg-cylinders/composite-fiber-cylinder/", "12.5 kg label"),
    ("ChatGPT Image Oct 27, 2026, 12_27_23 AM-9.png", "cylinders/23-composite-three-quarter.png", "backup", "/lpg-cylinders/", "Composite alt"),
    ("ChatGPT Image Oct 27, 2026, 12_27_24 AM-10.png", "hold-ai/24-kitchen-45kg-unrealistic.png", "hold", "", "45.4 kg in home kitchen unrealistic"),
    # --- collages ---
    ("LPG Cylinder Inspection Guide 11-20-3.png", "collages/25-inspection-guide-grid.png", "collage", "", "Split later; some OGRA art"),
    ("LPG Cylinder Product Catalog Collage-1.png", "collages/26-catalog-collage.png", "collage", "", "Do not publish whole grid"),
    ("LPG Cylinder Product Catalog Grid-2.png", "collages/27-catalog-grid-ogra-art.png", "collage", "", "Best OGRA-art panels; still AI collage"),
    ("LPG Equipment and Installation Showcase.png", "collages/28-equipment-showcase.png", "collage", "", "Meta collage of 61-65"),
    # --- regulator / installs ---
    ("ChatGPT Image Oct 27, 2026, 12_27_57 AM-1.png", "accessories/29-cylinder-regulator-hose-studio.png", "use", "/lpg-safety/,/lpg-home-delivery/", "Connection hero"),
    ("ChatGPT Image Oct 27, 2026, 12_28_00 AM-2.png", "hold-ai/30-kitchen-lifestyle-flame.png", "hold", "", "AI lifestyle + flame"),
    ("ChatGPT Image Oct 27, 2026, 12_28_01 AM-3.png", "accessories/31-regulator-hose-closeup.png", "use", "/lpg-safety/,/what-to-do-if-you-smell-gas/", "Close-up connection"),
    ("ChatGPT Image Oct 27, 2026, 12_28_03 AM-4.png", "hold-ai/32-balcony-install-ai.png", "hold", "", "AI balcony install"),
    ("ChatGPT Image Oct 27, 2026, 12_28_05 AM-5.png", "hold-ai/33-utility-nook-ai.png", "hold", "", "AI utility install"),
    # --- delivery ---
    ("ChatGPT Image Oct 27, 2026, 12_28_07 AM-6.png", "hold-ai/34-delivery-truck-worker-face.png", "hold", "", "AI face + branded truck"),
    ("ChatGPT Image Oct 27, 2026, 12_28_10 AM-7.png", "hold-ai/35-doorstep-customer-face.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_28_12 AM-8.png", "hold-ai/36-delivery-team-faces.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_28_14 AM-9.png", "hold-ai/37-doorstep-handover-face.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_28_16 AM-10.png", "hold-ai/38-commercial-kitchen-chef-face.png", "hold", "", "AI faces"),
    # --- fake licence / sample docs ---
    ("ChatGPT Image Oct 27, 2026, 12_30_00 AM-1.png", "hold-ai/39-licence-sample-desk.png", "hold", "", "SAMPLE stamp — never publish as real licence"),
    ("ChatGPT Image Oct 27, 2026, 12_30_03 AM-2.png", "hold-ai/40-ogra-licence-sample.png", "hold", "", "SAMPLE OGRA doc — never publish as real"),
    ("ChatGPT Image Oct 27, 2026, 12_30_04 AM-3.png", "hold-ai/41-inspection-cert-sample.png", "hold", "", "SAMPLE cert"),
    ("ChatGPT Image Oct 27, 2026, 12_30_07 AM-4.png", "hold-ai/42-ogra-price-monitor-sample.png", "hold", "", "Hypothetical prices — use real OGRA row instead"),
    # --- portraits (AI — not Haroon unless owner confirms) ---
    ("ChatGPT Image Oct 27, 2026, 12_30_09 AM-5.png", "hold-ai/43-executive-headshot-ai.png", "hold", "", "AI portrait; not confirmed as Haroon"),
    ("ChatGPT Image Oct 27, 2026, 12_30_10 AM-6.png", "hold-ai/44-executive-desk-ai.png", "hold", "", "AI portrait variant"),
    # --- cities ---
    ("ChatGPT Image Oct 27, 2026, 12_30_12 AM-7.png", "cities/45-islamabad-faisal-mosque.png", "use", "/lpg-in-islamabad/", "Landmark; verify rights/real photo"),
    ("ChatGPT Image Oct 27, 2026, 12_30_14 AM-8.png", "hold-ai/46-islamabad-delivery-composite.png", "hold", "", "AI delivery + landmark composite"),
    ("ChatGPT Image Oct 27, 2026, 12_30_17 AM-9.png", "cities/47-city-bazaar-generic.png", "backup", "/delivery-areas/", "Generic bazaar"),
    ("ChatGPT Image Oct 27, 2026, 12_30_22 AM-10.png", "hold-ai/48-doorstep-delivery-face.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_30_51 AM-1.png", "cities/49-lahore-badshahi-mosque.png", "use", "/lpg-in-lahore/,/lpg-price-in-pakistan/lahore/", "Lahore landmark"),
    ("ChatGPT Image Oct 27, 2026, 12_30_56 AM-2.png", "hold-ai/50-lahore-delivery-composite.png", "hold", "", "AI composite + faces"),
    ("ChatGPT Image Oct 27, 2026, 12_30_58 AM-3.png", "cities/51-karachi-mazar-e-quaid.png", "use", "/lpg-in-karachi/,/lpg-price-in-pakistan/karachi/", "Karachi landmark"),
    ("ChatGPT Image Oct 27, 2026, 12_31_01 AM-4.png", "hold-ai/52-karachi-delivery-composite.png", "hold", "", "AI composite + faces"),
    # --- appliances ---
    ("ChatGPT Image Oct 27, 2026, 12_31_03 AM-5.png", "appliances/53-lpg-stove-front.png", "use", "/lpg-stove-price-in-pakistan/,/", "AI stove"),
    ("ChatGPT Image Oct 27, 2026, 12_31_06 AM-6.png", "appliances/54-lpg-stove-angle.png", "use", "/lpg-stove-price-in-pakistan/", "AI stove alt"),
    ("ChatGPT Image Oct 27, 2026, 12_31_08 AM-7.png", "appliances/55-lpg-stove-badge-closeup.png", "backup", "/lpg-stove-price-in-pakistan/", "Badge crop"),
    ("ChatGPT Image Oct 27, 2026, 12_31_09 AM-8.png", "appliances/56-lpg-geyser-front.png", "use", "/lpg-geyser-price-in-pakistan/", "AI geyser"),
    ("ChatGPT Image Oct 27, 2026, 12_31_11 AM-9.png", "appliances/57-lpg-geyser-angle.png", "backup", "/lpg-geyser-price-in-pakistan/", "Duplicate geyser"),
    ("ChatGPT Image Oct 27, 2026, 12_31_13 AM-10.png", "appliances/58-lpg-geyser-front-alt.png", "backup", "/lpg-geyser-price-in-pakistan/", "Third geyser"),
    # --- more lifestyle hold ---
    ("ChatGPT Image Oct 27, 2026, 12_32_48 AM-1.png", "hold-ai/59-family-kitchen-faces.png", "hold", "", "AI family faces"),
    ("ChatGPT Image Oct 27, 2026, 12_32_50 AM-2.png", "hold-ai/60-mother-son-kitchen.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_32_57 AM-3.png", "hold-ai/61-family-dinner-faces.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_32_59 AM-4.png", "hold-ai/62-order-laptop-scene.png", "hold", "", "Fake app/order UI"),
    ("ChatGPT Image Oct 27, 2026, 12_33_01 AM-5.png", "hold-ai/63-mobile-app-fiction.png", "hold", "", "Fictional app"),
    ("ChatGPT Image Oct 27, 2026, 12_33_02 AM-6.png", "hold-ai/64-warehouse-staff-face.png", "hold", "", "AI face warehouse"),
    ("ChatGPT Image Oct 27, 2026, 12_33_05 AM-7.png", "hold-ai/65-retail-shopfront-ai.png", "hold", "", "Fake shop; fake phone 111-LPG-111"),
    ("ChatGPT Image Oct 27, 2026, 12_33_07 AM-8.png", "hold-ai/66-family-doorstep-faces.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_33_10 AM-9.png", "hold-ai/67-restaurant-delivery-faces.png", "hold", "", "AI faces"),
    ("ChatGPT Image Oct 27, 2026, 12_33_11 AM-10.png", "hold-ai/68-restaurant-handoff-alt.png", "hold", "", "Duplicate AI faces"),
]


def main() -> None:
    if not SRC.is_dir():
        raise SystemExit(f"missing {SRC}")
    DEST.mkdir(parents=True, exist_ok=True)
    seen_src = set()
    rows = []
    missing = []
    for src_name, dest_rel, status, pages, notes in MAP:
        src = SRC / src_name
        seen_src.add(src_name)
        if not src.exists():
            missing.append(src_name)
            continue
        dest = DEST / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        rows.append(
            {
                "source": src_name,
                "path": f"/images/{dest_rel.replace(chr(92), '/')}",
                "status": status,
                "pages": pages,
                "notes": notes,
            }
        )

    extras = sorted(p.name for p in SRC.iterdir() if p.is_file() and p.name not in seen_src)
    for name in extras:
        dest = DEST / "unmapped" / name.replace(" ", "_")
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(SRC / name, dest)
        rows.append(
            {
                "source": name,
                "path": f"/images/unmapped/{dest.name}",
                "status": "unmapped",
                "pages": "",
                "notes": "Not in map — review manually",
            }
        )

    with MANIFEST.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["source", "path", "status", "pages", "notes"])
        w.writeheader()
        w.writerows(rows)

    counts = {}
    for r in rows:
        counts[r["status"]] = counts.get(r["status"], 0) + 1
    print(f"copied {len(rows)} -> {DEST}")
    print("status", counts)
    if missing:
        print("MISSING sources:", len(missing))
        for m in missing:
            print(" ", m)


if __name__ == "__main__":
    main()
