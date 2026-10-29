"""Deep re-verification of 30K content-plan deliverables. Exit 1 on errors."""
from __future__ import annotations

import csv
import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
errors: list[str] = []
warns: list[str] = []
ok: list[str] = []


def exists(rel: str) -> None:
    p = ROOT / rel
    if p.exists():
        ok.append(f"EXISTS {rel}")
    else:
        errors.append(f"MISSING {rel}")


def main() -> int:
    required = [
        "docs/seo-plan/CONTENT_AND_TRAFFIC_PLAN.md",
        "docs/seo-plan/THE_LPG_CO_SEO_MASTER_PLAN.md",
        "docs/seo-plan/P1_WRITING_QUEUE.csv",
        "docs/seo-plan/P1_TITLE_META_BANK.csv",
        "docs/seo-plan/DECISION_LOG.md",
        "docs/seo-plan/COMPLIANCE_CHECK.md",
        "docs/seo-plan/page-map.csv",
        "docs/seo-plan/keyword-master.csv",
        "docs/seo-plan/briefs.csv",
        "docs/seo-plan/scripts/27_build_p1_queue_and_bank.py",
        "data/pages.json",
        "data/meta.json",
        "data/prices.json",
        "data/safety-review.json",
        "scripts/page-status.mjs",
        "keywords and research/seo-LeadGEN.md",
    ]
    for rel in required:
        exists(rel)

    with (ROOT / "docs/seo-plan/page-map.csv").open(encoding="utf-8") as f:
        pm = list(csv.DictReader(f))
    ok.append(f"page-map rows={len(pm)}")
    if pm:
        status_key = next((k for k in pm[0] if k.lower() in ("status", "lifecycle", "state")), None)
        if status_key:
            ok.append(f"page-map {status_key}={dict(Counter(r.get(status_key, '') for r in pm))}")

    with (ROOT / "docs/seo-plan/P1_WRITING_QUEUE.csv").open(encoding="utf-8") as f:
        queue = list(csv.DictReader(f))
    with (ROOT / "docs/seo-plan/P1_TITLE_META_BANK.csv").open(encoding="utf-8") as f:
        bank = list(csv.DictReader(f))

    ok.append(f"queue={len(queue)} bank={len(bank)} waves={dict(Counter(r['wave'] for r in queue))}")
    qids, bids = {r["page_id"] for r in queue}, {r["page_id"] for r in bank}
    if qids != bids:
        errors.append(f"queue/bank ID mismatch onlyQ={qids - bids} onlyBank={bids - qids}")
    else:
        ok.append("queue IDs == bank IDs")

    forbidden = ("cheapest", "guaranteed", "#1", "number one", "number 1", "best price")
    for r in queue:
        pid = r["page_id"]
        t, m = r["title_50_60"], r["meta_140_160"]
        tl, ml = int(r["title_len"]), int(r["meta_len"])
        if not (50 <= len(t) <= 60) or tl != len(t):
            errors.append(f"{pid} title len claimed={tl} actual={len(t)}: {t!r}")
        if not (140 <= len(m) <= 160) or ml != len(m):
            errors.append(f"{pid} meta len claimed={ml} actual={len(m)}")
        low = t.lower()
        for bad in forbidden:
            if bad in low:
                errors.append(f"{pid} forbidden title hook: {bad}")
        if t.isupper():
            errors.append(f"{pid} ALL CAPS title")
        # "Today" only meaningful with OGRA price pages — warn for city hubs still on hold
        if "today" in low and r["wave"] == "0-hold" and pid.startswith("DL-"):
            warns.append(f"{pid} title uses Today while Gate L / 0-hold (OK if rate table gated)")

        brief = ROOT / "docs/seo-plan" / r["brief"]
        if not brief.exists():
            errors.append(f"{pid} missing brief {r['brief']}")
        cf = ROOT / r["competitor_folder"]
        if not cf.is_dir():
            errors.append(f"{pid} missing competitor_folder {r['competitor_folder']}")
        ca = ROOT / r["competitor_angles"]
        if not ca.exists():
            warns.append(f"{pid} missing angles {r['competitor_angles']}")

        br = next((b for b in bank if b["page_id"] == pid), None)
        if not br:
            errors.append(f"{pid} missing from bank")
        elif br["title_50_60"] != t or br["meta_140_160"] != m:
            errors.append(f"{pid} title/meta diverge queue vs bank")

    for r in bank:
        if not (50 <= len(r["title_50_60"]) <= 60):
            errors.append(f"bank {r['page_id']} title out of range {len(r['title_50_60'])}")
        if not (140 <= len(r["meta_140_160"]) <= 160):
            errors.append(f"bank {r['page_id']} meta out of range {len(r['meta_140_160'])}")

    plan_wave1 = [
        "PR-001",
        "PR-002",
        "PR-003",
        "CY-002",
        "CY-001",
        "CY-007",
        "PR-004",
        "PR-005",
        "HP-001",
        "DL-001",
        "DL-008",
        "ED-001",
        "SF-001",
        "SF-002",
    ]
    money = [r["page_id"] for r in queue if r["wave"] == "1-money"]
    hold = [r["page_id"] for r in queue if r["wave"] == "0-hold"]
    trust = [p for p in money if p.startswith("TR-")]
    ok.append(f"1-money count={len(money)} ids={money}")
    ok.append(f"0-hold count={len(hold)} ids={hold}")
    ok.append(f"core trust in P1={trust}")
    missing = [p for p in plan_wave1 if p not in money]
    if missing:
        errors.append(f"Plan Wave1 pages not in 1-money: {missing}")
    else:
        ok.append("All named Wave1 money pages present in 1-money")
    if len(money) != 25:
        warns.append(f"playbook says 25 money pages; queue has {len(money)}")
    if len(hold) != 8:
        warns.append(f"playbook says 8 hold pages; queue has {len(hold)}")

    for cid in ("DL-002", "DL-003", "DL-004", "DL-005"):
        row = next((r for r in queue if r["page_id"] == cid), None)
        if not row:
            errors.append(f"missing city hub {cid}")
        elif row["wave"] != "0-hold":
            errors.append(f"{cid} should be 0-hold, got {row['wave']}")
        else:
            ok.append(f"{cid} correctly 0-hold")

    with (ROOT / "docs/seo-plan/briefs.csv").open(encoding="utf-8") as f:
        briefs = list(csv.DictReader(f))
    ok.append(f"briefs.csv rows={len(briefs)} cols={list(briefs[0].keys())[:10]}")
    brief_ids = {r.get("page_id") or r.get("id") for r in briefs}
    for pid in qids:
        if pid not in brief_ids:
            errors.append(f"{pid} not in briefs.csv")

    # pages.json
    raw_pages = json.loads((ROOT / "data/pages.json").read_text(encoding="utf-8"))
    if isinstance(raw_pages, dict) and "pages" in raw_pages:
        plist = raw_pages["pages"]
    elif isinstance(raw_pages, list):
        plist = raw_pages
    elif isinstance(raw_pages, dict):
        # map of path -> meta
        plist = [{"path": k, **v} if isinstance(v, dict) else {"path": k, "status": v} for k, v in raw_pages.items()]
    else:
        plist = []
    st = Counter(str(p.get("status", "?")) for p in plist if isinstance(p, dict))
    ok.append(f"pages.json n={len(plist)} status={dict(st)}")
    published = st.get("published", 0)
    if published:
        warns.append(f"{published} pages already published — unexpected pre-Wave0")

    # prices
    prices = json.loads((ROOT / "data/prices.json").read_text(encoding="utf-8"))
    has_verified = False
    if isinstance(prices, dict):
        current = prices.get("current") or prices.get("latest")
        hist = prices.get("history") or prices.get("entries") or prices.get("monthly") or []
        ok.append(f"prices.json current={current!r} hist_type={type(hist).__name__}")
        if isinstance(current, dict) and any(
            current.get(k) for k in ("per_kg", "price_per_kg", "rate_per_kg", "verified", "source_url")
        ):
            # empty placeholders don't count
            vals = [current.get(k) for k in ("per_kg", "price_per_kg", "rate_per_kg", "source_url", "date")]
            if any(v not in (None, "", 0, "TBD", "pending") for v in vals):
                has_verified = True
        if isinstance(hist, list) and len(hist) > 0:
            has_verified = True
        # also scan nested
        text = json.dumps(prices)
        if '"verified": true' in text.lower() or '"verified":true' in text.lower():
            has_verified = True
    if has_verified:
        warns.append("prices.json looks populated — W0-1 Fail may be stale")
    else:
        ok.append("prices.json has no verified monthly entry (W0-1 Fail correct)")

    sr = json.loads((ROOT / "data/safety-review.json").read_text(encoding="utf-8"))
    ok.append(f"safety-review.json snippet={json.dumps(sr)[:180]}")
    if isinstance(sr, dict):
        signed = sr.get("pages") or sr.get("signoffs") or sr.get("reviews") or []
        if signed:
            warns.append("safety-review has signoffs — W0-5 Fail may be stale")
        else:
            ok.append("safety-review empty of page sign-offs (W0-5 Fail correct)")

    cat = ROOT / "content-research/competitors/by-category"
    if not cat.is_dir():
        errors.append("missing content-research/competitors/by-category")
    else:
        folders = sorted(p.name for p in cat.iterdir() if p.is_dir())
        ok.append(f"competitor categories ({len(folders)}): {folders}")
        for need in ("price", "cylinders", "delivery", "company", "guides", "safety", "cities", "appliances"):
            if need not in folders:
                errors.append(f"missing competitor category {need}")
            elif not (cat / need / "_TOPIC_ANGLES.md").exists():
                warns.append(f"missing _TOPIC_ANGLES.md for {need}")

    n_md = len(list((ROOT / "content-research/competitors").rglob("*.md"))) if (ROOT / "content-research/competitors").exists() else 0
    ok.append(f"competitor *.md files={n_md}")

    with (ROOT / "docs/seo-plan/keyword-master.csv").open(encoding="utf-8") as f:
        kw = list(csv.DictReader(f))
    ok.append(f"keyword-master rows={len(kw)}")

    play = (ROOT / "docs/seo-plan/CONTENT_AND_TRAFFIC_PLAN.md").read_text(encoding="utf-8")
    master = (ROOT / "docs/seo-plan/THE_LPG_CO_SEO_MASTER_PLAN.md").read_text(encoding="utf-8")
    log = (ROOT / "docs/seo-plan/DECISION_LOG.md").read_text(encoding="utf-8")

    if "v4.3" not in master[:600]:
        errors.append("master plan header missing v4.3")
    else:
        ok.append("master plan is v4.3")
    if "30,000" not in master[:900]:
        errors.append("master missing 30,000 goal near top")
    if "CONTENT_AND_TRAFFIC_PLAN.md" not in master[:1200]:
        errors.append("master missing playbook link near top")
    if "## 28." not in master and "Revision log: v4.2 to v4.3" not in master:
        warns.append("master missing §28 revision log for v4.3")
    else:
        ok.append("master has v4.3 revision section")

    if "v4.2+" in play.split("\n")[4] if len(play.split("\n")) > 4 else False:
        warns.append("playbook strategy parent still says v4.2+ (prefer v4.3)")
    for section in (
        "## 1. Goal",
        "## 2. Data map",
        "## 3. Page types",
        "## 4. Mandatory writing SOP",
        "## 5. Keyword placement",
        "## 6. Schema",
        "## 7. Waves",
        "## 8. P1 writing queue",
        "## 10. Will not do",
    ):
        if section not in play:
            errors.append(f"playbook missing section {section}")
    for phrase in ("~30,000", "Golden rules", "50–60", "140–160", "W0-1", "never copy"):
        if phrase not in play and phrase.replace("–", "-") not in play:
            # try ascii hyphen
            if phrase.replace("–", "-") not in play.replace("–", "-"):
                warns.append(f"playbook may be missing phrase {phrase}")

    for i in range(1, 11):
        if f"W0-{i}" not in log:
            errors.append(f"DECISION_LOG missing W0-{i}")
        else:
            # find result cell after W0-i
            m = re.search(rf"\*\*W0-{i}\*\*[^\n]*\|\s*\*\*([^*]+)\*\*", log)
            if m:
                res = m.group(1).strip()
                ok.append(f"W0-{i}={res}")
                if "Fail" not in res:
                    warns.append(f"W0-{i} is not Fail: {res}")
            else:
                warns.append(f"W0-{i} present but result cell not parsed")
    if "Publish rule" not in log:
        errors.append("DECISION_LOG missing Publish rule")
    else:
        ok.append("Publish rule present")

    ig = [int(r["info_gain_ready"]) for r in queue]
    ok.append(f"P1 info_gain_ready max={max(ig)} min={min(ig)} ge3={sum(1 for x in ig if x >= 3)}")
    if max(ig) >= 3:
        warns.append("Some P1 pages claim info_gain_ready>=3 — playbook says 0 of 134 meet rule 3")

    # meta.json sync sample for money pages
    meta = json.loads((ROOT / "data/meta.json").read_text(encoding="utf-8"))
    synced = 0
    diverged = []
    for r in queue:
        url = r["url"]
        entry = None
        if isinstance(meta, dict):
            entry = meta.get(url) or meta.get(url.rstrip("/")) or meta.get(url.rstrip("/") + "/")
        if not entry:
            continue
        title = entry.get("title") or entry.get("metaTitle") or ""
        if title and title != r["title_50_60"]:
            diverged.append(f"{r['page_id']}: meta.json title != bank")
        elif title == r["title_50_60"]:
            synced += 1
    ok.append(f"meta.json title matches bank for {synced}/{len(queue)} P1 pages")
    if diverged:
        warns.append(f"meta.json not yet synced to title bank for {len(diverged)} pages (expected until export)")
        for d in diverged[:8]:
            warns.append(d)

    # briefs INDEX honest gap
    index = ROOT / "docs/seo-plan/briefs/INDEX.md"
    if index.exists():
        idx = index.read_text(encoding="utf-8")
        if "0 pages" in idx.lower() or "0 of" in idx or "info-gain" in idx.lower():
            ok.append("briefs/INDEX.md exists (check info-gain claims manually if needed)")
        ok.append("briefs/INDEX.md present")
    else:
        warns.append("briefs/INDEX.md missing")

    # count brief md files
    brief_mds = list((ROOT / "docs/seo-plan/briefs").glob("*.md"))
    ok.append(f"brief md files={len(brief_mds)}")

    print("=== ERRORS", len(errors), "===")
    for e in errors:
        print("ERROR:", e)
    print("=== WARNS", len(warns), "===")
    for w in warns:
        print("WARN:", w)
    print("=== OK", len(ok), "===")
    for o in ok:
        print("OK:", o)

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
