"""folder_index.py: the file inventory behind every folder index.

vault-link.py imports this to write each folder note's generated "In this folder"
section: subfolders with counts, then a table of files (date, name, latest version,
type, size, modified) with all versions of one document collapsed into one row.

Rules (AGENTS.md §10; zones come from workspace.json through workspace.py):
  - every folder gets an index, down to a dated group (a folder named YYYY-MM… or
    YYYY-MM-DD…); a dated group gets one index for its whole subtree
  - nothing inside code repositories, dependency folders, dot-folders, Scratch,
    External, scripts or the frozen template folders
  - a tracked index never names a gitignored file: it says how many it leaves out
  - indexes in INDEX_ONLY zones are the only notes vault-link writes there
  - graph-light: file rows are plain text, never links, so an index adds
    no edge per file to Obsidian's graph; at most MAX_ROWS rows; a live Bases table
    under the rows lists every file and opens it on click (Bases results are not links)
  - junk (.DS_Store and its dated copies, Thumbs.db, desktop.ini) is never listed or counted
"""
from __future__ import annotations

import datetime as dt
import os
import re
import subprocess
from pathlib import Path

from workspace import CODE_ROOTS, INDEX_ONLY, NO_INDEX, TOP_SKIP

SKIP_DIRS = {"node_modules", ".venv", "venv", "__pycache__", ".pytest_cache", ".mypy_cache", ".ruff_cache",
             "target", "Pods", ".next", ".turbo", ".expo"}
PKG_MARKERS = (".git", "package.json", "pyproject.toml", "Cargo.toml", "setup.py", "pytest.ini", "requirements.txt", "go.mod")
DATED = re.compile(r"^\[?\d{4}-\d{2}(?:-\d{2})?\]?(?:[ _].*)?$")  # brackets tolerated, never written
DATE_P = re.compile(r"^\[?(\d{4}-\d{2}(?:-\d{2})?)\]?(?:[ _-]+|$)")
VER_P = re.compile(r"(?:^|[ _-])v(\d{1,3})(?:[ _-]+(approved|signed|final))?$", re.I)
LEG_P = re.compile(r"(?:\s*-\s*(draft|approved|final)|\s*\((signed|final|draft)\))$", re.I)
MAX_ROWS = 50  # text rows per index; the Bases table below them lists the rest
JUNK = re.compile(r"(?:^|[ _-])\.DS_Store$|^(?:Thumbs\.db|desktop\.ini)$", re.I)
INERT = re.compile(r"([\\|#\[\]*<>$^`])")  # characters Obsidian would read as links, tags or markup


def is_junk(name: str) -> bool:
    return bool(JUNK.search(name))


def inert(text: str) -> str:
    """Plain text for a table cell: no link, tag, emphasis or HTML can form."""
    return INERT.sub(r"\\\1", text)


def count(n: int, word: str) -> str:
    return f"{n} {word}" + ("" if n == 1 else "s")


def under(rel: str, prefixes) -> bool:
    return any(rel == p or rel.startswith(p + "/") for p in prefixes)


def inventory(root: Path) -> dict:
    """dir -> {"files": [(name, size, mtime)], "dirs": [...], "pkg": [...]} for the indexable tree."""
    inv = {}
    for dp, dn, fn in os.walk(root):
        rd = os.path.relpath(dp, root).replace(os.sep, "/")
        rd = "" if rd == "." else rd
        keep = []
        for d in sorted(dn):
            if d.startswith(".") or d in SKIP_DIRS or (not rd and d in TOP_SKIP) or os.path.islink(os.path.join(dp, d)):
                continue
            keep.append(d)
        pkg = [d for d in keep if any(os.path.exists(os.path.join(dp, d, m)) for m in PKG_MARKERS)
               or rd in CODE_ROOTS]  # every folder in Archive/Code is listed as one repository
        dn[:] = [d for d in keep if d not in pkg]
        files = []
        for f in sorted(fn):
            if f.startswith(".") or f.startswith("~$") or is_junk(f):
                continue
            p = os.path.join(dp, f)
            if os.path.islink(p):
                continue
            try:
                st = os.stat(p)
            except OSError:
                continue
            files.append((f, st.st_size, st.st_mtime))
        inv[rd] = {"files": files, "dirs": list(dn), "pkg": pkg}
    return inv


def is_dated(name: str) -> bool:
    return bool(DATED.match(name))


def folded(d: str) -> bool:
    """True when a strict ancestor of d is a dated group (d is covered by that group's index)."""
    parts = d.split("/")
    return any(is_dated(p) for p in parts[:-1])


def index_dirs(inv: dict) -> list[str]:
    """Folders that get an index: not folded into a dated group, not frozen, and not empty."""
    return [d for d in inv if d and not folded(d) and not under(d, NO_INDEX)
            and (inv[d]["files"] or inv[d]["dirs"] or inv[d]["pkg"])
            and not (len(inv[d]["files"]) == 1 and not inv[d]["dirs"] and not inv[d]["pkg"]
                     and inv[d]["files"][0][0].lower() == f"{d.rsplit('/', 1)[-1]}.md".lower())]


def folder_note_name(d: str, inv: dict) -> str:
    want = f"{d.rsplit('/', 1)[-1]}.md"
    hit = next((f for f, _, _ in inv.get(d, {}).get("files", []) if f.lower() == want.lower()), None)
    return f"{d}/{hit or want}"


def subtree_stats(inv: dict) -> dict:
    """dir -> (file count, newest mtime) over the whole subtree, folder notes excluded."""
    out = {}
    for d in sorted(inv, key=lambda x: -x.count("/") if x else 0):
        own = f"{d.rsplit('/', 1)[-1]}.md".lower() if d else "readme.md"
        n, newest = 0, 0.0
        for f, _, m in inv[d]["files"]:
            if f.lower() == own:
                continue
            n += 1
            newest = max(newest, m)
        for c in inv[d]["dirs"]:
            cn, cm = out.get(f"{d}/{c}" if d else c, (0, 0.0))
            n += cn
            newest = max(newest, cm)
        out[d] = (n, newest)
    return out


def private_set(root: Path, paths: list[str]) -> set[str] | None:
    """Paths git ignores. None when git is unavailable (callers then list nothing private-sensitive)."""
    try:
        r = subprocess.run(["git", "-c", "core.excludesFile=", "check-ignore", "--no-index", "-z", "--stdin"],
                           cwd=root, input="\0".join(paths).encode(), capture_output=True,
                           env={**os.environ, "GIT_OPTIONAL_LOCKS": "0"})
    except OSError:
        return None
    if r.returncode not in (0, 1):
        return None
    return set(r.stdout.decode().split("\0")) - {""}


def parse(name: str):
    stem, ext = os.path.splitext(name)
    m = DATE_P.match(stem)
    date = m.group(1) if m else ""
    rest = stem[m.end():] if m else stem
    ver, status = None, ""
    v = VER_P.search(rest)
    if v:
        ver, status, rest = int(v.group(1)), (v.group(2) or "").title(), rest[:v.start()]
    l = LEG_P.search(rest)
    if l:
        status, rest = status or (l.group(1) or l.group(2)).title(), rest[:l.start()]
    snake = bool(date) and " " not in rest  # archive style 2024-05-15_Jane_Doe_Resume reads as words
    title = (re.sub(r"_+", " ", rest) if snake else rest).strip(" -_") or stem
    return date, title, ver, status, ext.lstrip(".").lower()


def human(n: int) -> str:
    if n < 1000:
        return f"{n} B"
    if n < 1_000_000:
        return f"{n / 1000:.0f} KB"
    return f"{n / 1e6:.1f} MB"


def day(ts: float) -> str:
    return dt.date.fromtimestamp(ts).isoformat() if ts else ""


def rows(entries):
    """entries: [(rel, name, size, mtime)] -> collapsed table rows."""
    groups = {}
    for rel, name, size, mtime in entries:
        date, title, ver, status, ext = parse(name)
        g = groups.setdefault((date, title.lower()), {"date": date, "title": title, "files": []})
        g["files"].append((ver or 0, mtime, rel, size, status, ext))
    out = []
    for g in groups.values():
        files = sorted(g["files"])
        ver, mtime, rel, size, status, _ = files[-1]
        vers = sorted({f[0] for f in files if f[0]})
        version = (f"v{ver:02d}" + (f" {status}" if status else "")) if ver else status
        if len(vers) > 1:
            version += f" · {len(vers)} versions"
        out.append({"date": g["date"], "title": g["title"], "rel": rel, "version": version.strip(),
                    "types": ", ".join(sorted({f[5] for f in files if f[5]})), "size": human(size),
                    "modified": day(max(f[1] for f in files))})
    dated = sorted([r for r in out if r["date"]], key=lambda r: (r["date"], r["title"].lower()), reverse=True)
    undated = sorted([r for r in out if not r["date"]], key=lambda r: r["title"].lower())
    return dated + undated


def table(rs) -> list[str]:
    """Plain-text rows: an index names files but never links them, so the graph gains no edge per file."""
    lines = ["| Date | Name | Version | Type | Size | Modified |", "|---|---|---|---|---|---|"]
    for r in rs:
        lines.append(f"| {r['date']} | {inert(r['title'])} | {inert(r['version'])} "
                     f"| {inert(r['types'])} | {r['size']} | {r['modified']} |")
    return lines


def browse(d: str, subtree: bool, include_md: bool) -> list[str]:
    """A live Bases table of the folder's files (and its subfolders' for a dated group).

    Obsidian runs the query when the note is open: every file is one click away, the list
    is always current, and query results are not links, so the graph stays as it is.
    """
    lit = d.replace("\\", "\\\\").replace('"', '\\"')
    scope = f'file.inFolder("{lit}")' if subtree else f'file.folder == "{lit}"'
    conds = [scope] + ([] if include_md else ['file.ext != "md"'])
    cols = (["file.folder"] if subtree else []) + ["file.name", "file.mtime", "file.size"]
    sort = ([("file.folder", "ASC")] if subtree else []) + [("file.name", "DESC")]
    out = ["**Browse files** · live table, click a name to open it", "", "```base", "filters:", "  and:"]
    out += ["    - '" + c.replace("'", "''") + "'" for c in conds]
    out += ["views:", "  - type: table", "    name: Files", "    order:"] + [f"      - {c}" for c in cols]
    out += ["    sort:"]
    for p, o in sort:
        out += [f"      - property: {p}", f"        direction: {o}"]
    out += ["```", ""]
    return out


def render(d: str, inv: dict, stats: dict, private: set | None, index_private: bool, link,
           index_of, include_md: bool):
    """(head, folders, files) line lists for d's index; vault-link puts the notes between them."""
    info = inv[d]
    own = f"{d.rsplit('/', 1)[-1]}.md".lower()
    n_all, newest = stats[d]
    head = [f"**Updated** {day(newest) or 'never'} · {count(n_all, 'file')} in all · "
            f"{count(len(info['dirs']) + len(info['pkg']), 'folder')}", ""]
    folders, files_out = [], []
    hidden = 0

    def visible(rel):
        """A tracked index lists only files git may hold; gitignored ones are counted, never named."""
        nonlocal hidden
        if index_private:
            return True
        if private is None or rel in private:
            hidden += 1
            return False
        return True

    if info["dirs"] or info["pkg"]:
        folders += ["**Folders**", ""]
        for c in info["dirs"]:
            cd = f"{d}/{c}"
            cn, cm = stats.get(cd, (0, 0.0))
            target = index_of(cd)
            label = link(target, c) if target else inert(c)
            folders.append(f"- {label} · {count(cn, 'file')}" + (f" · last change {day(cm)}" if cm else ""))
        folders += [f"- {inert(p)} · code repository" for p in info["pkg"]]
        folders.append("")
    dated = is_dated(d.rsplit("/", 1)[-1])  # a dated group lists its whole subtree
    scope = sorted(x for x in inv if x == d or x.startswith(d + "/")) if dated else [d]
    sections, shown, listable, any_file = [], 0, 0, False
    for sd in scope:
        entries = [(f"{sd}/{f}", f, s, m) for f, s, m in inv[sd]["files"]
                   if not (sd == d and f.lower() == own) and (include_md or not f.endswith(".md"))]
        any_file = any_file or bool(entries)
        entries = [e for e in entries if visible(e[0])]
        if not entries:
            continue
        rs = rows(entries)
        listable += len(rs)
        take = rs[: max(0, MAX_ROWS - shown)]
        if take:
            shown += len(take)
            sections.append((sd[len(d) + 1:] if sd != d else "", take))
    if sections:
        files_out += ["**Files**", ""]
        for sub, rs in sections:
            if sub:
                files_out += [f"*{inert(sub)}*", ""]
            files_out += table(rs) + [""]
    if listable > shown:
        files_out += [f"Showing {shown} of {listable} documents. The live table below lists every file.", ""]
    if hidden:
        files_out += [f"{hidden} private file{'s' if hidden != 1 else ''} (gitignored) not named in this tracked index.", ""]
    if any_file:
        files_out += browse(d, dated, include_md)
    return head, folders, files_out
