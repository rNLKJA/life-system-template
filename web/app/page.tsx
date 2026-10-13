import { FileCode2, FolderTree, BookOpen, ShieldCheck } from 'lucide-react'
import { VaultNavigator } from '@/components/vault-navigator'
import { HeroArtwork } from '@/components/hero-artwork'
import { FloatingCard } from '@/components/floating-card'

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
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
          <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-20 pb-32 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32 lg:pb-40">
            <div>
              <h1 className="font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-[4.5rem]">
                Life System Template
              </h1>
              <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A file-based life and work system that you and your AI agents share. One Obsidian
                vault. One behaviour contract. Areas as the backbone.
              </p>
              <div className="mt-12 flex flex-wrap gap-3">
                <a
                  href="#vault-structure"
                  className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explore the vault
                </a>
                <a
                  href="https://github.com/rNLKJA/life-system-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full border border-white/10 bg-card px-6 text-[0.95rem] font-medium transition-colors hover:border-primary/50"
                >
                  View on GitHub
                </a>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                This is a generic template adapted from a personal life-system vault used daily,
                with all personal detail removed. MIT licence. Built for humans and agents.
              </p>
            </div>
            <div className="relative">
              <HeroArtwork />
              <FloatingCard />
            </div>
          </section>
        </main>
      </div>

      {/* Four principles */}
      <section
        id="principles"
        aria-labelledby="principles-title"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-32 sm:px-6 sm:py-40"
      >
        <p className="kicker text-primary">What you get</p>
        <h2
          id="principles-title"
          className="mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-tight"
        >
          Four principles that hold the system together.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <FileCode2 className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-serif text-2xl font-semibold">Agent Contract</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              One AGENTS.md at the root defines how all agents work here: precedence, planning,
              memory, logging and naming.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <FolderTree className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-serif text-2xl font-semibold">Areas as the Backbone</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Areas hold your ongoing responsibilities (career, money, home, health), projects serve
              areas, archives hold what is finished.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-serif text-2xl font-semibold">Smart Memory</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              MEMORY.md stays small (300-line ceiling). LOG.md is append-only. ARCHIVE.md holds
              what used to be true. INBOX.md for later.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-serif text-2xl font-semibold">Privacy by Convention</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Any folder named Records/ is gitignored, so personal papers never reach GitHub but
              stay in your vault.
            </p>
          </div>
        </div>
      </section>

      {/* Vault structure */}
      <section
        id="vault-structure"
        aria-labelledby="vault-title"
        className="scroll-mt-20 border-t border-white/10 bg-gradient-to-br from-[hsl(var(--surface-2))]/60 to-[hsl(var(--surface-2))]/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6 sm:py-40">
          <p className="kicker text-primary">Structure</p>
          <h2 id="vault-title" className="mt-3 font-serif text-4xl font-semibold tracking-tight">
            Explore the vault structure
          </h2>
          <div className="mt-10">
            <VaultNavigator />
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section
        id="getting-started"
        aria-labelledby="getting-started-title"
        className="scroll-mt-20 border-t border-white/10"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-32 sm:px-6 sm:py-40 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker text-primary">Getting started</p>
            <h2
              id="getting-started-title"
              className="mt-3 font-serif text-4xl font-semibold tracking-tight"
            >
              Three steps to your own vault.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Clone the template, run the initialization script, and verify the structure. Then open
              the folder as a vault in Obsidian and start your agent session.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The system provides three verified scripts: check.py, vault-link.py and
              paths-check.py. Everything here is plain Markdown that you, your team and your AI
              agents can read and update together.
            </p>
          </div>
          <div className="grid content-start gap-4">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                  01
                </div>
                <h3 className="font-serif text-xl font-semibold">Clone the repository</h3>
              </div>
              <div className="mt-4 rounded-lg bg-[hsl(var(--surface-1))] p-4">
                <code className="block overflow-x-auto font-mono text-sm text-foreground/90">
                  git clone github.com/your-user/life-system-template
                </code>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                  02
                </div>
                <h3 className="font-serif text-xl font-semibold">Initialize the vault</h3>
              </div>
              <div className="mt-4 rounded-lg bg-[hsl(var(--surface-1))] p-4">
                <code className="block overflow-x-auto font-mono text-sm text-foreground/90">
                  python3 scripts/init.py
                </code>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                  03
                </div>
                <h3 className="font-serif text-xl font-semibold">Verify structure</h3>
              </div>
              <div className="mt-4 rounded-lg bg-[hsl(var(--surface-1))] p-4">
                <code className="block overflow-x-auto font-mono text-sm text-foreground/90">
                  python3 scripts/check.py
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
            <p>
              <a
                href="https://rin.contact"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Made by Rin in Adelaide
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
