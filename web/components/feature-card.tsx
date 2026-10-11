interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-black p-4 shadow-md dark:border-white dark:shadow-lg">
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="font-mono font-bold uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}
