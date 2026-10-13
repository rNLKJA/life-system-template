export default function TourPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-primary">
            Explore
          </div>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Guided Tour
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Explore the life-system-template
          </p>
        </div>
      </header>

      <div className="flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          <section className="rounded-xl border border-white/10 bg-card p-card">
            <h2 className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
              Walkthrough Videos
            </h2>
            <div className="space-y-8">
              <figure>
                <div className="mb-3 overflow-hidden rounded-lg border border-border">
                  <video
                    controls
                    width="1280"
                    height="800"
                    poster="/docs/showcase/videos/tour-01-landing-poster.jpg"
                    className="w-full"
                  >
                    <source src="/docs/showcase/videos/tour-01-landing.mp4" type="video/mp4" />
                    <track
                      kind="captions"
                      src="/docs/showcase/videos/tour-01-landing.vtt"
                      srcLang="en"
                      label="English"
                      default
                    />
                  </video>
                </div>
                <figcaption className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Landing page walkthrough</strong>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                    <li>Landing on life-system-template home page</li>
                    <li>Viewing the hero section and feature cards</li>
                    <li>Exploring the vault structure navigator</li>
                  </ul>
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden rounded-lg border border-border">
                  <video
                    controls
                    width="1280"
                    height="800"
                    poster="/docs/showcase/videos/tour-02-features-poster.jpg"
                    className="w-full"
                  >
                    <source src="/docs/showcase/videos/tour-02-features.mp4" type="video/mp4" />
                    <track
                      kind="captions"
                      src="/docs/showcase/videos/tour-02-features.vtt"
                      srcLang="en"
                      label="English"
                      default
                    />
                  </video>
                </div>
                <figcaption className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Features overview</strong>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                    <li>Scrolling to the features section</li>
                    <li>Reading feature cards: Agent Contract, Areas, Memory</li>
                    <li>Viewing Privacy by Convention details</li>
                  </ul>
                </figcaption>
              </figure>

              <figure>
                <div className="mb-3 overflow-hidden rounded-lg border border-border">
                  <video
                    controls
                    width="1280"
                    height="800"
                    poster="/docs/showcase/videos/tour-03-tour-poster.jpg"
                    className="w-full"
                  >
                    <source src="/docs/showcase/videos/tour-03-tour.mp4" type="video/mp4" />
                    <track
                      kind="captions"
                      src="/docs/showcase/videos/tour-03-tour.vtt"
                      srcLang="en"
                      label="English"
                      default
                    />
                  </video>
                </div>
                <figcaption className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Tour page exploration</strong>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                    <li>Navigating to the tour page</li>
                    <li>Viewing tour introduction and walkthrough</li>
                    <li>Exploring tour video gallery</li>
                  </ul>
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-card p-card">
            <h2 className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
              What is a life system?
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              A life system is a set of interconnected notes and folders that hold your
              goals, projects, areas of responsibility and the papers that support them.
              It is shared between you and your AI agents.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The key insight is that everything is Markdown: plain text that both humans
              and agents can read, update and understand.
            </p>
          </section>

          <section className="rounded-xl border border-white/10 bg-card p-card">
            <h2 className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
              Example Structure
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-muted/30 p-4 font-mono text-xs text-foreground">
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

          <section className="rounded-xl border border-white/10 bg-card p-card">
            <h2 className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
              Getting Started
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>1. Clone the template as your own repository</p>
              <p>2. Run the initialisation script to configure your areas</p>
              <p>3. Open the folder in Obsidian</p>
              <p>4. Start an agent session with your Claude Code, Codex or Cursor</p>
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
          <p>
            <a href="/" className="text-primary hover:underline">
              Back to home
            </a>
            {' · '}
            <a href="https://rin.contact" className="text-primary hover:underline">
              Made by Rin in Adelaide
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
