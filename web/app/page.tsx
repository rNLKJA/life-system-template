import { FeatureCard } from '@/components/feature-card'
import { VaultNavigator } from '@/components/vault-navigator'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border px-gutter py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-5xl font-bold text-primary">
            Life System Template
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            A file-based life and work system that you and your AI agents share
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="mx-auto max-w-6xl space-y-16 px-gutter py-12 sm:py-16">
          {/* Hero section */}
          <section className="space-y-4 sm:space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-foreground">
                One Obsidian vault. One behaviour contract. Areas as the
                backbone. This is a starting point for a personal life OS: a
                set of plain Markdown folders that you and any AI agent can
                read and keep up to date.
              </p>
            </div>
          </section>

          {/* Four principles as cards */}
          <section>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
              What you get
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
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
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
              Explore the vault structure
            </h2>
            <VaultNavigator />
          </section>

          {/* Getting Started section */}
          <section className="rounded-lg border border-border bg-secondary p-6 sm:p-8">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Getting started
            </h2>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <code className="block overflow-x-auto rounded bg-background px-3 py-2">
                  git clone github.com/your-user/life-system-template
                </code>
              </div>
              <div>
                <code className="block overflow-x-auto rounded bg-background px-3 py-2">
                  python3 scripts/init.py
                </code>
              </div>
              <div>
                <code className="block overflow-x-auto rounded bg-background px-3 py-2">
                  python3 scripts/check.py
                </code>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Then open the folder as a vault in Obsidian and start your agent
              session.
            </p>
          </section>

          {/* About section */}
          <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
              About
            </h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                This is a generic template adapted from a personal life-system
                vault used daily, with all personal detail removed.
              </p>
              <p>
                The system provides three verified scripts: check.py, vault-link.py
                and paths-check.py. Everything here is plain Markdown that you,
                your team and your AI agents can read and update together.
              </p>
              <p className="text-muted-foreground">
                MIT licence. Built for humans and agents.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-gutter py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            <a
              href="https://rin.contact"
              className="font-medium text-primary hover:text-primary/80"
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
