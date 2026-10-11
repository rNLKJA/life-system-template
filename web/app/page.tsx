import { FeatureCard } from '@/components/feature-card'
import { VaultNavigator } from '@/components/vault-navigator'

function VaultIllustration() {
  return (
    <svg
      viewBox="0 0 400 350"
      className="w-full max-w-sm"
      aria-hidden="true"
      role="img"
    >
      <title>Vault folder tree diagram</title>
      {/* Root vault */}
      <g className="transition-colors duration-300">
        {/* Root folder */}
        <rect
          x="150"
          y="40"
          width="100"
          height="40"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text x="200" y="65" fontSize="12" fontFamily="monospace" fontWeight="bold" fill="currentColor" textAnchor="middle">
          VAULT
        </text>

        {/* Connection lines */}
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.4">
          <line x1="200" y1="80" x2="200" y2="110" />
          {/* Branch to Areas */}
          <line x1="200" y1="110" x2="100" y2="130" />
          {/* Branch to Projects */}
          <line x1="200" y1="110" x2="200" y2="130" />
          {/* Branch to Archives */}
          <line x1="200" y1="110" x2="300" y2="130" />
        </g>

        {/* Areas folder */}
        <rect x="50" y="130" width="100" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="100" y="155" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Areas/
        </text>

        {/* Projects folder */}
        <rect x="150" y="130" width="100" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="200" y="155" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Projects/
        </text>

        {/* Archives folder */}
        <rect x="250" y="130" width="100" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="300" y="155" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Archives/
        </text>

        {/* Areas sub-items */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.4">
          <line x1="100" y1="170" x2="100" y2="190" />
          <line x1="100" y1="190" x2="80" y2="200" />
          <line x1="100" y1="190" x2="120" y2="200" />
        </g>
        <rect x="40" y="200" width="70" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <text x="75" y="216" fontSize="8" fontFamily="monospace" fill="currentColor" textAnchor="middle" opacity="0.8">
          Career
        </text>
        <rect x="90" y="200" width="70" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <text x="125" y="216" fontSize="8" fontFamily="monospace" fill="currentColor" textAnchor="middle" opacity="0.8">
          Health
        </text>

        {/* Projects sub-items */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.4">
          <line x1="200" y1="170" x2="200" y2="190" />
          <line x1="200" y1="190" x2="180" y2="200" />
          <line x1="200" y1="190" x2="220" y2="200" />
        </g>
        <rect x="140" y="200" width="70" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <text x="175" y="216" fontSize="8" fontFamily="monospace" fill="currentColor" textAnchor="middle" opacity="0.8">
          Active
        </text>
        <rect x="190" y="200" width="70" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <text x="225" y="216" fontSize="8" fontFamily="monospace" fill="currentColor" textAnchor="middle" opacity="0.8">
          Planning
        </text>
      </g>

      {/* Key files */}
      <g transform="translate(80, 250)">
        <rect x="0" y="0" width="240" height="60" rx="4" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="10" y="20" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="currentColor">
          Key Files:
        </text>
        <g fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">
          <text x="20" y="38">AGENTS.md</text>
          <text x="110" y="38">MEMORY.md</text>
          <text x="200" y="38">LOG.md</text>
        </g>
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-black px-6 py-8 dark:border-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight">
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
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg border border-black p-6 dark:border-white">
                <p className="text-lg leading-relaxed">
                  One Obsidian vault. One behaviour contract. Areas as the
                  backbone. This is a starting point for a personal life OS: a
                  set of plain Markdown folders that you and any AI agent can
                  read and keep up to date.
                </p>
              </div>
              <div className="flex justify-center">
                <VaultIllustration />
              </div>
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
          <section className="rounded-lg border border-black p-6 dark:border-white">
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
          <section className="rounded-lg border border-black p-6 dark:border-white">
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
