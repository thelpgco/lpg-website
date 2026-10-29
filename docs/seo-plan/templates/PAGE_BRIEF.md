# Brief <PAGE_ID>: <URL>

Use this only for a page that has no generated brief (a new page added to `page-map.csv`). Otherwise run `scripts/21_build_page_briefs.py` and open `briefs/<PAGE_ID>.md`. Method: seo-LeadGEN.md Steps 12 and 13.

| | |
|---|---|
| Page type | |
| Pillar / phase | |
| Status (`data/pages.json`) | draft / review / approved / published |
| Primary keyword (one per URL) | |
| Reviewer required | yes (price, safety, legal, engineering) / no |

## 1. Search research
- **Searcher's task** (one sentence, in their words):
- **Keyword cluster** (primary + secondary grouped by intent: price, order, delivery, size, safety, place, Urdu):
- **Live SERP (Pakistan, date):** top 10 with page type. Does the page type we plan match what ranks?
- **Overlap test (Step 8.2):** shared top-10 URLs with every sibling's primary query. 7+ merge, 4-6 read by hand, under 4 separate.
- **Competitor teardown (3 pages from `intel.pages`):** headings, facts, tools, what is missing. Subtopics are a checklist, never text to copy.

## 2. Content and experience
- **First sentence (answers the query, contains the primary keyword naturally):**
- **Outline:** each H2 states what its section answers.
- **Entities and facts to cover** (no minimum count):
- **Information gain (3+ for commercial pages), each with its data source and status:**
  1.
  2.
  3.
- **Verified-facts table (fact | value | source | verifier | date).** Nothing outside this table appears on the page. Gaps are written `[NEEDS FACT: ...]`.
- **Must NOT claim:**
- **Voice:** who is speaking, reading level, Urdu/Roman Urdu terms allowed and where.
- **First-hand questions to ask the team before writing:**
- **CTA and form** (which request type, what the visitor is told about who will call):
- **Media** (original photo or table or chart, alt text, filename pattern):
- **Length:** answer every question in the outline, then stop. Competitor range for reference only.

## 3. SEO implementation
| Place | Value |
|---|---|
| URL | |
| Title (50-60, primary first, brand last) | |
| Meta description (140-160) | |
| H1 (one) | |
| First 100 words | primary keyword once, with the answer |
| H2/H3 | one subheading carries the primary phrase or a close variant |
| Schema (matches visible content only) | |
| Canonical | self |
| Internal links out (2-4 siblings + parent + funnel) | |
| Inbound links on launch day (2-5, named pages) | |

## 4. Publication gate (Step 22.3)
- [ ] Intent matches the page type that ranks; URL is unique
- [ ] The thing can really be delivered or answered
- [ ] Every fact is in the facts table; no `[NEEDS FACT]` left
- [ ] 3+ information-gain items present
- [ ] Sibling similarity under 0.8 (audit)
- [ ] One H1, title and meta lengths, canonical, alt text, schema valid and visible (audit)
- [ ] Reviewer sign-off with date (if required)
- [ ] Form and lead routing tested with one test lead
- [ ] 2-5 inbound links added; status set to `published`
- [ ] Logged: date, approver, evidence. Indexing requested; tracked in Search Console

## 5. After publishing (Step 21 and 23)
- Review date:
- Metric to watch at 4 and 8 weeks (impressions, position, clicks, leads):
- Decision at 90 days: scale / fix / hold / merge / remove
