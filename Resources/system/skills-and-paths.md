---
type: reference
status: active
created: 2026-10-05
source: life-system-template
---
# Skills, and making sure they find the right folders

A skill is a folder of instructions an agent loads when a task matches it. The skills here follow the open Agent Skills specification, so the same folder works in Claude Code, Codex, Cursor, Cowork and claude.ai. Their most common failure is not bad instructions. It is a path that points at the wrong place.

## Contents

- Anatomy of a skill
- Where each harness finds skills
- Why paths go wrong
- The paths rule
- Checking paths automatically
- Scheduled tasks and prompts
- Cowork and claude.ai
- Changing a skill: checklist

## Anatomy of a skill

```text
.agents/skills/<name>/
├── SKILL.md        frontmatter + instructions, 100 lines at most
├── CHANGELOG.md    one entry per version
└── references/     detail loaded only when SKILL.md says to
```

- **Frontmatter** uses only `name` (equal to the folder name), `description`, `license`, `compatibility`, `metadata` (with `version` and `updated`) and `allowed-tools`. claude.ai rejects other keys.
- **The `description`** says what the skill does and when to use it, in the third person, and names the skill that handles near-misses. It decides when the skill loads, so write it for that.
- **Multi-step work** carries a copyable checklist of the task's own steps.
- **Every change** bumps `metadata.version` and `metadata.updated`, with a line in `CHANGELOG.md`.

## Where each harness finds skills

| Harness | Reads skills from |
|---|---|
| Claude Code | `.claude/skills`, which is a link to `.agents/skills` |
| Codex | `.agents/skills` |
| Cursor | `.agents/skills`, or link `.cursor/skills` to it |
| Cowork and claude.ai | your account (Customize, Skills), uploaded as a zip |

There is one copy of each skill, in `.agents/skills/`. Never paste a second copy anywhere else; upload the folder instead.

## Why paths go wrong

A skill says "read `HQ/Donna/MEMORY.md`". Whether that reaches the right file depends on where the session started:

| Session started in... | `HQ/Donna/MEMORY.md` resolves to | Result |
|---|---|---|
| the workspace root | the right file | works |
| a parent folder (`~/Documents`) | `~/Documents/HQ/Donna/MEMORY.md` | not found; the agent searches and may pick a wrong copy |
| a sub-folder (a scheduled task set to `HQ`) | `HQ/HQ/Donna/MEMORY.md`, and `LOG.md` becomes `HQ/LOG.md` | writes land in the wrong file |

There are two more ways to go wrong:

- **Stale copies.** Claude Code makes a full worktree of the repository for each session opened in a sub-folder (under `.claude/worktrees/`). After a few weeks, a plain `find` sees ten old `AGENTS.md` files for every live one, and an agent that takes the first match follows rules from weeks ago.
- **Installed copies drift.** Cowork runs the copy in your account, which does not change when you edit `.agents/skills/`. A folder you renamed last week can still be the one it files into.

## The paths rule

`AGENTS.md` §9 states it once:

> A skill's own files (`references/`, `assets/`) are relative to the skill folder. Paths to the workspace are relative to the workspace root, the folder that holds `AGENTS.md` and `.agents/skills/`. A session opened on a parent folder steps into it; one opened on a sub-folder walks up to it. Analysis reads live files only: it skips dot-folders, `Scratch/`, nested repositories and, unless the question is about the past, `Archive/`.

Every skill that reads or writes workspace files repeats it in one sentence, because Cowork loads a skill without `AGENTS.md`:

> Every path in this skill is relative to the workspace root, the folder holding `AGENTS.md` and `.agents/skills/`: find it first, and read live files only (`AGENTS.md` §9).

To find the root from a shell: `git rev-parse --show-toplevel` works when the vault is a git repository, or walk up until a folder holds both `AGENTS.md` and `.agents/`. For searching, `rg` already skips dot-folders and gitignored paths and reads `.ignore`; a plain `find` does not, so add `-not -path '*/.*' -not -path './Scratch/*'`.

## Checking paths automatically

```bash
python3 scripts/paths-check.py                    # skills, every live AGENTS.md, the templates
python3 scripts/paths-check.py prompt.md          # also a scheduled-task prompt
python3 scripts/paths-check.py --skills-dir DIR   # an installed copy, against this workspace
```

It finds every path in a code span, a Markdown link or a wikilink. Placeholders (`<Area>`, `{{title}}`, `YYYY-MM-DD`) stand for any name, so only the fixed part before them must exist. It reports each path that does not resolve, with its file and line. `scripts/check.py` runs it and fails on a missing path, and with it so does the structural check after a folder move. A line that cites an old path on purpose (a history note) can carry `<!-- paths-check: ignore -->`.

## Scheduled tasks and prompts

- Set the task's folder to the workspace root, never a sub-folder.
- Name files from the root (`HQ/Daily Summaries/...`), or with the full absolute path when the harness has no folder setting.
- Put the one-sentence paths rule at the top of the prompt.
- Run `python3 scripts/paths-check.py the-prompt.md` before pasting it in.

## Cowork and claude.ai

- **Upload each skill as a zip** under Customize, Skills, and upload it again after every edit. From the workspace root, `cd .agents/skills && zip -r ../../Scratch/donna.zip donna -x '*/.*'` builds one.
- **Connect the workspace folder itself** to the session, rather than its parent.
- **Paste a short global instruction** under Settings, Cowork, Global instructions, so every Cowork session knows where the root is:

```text
My workspace root is <full path to this folder>: the folder holding AGENTS.md and .agents/skills/. Its AGENTS.md governs every session. If the connected folder is its parent, work inside the root; if it is a sub-folder, read paths from the root.
Paths in skills and prompts are relative to that root. Search live files only: skip dot-folders, Scratch/ and Archive/ unless I ask about the past.
Skills: the one copy of each is in .agents/skills/. After I change one, it needs re-uploading here; never keep a second copy.
```

## Changing a skill: checklist

```
Skill change:
- [ ] Edit .agents/skills/<name>/ only (never an installed copy)
- [ ] SKILL.md is 100 lines or fewer; detail moved to references/
- [ ] Every workspace path is written from the root, and the paths sentence is present
- [ ] metadata.version and metadata.updated bumped; CHANGELOG.md line added
- [ ] python3 scripts/paths-check.py and python3 scripts/check.py pass
- [ ] Re-uploaded to Cowork or claude.ai if you use them
```
