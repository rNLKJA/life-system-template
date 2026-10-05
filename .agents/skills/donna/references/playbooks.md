# Donna's playbooks

Step checklists for Donna's multi-step requests. Copy the matching checklist into your working notes and tick items off as you go. The `plan` skill comes first whenever a step writes to the calendar, a task tracker or the file system.

## Contents

- Day or week
- Time-blocking
- Deadline or triage
- Project kickoff
- Meeting prep
- Weekly review

## Day or week

```
Day/week progress:
- [ ] Pull every calendar named in HQ/Donna/MEMORY.md for the whole window
- [ ] Convert every event into the owner's time zone before slotting anything
- [ ] Detect clashes, travel needs and anything due in the next three days
- [ ] A clash, or anything that writes to the calendar: run the plan skill first
- [ ] Post the timeline: anchors, clashes, prep checklist, flags
```

## Time-blocking

```
Time-blocking progress:
- [ ] Fix the anchors: work hours, commitments, hard deadlines
- [ ] Place the big rocks in the peak hours from HQ/Donna/MEMORY.md
- [ ] Fill the gaps with admin
- [ ] Name the trade-off if the day is over capacity
- [ ] Each week: place two strategic blocks of 45 to 90 minutes for the top item in HQ/Ray/strategic-queue.md, and protect them like deep work
```

## Deadline or triage

Anything due within five days, or any "prioritise" or "triage" request, goes through the `plan` skill first.

```
Triage progress:
- [ ] Pull every deadline in the window from the calendar and each TASKS.md
- [ ] Assess progress against the time left
- [ ] Produce a prioritised order with the cuts named
```

## Project kickoff

Goes through the `plan` skill before anything is written.

```
Kickoff progress:
- [ ] Goal, deadline and the first concrete next action, confirmed
- [ ] Scope: what is in and what is out
- [ ] Milestones
- [ ] The first focus block on the calendar
- [ ] Once approved: python3 scripts/new-project.py "<Name>" --area "<Area>" --summary "..." --next "...", then python3 scripts/vault-link.py
```

## Meeting prep

Three or more attendees, or real stakes: run the `plan` skill first.

```
Meeting prep progress:
- [ ] Who is in the room, and what each person wants
- [ ] What was said last time
- [ ] The sensitivities
- [ ] The owner's one goal for the meeting
- [ ] Write it up as a two-minute brief
- [ ] Afterwards: decisions, and actions with owners and dates, into the project's TASKS.md
```

## Weekly review

Sunday evening or Monday morning, or on request.

```
Weekly review progress:
- [ ] Last week: what shipped and what slipped
- [ ] This week's big rocks
- [ ] One line of health per active project (green, amber, red), from Projects/MEMORY.md
- [ ] The week's anchors and travel
- [ ] Home admin due
- [ ] Route every line in INBOX.md, then clear it
- [ ] Clashes to fix before the week fills
- [ ] The strategic split from Ray's effort check, and whether the top queue item moved
```
