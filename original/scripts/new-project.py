#!/usr/bin/env python3
"""new-project.py: start a time-bound project from the project kit in one step.

    python3 scripts/new-project.py "Kitchen renovation" --area "Home"
    python3 scripts/new-project.py "Tax return 2026" --area Finance --summary "Lodge by 31 Oct" --next "Download the PAYG summary"

Creates Projects/<Name>/ with its hub note (goal, scope and the area tag), TASKS.md,
MEMORY.md and LOG.md from Resources/project-template/, and adds a row to
Projects/MEMORY.md, the one table of live projects. Run vault-link.py afterwards.
"""
from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from workspace import AREAS, CFG, HQ, PROJECT_TEMPLATE, PROJECTS, ROOT  # noqa: E402

BAD = re.compile(r'[\[\]#^|<>:"/\\?*]')
KIT = {"project-hub.md": "{name}.md", "TASKS.md": "TASKS.md", "MEMORY.md": "MEMORY.md", "LOG.md": "LOG.md"}


def now_stamp() -> str:
    try:
        from zoneinfo import ZoneInfo
        t = dt.datetime.now(ZoneInfo(CFG.get("timezone") or "UTC"))
    except Exception:
        t = dt.datetime.now().astimezone()
    return t.strftime("%Y-%m-%d %H:%M") + f" [{t.tzname()}]"


def area_link(area: str | None) -> str:
    if not area:
        return f'"[[{HQ}/{HQ}|{HQ}]]"'  # a project that serves the system itself
    base = ROOT / AREAS
    hit = next((p.name for p in base.iterdir() if p.is_dir() and p.name.lower() == area.lower()), None) if base.is_dir() else None
    if not hit:
        names = ", ".join(sorted(p.name for p in base.iterdir() if p.is_dir())) if base.is_dir() else "none"
        raise SystemExit(f"no area called '{area}' (areas: {names}); add it with scripts/new-area.py first")
    return f'"[[{AREAS}/{hit}/{hit}|{hit}]]"'


def main() -> int:
    ap = argparse.ArgumentParser(description=f"Start a project under {PROJECTS}/.")
    ap.add_argument("name")
    ap.add_argument("--area", help="the area this project serves (omit for work on the system itself)")
    ap.add_argument("--summary", default="", help="one line: what it is and who it is for")
    ap.add_argument("--next", default="", help="the first concrete next action")
    a = ap.parse_args()
    name = a.name.strip()
    if not name or BAD.search(name) or name.endswith((".", " ")):
        print(f"'{name}': use letters, digits, spaces, hyphens, parentheses or &", file=sys.stderr)
        return 2
    d = ROOT / PROJECTS / name
    if d.exists():
        print(f"{PROJECTS}/{name} already exists", file=sys.stderr)
        return 1
    link = area_link(a.area)
    today = dt.date.today().isoformat()
    values = {"{{PROJECT}}": name, "{{TODAY}}": today, "{{NOW}}": now_stamp(), "{{AREA_LINK}}": link,
              "{{SUMMARY}}": a.summary or "One line: what this project is and who it is for.",
              "{{NEXT}}": a.next or "Decide the first concrete next action."}
    d.mkdir(parents=True)
    for src, dst in KIT.items():
        text = (ROOT / PROJECT_TEMPLATE / src).read_text(encoding="utf-8")
        for k, v in values.items():
            text = text.replace(k, v)
        (d / dst.format(name=name)).write_text(text, encoding="utf-8")
    table = ROOT / PROJECTS / "MEMORY.md"
    row = f"| [[{PROJECTS}/{name}/{name}\\|{name}]] | Active | {values['{{SUMMARY}}']} | {values['{{NEXT}}']} | {today} |"
    lines = table.read_text(encoding="utf-8").splitlines() if table.exists() else []
    at = max((i for i, l in enumerate(lines) if l.startswith("|")), default=None)
    if at is None:
        lines += ["", "| Project | Status | Summary | Next action | Updated |", "|---|---|---|---|---|", row]
    else:
        lines.insert(at + 1, row)
    table.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"created {PROJECTS}/{name}/ (hub, TASKS.md, MEMORY.md, LOG.md) and a row in {PROJECTS}/MEMORY.md; "
          "now run: python3 scripts/vault-link.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
