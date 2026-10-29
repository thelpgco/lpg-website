"""Builds one writing brief per active page (Method Steps 12, 13 and 25): docs/seo-plan/briefs/<PAGE_ID>.md, INDEX.md, briefs.csv.

Evidence used (all local, nothing invented):
  page-map.csv, keyword-master.csv  -> primary and grouped secondary keywords, volumes (Ubersuggest; a '10' is the tool's floor, not a measurement)
  intel.db (Serper)                  -> stored SERP for the primary keyword, SERP-overlap with other pages (cannibalisation test, Step 8.2)
  intel.db (crawl)                   -> competitor pages that match the topic: headings (coverage checklist) and word counts (information only)
  data/pages.json, meta.json         -> status gate, title and meta that the site ships
  audit/links.json                   -> current internal links (built pages)
  data/network.json, city-overrides  -> city facts that exist today

Run:  python docs/seo-plan/scripts/21_build_page_briefs.py     (after 18_site_audit.py so links.json is fresh)
"""
from __future__ import annotations

import json
import re
import sqlite3
import statistics
from collections import Counter, defaultdict
from pathlib import Path

import pandas as pd

HERE = Path(__file__).resolve().parent
SEO = HERE.parent
SITE = SEO.parent.parent
OUT = SEO / "briefs"
OUT.mkdir(exist_ok=True)

pm = pd.read_csv(SEO / "page-map.csv")
pm = pm[pm.phase != "MERGED"].reset_index(drop=True)
K = pd.read_csv(SEO / "keyword-master.csv")
K["volume"] = pd.to_numeric(K.volume, errors="coerce").fillna(0).astype(int)
REG = json.loads((SITE / "data" / "pages.json").read_text(encoding="utf-8"))
META = json.loads((SITE / "data" / "meta.json").read_text(encoding="utf-8"))
NET = json.loads((SITE / "data" / "network.json").read_text(encoding="utf-8"))
OVR = json.loads((SITE / "data" / "city-overrides.json").read_text(encoding="utf-8"))
PRICES = json.loads((SITE / "data" / "prices.json").read_text(encoding="utf-8"))
PROJECTS = json.loads((SITE / "data" / "projects.json").read_text(encoding="utf-8"))
LINKS = {}
if (SEO / "audit" / "links.json").exists():
    LINKS = json.loads((SEO / "audit" / "links.json").read_text(encoding="utf-8"))

db = sqlite3.connect(f"file:{(SEO / 'intel' / 'intel.db').as_posix()}?mode=ro", uri=True)

# ---------------------------------------------------------------------------------------------- helpers
STOP = {"in", "of", "the", "a", "to", "for", "and", "pakistan", "today", "near", "is", "does", "do", "what", "are", "an", "with", "me", "my"}


def toks(s: str) -> set[str]:
    s = re.sub(r"(\d)\s+kg\b", r"\1kg", str(s).lower())
    out = set()
    for w in re.findall(r"[a-z0-9]+", s):
        if w in STOP:
            continue
        if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]
        out.add(w)
    return out


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def serp(q: str):
    r = db.execute("select id from serp_queries where q=? and endpoint='search' and status='ok' order by hl='en' desc limit 1", (q,)).fetchone()
    if not r:
        r = db.execute("select id from serp_queries where q=? and endpoint='search' limit 1", (q,)).fetchone()
    if not r:
        return []
    return db.execute("select position,title,url,domain,result_type from serp_results where query_id=? and kind='organic' order by position", (r[0],)).fetchall()


PRIMARY = {r.page_id: (r.primary_keyword if isinstance(r.primary_keyword, str) else "") for r in pm.itertuples()}
SERP_URLS = {pid: {u for _, _, u, _, _ in serp(q)[:10]} for pid, q in PRIMARY.items() if q}


def overlaps(pid: str):
    mine = SERP_URLS.get(pid, set())
    out = []
    if not mine:
        return out
    for other, urls in SERP_URLS.items():
        if other != pid and urls:
            n = len(mine & urls)
            if n >= 4:
                out.append((other, PRIMARY[other], n))
    return sorted(out, key=lambda x: -x[2])


pages_df = pd.read_sql_query(
    "select url,domain,title,h1,h2s,word_count,content_type,needs_js from pages where status=200 and robots_ok=1", db)
pages_df["word_count"] = pd.to_numeric(pages_df.word_count, errors="coerce").fillna(0).astype(int)
pages_df["tok"] = (pages_df.title.fillna("") + " " + pages_df.h1.fillna("") + " " + pages_df.url.str.replace(r"https?://[^/]+", "", regex=True)).map(toks)


def competitor_pages(pid: str, q: str, extra: list[str]):
    """Pages in the crawl that cover this topic: every primary token present in title/H1/URL; ranked by tokens matched."""
    cands = [q] + extra
    best = pages_df.iloc[0:0]
    for c in cands:
        kt = toks(c)
        if not kt:
            continue
        m = pages_df[pages_df.tok.map(lambda t: kt <= t)]
        if len(m):
            best = pd.concat([best, m]).drop_duplicates("url")
        if len(best) >= 6:
            break
    best = best[best.word_count >= 150]
    return best.sort_values("word_count", ascending=False).head(8)


def h2_checklist(cp: pd.DataFrame, n=14):
    """Headings that appear on pages of 2+ different competitor domains. Site-wide template headings (3+ pages of one
    domain) are dropped as boilerplate. Returns [(heading, number_of_domains)]."""
    by_dom: dict[str, Counter] = defaultdict(Counter)
    for dom, h in zip(cp.domain, cp.h2s.fillna("[]")):
        try:
            seen = set()
            for x in json.loads(h):
                x = re.sub(r"\s+", " ", x).strip().lower()
                if 4 < len(x) < 90 and x not in seen and not re.search(r"cookie|subscribe|newsletter|follow us|quick links|copyright|menu|login|sign in|cart|frequently asked|get lpg delivered|more lpg tools", x):
                    by_dom[dom][x] += 1
                    seen.add(x)
        except Exception:
            pass
    doms = defaultdict(set)
    for dom, c in by_dom.items():
        for x, k in c.items():
            if k < 3:
                doms[x].add(dom)
    ranked = sorted(doms.items(), key=lambda kv: -len(kv[1]))
    return [(h, len(d)) for h, d in ranked if len(d) >= 2][:n]


CITY_NAMES = {c["name"].lower() for c in NET["cities"]} | {p["name"].lower() for p in NET["provinces"].values()}
GROUPS = [
    ("Price / rate", r"price|rate|cost|qeemat|kitne"),
    ("Per kg / weight", r"1\s?kg|per kg|\bkg\b|weight|litre|liter"),
    ("Cylinder / size / type", r"cylinder|bottle|size|composite|fibre|fiber|steel"),
    ("Delivery / order / online", r"deliver|order|online|book|home|refill|connection"),
    ("Dealer / shop / near me", r"near me|shop|dealer|agency|supplier|distributor|wholesale|station|company|companies|marketing"),
    ("Safety / smell / leak", r"safe|leak|smell|blast|explo|kill|hazard|danger|flame|detector"),
    ("Meaning / definition", r"stand|meaning|full form|what is|abbreviation"),
    ("Appliance / equipment", r"stove|geyser|heater|regulator|hose|burner|vaporizer|kit|tank|boiler|generator"),
    ("News / market", r"shortage|crisis|news|import|strike|update|supply"),
]
BRANDS = r"\b(ssgc|pso|noor|ppgl|pak oil|shell|burshane|burhan|cylin|friends|flamora|gasonline|bostan|byco|attock)\b"


def group_of(k: str) -> str:
    kl = k.lower()
    if re.search(BRANDS, kl):
        return "Brand (do not target; win on trust pages)"
    for name, pat in GROUPS:           # intent first; a place name only decides the group when nothing else does
        if re.search(pat, kl):
            return name
    if any(n in kl for n in CITY_NAMES):
        return "Place names"
    return "Other"


# ---------------------------------------------------------------------------------------------- kind templates
GLOBAL_FACTS = [
    ("OGRA licence no. 09024041999", "OWNER-STATED", "Needs a licence scan and a digit check against the OGRA register before 'Licences' goes live"),
    ("Phone and WhatsApp +92 306 9701659", "OWNER-STATED", "Test that WhatsApp answers; log first response time"),
    ("Office: Office #99, Service Road, Sector G-12, Islamabad", "OWNER-STATED", "Photo of the entrance and a signboard would add trust and is original media"),
    ("Safety reviewer: Haroon Rasheed, 12+ years in LPG", "OWNER-STATED", "Needs his written consent, real qualifications and a dated sign-off per page"),
    ("'Every cylinder is OGRA certified'", "OWNER-STATED", "Needs proof: a photo of the marking, supplier certificates. Say what is checked at delivery"),
    ("Roles: OGRA-licensed marketer/distributor, reseller, referral partner", "OWNER-STATED", "State which role applies per order (how-it-works)"),
    ("Network: 452 partners in the owner's file (347 gas supply, 104 auto-LPG, 51 cities)", "OWNER FILE, UNVERIFIED BY CALL", "Quote only aggregate counts; no names or numbers without consent"),
]
GLOBAL_MUST_NOT = [
    "'cheapest', 'best price', 'fastest', '#1', 'lowest price' or any superlative without proof",
    "a delivery time (30 minutes, 1 hour) unless it was measured in that city in a real test order, with the date",
    "years in business, customers served, orders delivered, or ratings and reviews, unless documented",
    "any office, branch or 'local team' outside Islamabad G-12",
    "partner names, phone numbers or addresses without their written consent",
    "'reviewed by' or a review date before Mr Rasheed has signed off that page",
    "a price that is not in an OGRA notification we checked, or a delivery charge we have not agreed",
    "'free', 'guaranteed' or 'no fee' anywhere unless the owner confirms it as a standing policy",
    "competitor names, SERP notes, tool output or the word 'keyword' on a published page",
]

K_ = {}  # kind -> template


def kind(name, **kw):
    K_[name] = kw


kind("home",
     task="Understand who we are, see that we are licensed, and reach us or place an order in under a minute.",
     answer="THE LPG CO. PAKISTAN is an OGRA-licensed LPG marketer in Islamabad: order LPG cylinders and gas through our distributor network.",
     outline=["What we do (supply, cylinders, appliances, engineering)", "Licence and trust facts (licence no., office, reviewer)", "LPG rate (verified OGRA figure, date)", "Where we supply (4 wave-1 cities, link to all areas)", "How an order works (3 steps, three roles)", "FAQ (5 real questions)"],
     entities=["OGRA", "LPG", "cylinder sizes (11.8, 45.4 kg)", "marketer, distributor, reseller, referral partner", "Islamabad G-12 office", "composite cylinder"],
     gain=[("Licence number, office address and named safety reviewer on the first screen", "READY"), ("Verified OGRA figure with date and checker", "NEEDS DATA: monthly entry in data/prices.json"), ("Plain statement of the three roles and who delivers", "READY"), ("A real photo of the office, a cylinder delivery and the OGRA marking", "NEEDS DATA: owner photos")],
     facts=["Licence scan", "Latest OGRA notification", "Photos"], schema=["Organization", "WebSite"], cta="Call, WhatsApp and the 4-field form above the fold; sticky bar on mobile.",
     media=["Real office photo", "Cylinder with OGRA marking (close-up)", "Delivery photo with consent"], voice="Direct, warm, first person plural; no slogans.", reviewer=False)
kind("price_flagship",
     task="Learn today's official LPG rate, work out what a cylinder will cost, and decide where to order.",
     answer="The LPG rate in Pakistan this month is Rs X per kg (OGRA notification dated D), so an 11.8 kg cylinder's gas costs Rs Y.",
     outline=["Today's OGRA rate (table: per kg and 5, 11.8, 15, 45.4 kg) with month, effective date, source link, checker", "How the price of a cylinder is worked out (worked examples)", "Why the rate changes every month (sourced drivers only)", "Official rate vs what you pay: delivery, deposit, exchange (our real terms)", "Price history (link to history page)", "City prices (links to Karachi, Lahore and hubs)", "How to order / ask for your city's rate", "FAQ from real queries"],
     entities=["OGRA", "monthly notification", "per kg", "11.8 kg domestic", "45.4 kg commercial", "PKR", "exchange rate", "international LPG price (Saudi CP)", "deposit", "delivery charge"],
     gain=[("Dated OGRA table with a link to the official notification and a named checker", "NEEDS DATA: first verified entry"), ("Worked examples for every cylinder size", "READY (formula) / NEEDS DATA (numbers)"), ("Separate lines for gas price, delivery and cylinder terms from our real quotes", "NEEDS DATA: owner price sheet"), ("Downloadable CSV of the monthly history", "NEEDS DATA: 3+ months"), ("Price-change explainer using sourced facts only", "NEEDS DATA: sources")],
     facts=["OGRA notification (month, date, per-kg, URL)", "Delivery and deposit terms", "Checker name and date"], schema=["Organization", "BreadcrumbList", "FAQPage (visible only)", "Dataset (when history exists)"], cta="WhatsApp 'ask today's rate in your city' above the table; form in the aside.",
     media=["HTML table (not an image)", "Original social card with the month's figure", "Alt text states the figure and date"], voice="Factual, dated, calm. State the date in the first sentence.", reviewer=False)
kind("price_sub",
     task="Get one specific number or definition (per-kg rate, OGRA notified price, cylinder price) and the next step.",
     answer="The first sentence gives the number (or definition) and its date.",
     outline=["The figure and its date", "How it is used / how to read it", "Worked example", "What can make your final price different", "Related pages and how to order", "FAQ"],
     entities=["OGRA", "per kg", "notification", "11.8 kg", "45.4 kg", "delivery", "deposit"],
     gain=[("Date, source link and checker beside every figure", "NEEDS DATA: first verified entry"), ("Worked example with the real figure", "NEEDS DATA"), ("What is and is not in the number", "READY")],
     facts=["OGRA notification", "Our delivery/deposit terms"], schema=["Organization", "BreadcrumbList", "FAQPage (visible only)"], cta="Ask today's rate (WhatsApp) + form.",
     media=["Table", "Optional original diagram of 'per kg x weight'"], voice="Factual and short.", reviewer=False)
kind("price_city",
     task="See the LPG price in my city today and order there.",
     answer="First sentence: the verified per-kg price for this city and date, or why it equals the national notified price.",
     outline=["Price in the city today (verified, dated)", "How it differs from the national notified price (only if it does)", "Delivery and cylinder terms in the city", "Order here"],
     entities=["city and key areas", "OGRA", "per kg", "delivery charge", "partners serving the city"],
     gain=[("A city-specific verified price (only if it truly differs from national)", "NEEDS DATA: price survey or notification by city"), ("Delivery charge by area", "NEEDS DATA: owner/partner terms"), ("Date of the last verification call", "NEEDS DATA: calls")],
     facts=["City price evidence", "Delivery terms", "Overlap test result vs the hub"], schema=["Organization", "BreadcrumbList"], cta="Order in the city (form pre-filled) + WhatsApp.",
     media=["Table", "Real photo from the city (owner)"], voice="Specific to the city; no filler.", reviewer=False,
     gate="Do not publish unless the SERP-overlap test against the hub is under 70% AND a verified city price exists. Otherwise fold into the hub (Method Step 8.2).")
kind("city_hub",
     task="Confirm that someone can deliver LPG to my area, see the price and delivery terms, and place an order.",
     answer="First sentence: we supply LPG gas in {city} through N listed partners; call or send your area and we confirm the price and time.",
     outline=["How supply works in {city} (who delivers, our role)", "Areas covered (only verified areas)", "LPG 1kg price today in {city} (verified, dated)", "Delivery time and charges (measured or not stated)", "Local notes (facts only a local would know)", "Nearby hubs", "FAQ"],
     entities=["city and its areas/societies", "OGRA", "11.8 kg and 45.4 kg", "partners", "delivery time", "weather/winter demand (if sourced)"],
     gain=[("Measured delivery time from our own test order, with date", "NEEDS DATA: test order"), ("Verified area list from calls to partners", "NEEDS DATA: 3 verification calls"), ("3+ local facts (areas, peak times, restrictions) verified by the team", "NEEDS DATA: local notes"), ("Verified city price", "NEEDS DATA"), ("Photo from the city", "NEEDS DATA: owner photo")],
     facts=["Partner count (have, unverified)", "Verification calls (3+)", "Test order minutes", "Local notes (5+)", "Delivery charge policy"], schema=["Organization", "BreadcrumbList", "Service (areaServed City)", "FAQPage (visible only)"], cta="Order form pre-filled with the city; WhatsApp.",
     media=["Real city photo", "Map only if licensed"], voice="First person plural, specific, honest about limits.", reviewer=False,
     gate="Gate L: 3 verification calls, a measured test order and 5+ local facts in data/city-overrides.json, then registry status 'published'. Hubs currently share 55-64% of text with each other: they must not publish until the local sections are unique.")
kind("province_hub",
     task="Find out if LPG is available in my province or region and which towns are covered.",
     answer="First sentence: where in {province} we have partners today and how to order.",
     outline=["Where we have partners in {province} (towns, counts)", "Coverage honesty (thin regions)", "How to order", "Winter or access notes (only if sourced)", "Become a partner here", "FAQ"],
     entities=["province and main towns", "OGRA", "distributors", "winter", "access/roads (sourced)"],
     gain=[("Honest partner count per town", "READY (counts, unverified)"), ("Verified town list", "NEEDS DATA: calls"), ("A recruiting call-to-action for thin regions", "READY")],
     facts=["Partner counts by town", "Verification"], schema=["Organization", "BreadcrumbList", "FAQPage (visible only)"], cta="Request form + distributor link.",
     media=["None until real"], voice="Plain; say where we are thin.", reviewer=False,
     gate="Province hubs stay noindex until at least 5 verified partners exist in the region (AJK, GB, Balochistan are thin).")
kind("cylinder_hub",
     task="Choose a cylinder (steel or composite, size) and learn what is safe and certified.",
     answer="We supply OGRA-certified steel and composite LPG cylinders with gas; the common sizes are 5, 11.8, 15 and 45.4 kg.",
     outline=["Types of cylinder (steel, composite)", "Sizes and who each suits", "Certification and what to check on delivery", "Price and ordering", "Refill and exchange", "FAQ"],
     entities=["steel cylinder", "composite/fibre cylinder", "valve", "regulator", "OGRA marking", "11.8 kg", "45.4 kg", "deposit", "exchange", "hydro test"],
     gain=[("Photo guide: what to check on a delivered cylinder (marking, valve seal, dents)", "NEEDS DATA: owner photos"), ("Real weights and dimensions of the cylinders we supply", "NEEDS DATA: supplier spec"), ("Composite cylinder supplier and specification", "NEEDS DATA: supplier"), ("Exchange and deposit terms in plain words", "NEEDS DATA: owner terms")],
     facts=["Cylinder specs", "Supplier for composite", "Exchange/deposit terms"], schema=["Organization", "BreadcrumbList", "FAQPage (visible only)", "Product (only with real stock and price)"], cta="Ask about a cylinder (form pre-set) + WhatsApp.",
     media=["Original photos of each cylinder type", "Close-up of the OGRA marking"], voice="Practical, like a knowledgeable counter-person.", reviewer=True)
kind("catalog",
     task="See a specific product or size, its real price and how to buy it.",
     answer="First sentence names the product, who it suits and whether it is in stock.",
     outline=["What it is and who it suits", "Specifications (real)", "Price and what is included", "How to order and delivery", "Safety and use", "FAQ"],
     entities=["product specs", "supplier", "warranty (only if real)", "compatible regulator/hose", "OGRA"],
     gain=[("Real specifications from the supplier sheet", "NEEDS DATA: supplier"), ("Own photos with the product in use", "NEEDS DATA: owner photos"), ("Price and stock confirmed on a date", "NEEDS DATA: owner")],
     facts=["Supplier", "Price", "Stock", "Warranty terms"], schema=["Organization", "BreadcrumbList", "Product + Offer (only with real price and stock)"], cta="Order or ask (form pre-set).",
     media=["Own photos", "Spec table as HTML"], voice="Concrete; no brochure language.", reviewer=True,
     gate="Gate: real stock, price and a named supplier in the facts table. Otherwise do not publish.")
kind("comparison",
     task="Decide between two fuels and understand cost and safety differences.",
     answer="First sentence gives the verdict for the typical Pakistani household or business.",
     outline=["Quick answer by situation", "What each fuel is", "Cost comparison (method, not invented numbers)", "Safety and equipment differences", "Availability in Pakistan", "When each is the better choice", "FAQ"],
     entities=["LPG", "natural gas/Sui gas", "CNG", "LNG", "calorific value", "tariffs (sourced)", "regulator", "cylinder"],
     gain=[("A cost calculator with the user's own tariff", "NEEDS DATA: tool"), ("Table with sourced calorific values", "NEEDS DATA: sources"), ("A decision table by use case", "READY")],
     facts=["Sourced calorific values", "Current tariffs with dates"], schema=["Organization", "BreadcrumbList", "Article", "FAQPage (visible only)"], cta="Soft: link to price page and cylinder hub.",
     media=["Original comparison table or chart"], voice="Neutral and fair; admit where the other fuel wins.", reviewer=True)
kind("safety_guide",
     task="Know what to do and what not to do, quickly and correctly.",
     answer="The first screen gives the immediate action; detail follows.",
     outline=["Immediate steps (numbered)", "Why it matters (mechanism)", "What not to do", "Prevention checklist", "When to call a professional / emergency", "FAQ (real questions)"],
     entities=["LPG", "odorant (ethyl mercaptan)", "heavier than air", "carbon monoxide", "regulator", "hose", "ventilation", "flammable range", "emergency services (verified numbers)"],
     gain=[("Original diagram or photo series", "NEEDS DATA: owner/designer"), ("Reviewer sign-off with date and credentials", "NEEDS DATA: Mr Rasheed"), ("Checklist you can print", "READY"), ("A sourced number or rule from OGRA or a standard", "NEEDS DATA: source")],
     facts=["Reviewer sign-off date", "Verified emergency numbers", "Sources for any numbers"], schema=["Organization", "BreadcrumbList", "Article", "WebPage with reviewedBy and lastReviewed (ONLY after sign-off)", "FAQPage (visible only)"], cta="Never above the safety steps. After the guide: inspection service link.",
     media=["Original diagrams", "Alt text describes the safety point"], voice="Calm, short sentences, imperative for steps; no fear marketing.", reviewer=True)
kind("guide",
     task="Get a clear, correct answer and know what to do next.",
     answer="The first two sentences answer the main question.",
     outline=["Direct answer", "Explanation", "Pakistan-specific context", "Table or example", "What to do next (link to price/cylinders/order)", "FAQ"],
     entities=["LPG", "propane", "butane", "OGRA", "cylinder", "Pakistan context"],
     gain=[("A table or checklist others lack", "READY"), ("A Pakistan-specific sourced fact", "NEEDS DATA: source"), ("An original diagram", "NEEDS DATA: designer")],
     facts=["Sources for every number"], schema=["Organization", "BreadcrumbList", "Article", "FAQPage (visible only)"], cta="Soft link to the relevant commercial page.",
     media=["Original diagram"], voice="Third person, plain, patient.", reviewer=True)
kind("news_tracker",
     task="See what is happening to LPG supply now and what it means for me.",
     answer="First sentence: the current situation and the date of the last update.",
     outline=["Latest update (dated)", "What it means for households and businesses", "Timeline (dated, each entry sourced)", "What we are doing / how to order", "Sources"],
     entities=["OGRA", "importers", "ports", "supply chain", "dates", "official statements"],
     gain=[("Dated, sourced timeline", "NEEDS DATA: a named editor to update weekly"), ("Our own supply status by city (from partners)", "NEEDS DATA: partner check-ins"), ("Plain explanation of who decides what", "READY")],
     facts=["Named editor", "Source list"], schema=["Organization", "BreadcrumbList", "NewsArticle or Article with dateModified"], cta="Order or ask about supply.",
     media=["None needed"], voice="Neutral, dated, no speculation.", reviewer=False,
     gate="Do not publish unless someone commits to weekly updates; a stale tracker is worse than none.")
kind("directory",
     task="Find a nearby verified shop, agency or filling point.",
     answer="First sentence: how many verified places are listed for the city and when they were checked.",
     outline=["How we verify", "Listings by city (only consented and verified)", "How to get listed", "FAQ"],
     entities=["city and area", "opening hours", "services", "verification date"],
     gain=[("Verified-by-call date per listing", "NEEDS DATA: calls"), ("Consent record per listing", "NEEDS DATA: consent")],
     facts=["Verified partner list with consent"], schema=["Organization", "BreadcrumbList", "ItemList (only verified entries)"], cta="Request supply; get listed.",
     media=["None"], voice="Plain and exact.", reviewer=False, gate="5+ partners at 'agreed' per city, with consent. No unverified scraped data.")
kind("tool",
     task="Get a calculation done correctly in seconds.",
     answer="The tool is the answer; one sentence states what it calculates and the assumptions.",
     outline=["The tool", "How it calculates (formula and assumptions)", "Worked example", "Limits (estimate only)", "FAQ"],
     entities=["inputs and units", "OGRA price row", "kg/litre conversion", "assumptions"],
     gain=[("A working tool nobody else has in Pakistani units", "NEEDS DATA: build"), ("Formula disclosed", "READY")],
     facts=["Formula sources"], schema=["Organization", "BreadcrumbList", "WebApplication (optional)"], cta="After result: order link.",
     media=["Screenshot of the tool"], voice="Short and exact.", reviewer=True)
kind("services_hub",
     task="See what engineering work we do and request a quotation.",
     answer="We design, install, convert, inspect and maintain LPG systems across Pakistan through our engineering team.",
     outline=["The eight services (cards)", "How a job runs", "Who does the work", "Projects (only real ones)", "Request a quotation"],
     entities=["pipeline", "storage tank", "manifold", "vaporizer", "SNG", "boiler", "audit", "AMC", "engineering team"],
     gain=[("A real project with photos and consent", "NEEDS DATA: project"), ("Named engineer or team lead", "NEEDS DATA: owner"), ("Typical scope and what we need from you", "READY")],
     facts=["Executor named", "1+ real project", "Standards followed"], schema=["Organization", "BreadcrumbList"], cta="Request quotation.",
     media=["Real site photos"], voice="Professional, specific.", reviewer=True, gate="Gate: named executor and one real project with consent (data/projects.json).")
kind("service",
     task="Check that you can do this job, what is involved and request a quotation.",
     answer="First sentence says what the service is and who it suits.",
     outline=["What it is and who needs it", "What is included", "How the job runs", "What we need from you", "Typical timeline (only if real)", "Safety and compliance", "Related services", "FAQ"],
     entities=["scope", "standards (OGRA rules, only those verified)", "materials", "testing", "handover documents", "safety"],
     gain=[("A real project: photos, scope, outcome (with consent)", "NEEDS DATA: project"), ("Consumption or sizing example from a real account", "NEEDS DATA: real account"), ("The documents the customer receives at handover", "NEEDS DATA: sample"), ("Named engineer and experience", "NEEDS DATA: owner")],
     facts=["Executor", "Project", "Standards", "Sizing example"], schema=["Organization", "BreadcrumbList", "Service", "FAQPage (visible only)"], cta="Request quotation (engineering queue).",
     media=["Real site photos", "Diagram of a typical layout"], voice="First person plural, concrete steps.", reviewer=True, gate="Gate: named executor + at least one real project. Do not use stock photos.")
kind("industry",
     task="See that you understand my kind of business and can supply and install for it.",
     answer="First sentence names the sector and the typical gas use.",
     outline=["How this sector uses LPG", "Typical setup", "Supply options", "Safety points", "Case (real)", "Request supply or quotation"],
     entities=["sector appliances", "consumption", "storage", "safety rules", "refill schedule"],
     gain=[("A named customer or partner-delivered job in the sector", "NEEDS DATA: customer"), ("Consumption figures from real accounts", "NEEDS DATA: accounts")],
     facts=["Customer case", "Consumption data"], schema=["Organization", "BreadcrumbList", "Service"], cta="Request supply/quotation.",
     media=["Real photos"], voice="Specific to the sector.", reviewer=True, gate="Gate: a real job in the sector and real consumption figures.")
kind("b2b",
     task="Decide whether to partner with us or buy in bulk.",
     answer="First sentence says who we supply and what a partner receives.",
     outline=["How the partnership works", "What we look for", "What you get", "Where we need partners", "Apply"],
     entities=["OGRA licence types", "marketer", "distributor", "dealer", "terms"],
     gain=[("Plain terms (what is and is not charged)", "NEEDS DATA: owner terms"), ("Partner standards page", "READY"), ("Regions where we need partners (from data)", "READY")],
     facts=["Terms", "Licence requirements"], schema=["Organization", "BreadcrumbList", "FAQPage (visible only)"], cta="Apply form (distributor queue).",
     media=["None"], voice="Business-to-business, direct.", reviewer=False)
kind("auto",
     task="Understand auto LPG options and the legal position in Pakistan.",
     answer="First sentence states what is allowed and what is not.",
     outline=["What auto LPG is", "Legal position (sourced)", "Kit types and costs (real)", "Safety", "Where to fit", "FAQ"],
     entities=["kit", "regulator", "tank", "OGRA/ministry rules (sourced)", "workshop"],
     gain=[("Sourced legal position", "NEEDS DATA: OGRA/regulator source"), ("Real kit prices", "NEEDS DATA: supplier")],
     facts=["Legal confirmation", "Kit prices"], schema=["Organization", "BreadcrumbList", "Article"], cta="Ask.", media=["Own photos"], voice="Careful and exact.", reviewer=True,
     gate="Gate: legal status and rules confirmed from a primary source.")
kind("trust",
     task="Check that this company is real, licensed and fair before trusting it.",
     answer="First sentence states the fact the page is about (licence, address, policy).",
     outline=["The fact, stated plainly", "Evidence (number, document, date)", "What it means for you", "How to verify or complain", "Contact"],
     entities=["licence no.", "OGRA", "address", "reviewer", "policy dates"],
     gain=[("Document scan or number a visitor can verify", "NEEDS DATA: scans"), ("Dated policy with a last-updated line", "READY"), ("Named person responsible", "READY")],
     facts=["Documents", "Dates", "Names"], schema=["Organization", "BreadcrumbList", "LocalBusiness (contact and about only)"], cta="Contact; no hard sell.",
     media=["Real documents (redacted as needed)", "Office photo"], voice="Plain and exact; legal pages reviewed by a lawyer.", reviewer=False)
kind("order_page",
     task="Place an order as quickly as possible.",
     answer="The form and the call/WhatsApp buttons are the answer.",
     outline=["Form and call/WhatsApp", "What to tell us", "What happens next (call within the target window)", "Price and delivery confirmation promise"],
     entities=["city", "area", "size", "quantity", "phone"],
     gain=[("Honest next-step timeline", "NEEDS DATA: measured call-back time"), ("Delivery-area check before the form", "READY")],
     facts=["Call-back target (measured)", "Delivery areas"], schema=["Organization", "BreadcrumbList"], cta="This is the CTA page.",
     media=["None"], voice="Short, instructional.", reviewer=False)
kind("delivery_hub",
     task="Understand how home delivery works and whether it reaches me.",
     answer="First sentence: how an order becomes a delivery and who delivers.",
     outline=["How home delivery works", "Cities where the network is strongest", "Delivery time (honest)", "Prices and payment", "Commercial supply", "FAQ"],
     entities=["order", "distributor", "connection check", "payment terms", "cities"],
     gain=[("Measured delivery time per city (when tested)", "NEEDS DATA: tests"), ("What the delivery person checks, step by step", "READY"), ("Payment terms in plain words", "NEEDS DATA: owner")],
     facts=["Measured times", "Payment terms"], schema=["Organization", "BreadcrumbList", "Service", "FAQPage (visible only)"], cta="Order delivery form.",
     media=["Photo of a delivery with consent"], voice="Practical and honest.", reviewer=False)
kind("urdu",
     task="Get the same answer in Urdu from a writer who knows the topic.",
     answer="Urdu first sentence answers the question; Roman Urdu terms only where searchers use them.",
     outline=["Mirror of the English page's sections, rewritten by the writer"],
     entities=["same as English page", "Urdu spellings and Roman Urdu search terms (from Keyword Planner)"],
     gain=[("Native Urdu, not a machine translation", "NEEDS DATA: writer"), ("Search terms confirmed with Keyword Planner", "NEEDS DATA")],
     facts=["Same as the English source page"], schema=["Same as the English page; inLanguage ur-PK"], cta="Same as English.", media=["Same"], voice="Natural Urdu; short sentences.", reviewer=True,
     gate="hreflang en-PK and ur-PK pair only after the Urdu page exists and is reviewed.")
kind("generic",
     task="Answer one specific question and lead to the right page.",
     answer="First two sentences answer the main question.",
     outline=["Direct answer", "Detail", "Examples", "Next step", "FAQ"],
     entities=["topic entities from competitor headings"],
     gain=[("One original table, checklist or diagram", "READY"), ("One Pakistan-specific sourced fact", "NEEDS DATA: source"), ("One first-hand detail from the team", "NEEDS DATA: team")],
     facts=["Sources"], schema=["Organization", "BreadcrumbList", "Article"], cta="Soft.", media=["Original diagram"], voice="Plain.", reviewer=False)


def kind_of(r) -> str:
    pid, url, t, pillar = r.page_id, r.url, r.type, r.pillar
    if pid == "HP-001":
        return "home"
    if pid == "DL-008":
        return "order_page"
    if pid == "PR-001":
        return "price_flagship"
    if url.startswith("/lpg-price-in-pakistan/") and url != "/lpg-price-in-pakistan/" and t == "LH":
        return "price_city"
    if t in ("LH", "LC"):
        return "city_hub"
    if t == "PH":
        return "province_hub"
    if pid in ("PR-002", "PR-003", "PR-009", "CY-002"):
        return "price_sub"
    if t == "TL":
        return "tool"
    if t == "CM":
        return "comparison"
    if t == "DR":
        return "directory"
    if t == "NW":
        return "news_tracker"
    if t == "UR":
        return "urdu"
    if t == "TR":
        return "trust"
    if pid == "SV-001":
        return "services_hub"
    if pillar == "Services":
        return "service"
    if pillar == "Industries":
        return "industry" if t != "SH" else "services_hub"
    if pillar == "B2B":
        return "b2b"
    if pillar == "Auto":
        return "auto"
    if t == "CT" or pillar in ("Appliances", "Shop"):
        return "catalog"
    if pid == "CY-001":
        return "cylinder_hub"
    if pid == "DL-001":
        return "delivery_hub"
    if t == "SH" and pillar == "Cylinders":
        return "cylinder_hub"
    if t == "SH" and pillar == "Delivery":
        return "delivery_hub"
    if t == "GD" and pillar == "Safety":
        return "safety_guide"
    if t == "GD":
        return "guide"
    if t == "SH" and pillar == "Safety":
        return "safety_guide"
    return "generic"


# ---------------------------------------------------------------------------------------------- build
def city_of(url: str):
    m = re.match(r"^/lpg-in-([a-z\-]+)/$", url) or re.match(r"^/lpg-price-in-pakistan/([a-z\-]+)/$", url)
    return m.group(1) if m else None


def fmt_alt(pid, r, kd):
    p = PRIMARY[pid] or r.url.strip("/").split("/")[-1].replace("-", " ")
    return f"{p.capitalize()}: <what the image shows, in one plain sentence>"


rows_csv = []
for r in pm.itertuples():
    pid, url = r.page_id, r.url
    kd = kind_of(r)
    T = K_[kd]
    prim = PRIMARY[pid]
    reg = REG.get(url, {})
    built = reg.get("built", False)
    status = reg.get("status", "draft")
    meta = META.get(url, {})
    city = city_of(url)
    cityname = next((c["name"] for c in NET["cities"] if c["slug"] == city), None) or (NET["provinces"].get(city, {}).get("name") if city else None)

    kws = K[(K.target_page == pid) & K.disposition.isin(["TARGET", "MONITOR"])].sort_values("volume", ascending=False)
    groups = defaultdict(list)
    for x in kws.itertuples():
        if x.keyword != prim:
            groups[group_of(x.keyword)].append(x)
    pvol = int(kws[kws.keyword == prim].volume.max()) if prim and (kws.keyword == prim).any() else 0

    sp = serp(prim) if prim else []
    ov = overlaps(pid)
    sec_kws = [x.keyword for x in kws.head(4).itertuples() if x.keyword != prim]
    cp = competitor_pages(pid, prim, sec_kws) if prim else pd.DataFrame()
    h2c = h2_checklist(cp) if len(cp) else []
    wcs = [w for w in cp.word_count.tolist() if w >= 150] if len(cp) else []

    ready = sum(1 for _, s in T["gain"] if s.startswith("READY"))
    need = len(T["gain"]) - ready

    L = []
    A = L.append
    A(f"# Brief {pid}: {url}")
    A("")
    A(f"| | |\n|---|---|\n| Page type | **{kd}** (map type {r.type}) · pillar **{r.pillar}** · phase **{r.phase}** |\n| Status (data/pages.json) | **{status}** · built: **{built}** |\n| Primary keyword | **{prim or 'none (trust/navigation page)'}** ({pvol} /mo; a value of 10 is the tool's floor, not a measurement) |\n| Reviewer required | {'YES: Haroon Rasheed, dated sign-off before publish' if T['reviewer'] else 'No (fact-check by the owner)'} |")
    A("")
    A("> Method reference: Steps 12 (brief), 13 (write), 13.5-13.9 (expertise, readability, on-page, media), 15.8 (schema), 17 (links), 22.3 (publication gate). Rules that apply to every page are in the plan, section 11.5 *Writing standard*.")
    A("")
    A("## 1. Search research")
    A("")
    A(f"**What the visitor is trying to do:** {T['task']}")
    A("")
    if r.gate_notes and isinstance(r.gate_notes, str):
        A(f"**Gate and notes from the page map:** {r.gate_notes}")
        A("")
    A("### Keywords (one cluster, one URL)")
    A("")
    if prim:
        A(f"- **Primary:** `{prim}`")
    if groups:
        A("- **Secondary, grouped by what the searcher wants** (cover the group naturally; no counts to hit):")
        for g, items in sorted(groups.items(), key=lambda kv: -sum(i.volume for i in kv[1])):
            top = "; ".join(f"{i.keyword} ({i.volume})" for i in items[:8])
            A(f"  - *{g}*: {top}")
    else:
        A("- No secondary keywords are mapped (trust/navigation page, or no data). Do not invent targets.")
    A("")
    A("### What is ranking now" + (f" for `{prim}`" if prim else ""))
    A("")
    if sp:
        A("| # | Domain | Type | Title |\n|---:|---|---|---|")
        for pos, title, u, dom, rt in sp[:8]:
            A(f"| {pos} | {dom} | {rt} | {str(title)[:80].replace('|', '/')} |")
        A("")
        types = Counter(rt for *_, rt in sp[:10])
        A(f"Mix of the top 10: {', '.join(f'{k} {v}' for k, v in types.most_common())}. Build the page type that ranks (Step 8.5).")
    else:
        A("No stored SERP for this query yet. Run `serper_run.py` for it before writing (Step 8.5).")
    A("")
    if ov:
        A("**Cannibalisation test (SERP overlap, Step 8.2):** " + "; ".join(f"{o} `{k}` shares {n}/10 URLs" for o, k, n in ov[:5]) + ". 4-6 shared: inspect intent by hand; 7+: one page should own this query (Step 8.4).")
    else:
        A("**Cannibalisation test:** no other page's primary query shares 4+ of the top-10 URLs, or no SERP is stored.")
    A("")
    A("### Competitor coverage (from the crawl; use as a checklist of subtopics, never copy)")
    A("")
    if len(cp):
        A("| Domain | Words | Headings found on the page |\n|---|---:|---|")
        for x in cp.head(6).itertuples():
            try:
                hs = ", ".join(json.loads(x.h2s)[:6])[:150]
            except Exception:
                hs = ""
            A(f"| {x.domain} | {x.word_count} | {hs.replace('|', '/')} |")
        A("")
        if h2c:
            A("**Subtopics that appear on pages of 2+ competitor sites (boilerplate removed):** " + "; ".join(f"{h} ({k} sites)" for h, k in h2c[:12]))
        else:
            A("No heading appears on 2+ competitor sites (pages are short, JavaScript-rendered, or only one site covers the topic). Use the table above as the outline of the strongest page; render with Playwright for more.")
    else:
        A("No competitor page in the crawl matches this topic. That may be a gap we can own. Check the SERP above by hand.")
    A("")
    A("## 2. Content and experience")
    A("")
    A(f"**First sentence (answer first):** {T['answer'].replace('{city}', cityname or 'the city').replace('{province}', cityname or 'the province')}")
    A("")
    A("### Heading outline (each H2 states what its section answers; reorder to the reader's journey)")
    A("")
    for i, h in enumerate(T["outline"], 1):
        A(f"{i}. {h.replace('{city}', cityname or 'the city').replace('{province}', cityname or 'the province')}")
    A("")
    A("### Entity and coverage checklist (cover each where it reads naturally; there is no minimum count)")
    A("")
    A(", ".join(T["entities"]) + ".")
    if h2c:
        A("")
        A("Add any competitor subtopic above that serves this visitor and that we can answer truthfully.")
    A("")
    A(f"### Information gain (Golden rule 3: at least 3 per commercial page). Ready now: **{ready}** · need data: **{need}**")
    A("")
    A("| Item | Status |\n|---|---|")
    for g, s in T["gain"]:
        A(f"| {g} | {s} |")
    if ready + need and ready < 3 and kd not in ("trust", "order_page", "home"):
        A("")
        A("> **Blocked for publish:** fewer than 3 information-gain items can be produced today. Supply the data above or merge this page into its parent.")
    A("")
    A("### Verified-facts table (the only source of facts, prices and numbers)")
    A("")
    A("| Fact | Status | Note |\n|---|---|---|")
    for f, s, n in GLOBAL_FACTS[:5] if kd in ("home", "trust", "b2b", "order_page") else GLOBAL_FACTS[:2]:
        A(f"| {f} | {s} | {n} |")
    for f in T["facts"]:
        A(f"| {f} | NEEDS DATA | Enter in the matching file under data/ or the facts table; write `[NEEDS FACT: ...]` in drafts until then |")
    if kd in ("city_hub", "price_city") and city:
        c = next((c for c in NET["cities"] if c["slug"] == city), None)
        o = OVR.get(city, {}) if isinstance(OVR.get(city, {}), dict) else {}
        if c:
            A(f"| Partners listed in {c['name']}: {c['suppliers']} gas supply, {c['autoLpg']} auto-LPG, {c['open24h']} list 24h opening | OWNER FILE, UNVERIFIED BY CALL | {NET['source'] if isinstance(NET.get('source'), str) else 'owner dealers file'} |")
        A(f"| City verification record | {'HAVE' if o.get('verifiedOn') else 'NEEDS DATA'} | data/city-overrides.json -> {city} |")
    if kd.startswith("price") or kd == "home":
        n_prices = len((PRICES.get('notifications') or []))
        A(f"| Verified OGRA notifications on file | {'HAVE ' + str(n_prices) if n_prices else 'NEEDS DATA: 0 on file'} | data/prices.json |")
    if kd in ("service", "services_hub", "industry"):
        n_pr = len(PROJECTS.get("projects") or []) if isinstance(PROJECTS, dict) else 0
        A(f"| Real projects with consent on file | {'HAVE ' + str(n_pr) if n_pr else 'NEEDS DATA: 0 on file'} | data/projects.json |")
    A("")
    A("### Must NOT claim")
    A("")
    for m in GLOBAL_MUST_NOT:
        A(f"- {m}")
    A("")
    A("### Voice and humanising (this is an expert edit, not a rewrite tool)")
    A("")
    A(f"- Voice: {T['voice']} Pakistani English. Short paragraphs. Name real things (sizes, areas, months, documents).")
    A("- Humanise by adding first-hand specifics from the team (see the questions below), not by paraphrasing. Delete filler openers and any sentence that could appear on a competitor's page unchanged.")
    A("- Roman Urdu or Urdu terms only in the places searchers use them (an H2 or FAQ such as 'aaj ka rate'); the Urdu writer confirms spelling.")
    A("- Plain-language target: about reading grade 8-10 (heuristic, measured by the audit). Explain a term the first time it appears.")
    A("")
    A("**Questions to ask the team before writing (so the page contains first-hand detail):**")
    A("")
    for f in T["facts"][:4]:
        A(f"- What exactly is true for: {f.lower()}? Is there a document, photo or number we can show?")
    A("- What do customers ask most often about this on the phone or WhatsApp? Which mistake do they make?")
    A("- What would you tell a neighbour about this, in two sentences?")
    A("")
    A("### CTA and conversion")
    A("")
    A(f"- {T['cta']}")
    A("- Disclosure near any form: who will call, why, and that the order may be fulfilled by a partner (consent text version is stored with the lead).")
    A("")
    A("### Media")
    A("")
    for m in T["media"]:
        A(f"- {m}")
    A(f"- Filenames: `{slug(prim or pid)}-<what-it-shows>.webp` (lowercase, hyphens). Alt text pattern: *{fmt_alt(pid, r, kd)}* (describes the image; the keyword only if it fits naturally). No stock photos of people or workers.")
    A("- Compress images; set width and height to avoid layout shift. No images of text where HTML text works.")
    A("")
    A("### Length (information, not a target)")
    A("")
    if wcs:
        A(f"Matching competitor pages in the crawl run {min(wcs)}-{max(wcs)} words (median {int(statistics.median(wcs))}; {len(wcs)} pages, JS-rendered pages excluded). Google has no preferred length. The page is finished when every question in the outline is answered with a fact, example or action, and nothing is repeated for padding.")
    else:
        A("No usable competitor length benchmark. The page is finished when every question in the outline is answered; do not pad.")
    A("")
    A("## 3. SEO implementation")
    A("")
    A("### Keyword placement for this page")
    A("")
    p = prim or "(none: write a natural, descriptive title)"
    A("| Place | What to do |\n|---|---|")
    A(f"| URL | `{url}` (already fixed; lowercase, hyphens, depth <= 3) |")
    A(f"| Title (50-60) | {('`' + meta['title'] + '` (' + str(len(meta['title'])) + ' chars)') if meta.get('title') else 'Primary phrase first, brand last, one true differentiator. Compare with the top-5 titles above.'} |")
    A(f"| Meta description (140-160) | {('`' + meta['description'] + '` (' + str(len(meta['description'])) + ' chars)') if meta.get('description') else 'What the visitor gets + one specific fact + a call to action. Same keyword as the title.'} |")
    A(f"| H1 (one only) | Contains `{p}` or a close variant; reads as a title, not a keyword string |")
    A(f"| First 100 words | `{p}` once, naturally, inside the first two sentences, together with the answer |")
    A("| H2/H3 | At least one subheading uses the primary phrase or a close variant; the others state what each section answers. Do not repeat the exact phrase in every heading |")
    A("| Body | Use the grouped secondary terms only where they read naturally. No density target |")
    A("| Image alt and filename | See Media |")
    A("| Internal anchor text | Descriptive and varied: e.g. the exact name of the target page, a partial match, a natural phrase. Never 'click here' |")
    A("| Schema | " + "; ".join(T["schema"]) + ". Schema must match what is visible on the page (Step 15.8). FAQ markup only for questions shown on the page |")
    A("")
    A("### Internal links (Step 17)")
    A("")
    same = pm[(pm.pillar == r.pillar) & (pm.page_id != pid)].sort_values("primary_volume", ascending=False)
    parent = pm[(pm.pillar == r.pillar) & pm.type.isin(["SH", "HP"])]
    A(f"- **Link out to:** the pillar hub{' `' + parent.iloc[0].url + '`' if len(parent) and parent.iloc[0].page_id != pid else ''}; 2-4 siblings: {', '.join('`' + u + '`' for u in same.head(4).url) or 'none yet'}; the funnel target (`/order-lpg/` or the nearest price page) where it helps the reader.")
    A("- **Must receive 2-5 links** from relevant pages on the day it goes live (parent, 2 siblings, and a guide that mentions the topic). No footer link lists.")
    if url in LINKS:
        A(f"- **Today (built pages):** linked from {len(LINKS[url]['in'])} page(s): {', '.join('`' + x + '`' for x in LINKS[url]['in'][:8]) or 'none'}. Links out to {len(LINKS[url]['out'])}.")
    A("")
    A("### Publication gate (Step 22.3) and quality check")
    A("")
    if T.get("gate"):
        A(f"**Specific gate:** {T['gate']}")
        A("")
    A("- [ ] Search intent matches the page type that ranks, and the URL is unique (no cannibalisation)")
    A("- [ ] The thing can really be delivered or answered (Golden rule 1)")
    A("- [ ] Every fact is in the facts table; no [NEEDS FACT] left; nothing from the must-not list")
    A("- [ ] 3+ information-gain items are on the page (commercial pages)")
    A("- [ ] Similarity to sibling pages under 0.8 and not just a swapped place name (audit script)")
    A("- [ ] One H1, title and meta lengths, canonical self, alt text, schema valid and visible (audit script)")
    A("- [ ] Reviewer sign-off recorded with date" + ("" if T["reviewer"] else " (not required for this type; the owner fact-checks)"))
    A("- [ ] CTA, form and lead routing tested (one test lead)")
    A("- [ ] 2-5 inbound internal links added; page added to the sitemap by changing its status to `published` in data/pages.json")
    A("- [ ] Logged: publish date, who approved, evidence. Then request indexing; track in Search Console")
    A("")
    (OUT / f"{pid}.md").write_text("\n".join(L), encoding="utf-8")
    rows_csv.append(dict(page_id=pid, url=url, kind=kd, phase=r.phase, status=status, built=built, primary=prim, primary_volume=pvol,
                         info_gain_ready=ready, info_gain_need_data=need, reviewer_required=T["reviewer"], serp_stored=bool(sp),
                         competitor_pages=len(cp), overlap_flags=len(ov), has_gate=bool(T.get("gate"))))

df = pd.DataFrame(rows_csv)

# Priority score (Step 9): transparent and additive, so the owner can disagree with a weight.
#   value     = what the page is worth to the business (price, order, trust and safety carry revenue or risk)
#   demand    = keyword volume tier (a reported 10 is the tool's floor, so it scores 0)
#   readiness = built, plus information-gain items we can already supply (cap 2)
VALUE = {"price_flagship": 5, "price_sub": 5, "order_page": 5, "home": 4, "cylinder_hub": 4, "safety_guide": 4, "trust": 4,
         "delivery_hub": 4, "catalog": 3, "price_city": 3, "city_hub": 3, "guide": 3, "service": 2, "b2b": 3}


def _demand(v):
    v = 0 if pd.isna(v) else v
    return 3 if v >= 5000 else 2 if v >= 1000 else 1 if v >= 100 else 0


df["score_value"] = df.kind.map(VALUE).fillna(2).astype(int)
df["score_demand"] = df.primary_volume.map(_demand)
df["score_readiness"] = df.built.astype(int) + df.info_gain_ready.clip(upper=2).fillna(0).astype(int)
df["priority_score"] = df.score_value + df.score_demand + df.score_readiness - (df.has_gate & (df.info_gain_ready < 3)).astype(int)
df["publish_order"] = df.sort_values(["priority_score", "score_value"], ascending=False).reset_index().reset_index().set_index("index")["level_0"].reindex(df.index) + 1
df.to_csv(SEO / "briefs.csv", index=False)

# SERP-overlap pairs between OUR pages' primary queries (Step 8.2 / 8.4): the cannibalisation worklist
pairs = []
ids = [p for p in SERP_URLS if SERP_URLS[p]]
urlof = dict(zip(pm.page_id, pm.url))
for i, a in enumerate(ids):
    for b in ids[i + 1:]:
        n = len(SERP_URLS[a] & SERP_URLS[b])
        if n >= 4:
            pairs.append(dict(page_a=a, url_a=urlof[a], query_a=PRIMARY[a], page_b=b, url_b=urlof[b], query_b=PRIMARY[b], shared_of_10=n,
                              reading="one page should own both (7+)" if n >= 7 else "inspect intent by hand (4-6)"))
pd.DataFrame(pairs).sort_values("shared_of_10", ascending=False).to_csv(SEO / "audit" / "serp-overlap-pairs.csv", index=False)
idx = ["# Page briefs", "",
       f"{len(df)} briefs, generated by `scripts/21_build_page_briefs.py` from the page map, keyword master, stored SERPs, the competitor crawl and the site audit. "
       "Each brief follows seo-LeadGEN.md Step 12 (brief) and Step 13 (write). Open the brief before writing or editing a page. Rules common to all pages are in the master plan, section 11.5.", "",
       "| ID | URL | Kind | Phase | Status | Primary keyword | Info gain ready / need data | Reviewer | Gate |", "|---|---|---|---|---|---|---|---|---|"]
for x in df.itertuples():
    idx.append(f"| [{x.page_id}]({x.page_id}.md) | `{x.url}` | {x.kind} | {x.phase} | {x.status} | {x.primary or ''} | {x.info_gain_ready} / {x.info_gain_need_data} | {'yes' if x.reviewer_required else ''} | {'yes' if x.has_gate else ''} |")
(OUT / "INDEX.md").write_text("\n".join(idx), encoding="utf-8")
print(f"{len(df)} briefs written to {OUT}")
print("by kind:", df.kind.value_counts().to_dict())
print("with SERP stored:", int(df.serp_stored.sum()), "| with competitor pages:", int((df.competitor_pages > 0).sum()), "| overlap flags:", int((df.overlap_flags > 0).sum()))
