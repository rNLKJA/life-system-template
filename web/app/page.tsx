import { FileCode2, FolderTree, BookOpen, ShieldCheck, ArrowRight, CheckCircle2, FileText, Folder } from 'lucide-react'
import Link from 'next/link'
import { VaultNavigator } from '@/components/vault-navigator'
import { HeroArtwork } from '@/components/hero-artwork'
import { FloatingCard } from '@/components/floating-card'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Background gradient and grain */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />
        {/* Primary emerald glow */}
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 size-[46rem] -translate-x-1/2 rounded-full bg-[hsl(var(--emerald))]/20 blur-[120px]"
        />
        {/* Secondary cyan accent */}
        <div
          aria-hidden="true"
          className="absolute top-20 right-1/4 -z-10 size-[32rem] rounded-full bg-[hsl(var(--cyan))]/12 blur-[100px]"
        />

        {/* Header */}
        <header className="border-b border-white/10 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl">
            {/* Intentionally empty — the hero eyebrow below carries the label */}
          </div>
        </header>

        <main id="main">
          {/* Hero */}
          <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24 lg:pb-32">
            <div>
              <p className="kicker text-primary">Personal life OS</p>
              <h1 className="mt-4 font-display text-[clamp(3rem,7vw+1rem,6.5rem)] leading-[0.98] font-bold tracking-[-0.03em]">
                A shared vault for you and your{' '}
                <em className="text-primary not-italic">AI agents</em>.<span aria-hidden="true" className="select-none opacity-0">LS</span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
                One Obsidian vault. A clear folder hierarchy. Areas hold your ongoing work, projects serve areas, and archives keep what is finished. This is the backbone of a personal operating system that both you and AI agents can understand and maintain together.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                I built this as a starting structure for a personal knowledge vault that both I and AI agents can read: one <strong className="font-semibold text-foreground">AGENTS.md</strong> for instructions, plain folders for notes, and nothing clever in between.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/rNLKJA/life-system-template"
                  className="group relative inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[0.95rem] font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-1 ring-inset ring-white/10 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Clone the template
                </a>
                <a
                  href="#about"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-secondary/50 backdrop-blur-sm px-7 text-[0.95rem] font-medium text-secondary-foreground transition-all hover:bg-secondary hover:border-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Learn more
                </a>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Built for{' '}
                <a href="https://obsidian.md" className="font-medium text-primary underline-offset-4 hover:underline">
                  Obsidian
                </a>
                {' '}and{' '}
                <a href="https://claude.com" className="font-medium text-primary underline-offset-4 hover:underline">
                  AI agents
                </a>
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <HeroArtwork />
              <FloatingCard />
            </div>
          </section>
        </main>
      </div>

      {/* Live structure stats */}
      <section aria-labelledby="stats" className="border-y border-white/10 bg-deep">
        <h2 id="stats" className="sr-only">
          Template structure
        </h2>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
          {[
            { label: 'Core files', value: '4', tone: 'text-[hsl(var(--emerald))]' },
            { label: 'Top-level folders', value: '6', tone: 'text-[hsl(var(--emerald))]' },
            { label: 'Scripts', value: '3', tone: 'text-[hsl(var(--cyan))]' },
            { label: 'MIT licence', value: '✓', tone: 'text-[hsl(var(--cyan))]' },
          ].map((s) => (
            <div key={s.label} className="px-2 py-8 text-center md:py-10">
              <dt className="kicker text-muted-foreground">{s.label}</dt>
              <dd className={`mt-2 font-display text-4xl font-semibold sm:text-5xl ${s.tone}`}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-title"
        className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6"
      >
        <p className="kicker text-primary">Building blocks</p>
        <h2
          id="features-title"
          className="mt-3 max-w-2xl font-display text-6xl font-bold tracking-tight lg:text-7xl"
        >
          What you get
        </h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          <li className="relative rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5">
            <span className="absolute top-6 right-7 font-mono text-sm text-muted-foreground">
              01
            </span>
            <FileCode2 className="size-8 text-[hsl(var(--emerald))]" aria-hidden="true" />
            <h3 className="mt-6 font-display text-2xl font-semibold">Agent Contract</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
              One <strong className="font-semibold text-foreground">AGENTS.md</strong> at the root defines how all agents work here: precedence, planning, memory, logging and naming.
            </p>
          </li>
          <li className="relative rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5">
            <span className="absolute top-6 right-7 font-mono text-sm text-muted-foreground">
              02
            </span>
            <FolderTree className="size-8 text-[hsl(var(--cyan))]" aria-hidden="true" />
            <h3 className="mt-6 font-display text-2xl font-semibold">Areas as the Backbone</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Areas hold your ongoing responsibilities (career, money, home, health), projects serve areas, archives hold what is finished.
            </p>
          </li>
          <li className="relative rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5">
            <span className="absolute top-6 right-7 font-mono text-sm text-muted-foreground">
              03
            </span>
            <BookOpen className="size-8 text-[hsl(var(--amber))]" aria-hidden="true" />
            <h3 className="mt-6 font-display text-2xl font-semibold">Smart Memory</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
              MEMORY.md stays small (300-line ceiling). LOG.md is append-only. ARCHIVE.md holds what used to be true. INBOX.md for later.
            </p>
          </li>
        </ol>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Link
            href="#explore"
            className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5 transition-colors hover:border-[hsl(var(--emerald))]/50"
          >
            <Folder className="size-9 shrink-0 text-[hsl(var(--emerald))]" aria-hidden="true" />
            <span>
              <span className="block text-lg font-semibold">Six top-level folders</span>
              <span className="mt-1 block text-[0.9375rem] text-muted-foreground">
                Areas, Projects, HQ, Knowledge, Archive and Resources.
              </span>
            </span>
            <ArrowRight
              className="ml-auto size-5 shrink-0 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5">
            <ShieldCheck className="size-9 shrink-0 text-[hsl(var(--cyan))]" aria-hidden="true" />
            <span>
              <span className="block text-lg font-semibold">Privacy by convention</span>
              <span className="mt-1 block text-[0.9375rem] text-muted-foreground">
                Any folder named Records/ is gitignored, so personal papers never reach GitHub.
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Vault Navigator */}
      <section
        id="explore"
        aria-labelledby="explore-title"
        className="scroll-mt-20 border-y border-white/10 bg-deep"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
          <p className="kicker text-primary">Explore</p>
          <h2
            id="explore-title"
            className="mt-3 font-display text-6xl font-bold tracking-tight lg:text-7xl"
          >
            Browse the template
          </h2>
          <div className="mt-10">
            <VaultNavigator />
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section
        aria-labelledby="start-title"
        className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6"
      >
        <p className="kicker text-primary">Getting started</p>
        <h2
          id="start-title"
          className="mt-3 font-display text-6xl font-bold tracking-tight lg:text-7xl"
        >
          Three commands to set up your vault.
        </h2>
        <div className="mt-10 rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <span className="kicker text-muted-foreground">Step 1</span>
              <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
                git clone github.com/your-user/life-system-template
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Clone the template to your machine
              </p>
            </div>
            <div>
              <span className="kicker text-muted-foreground">Step 2</span>
              <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
                python3 scripts/init.py
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Initialize the vault structure
              </p>
            </div>
            <div>
              <span className="kicker text-muted-foreground">Step 3</span>
              <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
                python3 scripts/check.py
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Verify the setup is complete
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-card p-7 shadow-xl shadow-black/5">
            <FileText className="size-8 text-primary" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Core files</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Contract</dt>
                <dd className="font-mono text-foreground">AGENTS.md</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Memory</dt>
                <dd className="font-mono text-foreground">MEMORY.md</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Log</dt>
                <dd className="font-mono text-foreground">LOG.md</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Archive</dt>
                <dd className="font-mono text-foreground">ARCHIVE.md</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-7 shadow-xl shadow-black/5">
            <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Then open it</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Open the folder as a vault in Obsidian and start your agent session. Agents will read AGENTS.md and follow the system you define.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The 300-line ceiling on memory files forces you to archive what is no longer current, and that discipline alone makes agents far more useful.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-20 border-t border-white/10 bg-deep"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="kicker text-primary">About this template</p>
            <h2
              id="about-title"
              className="mt-3 font-display text-6xl font-bold tracking-tight lg:text-7xl"
            >
              A file-based personal OS.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              This is a generic template adapted from a personal life-system vault used daily, with all personal detail removed. The system provides three verified scripts: <span className="font-mono text-foreground">check.py</span>, <span className="font-mono text-foreground">vault-link.py</span> and <span className="font-mono text-foreground">paths-check.py</span>.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Provenance.</strong> Everything here is plain Markdown that you, your team and your AI agents can read and update together. The folder structure follows the PARA method (Projects, Areas, Resources, Archives) adapted for AI collaboration.
            </p>
            <div className="mt-7 rounded-3xl border border-primary/20 bg-primary/5 p-7 shadow-xl shadow-primary/5">
              <h3 className="font-display text-2xl font-semibold text-foreground">What I learned</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Building this taught me that the structure matters more than the tools. A good naming convention is worth a thousand tags. The 300-line ceiling on memory files forces you to archive what is no longer current, and that discipline alone makes agents far more useful. The append-only log turned out to be the one source of truth I could always trust.
              </p>
            </div>
          </div>
          <div className="grid content-start gap-5">
            <div className="rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5">
              <h3 className="font-display text-2xl font-semibold">Key principles</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">Areas</strong> are ongoing responsibilities that never truly finish
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">Projects</strong> serve areas and have a done state
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">Memory</strong> stays under 300 lines by archiving old truths
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">Log</strong> is append-only and never edited
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-card p-8 shadow-xl shadow-black/5">
              <p className="text-sm text-muted-foreground">
                MIT licence. Built for humans and agents. Deployed at{' '}
                <a
                  href="https://rin.contact"
                  className="font-medium text-primary hover:underline"
                >
                  rin.contact
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary/25 via-card to-primary/20 px-8 py-16 text-center shadow-2xl shadow-primary/10 sm:px-12 sm:py-20">
          <h2 id="cta-title" className="font-display text-6xl font-bold tracking-tight lg:text-7xl">
            Start building your vault.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Clone the template, run the setup scripts, and open it in Obsidian. Your agents will read AGENTS.md and follow the system you define.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/rNLKJA/life-system-template"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[0.95rem] font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Clone on GitHub
            </a>
            <a
              href="#features-title"
              className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-6 text-[0.95rem] font-medium text-secondary-foreground transition-all hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Read the features
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            <a
              href="https://rin.contact"
              className="text-primary hover:underline"
            >
              Made by Rin in Adelaide
            </a>
          </p>
          <p className="mt-2">MIT Licence</p>
        </div>
      </footer>
    </div>
  )
}
