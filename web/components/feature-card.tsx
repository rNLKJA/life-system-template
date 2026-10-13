interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-card shadow-sm transition-colors hover:border-primary/50">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
        <span className="font-mono text-xl font-semibold text-primary">{icon}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
