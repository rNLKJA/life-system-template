export function FloatingCard() {
  return (
    <div className="absolute -right-2 top-8 rotate-2 transition-transform hover:rotate-0 hover:scale-105 sm:-right-6">
      <div className="rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-xl backdrop-blur transition-shadow hover:shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <span className="font-mono text-sm font-semibold text-primary">=</span>
          </div>
          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              Behaviour contract
            </div>
            <div className="mt-0.5 font-mono text-sm font-medium text-foreground">
              AGENTS.md
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-success"></div>
            <span className="font-mono">Active</span>
          </div>
          <span>·</span>
          <span className="font-mono">9,509 bytes</span>
        </div>
      </div>
    </div>
  )
}
