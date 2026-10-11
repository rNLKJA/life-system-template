import { FeatureCard } from '@/components/feature-card'
import { VaultNavigator } from '@/components/vault-navigator'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-black px-6 py-8 dark:border-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">
            life-system-template
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            A file-based life and work system that you and your AI agents
            share
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="mx-auto max-w-4xl space-y-12 px-6 py-12">
          {/* Hero */}
          <section>
            <div className="border border-black p-6 dark:border-white">
              <p className="text-lg leading-relaxed">
                One Obsidian vault. One behaviour contract. Areas as the
                backbone. This is a starting point for a personal life OS: a
                set of plain Markdown folders that you and any AI agent can
                read and keep up to date.
              </p>
            </div>
          </section>

          {/* Features grid */}
          <section>
            <h2 className="mb-6 font-mono text-sm font-bold uppercase tracking-wider">
              What you get
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon="="
                title="Agent Contract"
                description="One AGENTS.md at the root defines how all agents work here: precedence, planning, memory, logging and naming."
              />
              <FeatureCard
                icon="*"
                title="Areas as the Backbone"
                description="Areas hold your ongoing responsibilities (career, money, home, health), projects serve areas, archives hold what is finished."
              />
              <FeatureCard
                icon="#"
                title="Smart Memory"
                description="MEMORY.md stays small (300-line ceiling). LOG.md is append-only. ARCHIVE.md holds what used to be true. INBOX.md for later."
              />
              <FeatureCard
                icon="@"
                title="Privacy by Convention"
                description="Any folder named Records/ is gitignored, so personal papers never reach GitHub but stay in your vault."
              />
            </div>
          </section>

          {/* Vault Navigator */}
          <section>
            <h2 className="mb-6 font-mono text-sm font-bold uppercase tracking-wider">
              Explore
            </h2>
            <VaultNavigator />
          </section>

          {/* Usage section */}
          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              Getting Started
            </h2>
            <div className="space-y-3 font-mono text-sm">
              <div>
                <code className="block bg-gray-100 p-2 dark:bg-gray-900">
                  git clone github.com/your-user/life-system-template
                </code>
              </div>
              <div>
                <code className="block bg-gray-100 p-2 dark:bg-gray-900">
                  python3 scripts/init.py
                </code>
              </div>
              <div>
                <code className="block bg-gray-100 p-2 dark:bg-gray-900">
                  python3 scripts/check.py
                </code>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              Then open the folder as a vault in Obsidian and start your agent
              session.
            </p>
          </section>

          {/* About section */}
          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              About
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                This is a generic template adapted from a personal life-system
                vault used daily, with all personal detail removed.
              </p>
              <p>
                The system provides three verified scripts: check.py, vault-link.py
                and paths-check.py. Everything here is plain Markdown that you,
                your team and your AI agents can read and update together.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                MIT licence. Built for humans and agents.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black px-6 py-8 dark:border-white">
        <div className="mx-auto max-w-4xl text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            <a
              href="https://rin.contact"
              className="hover:text-accent underline"
            >
              Designed at rin.contact
            </a>
          </p>
          <p className="mt-2">MIT Licence</p>
        </div>
      </footer>
    </main>
  )
}
