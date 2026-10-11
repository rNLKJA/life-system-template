#!/usr/bin/env python3
"""new-area.py: add an area (an ongoing responsibility) in one step.

    python3 scripts/new-area.py "Pets"             # Areas/Pets/Pets.md from the area template
    python3 scripts/new-area.py "Pets" --records   # also Areas/Pets/Records/ for private papers

Everything else follows on its own: Records/ is gitignored by the **/Records/ rule,
vault-link.py lists the area in Areas.md and gives it an index, and check.py checks its
hub. Run python3 scripts/vault-link.py afterwards to wire it in now.
"""
from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from workspace import AREAS, ROOT, TEMPLATES  # noqa: E402

BAD = re.compile(r'[\[\]#^|<>:"/\\?*]')  # Obsidian link syntax and characters Windows cannot store


def valid(name: str) -> bool:
    return bool(name) and not BAD.search(name) and not name.endswith((".", " "))


def create(name: str, records: bool) -> Path:
    areas = ROOT / AREAS
    if areas.is_dir() and any(p.name.lower() == name.lower() for p in areas.iterdir()):
        raise FileExistsError(f"{AREAS}/{name} already exists")
    text = (ROOT / TEMPLATES / "area.md").read_text(encoding="utf-8")
    text = text.replace("{{title}}", name).replace("{{date:YYYY-MM-DD}}", dt.date.today().isoformat())
    d = areas / name
    d.mkdir(parents=True)
    (d / f"{name}.md").write_text(text, encoding="utf-8")
    if records:
        (d / "Records").mkdir()
    return d


def main() -> int:
    ap = argparse.ArgumentParser(description=f"Add an area under {AREAS}/.")
    ap.add_argument("name", help='area name, e.g. "Pets" or "Home & Car"')
    ap.add_argument("--records", action="store_true", help="also create Records/ for private papers")
    a = ap.parse_args()
    name = a.name.strip()
    if not valid(name):
        print(f"'{name}': use letters, digits, spaces, hyphens, parentheses or & (AGENTS.md §10)", file=sys.stderr)
        return 2
    try:
        create(name, a.records)
    except FileExistsError as e:
        print(e, file=sys.stderr)
        return 1
    print(f"created {AREAS}/{name}/{name}.md" + (" and Records/" if a.records else "") +
          "; now run: python3 scripts/vault-link.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
