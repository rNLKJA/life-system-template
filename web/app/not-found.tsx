import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-4">
        <div
          aria-hidden="true"
          className="grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 -z-10 size-[42rem] rounded-full bg-primary/15 blur-3xl"
        />

        <div className="mx-auto max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex size-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <FileQuestion className="size-10 text-primary" aria-hidden="true" />
            </div>
          </div>

          <h1 className="font-display text-5xl font-bold tracking-tight">
            Page not found
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            This page does not exist in the vault. It may have been moved to the archive or the path might be wrong.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[0.95rem] font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-1 ring-inset ring-white/10 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Back to home
            </Link>
            <Link
              href="https://github.com/rNLKJA/life-system-template"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-secondary/50 backdrop-blur-sm px-7 text-[0.95rem] font-medium text-secondary-foreground transition-all hover:bg-secondary hover:border-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            <a href="https://rin.contact" className="text-primary hover:underline">
              Made by Rin in Adelaide
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
