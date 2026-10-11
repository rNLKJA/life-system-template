export default function TourPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-black px-6 py-8 dark:border-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">Guided Tour</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore the life-system-template
          </p>
        </div>
      </header>

      <div className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              Tour Gallery
            </h2>
            <div className="space-y-8">
              <figure>
                <div className="mb-3 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src="/docs/showcase/01-landing.png"
                    alt="Landing page showing title and introduction"
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-gray-600 dark:text-gray-400">
                  Landing page: life-system-template overview with introduction
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src="/docs/showcase/02-features.png"
                    alt="Features section with four key capabilities"
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-gray-600 dark:text-gray-400">
                  Features: Agent contract, Areas as backbone, Smart memory, Privacy by
                  convention
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src="/docs/showcase/03-vault-expanded.png"
                    alt="Vault navigator with expanded section"
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive vault navigator: expand folders to explore structure
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src="/docs/showcase/04-tour-page.png"
                    alt="Tour page showing gallery and structure"
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-gray-600 dark:text-gray-400">
                  Tour page: Guided walkthroughs and structure examples
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src="/docs/showcase/05-mobile-landing.png"
                    alt="Mobile view of landing page"
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-gray-600 dark:text-gray-400">
                  Mobile responsive: landing page on 390px width
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src="/docs/showcase/06-mobile-features.png"
                    alt="Mobile view of features section"
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-gray-600 dark:text-gray-400">
                  Mobile responsive: features section on mobile device
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              What is a life system?
            </h2>
            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
              A life system is a set of interconnected notes and folders that hold your
              goals, projects, areas of responsibility and the papers that support them.
              It is shared between you and your AI agents.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              The key insight is that everything is Markdown: plain text that both humans
              and agents can read, update and understand.
            </p>
          </section>

          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              Example Structure
            </h2>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 font-mono text-xs dark:bg-gray-900">
{`My Life/
├─ Areas/
│  ├─ Career/
│  ├─ Health/
│  ├─ Finance/
│  └─ Home/
├─ Projects/
├─ HQ/
├─ Knowledge/
├─ Archive/
├─ AGENTS.md
└─ MEMORY.md`}
            </pre>
          </section>

          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              Getting Started
            </h2>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>1. Clone the template as your own repository</p>
              <p>2. Run the initialisation script to configure your areas</p>
              <p>3. Open the folder in Obsidian</p>
              <p>4. Start an agent session with your Claude Code, Codex or Cursor</p>
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-black px-6 py-8 dark:border-white">
        <div className="mx-auto max-w-4xl text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            <a href="/" className="hover:text-accent underline">
              Back to home
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
