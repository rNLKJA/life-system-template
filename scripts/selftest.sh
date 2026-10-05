#!/usr/bin/env bash
# selftest.sh: prove the template works from a clean copy. Changes nothing in this folder.
#
#   bash scripts/selftest.sh
#
# On an initialised vault it only checks a copy (vault-link idempotence and check.py).
# On the template it copies everything to a temporary folder, then: init (with a folder rename), a new
# area, a new project, vault-link twice (the second run must change nothing), check.py,
# paths-check.py and graph-report.py. Finally it adds a synthetic load (30 projects, 200
# deep folders, 60 feed notes) and checks that the graph still shows only hubs and content.
set -euo pipefail
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
V="$TMP/My Life"
mkdir -p "$V"
(cd "$SRC" && tar --exclude=.git --exclude='Scratch/*' -cf - .) | (cd "$V" && tar -xf -)
cd "$V"
mkdir -p Scratch/plans  # the copy leaves out Scratch contents; plans/ is tracked in a real clone
git init -q . && git config user.email selftest@example.com && git config user.name selftest

step() { printf '\n== %s\n' "$*"; }
fail() { printf 'SELFTEST FAIL: %s\n' "$*" >&2; exit 1; }

if ! grep -q "{{OWNER}}" AGENTS.md; then
  # An initialised vault (yours): check it without changing it.
  step "vault mode: this copy is already initialised"
  python3 scripts/vault-link.py >/dev/null
  python3 scripts/vault-link.py | grep -Eq "(updated|created): [1-9]" && fail "vault-link is not idempotent"
  python3 scripts/check.py || fail "check.py reported a FAIL"
  printf '\nSELFTEST PASS (vault mode)\n'
  exit 0
fi

step "init"
python3 scripts/init.py --yes --owner "Test Owner" --timezone "Australia/Adelaide" --spelling Australian \
  --areas "Career & Work,Finance,Home,Health" --rename projects="Project Desk"
grep -q "{{OWNER}}" AGENTS.md && fail "placeholders left in AGENTS.md"
[ -d "Project Desk" ] && [ -f "Project Desk/Project Desk.md" ] || fail "rename did not move the projects folder and its note"
grep -q '"projects": "Project Desk"' workspace.json || fail "workspace.json not updated"
grep -q 'Project Desk/MEMORY.md' AGENTS.md || fail "AGENTS.md still names the old projects folder"

step "new area and new project"
python3 scripts/new-area.py "Pets" --records
python3 scripts/new-project.py "Kitchen renovation" --area home --summary "New benchtops before Christmas" --next "Get three quotes"
grep -q "Kitchen renovation" "Project Desk/MEMORY.md" || fail "project row missing"

step "vault-link, then again (must change nothing)"
python3 scripts/vault-link.py
second="$(python3 scripts/vault-link.py)"
echo "$second"
echo "$second" | grep -Eq "(updated|created): [1-9]" && fail "vault-link is not idempotent"
grep -q 'up: "\[\[Areas/Home/Home\]\]"' "Project Desk/Kitchen renovation/Kitchen renovation.md" && fail "project hub should point up to Project Desk, not its area"
grep -q 'up: "\[\[Project Desk/Project Desk\]\]"' "Project Desk/Kitchen renovation/Kitchen renovation.md" || fail "project hub up-link"

step "check.py and paths-check.py"
python3 scripts/check.py || fail "check.py reported a FAIL"
python3 scripts/paths-check.py || fail "paths-check found a missing path"

step "privacy: Records/ and the intake stay out of git"
mkdir -p "Areas/Finance/Records/Tax" && echo "secret" > "Areas/Finance/Records/Tax/2026-07-01 Notice.pdf"
echo "paper" > "HQ/Intake/2026-10-01 Letter.pdf"
git add -A >/dev/null
git ls-files | grep -E "/Records/|HQ/Intake/2026" && fail "a private file was staged"
echo "no private file staged"

step "synthetic load: 30 projects, 200 deep folders, 60 feed notes"
for i in $(seq 1 30); do python3 scripts/new-project.py "Project $i" --area Finance >/dev/null; done
for i in $(seq 1 40); do for j in 1 2 3 4 5; do
  d="Areas/Career & Work/Archive $i/Level $j"; mkdir -p "$d"; printf '# Note %s %s\n\nAbout [[Areas/Career & Work/Career & Work]].\n' "$i" "$j" > "$d/note-$i-$j.md"; done; done
mkdir -p "HQ/Daily Summaries"
for i in $(seq 1 60); do printf '# Summary %s\n' "$i" > "HQ/Daily Summaries/2026-08-$(printf %02d $(( (i % 28) + 1 )))-run-$i.md"; done
python3 scripts/vault-link.py >/dev/null
report="$(python3 scripts/graph-report.py)"
raw="$(python3 scripts/graph-report.py --no-filter)"
echo "$raw" | sed -n 3p | sed 's/^/without filter: /'
echo "$report" | sed -n 3,6p
nodes=$(echo "$report" | sed -n 3p | grep -Eo '[0-9]+ nodes' | grep -Eo '[0-9]+')
raw_nodes=$(echo "$raw" | sed -n 3p | grep -Eo '[0-9]+ nodes' | grep -Eo '[0-9]+')
echo "$report" | grep -Eq "by type:.*(index|feed)" && fail "index or feed notes reached the graph"
[ "$nodes" -lt "$raw_nodes" ] || fail "the filter did not shrink the graph"
python3 scripts/check.py >/dev/null || fail "check.py failed under load"

printf '\nSELFTEST PASS: %s nodes in the graph instead of %s, all checks green\n' "$nodes" "$raw_nodes"
