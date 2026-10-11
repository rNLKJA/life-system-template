export default function TourPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-border px-gutter py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-5xl font-bold text-primary">
            Guided Tour
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Explore the life-system-template
          </p>
        </div>
      </header>

      <div className="flex-1 px-gutter py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16">
          {/* Screenshot Gallery */}
          <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
              Design showcase
            </h2>
            <div className="grid gap-6 sm:grid-cols-1">
              {/* Screenshot 1: Light mode home page */}
              <figure>
                <div className="mb-4 overflow-hidden rounded-lg border border-border bg-stone-50">
                  <img
                    src="/tour/home-light-1440.png"
                    alt="Home page in light mode at 1440px width"
                    width={1440}
                    height={900}
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-muted-foreground">
                  Home page with hero section and feature cards (light mode)
                </figcaption>
              </figure>

              {/* Screenshot 2: Dark mode home page */}
              <figure>
                <div className="mb-4 overflow-hidden rounded-lg border border-border bg-stone-950">
                  <img
                    src="/tour/home-dark-1440.png"
                    alt="Home page in dark mode at 1440px width"
                    width={1440}
                    height={900}
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-muted-foreground">
                  Home page in dark mode with Obsidian-inspired violet accents
                </figcaption>
              </figure>

              {/* Screenshot 3: Mobile responsive */}
              <figure>
                <div className="mb-4 overflow-hidden rounded-lg border border-border bg-stone-50 sm:max-w-sm">
                  <img
                    src="/tour/home-light-390.png"
                    alt="Home page on mobile at 390px width"
                    width={390}
                    height={844}
                    className="w-full"
                  />
                </div>
                <figcaption className="text-sm text-muted-foreground">
                  Responsive design at mobile width (390px)
                </figcaption>
              </figure>
            </div>
          </section>

          {/* What is a life system? */}
          <section className="rounded-lg border border-border bg-secondary p-6 sm:p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
              What is a life system?
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-foreground">
              <p>
                A life system is a set of interconnected notes and folders that hold your
                goals, projects, areas of responsibility and the papers that support them.
                It is shared between you and your AI agents.
              </p>
              <p className="text-muted-foreground">
                The key insight is that everything is Markdown: plain text that both humans
                and agents can read, update and understand.
              </p>
            </div>
          </section>

          {/* Example Structure */}
          <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
              Example structure
            </h2>
            <pre className="overflow-x-auto rounded bg-secondary px-4 py-3 font-mono text-xs text-foreground">
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

          {/* Getting Started */}
          <section className="rounded-lg border border-border bg-secondary p-6 sm:p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
              Getting started
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-foreground">
              <p>1. Clone the template as your own repository</p>
              <p>2. Run the initialisation script to configure your areas</p>
              <p>3. Open the folder in Obsidian</p>
              <p>4. Start an agent session with your Claude Code, Codex or Cursor</p>
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-border px-gutter py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            <a
              href="/"
              className="font-medium text-primary hover:text-primary/80"
            >
              Back to home
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
