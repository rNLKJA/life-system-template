"""workspace.py: the one place the scripts learn this workspace's folder names.

Every script imports this module instead of hard-coding folder names, so renaming a
top-level folder (python3 scripts/init.py --rename projects="Project Desk") needs no code
change. The names live in workspace.json at the root; anything missing falls back to the
defaults below.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "workspace.json"
DEFAULT_FOLDERS = {
    "areas": "Areas",          # ongoing responsibilities, one folder each
    "projects": "Projects",    # time-bound projects, each tagged with an area
    "hq": "HQ",                # goals, reviews, role homes, the intake tray
    "archive": "Archive",      # everything finished or old
    "knowledge": "Knowledge",  # one idea per note
    "resources": "Resources",  # templates, guides, reference material
    "scratch": "Scratch",      # working files, never synced
}


def load(root: Path = ROOT) -> dict:
    cfg = json.loads((root / "workspace.json").read_text(encoding="utf-8")) if (root / "workspace.json").exists() else {}
    cfg["folders"] = {**DEFAULT_FOLDERS, **cfg.get("folders", {})}
    graph = cfg.setdefault("graph", {})
    graph.setdefault("hub_depth", 2)              # folder notes this close to the root are hubs
    graph.setdefault("hub_markers", ["MEMORY.md", "PROJECT.md"])  # a folder holding one of these is a hub
    graph.setdefault("feed_suffix", "Summaries")  # notes in "... Summaries" folders are feeds
    return cfg


CFG = load()
F = CFG["folders"]
AREAS, PROJECTS, HQ, ARCHIVE = F["areas"], F["projects"], F["hq"], F["archive"]
KNOWLEDGE, RESOURCES, SCRATCH = F["knowledge"], F["resources"], F["scratch"]

INTAKE = f"{HQ}/Intake"                          # papers whose area is not yet clear
TEMPLATES = f"{RESOURCES}/templates"             # note templates (Obsidian Templates folder)
PROJECT_TEMPLATE = f"{RESOURCES}/project-template"
NO_INDEX = (TEMPLATES, PROJECT_TEMPLATE)         # copied into new notes and projects: never written
INDEX_ONLY = (f"{ARCHIVE}/Records", f"{ARCHIVE}/Code", INTAKE)  # only their index notes are written
NOT_HUBS = (f"{ARCHIVE}/Records",)               # old papers: their folders stay indexes
CODE_ROOTS = (f"{ARCHIVE}/Code",)                # children are repositories: listed, never indexed inside
TOP_SKIP = {SCRATCH, "External", "scripts"}      # never indexed
HUB_DEPTH = int(CFG["graph"]["hub_depth"])
HUB_MARKERS = tuple(CFG["graph"]["hub_markers"])
FEED_SUFFIX = CFG["graph"]["feed_suffix"]
