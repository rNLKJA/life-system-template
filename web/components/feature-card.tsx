interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md">
      <div className="mb-4 text-3xl text-primary transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
