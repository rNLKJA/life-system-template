#!/usr/bin/env bash
# guard.sh: Claude Code PreToolUse hook. Turns three AGENTS.md rules from prose into enforcement:
#   1. Ask before deleting (§4): destructive shell commands need the owner's approval
#      unless every target is in Scratch/ or /tmp.
#   2. LOG.md is append-only (§7): overwriting or editing any LOG.md is denied;
#      append with `>>` instead.
#   3. Papers and secrets are not agent-writable (§10): no Write or Edit inside any
#      Records/ folder, the intake tray, Archive/Code, External/, .git/ or a .env file.
#      Filing a paper is a move (mv), which rule 1 does not block.
# Folder names come from workspace.json. Input: the hook JSON on stdin. Output: a
# permissionDecision, or nothing, which leaves the normal permission flow in charge.
set -u
INPUT="$(cat)"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
python3 - "$INPUT" "$ROOT" <<'PY'
import json, os, re, sys
try:
    data = json.loads(sys.argv[1])
except Exception:
    sys.exit(0)
root = sys.argv[2]
try:
    folders = json.load(open(os.path.join(root, "workspace.json"))).get("folders", {})
except Exception:
    folders = {}
scratch = folders.get("scratch", "Scratch")
hq = folders.get("hq", "HQ")
archive = folders.get("archive", "Archive")
SAFE = (f"{scratch}/", "/tmp/", "/private/tmp/")
PROTECTED = ("/Records/", f"{hq}/Intake/", f"{archive}/Code/", "External/", ".git/")
tool = data.get("tool_name", "")
ti = data.get("tool_input", {}) or {}


def decide(decision, reason):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse",
                                             "permissionDecision": decision,
                                             "permissionDecisionReason": reason}}))
    sys.exit(0)


if tool == "Bash":
    cmd = ti.get("command", "") or ""
    destructive = [
        (r"(^|[;&|]\s*|\s)rm\s", "rm"), (r"(^|[;&|]\s*|\s)rmdir\s", "rmdir"), (r"(^|[;&|]\s*|\s)trash\s", "trash"),
        (r"\bfind\b.*\s-delete\b", "find -delete"), (r"\bgit\s+push\b.*(--force|\s-f\b)", "git push --force"),
        (r"\bgit\s+reset\s+--hard", "git reset --hard"), (r"\bgit\s+clean\b", "git clean"),
        (r"\bgit\s+branch\s+-D\b", "git branch -D"), (r"\bshred\b|\btruncate\b", "shred/truncate"),
    ]
    for pat, name in destructive:
        if re.search(pat, cmd):
            if name in ("rm", "rmdir", "trash"):
                targets = [p for p in re.split(r"\s+", cmd) if p and not p.startswith("-")
                           and p not in ("rm", "rmdir", "trash", "sudo", "&&", "||", ";", "|")]
                if targets and all(any(s in p for s in SAFE) for p in targets):
                    continue
            decide("ask", f"AGENTS.md §4: '{name}' deletes or rewrites shared state. The owner approves this "
                          f"explicitly, or move the item into {scratch}/ instead.")
    if re.search(r"(?<!>)>\s*[\"']?[^>\s]*LOG\.md", cmd) and not re.search(r">>\s*[\"']?[^>\s]*LOG\.md", cmd):
        decide("deny", "AGENTS.md §7: LOG.md is append-only. Use '>>' to append; never overwrite it.")
    if re.search(r"\b(sed|perl)\s+-[a-z]*i\b.*LOG\.md", cmd):
        decide("deny", "AGENTS.md §7: LOG.md is append-only. Do not edit existing entries.")
    sys.exit(0)

if tool in ("Write", "Edit", "MultiEdit", "NotebookEdit"):
    path = (ti.get("file_path", "") or ti.get("path", "") or "").replace("\\", "/")
    rel = os.path.relpath(path, root).replace("\\", "/") if os.path.isabs(path) else path
    if rel.endswith("/LOG.md") or rel == "LOG.md":
        decide("deny", "AGENTS.md §7: LOG.md is append-only. Append one line with '>>' instead of rewriting it.")
    if os.path.basename(rel) == ".env" or any(p in f"/{rel}" for p in PROTECTED):
        decide("deny", "AGENTS.md §10: papers, the intake tray, archived code, external links, git internals "
                       "and .env files are not agent-writable. File a paper by moving it (mv).")
    sys.exit(0)
sys.exit(0)
PY
