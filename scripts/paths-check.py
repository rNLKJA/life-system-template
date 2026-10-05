#!/usr/bin/env python3
"""paths-check.py: every folder or file a skill, prompt or instruction file names must exist.

Skills, prompts and AGENTS.md files name places as paths relative to the workspace root,
the folder that holds AGENTS.md and .agents/skills/. When a folder moves, an old path left
in a skill sends every later analysis to the wrong place. This script finds those paths.

    python3 scripts/paths-check.py                  # skills, live AGENTS.md files, templates
    python3 scripts/paths-check.py prompt.md ...    # also these files (scheduled-task prompts)
    python3 scripts/paths-check.py --skills-dir DIR # check another skills tree, such as installed copies
    python3 scripts/paths-check.py --quiet          # the summary line only

What counts as a path: a `code span`, a Markdown link target or a [[wikilink]] with at least
one inner "/" that starts at a top-level name of the workspace, at ~/Documents, or inside the
skill's own folder (references/, assets/). Placeholders such as <Area>, {{title}}, YYYY-MM-DD
or * stand for any name, so only the fixed part before the first one must exist; <a|b> and
{a,b} are expanded. A file inside a template folder may not exist yet, so only its folder is
checked. A line containing "paths-check: ignore" is skipped (history notes that cite old
paths). Exit status 1 when anything is missing.
"""
from __future__ import annotations

import argparse
import itertools
import os
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
try:  # folder names come from workspace.json where the workspace has one (life-system-template)
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from workspace import ARCHIVE, PROJECT_TEMPLATE, SCRATCH, TEMPLATES
except ImportError:
    ARCHIVE, SCRATCH, TEMPLATES, PROJECT_TEMPLATE = "Archive", "Scratch", "Resources/templates", "Resources/project-template"
SKIP_DIRS = {SCRATCH, ARCHIVE, "External", "node_modules", ".venv", "venv", "__pycache__"}
PKG_MARKERS = (".git", "package.json", "pyproject.toml", "Cargo.toml")
TEMPLATE_DIRS = (TEMPLATES, PROJECT_TEMPLATE)
EXT = re.compile(r"\.(md|py|sh|json|base|toml|ya?ml|csv|tsv|xlsx|docx|pdf|txt|html|plist|canvas)$", re.I)
SPAN = re.compile(r"`([^`\n]+)`")
MDLINK = re.compile(r"\]\(\s*<?([^)>\s]+)>?\s*\)")
WIKI = re.compile(r"\[\[([^\]|#^]+)")
PLACEHOLDER = re.compile(r"<[^<>]+>|\{\{[^{}]+\}\}|\bY{4}\b|\bMM\b|\bDD\b|\bNN\b|\bvNN\b|\[[^\]]*\]|\*|…|\.\.\.|\bHH\b")
COMMAND = re.compile(r"^(?:python3?|bash|sh|zsh|node|cat|ls|cd|open|code)\s+")
IGNORE_MARK = "paths-check: ignore"
HISTORY_FILES = {"CHANGELOG.md", "LOG.md", "ARCHIVE.md", "CONVERSATION-LOG.md", "VERSION.md"}  # they describe the past
HISTORY_WORDS = re.compile(r"\b(retired|formerly|legacy|never recreate|old path|used to be|was renamed|moved out|pre-20\d\d)\b", re.I)


def live_files(root: Path):
    """Live AGENTS.md files: not in dot-folders, Scratch, Archive, External or nested repositories."""
    for dp, dn, fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel != "." and any(os.path.exists(os.path.join(dp, m)) for m in PKG_MARKERS):
            dn[:] = []
            continue
        dn[:] = [d for d in dn if not d.startswith(".") and not (rel == "." and d in SKIP_DIRS) and d not in SKIP_DIRS]
        if "AGENTS.md" in fn:
            yield Path(dp) / "AGENTS.md"


def sources(root: Path, skills_dir: Path | None, extra: list[str]):
    sk = skills_dir or root / ".agents" / "skills"
    for skill in sorted(p for p in sk.iterdir() if p.is_dir()) if sk.is_dir() else []:
        for f in sorted(skill.rglob("*.md")):
            if not any(part.startswith(".") or part in ("node_modules", "tests", "examples") for part in f.relative_to(skill).parts):
                yield f, skill
    if skills_dir is None:
        for f in live_files(root):
            yield f, None
        for t in TEMPLATE_DIRS:
            for f in sorted((root / t).rglob("*.md")) if (root / t).is_dir() else []:
                yield f, None
    for e in extra:
        yield Path(e).resolve(), None


def expand(text: str) -> list[str]:
    """<a|b|c> and {a,b} alternatives into separate paths (placeholders like <Area> stay)."""
    parts = re.split(r"(<[^<>]*\|[^<>]*>|\{[^{}]*,[^{}]*\})", text)
    choices = []
    for p in parts:
        if re.fullmatch(r"<[^<>]*\|[^<>]*>", p):
            choices.append(p[1:-1].split("|"))
        elif re.fullmatch(r"\{[^{}]*,[^{}]*\}", p):
            choices.append(p[1:-1].split(","))
        else:
            choices.append([p])
    return ["".join(c) for c in itertools.product(*choices)][:12]


def clean(raw: str) -> str | None:
    s = unquote(raw.strip().strip("'\""))
    s = COMMAND.sub("", s)
    s = re.split(r"\s+-{1,2}[A-Za-z]|\s+[<>|]\s|\s+&&\s", s)[0].strip()  # drop options and pipes
    s = s.split("#", 1)[0] if "#" in s[1:] else s  # a link's #anchor is not part of the path
    s = s.rstrip(".,;:)")
    m = re.match(r"^(.+?\.(?:md|py|sh|json|base|toml|ya?ml|csv|txt|plist))(?=\s)", s)
    if m:
        s = m.group(1)  # `scripts/x.py references/y.md` names the script first
    if s.startswith("/") and f"/{ROOT.name}/" in s:
        s = s.split(f"/{ROOT.name}/", 1)[1]  # /Users/<you>/Documents/<root>/x → x
    if not s or "://" in s or s.startswith(("/", "#", "-", "$", "@")) or "\n" in s:
        return None
    if s.startswith("~/") and not s.startswith("~/Documents/"):
        return None  # outside the workspace (dotfiles, ~/Developer): not ours to check
    return s


def path_like(s: str, top: set[str], skill: Path | None) -> bool:
    body = s[len("~/Documents/"):] if s.startswith("~/Documents/") else s
    inner = body.rstrip("/")
    if "/" not in inner or " / " in inner or re.search(r"\s(and|or)\s", inner):
        return False
    first = inner.split("/")[0]
    if s.startswith("~/Documents/") or first in top or first.lower() in {t.lower() for t in top}:
        return True
    if skill and (skill / first).exists():
        return True  # references/x.md, assets/fonts/, scripts/x.py inside the skill
    if re.match(r"^\d{2}_", first):
        return True  # number-prefixed folders were retired; catch them
    return bool(EXT.search(inner)) and not re.search(r"[(){}=,;]", inner) and len(inner.split("/")) <= 8 and first[:1].isupper()


def exists_ci(base: Path, rel: str) -> bool:
    """os.path.lexists, tolerant of case like macOS, and of a trailing slash."""
    p = base
    for part in [x for x in rel.split("/") if x not in ("", ".")]:
        if part == "..":
            p = p.parent
            continue
        q = p / part
        if os.path.islink(q) and not os.path.exists(q):
            return True  # an external drive that is not mounted here: cannot check past the link
        if os.path.lexists(q):
            p = q
            continue
        try:
            hit = next((c for c in os.listdir(p) if c.lower() == part.lower()), None)
        except OSError:
            return False
        if hit is None:
            return False
        p = p / hit
    return True


def check(s: str, src: Path, skill: Path | None, root: Path, in_template: bool) -> str | None:
    """None when the path resolves; otherwise the part that is missing."""
    bases = [src.parent] + ([skill] if skill else []) + [root]
    if s.startswith("~/Documents/"):
        s, bases = s[len("~/Documents/"):], [root.parent]
    for alt in expand(s):  # every alternative must exist: <market|technical> names two folders
        m = PLACEHOLDER.search(alt)
        target = alt[: m.start()] if m else alt
        if m:
            target = target[: target.rfind("/") + 1] if "/" in target else ""
            if not target.strip("/"):
                continue  # nothing fixed to check
        elif in_template and not alt.endswith("/"):
            target = alt[: alt.rfind("/") + 1] or alt  # the file is created from the template later
        if not any(exists_ci(b, target) for b in bases):
            return target.rstrip("/") or alt
    return None


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("files", nargs="*", help="extra files to check, such as scheduled-task prompts")
    ap.add_argument("--skills-dir", help="check this skills tree (for example installed copies) against the workspace")
    ap.add_argument("--quiet", action="store_true", help="print the summary line only")
    a = ap.parse_args()
    root = ROOT
    top = {p.name for p in root.iterdir()}
    skills_dir = Path(a.skills_dir).resolve() if a.skills_dir else None
    seen, missing, n_paths, n_files = set(), [], 0, 0
    for src, skill in sources(root, skills_dir, a.files):
        if src in seen or not src.is_file() or src.name in HISTORY_FILES:
            continue
        seen.add(src)
        n_files += 1
        try:
            rel_src = src.relative_to(root).as_posix()
        except ValueError:
            rel_src = str(src)
        in_template = any(rel_src.startswith(t + "/") for t in TEMPLATE_DIRS)
        fence = False
        for no, line in enumerate(src.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
            if line.lstrip().startswith(("```", "~~~")):
                fence = not fence
            if IGNORE_MARK in line or HISTORY_WORDS.search(line):
                continue  # a line about where things used to be is not using the old path
            found = SPAN.findall(line) + MDLINK.findall(line)
            found += [w if EXT.search(w) else w + ".md" for w in (x.rstrip("\\").strip() for x in WIKI.findall(line)) if "/" in w]
            found += re.findall(r"(?<![\w/.-])(\d{2}_[A-Za-z][\w-]*/[^\s|)\]`'\"]*)", line)  # retired number-prefixed folders, even in prose
            if fence:
                found = [f for f in found if "/" in f]  # inside code blocks, only explicit paths
                found += re.findall(r"(?:^|\s|\")((?:~/Documents/|scripts/|Resources/|Areas/|Archive/)[^\s\"']+)", line)
            for raw in found:
                s = clean(raw)
                if not s or not path_like(s, top, skill):
                    continue
                n_paths += 1
                gap = check(s, src, skill, root, in_template)
                if gap:
                    missing.append((rel_src, no, s, gap))
    if not a.quiet:
        for rel_src, no, s, gap in missing:
            print(f"  {rel_src}:{no}  `{s}`  (missing: {gap})")
    print(f"paths-check: {n_paths} paths in {n_files} files; {len(missing)} missing")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
