---
type: reference
status: active
created: 2026-10-05
source: life-system-template
---
# Writing AGENTS.md

`AGENTS.md` is the one behaviour contract every agent reads when it opens this folder. It holds the rules that are always true here. Anything that changes, anything procedural, and anything long lives somewhere else.

## Contents

- Why one file, and why not CLAUDE.md
- What goes in, and what stays out
- The sections, and why each exists
- Writing rules that agents actually follow
- Nested AGENTS.md files
- Harness notes
- Before you save a change

## Why one file, and why not CLAUDE.md

Every harness (Claude Code, Codex, Cursor, Copilot, Cowork's local agents) reads `AGENTS.md`. Claude Code reads `CLAUDE.md` instead when one exists. So a `CLAUDE.md` beside `AGENTS.md` means two contracts, and the moment they disagree, two harnesses behave differently in the same folder. One file, and no `CLAUDE.md`, removes that failure entirely. `scripts/check.py` fails if a root `CLAUDE.md` appears.

Code repositories are the exception: they keep whatever their own tooling expects.

## What goes in, and what stays out

Apply the placement test to every line:

| The line is... | It goes in |
|---|---|
| A rule with "always" or "never" in it, true for every task | `AGENTS.md` |
| A rule true only inside one folder | that folder's `AGENTS.md` |
| A procedure with steps (how to plan, how to run the weekly review) | a skill in `.agents/skills/` |
| A fact or a status that can change | a `MEMORY.md` |
| Reference material needed only sometimes | `Resources/`, with a row in the table at the end of `AGENTS.md` |

Facts in `AGENTS.md` go stale silently, because nobody rereads a rule file to check a date. Procedures in `AGENTS.md` cost tokens on every task, including the tasks that never use them.

## The sections, and why each exists

1. **Who and where:** the owner, time zone and reply language. This is the only identity an agent needs before it starts.
2. **Precedence:** chat beats `AGENTS.md`, which beats the skill, which beats memory. Without an order, agents resolve conflicts differently each time. The quote-the-line rule turns every conflict into a one-line fix at its source.
3. **How to work:** scope, autonomy, progress updates and delegation. These are the defaults that save the most back-and-forth.
4. **Plan first:** the gate is reversibility and reach, never step count. A 40-step local analysis needs no plan; a one-line email does. Deletion always needs a fresh yes.
5. **Memory:** the placement test and the 300-line ceiling (`Resources/system/memory-and-log.md`).
6. **Preferences:** tone, spelling and format, stated once.
7. **Session discipline:** the `LOG.md` line format, and the append-only rule.
8. **Routing:** a table from "the task is about..." to the folder to start in and the role that owns it.
9. **Skills:** the spec rules, and where workspace paths start (`Resources/system/skills-and-paths.md`).
10. **Files:** where things go, naming, and the Obsidian rules (`Resources/system/obsidian.md`).
11. **Reference material:** what to load and when, so nothing loads by default.

## Writing rules that agents actually follow

- **State the rule and its reason in one breath.** "LOG.md is append-only: it is the audit trail" is followed more reliably than a bare "never edit LOG.md".
- **Make it checkable.** "Keep MEMORY.md under 300 lines" can be tested; "keep memory lean" cannot.
- **Give each rule exactly one home.** If a skill needs a rule from `AGENTS.md`, it points to the section rather than copying the text. The one exception is the one-line paths rule, which skills repeat because Cowork loads them without `AGENTS.md` (`Resources/system/skills-and-paths.md`).
- **Do not add "double-check your work" steps,** or plan triggers based on step counts. They cost tokens on every task without improving results; the plan gate on reversibility does the real work.
- **Prefer enforcement to prose** where a harness offers it. The guard hook in `.claude/hooks/guard.sh` makes "ask before deleting" and "LOG.md is append-only" mechanical in Claude Code.
- **Keep it under 150 lines.** Past that, rules start to compete for attention. Move detail into `Resources/system/` and link it.

## Nested AGENTS.md files

Add one only when a folder has rules that apply nowhere else, for example how projects start and close (`Projects/AGENTS.md`) or what agents may not touch in `HQ/` (`HQ/AGENTS.md`). A nested file:

- opens by naming its scope: "Folder rules for `Projects/`. The root `AGENTS.md` governs; this file adds only what is specific to projects";
- never repeats or overrides a root rule;
- stays short. Ten lines is normal.

Most folders need none. An empty or near-empty `AGENTS.md` is clutter, and each one is a node in your file tree.

## Harness notes

| Harness | How it reads this folder |
|---|---|
| Claude Code | Reads `AGENTS.md` when there is no `CLAUDE.md`; skills come from `.claude/skills`, a link to `.agents/skills`; the guard hook is wired in `.claude/settings.json` |
| Codex | Reads `AGENTS.md` and the nested ones as it moves into folders; reads skills from `.agents/skills` |
| Cursor | Reads `AGENTS.md`; link `.cursor/skills` to `.agents/skills` if your version does not find them |
| Cowork and claude.ai | Load skills from your account, not this folder; the global instructions should point at this folder's `AGENTS.md` (`Resources/system/skills-and-paths.md`) |

## Before you save a change

```
AGENTS.md change:
- [ ] The line passes the placement test (a rule, true for every task)
- [ ] It is not already said elsewhere in AGENTS.md or a skill
- [ ] It says why, and it can be checked
- [ ] The file is still under 150 lines
- [ ] "Last updated" changed, and LOG.md has a line saying what changed and why
- [ ] python3 scripts/check.py and python3 scripts/paths-check.py still pass
```
