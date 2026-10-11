# Templates

Obsidian inserts these with **Templates: Insert template** (Cmd/Ctrl+P). Agents copy them the same way, and `scripts/new-area.py` fills in `area.md`. They are frozen: `vault-link.py` never writes into this folder.

## Frontmatter vocabulary

Every new note carries four properties: `type`, `status`, `created` and `source`.

| Property | Values | Why |
|---|---|---|
| `type` | `knowledge` · `meeting` · `decision` · `dataset` · `project` · `reference` · `research` · `area` · `hub` · `index` · `feed` | Lets Bases views, agents and the graph filter by kind. `vault-link.py` writes the last three: `hub` on folder notes in the top two levels and on any folder with its own `MEMORY.md`, `index` on deeper folder notes, and `feed` on notes in a `… Summaries` folder. The graph hides `index` and `feed`. |
| `status` | `seed` · `active` · `paused` · `done` · `superseded` | Shows what is current; `seed` is the first draft of an idea |
| `created` | ISO date, `YYYY-MM-DD` | Provenance that sorts correctly everywhere |
| `source` | URL, file path, person or `own` | Where the idea or data came from |
| `area` | a link to an area hub, e.g. `"[[Areas/<Area>/<Area>\|<Area>]]"` | On project hubs: which area the project serves, so the area lists it |

`vault-link.py` adds `up:` on its own, pointing at the nearest hub. Prefer links to tags.

## Templates

| File | Use for |
|---|---|
| `knowledge-note.md` | One idea, in your own words, with its source; lives in `Knowledge/` |
| `meeting-note.md` | Who, what was decided, actions with owners and dates |
| `decision-record.md` | A choice worth remembering: context, options, decision, why, and what would change it |
| `dataset-readme.md` | Any folder of data: sources, licence, data dictionary, how to rebuild |
| `area.md` | A new area's hub, `Areas/<Area>/<Area>.md`; `scripts/new-area.py` fills it in |
| `scan.md` | A research or market scan (Ray's deep scan), dated, with its sources |
