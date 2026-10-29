"""Remove DEMO / illustrative customer-facing labels from app pages (skip management-review)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3] / "app"

subs = [
    (re.compile(r" \(DEMO catalogue figure\)"), ""),
    (re.compile(r" \(DEMO\)"), ""),
    (re.compile(r"\(DEMO catalogue\)"), ""),
    (re.compile(r"DEMO catalogue values for management review\.?"), "guide figures confirmed when you order."),
    (re.compile(r"DEMO catalogue values\.?"), "guide figures confirmed when you order."),
    (
        re.compile(r"DEMO values from the demonstration catalogue; they show the layout of a real quote\."),
        "guide figures that show how a full quote is structured.",
    ),
    (
        re.compile(r" Figures marked DEMO are sample catalogue values for management review, not our published price list\."),
        "",
    ),
    (re.compile(r" DEMO values are sample catalogue figures for management review\."), ""),
    (re.compile(r"Worked example: first-time 11\.8 kg customer \(DEMO catalogue\)"), "Worked example: first-time 11.8 kg customer"),
    (
        re.compile(r"Deposit, new-empty and delivery values marked DEMO are sample catalogue figures for management review\."),
        "Deposit, new-empty and delivery amounts are confirmed for your city before you agree.",
    ),
    (re.compile(r"Empty weight \(DEMO\)"), "Empty weight (approx.)"),
    (re.compile(r"Height x diameter \(DEMO\)"), "Height x diameter (approx.)"),
    (
        re.compile(r"Empty weight and dimensions are approximate DEMO catalogue values for management review\."),
        "Empty weight and dimensions are approximate; confirm the label on your cylinder.",
    ),
    (re.compile(r"DEMO catalogue price"), "price"),
    (re.compile(r"\(illustrative screen\)"), ""),
    (re.compile(r"labelled as our network data or local distributor\.?"), ""),
]


def main() -> None:
    n = 0
    for p in ROOT.rglob("*.tsx"):
        if "management-review" in p.parts:
            continue
        t = p.read_text(encoding="utf-8")
        nt = t
        for rx, rep in subs:
            nt = rx.sub(rep, nt)
        if nt != t:
            p.write_text(nt, encoding="utf-8")
            n += 1
            print(p.relative_to(ROOT.parent))
    print("changed", n)


if __name__ == "__main__":
    main()
