'use client'

import { useState } from 'react'

interface VaultFolder {
  name: string
  description: string
  icon: string
}

const vaultFolders: VaultFolder[] = [
  {
    name: 'Areas',
    description: 'Your ongoing responsibilities: career, money, home, health',
    icon: '|',
  },
  {
    name: 'Projects',
    description: 'Time-bound projects tagged with the area they serve',
    icon: '[',
  },
  {
    name: 'HQ',
    description: 'Goals, reviews, agent homes and intake tray',
    icon: 'o',
  },
  {
    name: 'Knowledge',
    description: 'One idea per note with its source',
    icon: '^',
  },
  {
    name: 'Archive',
    description: 'Finished projects, old papers and code',
    icon: '-',
  },
  {
    name: 'Resources',
    description: 'Templates, guides, the project kit',
    icon: '~',
  },
]

export function VaultNavigator() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null)

  return (
    <div className="rounded-xl border border-white/10 bg-card p-card">
      <h3 className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        Vault Structure
      </h3>
      <div className="grid gap-3">
        {vaultFolders.map((folder) => (
          <button
            key={folder.name}
            onClick={() =>
              setExpanded(expanded === folder.name ? null : folder.name)
            }
            onMouseEnter={() => setHoveredFolder(folder.name)}
            onMouseLeave={() => setHoveredFolder(null)}
            onFocus={() => setHoveredFolder(folder.name)}
            onBlur={() => setHoveredFolder(null)}
            className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-left transition-colors hover:border-primary/50 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
              <span className="font-mono text-lg font-semibold text-primary">{folder.icon}</span>
            </div>
            <div className="flex-1">
              <div className="font-display text-lg font-semibold text-foreground">
                {folder.name}
              </div>
              {(expanded === folder.name || hoveredFolder === folder.name) && (
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {folder.description}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
