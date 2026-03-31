
 
export default function CrescentPanel() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-screen bg-[#080808] overflow-hidden">
 
      {/* subtle radial glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
      />
 
      <svg
        width="500"
        height="460"
        viewBox="0 0 500 460"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="sv_main" x1="5%" y1="0%" x2="95%" y2="100%">
            <stop offset="0%"   stopColor="#f8f8f8"/>
            <stop offset="20%"  stopColor="#c0c0c0"/>
            <stop offset="42%"  stopColor="#ffffff"/>
            <stop offset="62%"  stopColor="#b8b8b8"/>
            <stop offset="82%"  stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#888888"/>
          </linearGradient>
          <linearGradient id="sv_ext" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4a4a4a"/>
            <stop offset="50%"  stopColor="#2a2a2a"/>
            <stop offset="100%" stopColor="#111111"/>
          </linearGradient>
          <linearGradient id="sv_rim" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#aaaaaa"/>
            <stop offset="100%" stopColor="#333333"/>
          </linearGradient>
          <linearGradient id="gd_main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f0d080"/>
            <stop offset="35%"  stopColor="#d4a94e"/>
            <stop offset="100%" stopColor="#7a4e10"/>
          </linearGradient>
          <linearGradient id="sv_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.55"/>
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
        </defs>
 
        <g transform="translate(240,220) rotate(-6)">
          {/* extrusion layers */}
          <path d="M120,105 C120,148 88,182 46,182 C4,182 -28,148 -28,105 C-28,62 4,28 46,28 C22,46 14,72 14,105 C14,142 30,164 56,164 C90,164 120,138 120,105 Z"
            fill="#040404" transform="translate(10,14)"/>
          <path d="M120,105 C120,148 88,182 46,182 C4,182 -28,148 -28,105 C-28,62 4,28 46,28 C22,46 14,72 14,105 C14,142 30,164 56,164 C90,164 120,138 120,105 Z"
            fill="#181818" transform="translate(6,9)"/>
          <path d="M120,105 C120,148 88,182 46,182 C4,182 -28,148 -28,105 C-28,62 4,28 46,28 C22,46 14,72 14,105 C14,142 30,164 56,164 C90,164 120,138 120,105 Z"
            fill="url(#sv_ext)" transform="translate(3,5)"/>
          <path d="M120,105 C120,148 88,182 46,182 C4,182 -28,148 -28,105 C-28,62 4,28 46,28 C22,46 14,72 14,105 C14,142 30,164 56,164 C90,164 120,138 120,105 Z"
            fill="url(#sv_rim)" transform="translate(1,2)" opacity="0.5"/>
 
          {/* silver face */}
          <path d="M120,105 C120,148 88,182 46,182 C4,182 -28,148 -28,105 C-28,62 4,28 46,28 C22,46 14,72 14,105 C14,142 30,164 56,164 C90,164 120,138 120,105 Z"
            fill="url(#sv_main)" stroke="#555" strokeWidth="0.5"/>
 
          {/* inner hollow */}
          <path d="M98,105 C98,136 78,158 52,160 C72,154 82,132 82,105 C82,78 70,56 50,50 C68,54 98,72 98,105 Z"
            fill="#080808"/>
 
          {/* sheen */}
          <path d="M120,105 C120,148 88,182 46,182 C4,182 -28,148 -28,105 C-28,62 4,28 46,28 C22,46 14,72 14,105 C14,142 30,164 56,164 C90,164 120,138 120,105 Z"
            fill="url(#sv_sheen)" opacity="0.45"/>
 
          {/* connection lines */}
          <line x1="120" y1="38"  x2="152" y2="14"  stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="152" y1="14"  x2="186" y2="52"  stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="186" y1="52"  x2="178" y2="96"  stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="178" y1="96"  x2="148" y2="126" stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="120" y1="38"  x2="186" y2="52"  stroke="#c9a96e" strokeWidth="1"   opacity="0.25"/>
          <line x1="152" y1="14"  x2="178" y2="96"  stroke="#c9a96e" strokeWidth="1"   opacity="0.25"/>
 
          {/* gold nodes */}
          <circle cx="120" cy="38"  r="13" fill="url(#gd_main)"/>
          <circle cx="120" cy="38"  r="8"  fill="#1a0e00"/>
          <circle cx="122" cy="35"  r="4"  fill="#f5e090" opacity="0.75"/>
 
          <circle cx="152" cy="14"  r="9"  fill="url(#gd_main)"/>
          <circle cx="152" cy="14"  r="5"  fill="#1a0e00"/>
          <circle cx="154" cy="11"  r="2.5" fill="#f5e090" opacity="0.7"/>
 
          <circle cx="186" cy="52"  r="15" fill="url(#gd_main)"/>
          <circle cx="186" cy="52"  r="9"  fill="#1a0e00"/>
          <circle cx="188" cy="49"  r="5"  fill="#f5e090" opacity="0.78"/>
 
          <circle cx="178" cy="96"  r="10" fill="url(#gd_main)"/>
          <circle cx="178" cy="96"  r="6"  fill="#1a0e00"/>
          <circle cx="180" cy="93"  r="3"  fill="#f5e090" opacity="0.7"/>
 
          <circle cx="148" cy="126" r="8"  fill="url(#gd_main)"/>
          <circle cx="148" cy="126" r="4.5" fill="#1a0e00"/>
          <circle cx="150" cy="123" r="2.5" fill="#f5e090" opacity="0.7"/>
 
          {/* ambient stars */}
          <circle cx="168" cy="130" r="2.5" fill="#c9a96e" opacity="0.45"/>
          <circle cx="200" cy="80"  r="2"   fill="#c9a96e" opacity="0.35"/>
          <circle cx="196" cy="20"  r="1.8" fill="#c9a96e" opacity="0.3"/>
        </g>
 
        {/* wordmark — exactly as in your SVG */}
        <text
          x="250" y="408"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="42"
          letterSpacing="14"
          fontWeight="400"
          fill="#c9a96e"
        >
          CRESCENT
        </text>
        <text
          x="250" y="438"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="11"
          letterSpacing="5"
          fill="#333333"
        >
          YOUR NETWORK, REDEFINED.
        </text>
      </svg>
 
    </div>
  )
}