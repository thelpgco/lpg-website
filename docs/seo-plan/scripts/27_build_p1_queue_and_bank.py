"""Build P1_WRITING_QUEUE.csv and P1_TITLE_META_BANK.csv for the 30K content playbook."""
from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

SEO = Path(__file__).resolve().parent.parent
ROOT = SEO.parents[1]  # lpg-website
b = pd.read_csv(SEO / "briefs.csv")
pm = pd.read_csv(SEO / "page-map.csv")
meta = json.loads((ROOT / "data" / "meta.json").read_text(encoding="utf-8"))

KIND_FOLDER = {
    "price_flagship": "price",
    "price_sub": "price",
    "price_city": "price",
    "cylinder_hub": "cylinders",
    "catalog": "appliances",
    "delivery_hub": "delivery",
    "order_page": "delivery",
    "city_hub": "cities",
    "guide": "guides",
    "safety_guide": "safety",
    "trust": "company",
    "home": "company",
    "news_tracker": "guides",
    "services_hub": "services",
}

TITLE_FIX = {
    "DL-002": "LPG Gas in Islamabad: Price Today, Delivery & Supply",
    "DL-003": "LPG Gas in Rawalpindi: Price Today, Delivery & Supply",
    "DL-004": "LPG Gas in Lahore: Price Today, Home Delivery & Supply",
    "DL-005": "LPG Gas in Karachi: Price Today, Delivery & Supply",
    "PR-004": "LPG Price in Karachi Today: per kg & 11.8 kg Cylinder",
    "PR-005": "LPG Price in Lahore Today: per kg & 11.8 kg Cylinder",
    "SF-001": "LPG Safety in Pakistan: Hazards, Checklist & Precautions",
    "SF-002": "Smell LPG Gas? What To Do First: Steps for Pakistan Homes",
    "CY-007": "LPG Cylinder Sizes in Pakistan: 5, 11.8, 15 & 45.4 kg",
    "NW-001": "LPG Shortage in Pakistan: Status, Causes & Updates",
    "NW-002": "LPG Supply in Pakistan: Importers, Marketers & Flow",
    "AP-002": "LPG Geyser Price in Pakistan: Types, Cost & Buying Guide",
    "AP-003": "LPG Heaters in Pakistan: Types, Price & Safe Use Guide",
}

META_FIX = {
    "DL-002": (
        "LPG gas in Islamabad through our partner network: how supply works, areas we confirm, "
        "how to get todays rate and place an order by call or WhatsApp."
    ),
    "DL-003": (
        "LPG gas in Rawalpindi through our partner network: how supply works, verified areas, "
        "how to confirm todays rate and order by call or WhatsApp."
    ),
    "DL-004": (
        "LPG gas in Lahore through our partner network: how supply works, areas we confirm, "
        "how to get todays cylinder rate, and how to place an order by WhatsApp."
    ),
    "DL-005": (
        "LPG gas in Karachi through our partner network: how supply works, areas we confirm, "
        "how to get todays cylinder rate, and how to place an order by WhatsApp."
    ),
    "PR-004": (
        "LPG price in Karachi today from the OGRA notification: per kg and common cylinder sizes, "
        "what affects delivery cost, and how to order a refill."
    ),
    "PR-005": (
        "LPG price in Lahore today from the OGRA notification: per kg and common cylinder sizes, "
        "what affects delivery cost, and how to order a refill."
    ),
    "SF-001": (
        "LPG safety in Pakistan: common hazards, a practical home checklist, and when to stop "
        "and call for help. Published after our safety reviewer signs off."
    ),
    "SF-002": (
        "If you smell LPG gas: shut the valve if safe, open windows, leave the area, avoid flames "
        "and switches. Clear step-by-step actions for homes in Pakistan."
    ),
    "CY-007": (
        "LPG cylinder sizes in Pakistan explained: 5, 11.8, 15 and 45.4 kg, what each size is for, "
        "and how the size affects the price you pay for gas."
    ),
    "NW-001": (
        "LPG shortage in Pakistan: current status with dated sources, why supply tightens, "
        "and what households and businesses can do while waiting for normal supply."
    ),
    "NW-002": (
        "How LPG supply works in Pakistan: importers, marketers, distributors and how gas "
        "reaches cylinders. Sourced overview for buyers and partners."
    ),
    "AP-002": (
        "LPG geyser price in Pakistan: common types, what drives cost, safety notes and how "
        "to request a quote for a unit that matches your cylinder setup."
    ),
    "AP-003": (
        "LPG heaters in Pakistan: common types, typical prices, safe use at home, and how to "
        "order a heater that matches your cylinder size and room."
    ),
}

gate = dict(zip(pm.page_id, pm.gate_notes.fillna("")))
x = b[b.phase == "P1"].sort_values("publish_order").copy()


def blocker(r) -> str:
    notes = []
    if not r.built:
        notes.append("page not built")
    if r.info_gain_ready < 3:
        notes.append(
            f"info-gain {int(r.info_gain_ready)}/3 (need {int(r.info_gain_need_data)} data items)"
        )
    g = str(gate.get(r.page_id, ""))
    if "Gate L" in g or "gate L" in g.lower():
        notes.append("Gate L: verify partners + test order")
    if r.page_id.startswith("PR-") or str(r.kind).startswith("price"):
        notes.append("needs verified OGRA row in data/prices.json")
    if r.kind == "safety_guide":
        notes.append("needs Haroon Rasheed sign-off in data/safety-review.json")
    if r.page_id in ("NW-001", "NW-002"):
        notes.append("needs dated sourced news items")
    if r.page_id in ("AP-002", "AP-003"):
        notes.append("needs real stock + named supplier + prices")
    if r.kind == "city_hub":
        notes.append("needs 3+ local facts + city photo + measured delivery time")
    # unique, preserve order
    return "; ".join(dict.fromkeys(notes))


rows = []
for r in x.itertuples():
    url = r.url
    m = meta.get(url, {})
    title = m.get("title", "") or ""
    desc = m.get("description", "") or ""
    if r.page_id in TITLE_FIX:
        title = TITLE_FIX[r.page_id]
    if r.page_id in META_FIX:
        desc = META_FIX[r.page_id]
    folder = KIND_FOLDER.get(r.kind, "guides")
    hold = r.kind == "city_hub" or r.page_id in ("AP-002", "AP-003", "NW-001", "NW-002")
    rows.append(
        dict(
            publish_order=int(r.publish_order) if pd.notna(r.publish_order) else "",
            page_id=r.page_id,
            url=url,
            kind=r.kind,
            primary=r.primary if isinstance(r.primary, str) else "",
            primary_volume=int(r.primary_volume) if pd.notna(r.primary_volume) else 0,
            status=r.status,
            built=bool(r.built),
            brief=f"briefs/{r.page_id}.md",
            competitor_folder=f"content-research/competitors/by-category/{folder}/",
            competitor_angles=f"content-research/competitors/by-category/{folder}/_TOPIC_ANGLES.md",
            info_gain_ready=int(r.info_gain_ready),
            info_gain_need_data=int(r.info_gain_need_data),
            title_50_60=title,
            title_len=len(title),
            meta_140_160=desc,
            meta_len=len(desc),
            blocker=blocker(r),
            wave="0-hold" if hold else "1-money",
        )
    )

df = pd.DataFrame(rows)
# length checks
for col, lo, hi in (("title_len", 50, 60), ("meta_len", 140, 160)):
    bad = df[(df[col] > 0) & ~df[col].between(lo, hi)]
    if len(bad):
        print("OUT OF RANGE", col)
        print(bad[["page_id", col, "title_50_60" if "title" in col else "meta_140_160"]].to_string(index=False))

df.to_csv(SEO / "P1_WRITING_QUEUE.csv", index=False, encoding="utf-8")
bank = df[df.title_len > 0][
    ["page_id", "url", "primary", "title_50_60", "title_len", "meta_140_160", "meta_len", "wave", "blocker"]
]
bank.to_csv(SEO / "P1_TITLE_META_BANK.csv", index=False, encoding="utf-8")
print(f"queue={len(df)} bank={len(bank)} waves={df.wave.value_counts().to_dict()}")
print(
    "title ok",
    int(df[df.title_len > 0].title_len.between(50, 60).sum()),
    "/",
    int((df.title_len > 0).sum()),
)
print(
    "meta ok",
    int(df[df.meta_len > 0].meta_len.between(140, 160).sum()),
    "/",
    int((df.meta_len > 0).sum()),
)
