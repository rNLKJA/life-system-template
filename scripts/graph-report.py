#!/usr/bin/env python3
"""graph-report.py: how big is Obsidian's graph of this vault, and what is in it?

Reads .obsidian/app.json (excluded files) and .obsidian/graph.json (the graph's search
filter and toggles), resolves every link the way Obsidian does (wikilinks, Markdown links,
links in properties), and counts the nodes and edges the global graph would draw.

    python3 scripts/graph-report.py                 # the graph as configured
    python3 scripts/graph-report.py --no-filter     # everything, to see what the filter saves
    python3 scripts/graph-report.py --filter "..."  # try another filter before saving it

It understands the filter terms this vault uses: -path:, -file: (plain text or /regex/,
case-insensitive like Obsidian) and -[property:value]. Other terms are reported and ignored.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
WIKI = re.compile(r"!?\[\[([^\]\|#\^]+)(?:[#\^][^\]\|]*)?(?:\|[^\]]*)?\]\]")
MDL = re.compile(r"(?<!!)\[[^\]\n]*\]\(\s*<?([^)>\s]+)>?\s*\)")
CODE = re.compile(r"```.*?```|~~~.*?~~~|`[^`\n]*`", re.S)
TERM = re.compile(r'(-?)(path|file):(/(?:[^/\\]|\\.)+/|"[^"]*"|\S+)|(-?)\[([^:\]]+):([^\]]+)\]|(\S+)')


def parse_filter(q: str):
    terms, ignored = [], []
    for m in TERM.finditer(q or ""):
        if m.group(2):
            val = m.group(3)
            rx = re.compile(val[1:-1], re.I) if val.startswith("/") and val.endswith("/") and len(val) > 1 else None
            terms.append(("neg" if m.group(1) else "pos", m.group(2), rx, val.strip('"').lower()))
        elif m.group(5):
            terms.append(("neg" if m.group(4) else "pos", "prop", (m.group(5).strip('"'), m.group(6).strip('"')), None))
        elif m.group(7):
            ignored.append(m.group(7))
    return terms, ignored


def matches(term, rel: str, props: dict) -> bool:
    _, kind, rx, text = term
    if kind == "prop":
        key, val = rx
        return str(props.get(key, "")).lower() == val.lower()
    target = rel if kind == "path" else os.path.basename(rel)
    return bool(rx.search(target)) if rx else text in target.lower()


def main() -> int:
    ap = argparse.ArgumentParser(description="Count what Obsidian's graph shows.")
    ap.add_argument("--no-filter", action="store_true")
    ap.add_argument("--filter", help="a graph filter to try instead of the saved one")
    ap.add_argument("--top", type=int, default=8)
    a = ap.parse_args()
    app = json.loads((ROOT / ".obsidian/app.json").read_text(encoding="utf-8")) if (ROOT / ".obsidian/app.json").exists() else {}
    graph = json.loads((ROOT / ".obsidian/graph.json").read_text(encoding="utf-8")) if (ROOT / ".obsidian/graph.json").exists() else {}
    excluded = [p.rstrip("/") + "/" for p in app.get("userIgnoreFilters", []) if not p.startswith("/")]
    query = "" if a.no_filter else (a.filter if a.filter is not None else graph.get("search", ""))
    terms, ignored = parse_filter(query)
    show_orphans = graph.get("showOrphans", True) or a.no_filter

    notes = []
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if not d.startswith(".")]
        for f in fn:
            if f.endswith(".md") and not f.startswith("."):
                rel = os.path.relpath(os.path.join(dp, f), ROOT).replace(os.sep, "/")
                if not any((rel + "/").startswith(e) or rel.startswith(e) for e in excluded):
                    notes.append(rel)
    by_path = {n[:-3].lower(): n for n in notes}
    by_name = defaultdict(list)
    for n in notes:
        by_name[os.path.basename(n)[:-3].lower()].append(n)

    def resolve(t: str, src: str):
        t = unquote(t.strip())
        if not t or re.match(r"^[a-z]+:", t, re.I):
            return None
        if "." in os.path.basename(t) and not t.lower().endswith(".md"):
            return None  # an attachment: hidden unless "Attachments" is on
        key = (t[:-3] if t.lower().endswith(".md") else t).lower()
        for c in (os.path.normpath(os.path.join(os.path.dirname(src), key)).replace(os.sep, "/").lower(), key):
            if c in by_path:
                return by_path[c]
        hits = [n for n in by_name.get(os.path.basename(key), []) if n[:-3].lower().endswith(key)]
        return sorted(hits, key=len)[0] if hits else None

    props, edges = {}, set()
    for n in notes:
        text = (ROOT / n).read_text(encoding="utf-8", errors="replace")
        fm, body = "", text
        if text.startswith("---\n") and text.find("\n---", 4) > 0:
            end = text.find("\n---", 4)
            fm, body = text[4:end], text[end + 4:]
        props[n] = {k.strip(): v.strip().strip('"').strip("'") for k, _, v in
                    (l.partition(":") for l in fm.splitlines() if ":" in l and not l.startswith((" ", "-")))}
        body = CODE.sub(" ", body)
        for t in WIKI.findall(fm) + WIKI.findall(body) + MDL.findall(body):
            r = resolve(t, n)
            if r and r != n:
                edges.add(tuple(sorted((n, r))))

    def visible(n):
        for t in terms:
            hit = matches(t, n, props[n])
            if (t[0] == "neg" and hit) or (t[0] == "pos" and not hit):
                return False
        return True

    shown = {n for n in notes if visible(n)}
    E = [e for e in edges if e[0] in shown and e[1] in shown]
    deg = Counter()
    for x, y in E:
        deg[x] += 1
        deg[y] += 1
    orphans = {n for n in shown if not deg[n]}
    nodes = shown if show_orphans else shown - orphans
    print(f"filter: {query or '(none)'}" + (f"  [ignored terms: {' '.join(ignored)}]" if ignored else ""))
    print(f"notes in the vault: {len(notes)}  links between them: {len(edges)}")
    print(f"graph shows: {len(nodes)} nodes, {len(E)} edges" +
          (f" ({len(orphans)} unlinked notes {'shown' if show_orphans else 'hidden'})" if orphans else ""))
    print("  by type:  " + ", ".join(f"{k or '-'} {v}" for k, v in Counter(props[n].get('type', '') for n in nodes).most_common()))
    print("  by folder: " + ", ".join(f"{k} {v}" for k, v in Counter(n.split('/')[0] if '/' in n else '(root)' for n in nodes).most_common()))
    print("  biggest hubs: " + ", ".join(f"{os.path.basename(n)[:-3]} {d}" for n, d in deg.most_common(a.top)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
