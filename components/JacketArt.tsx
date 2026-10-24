/**
 * Placeholder jacket illustration, tinted per colour variant.
 * Swap for <Image> with real photos once you have them.
 */
export function JacketArt({ color, label, className = "" }: { color: string; label: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={label} className={className}>
      <ellipse cx="100" cy="188" rx="64" ry="6" fill="#1C1B1F" opacity="0.12" />
      {/* body + sleeves */}
      <path
        d="M68 34 L100 46 L132 34 L172 56 L182 134 L156 140 L150 104 L150 178 Q100 187 50 178 L50 104 L44 140 L18 134 L28 56 Z"
        fill={color}
        stroke="#1C1B1F"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* sleeve shading */}
      <path d="M28 56 L18 134 L44 140 L50 104 L50 62 Z" fill="#000" opacity="0.1" />
      <path d="M172 56 L182 134 L156 140 L150 104 L150 62 Z" fill="#000" opacity="0.1" />
      {/* cuffs */}
      <path d="M18 134 L44 140 L43 150 L16 144 Z" fill="#000" opacity="0.2" />
      <path d="M182 134 L156 140 L157 150 L184 144 Z" fill="#000" opacity="0.2" />
      {/* collar */}
      <path d="M68 34 L100 46 L132 34 L126 22 Q100 32 74 22 Z" fill="#000" opacity="0.22" />
      {/* zipper */}
      <path d="M100 46 V181" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="2 3" />
      {/* pockets */}
      <path d="M62 124 H86" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      <path d="M114 124 H138" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      {/* hem */}
      <path d="M50 168 Q100 177 150 168" stroke="#000" strokeOpacity="0.18" strokeWidth="2" fill="none" />
    </svg>
  );
}
