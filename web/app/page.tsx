import { FileCode2, FolderTree, BookOpen, ShieldCheck } from 'lucide-react'
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
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />

        {/* Header */}
        <header className="border-b border-white/10 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="kicker text-primary">Personal life OS</p>
          </div>
        </header>

        <main id="main">
          {/* Hero */}
          <section className="mx-auto grid max-w-6xl items-center gap-16 px-4 pt-28 pb-36 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:pt-40 lg:pb-48">
            <div>
              <p className="kicker text-primary">Personal life OS</p>
              <h1 className="mt-4 font-display text-[2.75rem] leading-[1.08] font-bold tracking-tight sm:text-7xl lg:text-[6rem] lg:leading-[1.03]">
                A shared vault for you and your{' '}
                <em className="text-primary not-italic">AI agents</em>.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
                One Obsidian vault. A clear folder hierarchy. Areas hold your ongoing work, projects serve areas, and archives keep what is finished. This is the backbone of a personal operating system that both you and AI agents can understand and maintain together. <strong className="font-semibold text-foreground">AGENTS.md</strong> defines how all agents work here.
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                I built this because I was tired of instructions that drifted between agents, memory that rotted, and vaults where I could not find anything three months later. This is the structure I use every day.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://github.com/rNLKJA/life-system-template"
                  className="group relative inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[0.95rem] font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-1 ring-inset ring-white/10 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0"
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
            <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:scale-110">
              <HeroArtwork />
              <FloatingCard />
            </div>
          </section>
        </main>
      </div>

      {/* Features */}
      <section
        aria-labelledby="features-title"
        className="mx-auto w-full max-w-6xl px-4 py-28 sm:px-6 sm:py-32"
      >
        <p className="kicker text-primary">Building blocks</p>
        <h2
          id="features-title"
          className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight"
        >
          What you get
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          <li className="relative rounded-3xl border border-white/10 bg-card p-6">
            <span className="absolute top-5 right-6 font-mono text-sm text-muted-foreground">
              01
            </span>
            <FileCode2 className="size-7 text-primary" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Agent Contract</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              One <strong className="font-semibold text-foreground">AGENTS.md</strong> at the root defines how all agents work here: precedence, planning, memory, logging and naming.
            </p>
          </li>
          <li className="relative rounded-3xl border border-white/10 bg-card p-6">
            <span className="absolute top-5 right-6 font-mono text-sm text-muted-foreground">
              02
            </span>
            <FolderTree className="size-7 text-primary" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Areas as the Backbone</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Areas hold your ongoing responsibilities (career, money, home, health), projects serve areas, archives hold what is finished.
            </p>
          </li>
          <li className="relative rounded-3xl border border-white/10 bg-card p-6">
            <span className="absolute top-5 right-6 font-mono text-sm text-muted-foreground">
              03
            </span>
            <BookOpen className="size-7 text-primary" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Smart Memory</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              MEMORY.md stays small (300-line ceiling). LOG.md is append-only. ARCHIVE.md holds what used to be true. INBOX.md for later.
            </p>
          </li>
          <li className="relative rounded-3xl border border-white/10 bg-card p-6">
            <span className="absolute top-5 right-6 font-mono text-sm text-muted-foreground">
              04
            </span>
            <ShieldCheck className="size-7 text-primary" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Privacy by Convention</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Any folder named Records/ is gitignored, so personal papers never reach GitHub but stay in your vault.
            </p>
          </li>
        </ol>
      </section>

      {/* Vault Navigator */}
      <section
        aria-labelledby="explore-title"
        className="border-y border-white/10 bg-deep"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <p className="kicker text-primary">Explore</p>
          <h2
            id="explore-title"
            className="mt-3 font-display text-4xl font-semibold tracking-tight"
          >
            Browse the template
          </h2>
          <div className="mt-8">
            <VaultNavigator />
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section
        aria-labelledby="start-title"
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
      >
        <p className="kicker text-primary">Getting started</p>
        <h2
          id="start-title"
          className="mt-3 font-display text-4xl font-semibold tracking-tight"
        >
          Three commands to set up your vault.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <span className="kicker text-muted-foreground">Step 1</span>
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
              git clone github.com/your-user/life-system-template
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <span className="kicker text-muted-foreground">Step 2</span>
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
              python3 scripts/init.py
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <span className="kicker text-muted-foreground">Step 3</span>
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
              python3 scripts/check.py
            </div>
          </div>
        </div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Then open the folder as a vault in Obsidian and start your agent session.
        </p>
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-20 border-t border-white/10 bg-deep"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="kicker text-primary">About this template</p>
            <h2
              id="about-title"
              className="mt-3 font-display text-4xl font-semibold tracking-tight"
            >
              A file-based personal OS.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              This is a generic template adapted from a personal life-system vault used daily, with all personal detail removed. The system provides three verified scripts: <span className="font-mono text-foreground">check.py</span>, <span className="font-mono text-foreground">vault-link.py</span> and <span className="font-mono text-foreground">paths-check.py</span>.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Provenance.</strong> Everything here is plain Markdown that you, your team and your AI agents can read and update together. The folder structure follows the PARA method (Projects, Areas, Resources, Archives) adapted for AI collaboration.
            </p>
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <h3 className="font-display text-lg font-semibold text-foreground">What I learned</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Building this taught me that the structure matters more than the tools. A good naming convention is worth a thousand tags. The 300-line ceiling on memory files forces you to archive what is no longer current, and that discipline alone makes agents far more useful. The append-only log turned out to be the one source of truth I could always trust.
              </p>
            </div>
          </div>
          <div className="grid content-start gap-4">
            <div className="rounded-3xl border border-white/10 bg-card p-6">
              <h3 className="font-display text-xl font-semibold">Key files</h3>
              <dl className="mt-4 space-y-2 text-sm">
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
            <div className="rounded-3xl border border-white/10 bg-card p-6">
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
      <section aria-labelledby="cta-title" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary/25 via-card to-primary/20 px-6 py-12 text-center sm:px-12">
          <h2 id="cta-title" className="font-display text-4xl font-semibold tracking-tight">
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
