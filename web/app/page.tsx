import { FeatureCard } from '@/components/feature-card'
import { VaultNavigator } from '@/components/vault-navigator'

function VaultIllustration() {
  return (
    <svg
      viewBox="0 0 400 350"
      className="w-full max-w-md drop-shadow-lg"
      aria-hidden="true"
      role="img"
    >
      <title>Vault folder tree diagram</title>
      <defs>
        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Root vault */}
      <g className="transition-colors duration-300">
        {/* Root folder */}
        <rect
          x="150"
          y="40"
          width="100"
          height="40"
          rx="6"
          fill="url(#vaultGradient)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text x="200" y="65" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold" fill="currentColor" textAnchor="middle">
          VAULT
        </text>

        {/* Connection lines */}
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.5">
          <line x1="200" y1="80" x2="200" y2="110" />
          {/* Branch to Areas */}
          <line x1="200" y1="110" x2="100" y2="130" />
          {/* Branch to Projects */}
          <line x1="200" y1="110" x2="200" y2="130" />
          {/* Branch to Archives */}
          <line x1="200" y1="110" x2="300" y2="130" />
        </g>

        {/* Areas folder */}
        <rect x="50" y="130" width="100" height="40" rx="6" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="2" />
        <text x="100" y="155" fontSize="12" fontFamily="Georgia, serif" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Areas/
        </text>

        {/* Projects folder */}
        <rect x="150" y="130" width="100" height="40" rx="6" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="2" />
        <text x="200" y="155" fontSize="12" fontFamily="Georgia, serif" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Projects/
        </text>

        {/* Archives folder */}
        <rect x="250" y="130" width="100" height="40" rx="6" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="2" />
        <text x="300" y="155" fontSize="12" fontFamily="Georgia, serif" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Archives/
        </text>

        {/* Areas sub-items */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.5">
          <line x1="100" y1="170" x2="100" y2="190" />
          <line x1="100" y1="190" x2="80" y2="200" />
          <line x1="100" y1="190" x2="120" y2="200" />
        </g>
        <rect x="40" y="200" width="70" height="25" rx="3" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <text x="75" y="216" fontSize="9" fontFamily="Georgia, serif" fill="currentColor" textAnchor="middle" opacity="0.9">
          Career
        </text>
        <rect x="90" y="200" width="70" height="25" rx="3" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <text x="125" y="216" fontSize="9" fontFamily="Georgia, serif" fill="currentColor" textAnchor="middle" opacity="0.9">
          Health
        </text>

        {/* Projects sub-items */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.5">
          <line x1="200" y1="170" x2="200" y2="190" />
          <line x1="200" y1="190" x2="180" y2="200" />
          <line x1="200" y1="190" x2="220" y2="200" />
        </g>
        <rect x="140" y="200" width="70" height="25" rx="3" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <text x="175" y="216" fontSize="9" fontFamily="Georgia, serif" fill="currentColor" textAnchor="middle" opacity="0.9">
          Active
        </text>
        <rect x="190" y="200" width="70" height="25" rx="3" fill="url(#vaultGradient)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <text x="225" y="216" fontSize="9" fontFamily="Georgia, serif" fill="currentColor" textAnchor="middle" opacity="0.9">
          Planning
        </text>
      </g>

      {/* Key files */}
      <g transform="translate(80, 250)">
        <rect x="0" y="0" width="240" height="60" rx="6" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
        <text x="10" y="20" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold" fill="currentColor">
          Key Files:
        </text>
        <g fontSize="10" fontFamily="Courier New, monospace" fill="currentColor" opacity="0.8">
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
      <header className="border-b border-gray-200 px-6 py-8 dark:border-gray-800">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium text-accent dark:text-violet-400">Personal life OS</p>
          <h1 className="mt-3 font-display text-6xl sm:text-7xl font-semibold tracking-tight text-black dark:text-white">
            life-system-template
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A file-based life and work system for you and your AI agents. One vault, one behaviour contract, and areas as the backbone.
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
          {/* Hero with visual */}
          <section>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Organized knowledge</p>
                <h2 className="font-display text-4xl font-semibold text-black dark:text-white mb-6 leading-tight">
                  Your vault, intelligently structured
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  One Obsidian vault. A clear folder hierarchy. Areas hold your ongoing work, projects serve areas, and archives keep what is finished. This is the backbone of a personal operating system that both you and AI agents can understand and maintain together.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://github.com/rNLKJA/life-system-template"
                    className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-violet-700 dark:hover:bg-violet-500 transition-colors"
                  >
                    Clone the template
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900 transition-colors"
                  >
                    Learn more
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <VaultIllustration />
              </div>
            </div>
          </section>

          {/* Features grid */}
          <section>
            <div className="mb-12">
              <p className="text-sm font-medium text-accent dark:text-violet-400 mb-2">Building blocks</p>
              <h2 className="font-display text-3xl font-semibold text-black dark:text-white">
                What you get
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
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
            <div className="mb-12">
              <p className="text-sm font-medium text-accent dark:text-violet-400 mb-2">Explore</p>
              <h2 className="font-display text-3xl font-semibold text-black dark:text-white">
                Browse the template
              </h2>
            </div>
            <VaultNavigator />
          </section>

          {/* Usage section */}
          <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-display text-2xl font-semibold text-black dark:text-white mb-6">
              Getting started
            </h2>
            <div className="space-y-4 font-mono text-sm mb-6">
              <div>
                <code className="block bg-white p-3 rounded-lg border border-gray-200 dark:bg-black dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  git clone github.com/your-user/life-system-template
                </code>
              </div>
              <div>
                <code className="block bg-white p-3 rounded-lg border border-gray-200 dark:bg-black dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  python3 scripts/init.py
                </code>
              </div>
              <div>
                <code className="block bg-white p-3 rounded-lg border border-gray-200 dark:bg-black dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  python3 scripts/check.py
                </code>
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Then open the folder as a vault in Obsidian and start your agent session.
            </p>
          </section>

          {/* About section */}
          <section id="about" className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-display text-2xl font-semibold text-black dark:text-white mb-6">
              About
            </h2>
            <div className="space-y-4 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                This is a generic template adapted from a personal life-system vault used daily, with all personal detail removed.
              </p>
              <p>
                The system provides three verified scripts: check.py, vault-link.py and paths-check.py. Everything here is plain Markdown that you, your team and your AI agents can read and update together.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                MIT licence. Built for humans and agents.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 dark:border-gray-800">
        <div className="mx-auto max-w-5xl text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            <a
              href="https://rin.contact"
              className="text-accent dark:text-violet-400 hover:underline"
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
