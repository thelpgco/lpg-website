"""Restore lib/media.ts from agent transcript Write payload, then neutralize illustrativeCaption."""
from __future__ import annotations

import json
import re
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Hp\.cursor\projects\d-SparePartsHub-App\agent-transcripts"
    r"\7cd00725-ae57-4bdc-a492-c49ab18ff9d0\7cd00725-ae57-4bdc-a492-c49ab18ff9d0.jsonl"
)
OUT = Path(__file__).resolve().parents[3] / "lib" / "media.ts"

NEW_FN = '''export function illustrativeCaption(_src: string, caption?: string, _demo = false): string | undefined {
  if (!caption) return undefined;
  return caption.replace(/\\s*\\(illustrative\\)\\.?/gi, "").trim() || undefined;
}'''


def main() -> None:
    best = None
    for line in TRANSCRIPT.open(encoding="utf-8", errors="replace"):
        if "media.ts" not in line or "Write" not in line:
            continue
        try:
            o = json.loads(line)
        except Exception:
            continue
        content = o.get("message", {}).get("content")
        if not isinstance(content, list):
            continue
        for c in content:
            if c.get("type") != "tool_use" or c.get("name") != "Write":
                continue
            inp = c.get("input") or {}
            path = (inp.get("path") or "").replace("\\", "/")
            if not path.endswith("lpg-website/lib/media.ts"):
                continue
            contents = inp.get("contents") or ""
            if "export const media" in contents and len(contents) > 5000:
                best = contents
                print("candidate", len(contents))
    if not best:
        raise SystemExit("media.ts Write payload not found in transcript")

    if "export function illustrativeCaption" in best:
        best = re.sub(
            r"export function illustrativeCaption\([\s\S]*?\n\}",
            NEW_FN,
            best,
            count=1,
        )
    else:
        best = best.rstrip() + "\n\n" + NEW_FN + "\n"

    # Soften any caption that hardcodes (illustrative) in the catalog itself
    best = re.sub(r" \(illustrative\)", "", best)

    OUT.write_text(best, encoding="utf-8")
    print("wrote", OUT, "lines", best.count("\n") + 1)


if __name__ == "__main__":
    main()
