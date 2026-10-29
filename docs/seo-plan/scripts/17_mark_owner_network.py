"""Mark partners that appear in the owner's distributor list as active (owner-confirmed 2026-10-26).
Consent to be LISTED publicly stays 'none' until each partner agrees. Adds a column `in_owner_list`.
Run after 12_build_v4_data.py (which resets statuses)."""
from pathlib import Path
import pandas as pd

D = Path(__file__).resolve().parent.parent / "data"
p = pd.read_csv(D / "partners_master.csv", dtype=str)
o = pd.read_csv(D / "dealers_xlsx_classified.csv", dtype=str)
owner_phones = set(o["phone_n"].dropna().str[-10:])
p["_n"] = p["phone_e164"].fillna("").str[-10:]
p["in_owner_list"] = p["_n"].isin(owner_phones) | p["source_file"].eq("LPG_dealers_all_regions.xlsx")
p.loc[p.in_owner_list, "verification_status"] = "active (owner-confirmed 2026-10-26)"
p = p.drop(columns="_n")
p.to_csv(D / "partners_master.csv", index=False)
print(p.verification_status.value_counts().to_string())
print("consent_to_list:", p.consent_to_list.value_counts().to_dict(), "| listing_eligible:", p.listing_eligible.value_counts().to_dict())
