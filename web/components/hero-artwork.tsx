export function HeroArtwork() {
  return (
    <div className="arch relative aspect-[4/5] w-full max-w-md overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(189,147,249,0.55)]">
      <svg
        viewBox="0 0 400 500"
        className="h-full w-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Grain texture */}
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="5" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 0 0 0.08" />
            </feComponentTransfer>
          </filter>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="18" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Paper sheet gradients - warm tones */}
          <linearGradient id="paper1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(35, 35%, 96%)" />
            <stop offset="50%" stopColor="hsl(30, 30%, 94%)" />
            <stop offset="100%" stopColor="hsl(28, 28%, 92%)" />
          </linearGradient>

          <linearGradient id="paper2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(32, 32%, 95%)" />
            <stop offset="50%" stopColor="hsl(28, 28%, 93%)" />
            <stop offset="100%" stopColor="hsl(25, 25%, 91%)" />
          </linearGradient>

          <linearGradient id="paper3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(30, 30%, 97%)" />
            <stop offset="50%" stopColor="hsl(28, 28%, 95%)" />
            <stop offset="100%" stopColor="hsl(26, 26%, 93%)" />
          </linearGradient>

          <linearGradient id="paper4" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="hsl(33, 33%, 98%)" />
            <stop offset="100%" stopColor="hsl(28, 28%, 94%)" />
          </linearGradient>

          {/* Violet light gradients */}
          <radialGradient id="violetGlow1" cx="20%" cy="30%">
            <stop offset="0%" stopColor="hsl(265, 85%, 78%)" stopOpacity="0.5" />
            <stop offset="40%" stopColor="hsl(265, 70%, 65%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(265, 50%, 58%)" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="violetGlow2" cx="80%" cy="70%">
            <stop offset="0%" stopColor="hsl(270, 80%, 75%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(268, 65%, 62%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(265, 50%, 58%)" stopOpacity="0" />
          </radialGradient>

          {/* Edge light */}
          <linearGradient id="edgeLight1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(265, 85%, 78%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(265, 85%, 78%)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="edgeLight2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(270, 80%, 75%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(270, 80%, 75%)" stopOpacity="0" />
          </linearGradient>

          {/* Shadows */}
          <linearGradient id="shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(30, 15%, 30%)" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(30, 15%, 30%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Background violet glows */}
        <ellipse cx="80" cy="150" rx="180" ry="140" fill="url(#violetGlow1)" />
        <ellipse cx="320" cy="350" rx="160" ry="120" fill="url(#violetGlow2)" />

        {/* Layered paper sheets */}

        {/* Back sheet - most rotated */}
        <g transform="translate(20, 80) rotate(-12, 180, 210)">
          <rect
            x="0"
            y="0"
            width="360"
            height="420"
            rx="20"
            fill="url(#paper1)"
            stroke="hsl(30, 20%, 85%)"
            strokeWidth="1"
            opacity="0.6"
          />
          <rect x="0" y="400" width="360" height="20" fill="url(#shadow)" opacity="0.4" rx="0 0 20 20" />
        </g>

        {/* Second sheet */}
        <g transform="translate(40, 60) rotate(-6, 160, 220)">
          <rect
            x="0"
            y="0"
            width="320"
            height="440"
            rx="18"
            fill="url(#paper2)"
            stroke="hsl(28, 22%, 83%)"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <rect x="0" y="420" width="320" height="20" fill="url(#shadow)" opacity="0.5" rx="0 0 18 18" />
        </g>

        {/* Third sheet */}
        <g transform="translate(60, 40) rotate(-2, 140, 230)">
          <rect
            x="0"
            y="0"
            width="280"
            height="460"
            rx="16"
            fill="url(#paper3)"
            stroke="hsl(26, 24%, 81%)"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <rect x="0" y="440" width="280" height="20" fill="url(#shadow)" opacity="0.6" rx="0 0 16 16" />
        </g>

        {/* Front sheet - straight, with violet edge lights */}
        <g transform="translate(80, 20)">
          <rect
            x="0"
            y="0"
            width="240"
            height="480"
            rx="14"
            fill="url(#paper4)"
            stroke="hsl(28, 26%, 80%)"
            strokeWidth="2"
          />

          {/* Violet light on left edge */}
          <rect x="0" y="0" width="6" height="480" fill="url(#edgeLight1)" filter="url(#glow)" rx="14 0 0 14" />

          {/* Violet light on right edge */}
          <rect x="234" y="0" width="6" height="480" fill="url(#edgeLight2)" filter="url(#glow)" rx="0 14 14 0" />

          {/* Bottom shadow */}
          <rect x="0" y="460" width="240" height="20" fill="url(#shadow)" opacity="0.7" rx="0 0 14 14" />
        </g>

        {/* Grain overlay */}
        <rect x="0" y="0" width="400" height="500" filter="url(#grain)" opacity="0.5" pointerEvents="none" />
      </svg>

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#21222c]/70 via-transparent to-transparent" />
    </div>
  )
}
