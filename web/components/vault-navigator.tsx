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
]

export function VaultNavigator() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="space-y-2">
        {vaultFolders.map((folder) => (
          <button
            key={folder.name}
            onClick={() =>
              setExpanded(expanded === folder.name ? null : folder.name)
            }
            className="group w-full text-left"
          >
            <div className="flex items-start gap-3 rounded-md px-4 py-3 transition-all hover:bg-secondary">
              <span className="mt-0.5 flex-shrink-0 font-mono text-lg text-primary transition-transform group-hover:scale-125">
                {folder.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-foreground">
                  {folder.name}
                </div>
                {expanded === folder.name && (
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {folder.description}
                  </div>
                )}
              </div>
              <span className="mt-0.5 flex-shrink-0 text-xs text-muted-foreground transition-transform group-hover:text-primary">
                {expanded === folder.name ? '−' : '+'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
