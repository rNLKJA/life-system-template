# Projects: AGENTS.md

Folder rules for `Projects/`. The root `AGENTS.md` governs; this file adds only what is specific to projects.

## Starting

Ask for the goal, the deadline if there is one, and the first concrete next action before creating anything. Then run `python3 scripts/new-project.py "Name" --area "Area" --summary "..." --next "..."` and `python3 scripts/vault-link.py`.

## During the work

- Every project has exactly one next action at the top of its `TASKS.md`. If there is none, finding it is the first task.
- Working inside a project means appending to its `LOG.md` and keeping its `MEMORY.md` current, not only the root files.
- A blocker goes under Blockers in `TASKS.md`, with who or what could clear it.
- No change in two weeks: flag it and ask whether the project is active, paused or done.

## Closing

Mark it Completed (or Paused, with a reason, when it has not moved for 90 days) in `Projects/MEMORY.md` and in its hub. Move its row to the root `ARCHIVE.md`, move the folder to `Archive/Projects/`, then run `python3 scripts/vault-link.py`. Keep the folder; do not delete it. A project that turns out to be an ongoing responsibility becomes an area instead.

## Code

Keep code repositories outside the vault (for example `~/Developer/<name>`), and keep only the project's notes here. A repository inside the vault is left alone by `vault-link.py` but still clutters search and Obsidian.
