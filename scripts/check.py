#!/usr/bin/env python3
"""check.py: is the workspace still in the shape AGENTS.md describes? Read-only.

    python3 scripts/check.py        # PASS / WARN / FAIL per check; exit 1 on any FAIL

Run it after any structural change, weekly, or from a scheduled agent task. Each line says
what it checked; a WARN or FAIL says what to do.
"""
from __future__ import annotations

import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from workspace import AREAS, F, HQ, PROJECTS, ROOT, SCRATCH  # noqa: E402

COUNT = {"FAIL": 0, "WARN": 0}
SPEC_KEYS = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}
BADCH = re.compile(r'[\[\]#^|<>:"?*]')


def out(level: str, msg: str) -> None:
    COUNT[level] = COUNT.get(level, 0) + 1
    print(f"{level:4}  {msg}")


def run(*cmd: str) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)


def frontmatter(text: str) -> dict:
    if not text.startswith("---\n") or text.find("\n---", 4) < 0:
        return {}
    d, section = {}, None
    for line in text[4:text.find("\n---", 4)].splitlines():
        if line.startswith("  ") and section:
            k, _, v = line.strip().partition(":")
            d[f"{section}.{k.strip()}"] = v.strip().strip('"\'')
            continue
        k, _, v = line.partition(":")
        section = k.strip() if not v.strip() else None
        if k.strip():
            d[k.strip()] = v.strip().strip('"\'')
    return d


def live_dirs(base: Path):
    for dp, dn, fn in os.walk(base):
        dn[:] = [d for d in dn if not d.startswith(".") and d not in ("node_modules", ".venv", "__pycache__")
                 and not os.path.exists(os.path.join(dp, d, ".git"))]
        yield dp, dn, fn


def main() -> int:
    # 1. root files, and no CLAUDE.md shadowing AGENTS.md
    need = ["AGENTS.md", "MEMORY.md", "LOG.md", "INBOX.md", "ARCHIVE.md", "README.md", "workspace.json"]
    missing = [f for f in need if not (ROOT / f).exists()]
    out("FAIL" if missing else "PASS", "root files: " + (f"missing {', '.join(missing)}" if missing else "all present"))
    if (ROOT / "CLAUDE.md").exists():
        out("FAIL", "CLAUDE.md at the root: Claude Code reads it instead of AGENTS.md. Move its content into AGENTS.md")
    if "{{OWNER}}" in (ROOT / "AGENTS.md").read_text(encoding="utf-8") if (ROOT / "AGENTS.md").exists() else False:
        out("WARN", "not initialised yet: run python3 scripts/init.py")

    # 2. top-level folders from workspace.json
    absent = [f"{v}/" for k, v in F.items() if k != "scratch" and not (ROOT / v).is_dir()]
    out("FAIL" if absent else "PASS", "top-level folders: " + (f"missing {', '.join(absent)}" if absent else ", ".join(F.values())))

    # 3. skills follow the Agent Skills spec and the 100-line rule; Claude Code sees them
    sk = ROOT / ".agents" / "skills"
    problems = []
    for d in sorted(p for p in sk.iterdir() if p.is_dir()) if sk.is_dir() else []:
        f = d / "SKILL.md"
        if not f.exists():
            problems.append(f"{d.name}: no SKILL.md")
            continue
        text = f.read_text(encoding="utf-8")
        fm = frontmatter(text)
        if fm.get("name") != d.name:
            problems.append(f"{d.name}: name '{fm.get('name')}' differs from the folder")
        if not 0 < len(fm.get("description", "")) <= 1024 or re.search(r"[<>]", fm.get("description", "")):
            problems.append(f"{d.name}: description missing, over 1024 characters or has < >")
        extra = {k.split(".")[0] for k in fm} - SPEC_KEYS
        if extra:
            problems.append(f"{d.name}: frontmatter keys outside the spec: {', '.join(sorted(extra))}")
        if text.count("\n") + 1 > 100 and "verbatim" not in fm.get("metadata.source", ""):
            problems.append(f"{d.name}: SKILL.md over 100 lines (move detail to references/)")
        for link in re.findall(r"\]\((references/[^)#]+)", text):
            if not (d / link).exists():
                problems.append(f"{d.name}: link to missing {link}")
    out("FAIL" if problems else "PASS", f"skills: {len([p for p in sk.iterdir() if p.is_dir()]) if sk.is_dir() else 0} found" +
        (": " + "; ".join(problems[:5]) if problems else ", all within the spec"))
    link = ROOT / ".claude" / "skills"
    ok = link.is_symlink() and os.readlink(link).rstrip("/") in ("../.agents/skills", str(sk))
    out("PASS" if ok else "WARN", ".claude/skills links to .agents/skills" if ok else
        ".claude/skills is not a link to ../.agents/skills (Claude Code will not see the skills)")

    # 4. memory stays small; logs stay append-only and dated
    big = []
    for dp, dn, fn in live_dirs(ROOT):
        if os.path.relpath(dp, ROOT).split(os.sep)[0] in (SCRATCH, F["archive"]):
            dn[:] = []
            continue
        if "MEMORY.md" in fn:
            n = sum(1 for _ in open(os.path.join(dp, "MEMORY.md"), encoding="utf-8", errors="replace"))
            if n >= 240:
                big.append((os.path.relpath(os.path.join(dp, "MEMORY.md"), ROOT), n))
    over = [b for b in big if b[1] > 300]
    out("FAIL" if over else ("WARN" if big else "PASS"), "MEMORY.md ceilings (300 lines): " +
        ("; ".join(f"{p} {n}" for p, n in big) + " (move dormant entries to ARCHIVE.md)" if big else "all under 240"))
    lines = [l for l in (ROOT / "LOG.md").read_text(encoding="utf-8").splitlines()
             if re.match(r"^\d{4}-\d{2}-\d{2}", l)] if (ROOT / "LOG.md").exists() else []
    bad = [l for l in lines[-20:] if not re.match(r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2} \[[^\]]+\] ", l)]
    out("WARN" if bad or not lines else "PASS", "LOG.md entries: " + (f"{len(bad)} recent lines not in 'YYYY-MM-DD HH:MM [TZ] ...' form"
        if bad else (f"{len(lines)} dated lines" if lines else "no entries yet")))

    # 5. privacy: anything in a Records/ folder stays out of git
    if (ROOT / ".git").exists():
        tracked = [p for p in run("git", "ls-files").stdout.splitlines() if "/Records/" in f"/{p}"]
        probe = run("git", "check-ignore", "-q", "--no-index", f"{AREAS}/Any Area/Records/probe.pdf").returncode == 0
        out("FAIL" if tracked or not probe else "PASS", "private Records/ folders: " +
            (f"{len(tracked)} tracked by git: {', '.join(tracked[:3])}" if tracked else
             ("ignored by git" if probe else "NOT ignored: add **/Records/ to .gitignore")))
    else:
        out("WARN", "not a git repository yet: run git init (privacy rules in .gitignore apply once it is)")

    # 6. names: no characters Obsidian links or Windows reject
    badnames = []
    for base in (AREAS, PROJECTS, HQ):
        for dp, dn, fn in live_dirs(ROOT / base):
            badnames += [os.path.relpath(os.path.join(dp, n), ROOT) for n in dn + fn if BADCH.search(n) and not n.startswith(".")]
    out("WARN" if badnames else "PASS", f"file names outside the naming rule: {len(badnames)}" + (": " + "; ".join(badnames[:4]) if badnames else ""))

    # 7. contracts: every area has its hub; every project has its kit and an area tag
    noarea = []
    for d in sorted(p for p in (ROOT / AREAS).iterdir() if p.is_dir() and not p.name.startswith(".")) if (ROOT / AREAS).is_dir() else []:
        hub = d / f"{d.name}.md"
        if not hub.exists() or frontmatter(hub.read_text(encoding="utf-8")).get("type") != "area":
            noarea.append(d.name)
    out("WARN" if noarea else "PASS", "areas: " + (f"{len(noarea)} without a 'type: area' hub: {', '.join(noarea)}" if noarea else "every area has its hub"))
    gaps = []
    for d in sorted(p for p in (ROOT / PROJECTS).iterdir() if p.is_dir() and not p.name.startswith(".")) if (ROOT / PROJECTS).is_dir() else []:
        miss = [f for f in ("TASKS.md", "MEMORY.md", "LOG.md") if not (d / f).exists()]
        hub = d / f"{d.name}.md"
        if not hub.exists() or not frontmatter(hub.read_text(encoding="utf-8")).get("area"):
            miss.append("area: tag on its hub")
        if miss:
            gaps.append(f"{d.name} ({', '.join(miss)})")
    out("WARN" if gaps else "PASS", "projects: " + ("; ".join(gaps[:4]) if gaps else "each has TASKS, MEMORY, LOG and an area tag"))

    # 8. generated links and indexes are current
    r = run(sys.executable, "scripts/vault-link.py", "--dry-run")
    pending = sum(int(m) for m in re.findall(r"(?:updated|created): (\d+)", r.stdout))
    out("WARN" if pending or r.returncode else "PASS", "vault links and folder indexes: " +
        (f"{pending} notes out of date, run python3 scripts/vault-link.py" if pending else "current"))

    # 9. the graph shows hubs and content, not plumbing
    gj = ROOT / ".obsidian" / "graph.json"
    search = json.loads(gj.read_text(encoding="utf-8")).get("search", "") if gj.exists() else ""
    need_terms = ["-[type:index]", "-[type:feed]", "AGENTS|"]
    lacking = [t for t in need_terms if t not in search]
    out("WARN" if lacking else "PASS", "graph filter: " + (f"missing {', '.join(lacking)} (see Resources/system/obsidian.md)" if lacking
        else (run(sys.executable, "scripts/graph-report.py").stdout.splitlines() or ["", "", "ok"])[2].strip()))

    # 10. every path a skill, prompt or AGENTS.md names exists
    r = run(sys.executable, "scripts/paths-check.py", "--quiet")
    out("FAIL" if r.returncode else "PASS", (r.stdout.strip().splitlines() or ["paths-check: no output"])[-1] +
        (" (python3 scripts/paths-check.py lists them)" if r.returncode else ""))

    # 11. no stale copies of the workspace inside it (Claude Code makes one worktree per session)
    wt = [os.path.relpath(dp, ROOT) for dp, dn, fn in os.walk(ROOT)
          if os.path.basename(dp) == "worktrees" and os.path.basename(os.path.dirname(dp)) == ".claude" and (dn or fn)
          and not os.path.relpath(dp, ROOT).startswith((SCRATCH + os.sep, ".git" + os.sep))]
    out("FAIL" if wt else "PASS", "stale workspace copies: " + (", ".join(wt) + " (move to Scratch, then git worktree prune)" if wt else "none"))

    # 12. Scratch does not become a second archive
    sc = ROOT / SCRATCH
    cut = dt.datetime.now().timestamp() - 90 * 86400
    old = [p.name for p in sc.iterdir() if p.name != "README.md" and not p.name.startswith(".") and p.stat().st_mtime < cut] if sc.is_dir() else []
    out("WARN" if old else "PASS", f"{SCRATCH}/ items untouched for 90 days: {len(old)}" + (" (file or delete them): " + ", ".join(old[:5]) if old else ""))

    print(f"\n{COUNT['FAIL']} FAIL, {COUNT['WARN']} WARN")
    return 1 if COUNT["FAIL"] else 0


if __name__ == "__main__":
    sys.exit(main())
