# Content plan: how to use it

| File | What it is |
|---|---|
| `01_FIX_PLAN.md` | Every audit issue, in phases (blockers → cleanup → publish → rewrite → AdSense → growth) |
| `02_CONTENT_PLAYBOOK.md` | The writing rules for every page. Paste it into the writing agent. |
| `scripts/measure_pages.py` | Measures unique text % and sibling overlap from a build |

## Workflow

1. **Do Phase 0 and Phase 1 of the fix plan once.** These are code and data fixes, not writing.
2. **Publish Wave A** (the fix plan, Phase 2) by setting its status to `published` in `data/pages.json`. Then submit the sitemap in Search Console.
3. **Rewrite pages one at a time.** For each page, start a fresh agent session and give it:
   - the whole of `02_CONTENT_PLAYBOOK.md`;
   - the page assignment block (playbook §11), filled in from the fix plan's Phase 3 table;
   - any owner inputs for that page (photos, field notes, project data).
4. **Check the result.** Run `npx next build`, then `python -I docs/content-plan/scripts/measure_pages.py .next/server/app --only /that-url/`. Compare the numbers with the gate table. If a gate fails, send the agent back to fix it.
5. **Have a second reader do the manual read** (playbook §9). This is a human, or a second agent that did not write the page.
6. **Publish the page** (`data/pages.json` → `published`). Request indexing in Search Console.
7. **Every month:** refresh the OGRA price in `data/prices.json` and run the Search Console loop (fix plan, Phase 5).
8. **Apply for AdSense** when the Phase 4 checklist is complete and about 30+ pages have been indexed for 3–4 weeks.

## Suggested rewrite order (highest value first)

1. `/lpg-price-per-kg-in-pakistan/`
2. The 9 industry pages
3. The 8 service pages
4. The 6 province hubs: rewrite, or merge into `/delivery-areas/`
5. The city pages, de-templated one per week (largest cities first)
6. The thin cities (Murree, Skardu, Abbottabad, Muzaffarabad)
7. The project pages, once the owner sends real data
