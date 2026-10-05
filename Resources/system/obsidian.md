---
type: reference
status: active
created: 2026-10-05
source: life-system-template
---
# Obsidian display: a graph of meaning, not plumbing

A system like this one creates many small files on purpose: a note for every folder, `AGENTS.md`, `MEMORY.md`, `LOG.md` and `TASKS.md` for every project, and a summary note for every scheduled run. Each is useful to an agent, and almost none means anything in a picture. Left alone, Obsidian's graph turns them into a hairball.

This guide explains how the vault stays readable, and how to keep it that way as it grows.

## Contents

- What the problem looks like
- The model: hubs, indexes, feeds, system files, content
- How the pieces enforce it
- The graph filter, term by term
- Seeing everything when you need to
- Measuring your graph
- Keeping it lean as the vault grows
- Settings that matter

## What the problem looks like

These figures come from a real vault built on this structure, before and after the rules below. Before, it had 643 nodes and 1,236 edges, and two thirds of the nodes were plumbing:

| Class | Nodes | Why it was there |
|---|---|---|
| Folder indexes | 201 | one per folder, most in folders holding three files or fewer |
| System files | 159 | `README`, `MEMORY`, `LOG`, `TASKS`, `PROJECT` and `AGENTS`, a set per project |
| Feeds | 38 | daily and inbox summaries written by scheduled tasks |
| Hubs | 34 | home, top-level folders, areas, projects, role homes |
| Content | 211 | the notes that carry meaning |

After: 232 nodes and 569 edges. No note was deleted and no index was dropped, and every writable note is still connected to its hub.

## The model: hubs, indexes, feeds, system files, content

- **Hubs** are the nouns of your life: the home note (`README.md`), the top-level folders, and each area, project and role home. They are the folder notes in the top two levels, plus the folder note of any deeper folder with its own `MEMORY.md` (a workstream). They show in the graph.
- **Indexes** are the folder notes deeper down. They list what a folder holds, for you and for agents. They do not show in the graph.
- **Feeds** are dated output written by machines, kept in a folder whose name ends in "Summaries". They do not show.
- **System files** are the UPPERCASE operational files (`AGENTS`, `MEMORY`, `LOG`, `TASKS` and the like) and READMEs below the root. They do not show.
- **Content** is everything you or an agent wrote to be read: knowledge notes, decisions, research, drafts. It shows, linked to its hub and to whatever it mentions.

## How the pieces enforce it

1. **`up:` points at the nearest hub.** `scripts/vault-link.py` writes `up: "[[...]]"` into every writable note. For content, it names the nearest hub, not the immediate folder note, so hiding indexes never strands a note. An index's own `up:` follows the folder chain, so navigation through folders still works.
2. **Roles are written into `type`.** vault-link stamps `type: hub`, `type: index` or `type: feed` on the notes it owns. A type you set by hand (`area`, `project`, `knowledge`...) is never overwritten.
3. **Indexes never link files.** An index lists its files as plain-text rows (date, name, latest version, size, modified), at most 50 of them, above a live Bases table that opens any file on click. Bases results are not links, so a folder of 300 PDFs adds no edges.
4. **The graph filter hides index, feed and system notes,** and orphans are hidden too. The filter is in `.obsidian/graph.json`, which git tracks, so every clone gets the same graph.

## The graph filter, term by term

```text
-path:/^(Scratch|External)\// -[type:index] -[type:feed] -path:/^(?!README\.md$)(?!(?:.*\/)?([^\/]+)\/\1\.md$)(?:.*\/)?(AGENTS|CLAUDE|MEMORY|LOG|TASKS|PROJECT|ARCHIVE|INBOX|CHANGELOG|CONVERSATION-LOG|STATUS|SOURCES|CATALOG|SKILL|SKILLS|VERSION|CONTRIBUTING|LICENSE|README)\.md$/ -file:/\.base$/
```

| Term | Hides |
|---|---|
| `-path:/^(Scratch\|External)\//` | working files and links to other drives |
| `-[type:index]` | folder indexes below the hub levels |
| `-[type:feed]` | machine-written summaries |
| `-path:/^(?!README...` | system files by name, in any folder. Two exceptions are built in: the home `README.md` at the root stays, and so does a folder note that shares a system name (`Archive/Archive.md` stays even though `ARCHIVE.md` is hidden) |
| `-file:/\.base$/` | Bases files, which Obsidian draws as nodes when a note embeds them |

Obsidian matches regular expressions in search without regard to case, so a note called `tasks.md` is hidden as well. Give content notes descriptive names (`kitchen-quotes.md`, not `tasks.md`) and the question never arises.

## Seeing everything when you need to

- **Clear the filter** in the graph's Filters panel to see every note, then undo with Cmd/Ctrl+Z, or close the graph without saving.
- **Use the local graph** (Open local graph) on any note to see its own neighbourhood, indexes included. Local graphs keep their own settings.
- **Use the file explorer and the Bases tables** for structure. The graph is for relationships.

## Measuring your graph

```bash
python3 scripts/graph-report.py              # what the global graph shows now
python3 scripts/graph-report.py --no-filter  # everything, for comparison
python3 scripts/graph-report.py --filter "-[type:index]"   # try a filter before saving it
```

It counts nodes and edges the way Obsidian draws them (wikilinks, Markdown links and links in properties, with the filter and the orphan setting applied) and names the biggest hubs. `scripts/check.py` warns if the filter loses its key terms.

## Keeping it lean as the vault grows

- **Run `python3 scripts/vault-link.py` after filing, moving or archiving.** It stamps new folder notes and points new notes at their hub.
- **Keep system files UPPERCASE** and content in lowercase-hyphen names. The filter relies on the difference.
- **Put machine output in a "... Summaries" folder** (`HQ/Daily Summaries/`), so vault-link marks it as a feed.
- **Link meaning, not structure.** A knowledge note that links the project it changes adds an edge worth seeing. A hand-made list of every file in a folder adds noise; leave listing to the indexes.
- **Keep code out of the vault.** A repository inside it adds dozens of README and docs nodes. If one must live inside, add its folder to Settings, Files and links, Excluded files, or add a `-path:` term to the filter.
- **Prune at the source.** If one hub collects hundreds of edges, it is usually a sign that a folder has become an area in its own right and deserves its own hub.

## Settings that matter

| Setting | Value | Why |
|---|---|---|
| Use `[[Wikilinks]]` | on | the scripts read and write wikilinks |
| New link format | absolute path in vault | links survive moves and are unambiguous for agents |
| Automatically update internal links | on | renames keep links working |
| Excluded files | `Scratch/`, dependency folders | hidden from search and the graph alike; use the graph filter for anything you still want to search |
| Templates folder | `Resources/templates` | Insert template reads it |
| Properties in document | visible | `type`, `status` and `up` stay in view |
