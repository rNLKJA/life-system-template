---
name: plan
description: "Structured planning before work that is hard to undo or reaches past {{OWNER}}. Use for /plan, 'let's plan this', 'plan before you start', 'map this out first', and for any request that deletes or moves files, sends something out, writes to a calendar or task tracker, pushes to a remote, or edits an AGENTS.md, CLAUDE.md, MEMORY.md or SKILL.md. Also use when a request is ambiguous enough that two readings would produce materially different work. Local, reversible work (reading, searching, analysing, drafting into Scratch/) proceeds without a plan however many steps it takes."
metadata:
  version: "1.0"
  updated: "2026-10-05"
---

# Plan mode

Plan before work that is hard to undo or reaches someone other than {{OWNER}}, then wait for their explicit approval before changing anything. The test is reversibility and reach, never step count (root `AGENTS.md` §4). A minute spent planning is cheaper than finding out halfway through that the work touched the wrong files or answered the wrong question.

## Checklist

Copy this into your reply and tick items off as you go:

```
Plan progress:
- [ ] 1. Research: load the context this task needs
- [ ] 2. Clarify: ask only the questions that would change the plan
- [ ] 3. Plan: fill in the template
- [ ] 4. Approval: wait for an explicit yes
- [ ] 5. Execute: work through the approved steps
- [ ] 6. Save: write the plan to Scratch/plans/
```

**1. Research.** Every path in this skill and in the plan is relative to the workspace root, the folder holding `AGENTS.md` and `.agents/skills/`: find it first, and read live files only (root `AGENTS.md` §9). Gather context silently and quickly: the root `MEMORY.md` and that of the project or area involved, the routing map in root `AGENTS.md` §8, the files the task is likely to touch, and any recorded decisions, dependencies or blockers. Skim for what this task needs rather than loading everything.

**2. Clarify.** Ask two to four targeted questions in one message, and only about ambiguities that would change the plan: scope (what is in and what is out), approach (when two ways are plausible), output format and location, and constraints such as a deadline, tone or dependencies. When the intent is clear from context, ask one question or none. Wait for the answers before planning. An example is in [references/plan-template.md](references/plan-template.md).

**3. Plan.** Fill in the template in [references/plan-template.md](references/plan-template.md). Make it specific enough that a future session could execute it without guessing, and keep it minimal: each step is a meaningful unit of work, with no padding for obvious or trivially fast steps. Add a Mermaid diagram when the flow branches or spans workstations.

**4. Approval.** Start nothing until {{OWNER}} approves explicitly: "approved", "build", "go ahead", "do it", "yes" or "looks good". If they ask for changes, revise and re-present the plan; never execute part of an unapproved plan. If they approve with a modification ("approved, but skip step 3"), confirm the updated plan in one sentence, then start. Approval covers this task only, so the next task starts at the gate again.

**5. Execute.** Work through the approved steps in order and finish each one before the next. Speak up only when a step changes the picture. If a step surfaces a blocker or shows that the plan needs to change, stop and flag it rather than improvising.

**6. Save.** When the work is done, or when the plan is substantial enough that {{OWNER}} may want to resume it later, save it to `Scratch/plans/YYYY-MM-DD-<task-slug>-plan.md` and set its status to `COMPLETED`, or `IN PROGRESS` if paused. This leaves a light audit trail for picking up interrupted work.

## Quick reference

| Phase | What happens | Output |
|---|---|---|
| 1. Research | Memory, routing map, affected files | Silent context |
| 2. Clarify | Two to four targeted questions, or none | {{OWNER}}'s answers |
| 3. Plan | Template with goal, scope, steps and files | Plan document |
| 4. Approve | Hard stop until explicit approval | Go or no-go |
| 5. Execute | Approved steps in order; flag changes of direction | Done work |
| 6. Save | Persist to `Scratch/plans/` | .md file |
