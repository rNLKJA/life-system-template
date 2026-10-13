import Image from 'next/image'

export function HeroArtwork() {
  return (
    <div className="arch relative aspect-[4/5] w-full overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(189,147,249,0.55)]">
      <Image
        src="/images/hero-visual.svg"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 28rem, 90vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep))]/40 via-transparent to-transparent" />
    </div>
  )
}
