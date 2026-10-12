interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-black dark:text-white">{title}</h3>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
