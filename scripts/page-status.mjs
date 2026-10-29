#!/usr/bin/env node
// Page registry helper. data/pages.json decides which pages may be indexed and listed in the sitemap.
//
//   node scripts/page-status.mjs list [draft|review|approved|published]
//   node scripts/page-status.mjs set <path-or-page-id> <draft|review|approved|published>
//
// Ladder: draft -> review -> approved -> published. You can go back down at any time (to pull a page).
// Moving up needs one step at a time, so a page cannot jump from "review" to "published" without
// the "approved" step (Step 22.3: the human approval is its own decision). Unbuilt pages stay at draft.
// A page that is "published" here still needs its data gates (verified price, city override,
// project, safety sign-off) to be open before it becomes indexable; the build enforces both.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "pages.json");
const LADDER = ["draft", "review", "approved", "published"];
const pages = JSON.parse(fs.readFileSync(file, "utf8"));
const [cmd, a, b] = process.argv.slice(2);

const find = (key) => Object.entries(pages).find(([p, v]) => p === key || p === `/${key.replace(/^\/|\/$/g, "")}/` || v.id === key.toUpperCase());

if (cmd === "list") {
  const rows = Object.entries(pages)
    .filter(([, v]) => !a || v.status === a)
    .sort((x, y) => (x[1].id || "").localeCompare(y[1].id || ""));
  for (const [p, v] of rows) console.log(`${(v.id || "").padEnd(8)} ${v.status.padEnd(10)} ${v.built ? "built  " : "unbuilt"} ${p}`);
  const tally = Object.fromEntries(LADDER.map((s) => [s, Object.values(pages).filter((v) => v.status === s).length]));
  console.log(`\n${JSON.stringify(tally)}`);
} else if (cmd === "set" && a && LADDER.includes(b)) {
  const hit = find(a);
  if (!hit) {
    console.error(`No page matches "${a}". Use a path like /lpg-safety/ or an id like SF-001.`);
    process.exit(1);
  }
  const [p, v] = hit;
  const from = LADDER.indexOf(v.status);
  const to = LADDER.indexOf(b);
  if (!v.built && to > 0) {
    console.error(`${p} is not built; it cannot leave "draft".`);
    process.exit(1);
  }
  if (to - from > 1) {
    console.error(`${p} is "${v.status}". Move one step at a time: next is "${LADDER[from + 1]}".`);
    process.exit(1);
  }
  v.status = b;
  if (b === "published") v.lastmod = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(file, JSON.stringify(pages, null, 2) + "\n", "utf8");
  console.log(`${v.id} ${p}: ${LADDER[from]} -> ${b}${v.lastmod && b === "published" ? ` (lastmod ${v.lastmod})` : ""}`);
} else {
  console.log("usage:\n  node scripts/page-status.mjs list [status]\n  node scripts/page-status.mjs set <path-or-id> <draft|review|approved|published>");
  process.exit(cmd ? 1 : 0);
}
