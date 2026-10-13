export function HeroArtwork() {
  return (
    <div className="arch relative aspect-[4/5] w-full max-w-md overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(189,147,249,0.55)]">
      <img
        src="/images/hero-artwork.svg"
        alt=""
        className="h-full w-full object-cover"
        aria-hidden="true"
      />
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#21222c]/30 via-transparent to-transparent" />
    </div>
  )
}
