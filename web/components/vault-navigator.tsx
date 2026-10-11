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
    icon: '◊',
  },
  {
    name: 'Projects',
    description: 'Time-bound projects tagged with the area they serve',
    icon: '■',
  },
  {
    name: 'HQ',
    description: 'Goals, reviews, agent homes and intake tray',
    icon: '●',
  },
  {
    name: 'Knowledge',
    description: 'One idea per note with its source',
    icon: '▲',
  },
  {
    name: 'Archive',
    description: 'Finished projects, old papers and code',
    icon: '□',
  },
]

export function VaultNavigator() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="border border-black bg-white p-4 dark:border-white dark:bg-black">
        <h2 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider">
          Vault Structure
        </h2>
        <div className="grid gap-3">
          {vaultFolders.map((folder) => (
            <button
              key={folder.name}
              onClick={() =>
                setExpanded(expanded === folder.name ? null : folder.name)
              }
              className="flex items-start gap-3 border border-black p-3 text-left transition-colors hover:bg-accent hover:text-white dark:border-white dark:hover:bg-accent"
            >
              <span className="dot-matrix text-lg">{folder.icon}</span>
              <div className="flex-1">
                <div className="font-mono font-bold uppercase tracking-wider">
                  {folder.name}
                </div>
                {expanded === folder.name && (
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {folder.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
