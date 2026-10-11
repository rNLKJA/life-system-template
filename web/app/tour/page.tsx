export default function TourPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-black px-6 py-8 dark:border-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">Guided Tour</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Walk through the life-system-template
          </p>
        </div>
      </header>

      <div className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              Tour Videos
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Tour videos will be recorded and embedded here using Playwright.
            </p>
          </section>

          <section className="border border-black p-6 dark:border-white">
            <h2 className="mb-4 font-mono font-bold uppercase tracking-wider">
              What is a life system?
            </h2>
            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
              A life system is a set of interconnected notes and folders that
              hold your goals, projects, areas of responsibility and the papers
              that support them. It is shared between you and your AI agents.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              The key insight is that everything is Markdown: plain text that
              both humans and agents can read, update and understand.
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
