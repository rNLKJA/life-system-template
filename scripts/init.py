#!/usr/bin/env python3
"""init.py: make this template yours. Run it once, right after cloning.

    python3 scripts/init.py          # asks a few questions
    python3 scripts/init.py --yes --owner "Alex" --timezone Europe/London --spelling British \\
        --areas "Career & Work,Finance,Home,Health" [--no-roles] [--rename projects="Project Desk"]

What it does, in order:
  1. Fills the placeholders ({{OWNER}}, {{TIMEZONE}}, {{SPELLING}}, ...) in AGENTS.md,
     MEMORY.md, the skills and the role homes. Templates keep their own placeholders.
  2. Renames top-level folders you asked to rename, and every path that names them.
  3. Writes workspace.json, which the scripts read for folder names.
  4. Creates your areas, each with a hub note and a private Records/ folder.
  5. Moves the two example roles (Donna and Ray) to Scratch/ if you do not want them.
  6. Creates the folders git does not carry (Scratch/, the intake tray, Archive/Records/).
  7. Writes the first LOG.md line.

Then: python3 scripts/vault-link.py && python3 scripts/check.py
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SPELLING = {
    "Australian": "organise, colour, analyse, centre",
    "British": "organise, colour, analyse, centre",
    "Canadian": "organize, colour, analyze, centre",
    "American": "organize, color, analyze, center",
}
DEFAULT_AREAS = "Career & Work, Finance, Home, Health, Relationships, Learning"
TEXT_EXT = {".md", ".json", ".base", ".sh", ".yml", ".yaml", ".txt"}
TEXT_NAMES = {".gitignore", ".ignore"}
SKIP_PARTS = {".git", "node_modules", "__pycache__"}
KEYS = ("areas", "projects", "hq", "archive", "knowledge", "resources", "scratch")
BAD = re.compile(r'[\[\]#^|<>:"/\\?*]')
COLOURS = {"areas": 1752220, "projects": 3447003, "hq": 3066993, "knowledge": 10181046, "resources": 15844367, "archive": 9807270}


def text_files(skip_dirs=()):
    for dp, dn, fn in os.walk(ROOT):
        rel = os.path.relpath(dp, ROOT).replace(os.sep, "/")
        dn[:] = [d for d in dn if d not in SKIP_PARTS and not any(
            (f"{rel}/{d}" if rel != "." else d) == s or (f"{rel}/{d}" if rel != "." else d).startswith(s + "/") for s in skip_dirs)]
        for f in fn:
            p = Path(dp) / f
            if (p.suffix in TEXT_EXT or f in TEXT_NAMES) and not p.is_symlink():
                yield p


def ask(prompt: str, default: str) -> str:
    v = input(f"{prompt} [{default}]: ").strip()
    return v or default


def tz_ok(tz: str) -> bool:
    try:
        from zoneinfo import ZoneInfo
        ZoneInfo(tz)
        return True
    except Exception:
        return False


def local_tz() -> str:
    """This machine's IANA time zone, from /etc/localtime (macOS and Linux), or UTC."""
    try:
        target = os.path.realpath("/etc/localtime")
        if "zoneinfo/" in target:
            tz = target.split("zoneinfo/", 1)[1]
            return tz if tz_ok(tz) else "UTC"
    except OSError:
        pass
    return "UTC"


def spelling_for(tz: str) -> str:
    if tz.startswith("Australia/"):
        return "Australian"
    if tz in ("America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax"):
        return "Canadian"
    return "American" if tz.startswith(("America/", "US/", "Pacific/Honolulu")) else "British"


def now_stamp(tz: str) -> str:
    from zoneinfo import ZoneInfo
    t = dt.datetime.now(ZoneInfo(tz))
    return t.strftime("%Y-%m-%d %H:%M") + f" [{t.tzname()}]"


def js_escape(s: str) -> str:
    """Escape for a JavaScript regex inside an Obsidian query (Python's re.escape also escapes spaces)."""
    return re.sub(r"([.^$*+?()\[\]{}|\\/])", r"\\\1", s)


def graph_colours(folders: dict) -> list:
    return [{"query": f"path:/^{js_escape(folders[k])}\\//", "color": {"a": 1, "rgb": c}} for k, c in COLOURS.items()]


def rename_folder(key: str, old: str, new: str, folders: dict) -> None:
    src, dst = ROOT / old, ROOT / new
    if dst.exists():
        raise SystemExit(f"cannot rename {old}/ to {new}/: {new}/ already exists")
    src.rename(dst)
    if (dst / f"{old}.md").exists():
        (dst / f"{old}.md").rename(dst / f"{new}.md")
    pat_note = re.compile(r"(?<![\w&-])" + re.escape(f"{old}/{old}") + r"(?=[\]|#.\"'`)\s,;]|$)")
    pat_path = re.compile(r"(?<![\w&/-])" + re.escape(old) + r"(?=/)")
    pat_quoted = re.compile(r'(?<=")' + re.escape(old) + r'(?=")')
    for p in text_files():
        if p.name in ("workspace.json",):
            continue
        s = p.read_text(encoding="utf-8")
        t = pat_path.sub(new, pat_note.sub(f"{new}/{new}", s))
        if p.suffix == ".base":
            t = pat_quoted.sub(new, t)
        if t != s:
            p.write_text(t, encoding="utf-8")
    folders[key] = new


def main() -> int:
    ap = argparse.ArgumentParser(description="Make this template yours (run once).")
    ap.add_argument("--yes", action="store_true", help="no questions; use the flags and defaults")
    ap.add_argument("--owner")
    ap.add_argument("--timezone", help="IANA name, e.g. Australia/Adelaide or Europe/London")
    ap.add_argument("--spelling", choices=sorted(SPELLING))
    ap.add_argument("--language", default="English", help="the language agents reply in")
    ap.add_argument("--areas", help=f'comma-separated, default "{DEFAULT_AREAS}"')
    ap.add_argument("--no-roles", action="store_true", help="leave out the Donna and Ray example roles")
    ap.add_argument("--rename", action="append", default=[], metavar='KEY="New name"',
                    help=f"rename a top-level folder; keys: {', '.join(KEYS)}")
    a = ap.parse_args()

    if "{{OWNER}}" not in (ROOT / "AGENTS.md").read_text(encoding="utf-8"):
        print("This workspace is already initialised (AGENTS.md has no {{OWNER}} placeholder).", file=sys.stderr)
        return 1
    if not a.yes and not sys.stdin.isatty():
        print("No terminal to ask questions on: pass --yes with --owner, --timezone and --spelling.", file=sys.stderr)
        return 2
    owner = a.owner or ("" if a.yes else ask("Your name (agents use it)", "Me"))
    tz = a.timezone or (local_tz() if a.yes else ask("Your time zone (IANA name)", local_tz()))
    while not tz_ok(tz):
        if a.yes:
            print(f"unknown time zone '{tz}'", file=sys.stderr)
            return 2
        tz = ask("Unknown time zone. Try again, e.g. Europe/London", "UTC")
    spelling = a.spelling or (spelling_for(tz) if a.yes else ask(f"Spelling ({', '.join(SPELLING)})", spelling_for(tz)))
    if spelling not in SPELLING:
        print(f"spelling must be one of {', '.join(SPELLING)}", file=sys.stderr)
        return 2
    areas_raw = a.areas or (DEFAULT_AREAS if a.yes else ask("Your areas (ongoing responsibilities), comma-separated", DEFAULT_AREAS))
    areas = [x.strip() for x in areas_raw.split(",") if x.strip()]
    roles = not a.no_roles if (a.yes or a.no_roles) else ask("Include the example roles Donna and Ray? (y/n)", "y").lower().startswith("y")
    owner = owner or "Me"
    for x in areas:
        if BAD.search(x) or x.endswith((".", " ")):
            print(f"area '{x}': use letters, digits, spaces, hyphens, parentheses or &", file=sys.stderr)
            return 2

    # 1. placeholders (templates keep theirs: new-area and new-project fill them later)
    values = {"{{OWNER}}": owner, "{{TIMEZONE}}": tz, "{{SPELLING}}": spelling,
              "{{SPELLING_EXAMPLES}}": SPELLING[spelling], "{{LANGUAGE}}": a.language,
              "{{TODAY}}": dt.date.today().isoformat()}
    cfg = json.loads((ROOT / "workspace.json").read_text(encoding="utf-8"))
    folders = cfg["folders"]
    keep_dirs = (f"{folders['resources']}/templates", f"{folders['resources']}/project-template", folders["scratch"], "scripts")
    for p in text_files(skip_dirs=keep_dirs):
        s = p.read_text(encoding="utf-8")
        t = s
        for k, v in values.items():
            t = t.replace(k, v)
        if t != s:
            p.write_text(t, encoding="utf-8")

    # 2. renames
    for item in a.rename:
        key, _, new = item.partition("=")
        key, new = key.strip().lower(), new.strip().strip('"').strip("'")
        if key not in KEYS or not new or BAD.search(new):
            print(f"--rename {item}: use KEY=\"New name\" with a key from {', '.join(KEYS)}", file=sys.stderr)
            return 2
        if folders[key] != new:
            rename_folder(key, folders[key], new, folders)
            print(f"renamed {key}: {new}/")

    # 3. workspace.json and the graph colours that name the folders
    cfg.update({"owner": owner, "timezone": tz, "spelling": spelling, "language": a.language, "folders": folders})
    (ROOT / "workspace.json").write_text(json.dumps(cfg, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    gpath = ROOT / ".obsidian" / "graph.json"
    if gpath.exists():
        g = json.loads(gpath.read_text(encoding="utf-8"))
        g["colorGroups"] = graph_colours(folders)
        g["search"] = g.get("search", "").replace("(Scratch|External)", f"({js_escape(folders['scratch'])}|External)")
        gpath.write_text(json.dumps(g, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # 4. areas (new-area.py reads workspace.json, so import it after the write)
    sys.path.insert(0, str(HERE))
    import importlib
    import workspace
    importlib.reload(workspace)
    new_area = importlib.import_module("new-area")
    for x in areas:
        try:
            new_area.create(x, records=True)
            print(f"area: {folders['areas']}/{x}/")
        except FileExistsError:
            pass

    # 5. roles
    if not roles:
        park = ROOT / folders["scratch"] / "unused-roles"
        park.mkdir(parents=True, exist_ok=True)
        for p in (ROOT / ".agents/skills/donna", ROOT / ".agents/skills/ray",
                  ROOT / folders["hq"] / "Donna", ROOT / folders["hq"] / "Ray"):
            if p.exists():
                shutil.move(str(p), str(park / p.name))
        agents = ROOT / "AGENTS.md"
        s = agents.read_text(encoding="utf-8")
        s = re.sub(r"<!-- roles:start -->.*?<!-- roles:end -->\n?", "", s, flags=re.S)
        agents.write_text(s, encoding="utf-8")
        print("roles: left out (moved to Scratch/unused-roles/)")

    # 6. folders git does not carry
    for d in (f"{folders['scratch']}/plans", f"{folders['hq']}/Intake", f"{folders['archive']}/Records", f"{folders['archive']}/Projects"):
        (ROOT / d).mkdir(parents=True, exist_ok=True)

    # 7. first log line
    with open(ROOT / "LOG.md", "a", encoding="utf-8") as f:
        f.write(f"{now_stamp(tz)} Workspace created from life-system-template by scripts/init.py: owner {owner}, "
                f"areas {', '.join(areas)}, roles {'on' if roles else 'off'}.\n")
    print("\nDone. Next:\n  python3 scripts/vault-link.py\n  python3 scripts/check.py\n"
          "Then open this folder as a vault in Obsidian, and start an agent session in it.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
