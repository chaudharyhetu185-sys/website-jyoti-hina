/**
 * AmbientVectors — decorative SVG elements and ambient moving vectors per section.
 * Designed with elegant, visible gradients and pure CSS keyframes for maximum performance.
 */
import React from 'react';

// ─── Hero Section Vectors ────────────────────────────────────────────────────
export const HeroVectors = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Slow-drifting grid layer */}
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.14]"
      style={{ animation: 'gridDrift 20s linear infinite' }}
    >
      <defs>
        <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0M0 48V0" stroke="#6366f1" strokeWidth="0.8" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>

    {/* Top-right large rotating orbital rings */}
    <svg
      className="absolute -top-16 -right-16 w-[440px] h-[440px] opacity-[0.28]"
      style={{ animation: 'slowRotate 28s linear infinite' }}
      viewBox="0 0 420 420"
    >
      <circle cx="210" cy="210" r="180" stroke="#6366f1" strokeWidth="1.2" fill="none" strokeDasharray="14 8" />
      <circle cx="210" cy="210" r="140" stroke="#818cf8" strokeWidth="1" fill="none" />
      <circle cx="210" cy="210" r="95" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="6 14" />
      <circle cx="210" cy="30" r="4" fill="#6366f1" />
      <circle cx="390" cy="210" r="4.5" fill="#38bdf8" />
    </svg>

    {/* Bottom-left floating wireframe slide outline */}
    <svg
      className="absolute bottom-12 -left-4 w-52 h-40 opacity-[0.25]"
      style={{ animation: 'floatY 12s ease-in-out infinite' }}
      viewBox="0 0 192 144"
    >
      <rect x="1" y="1" width="190" height="142" rx="8" stroke="#6366f1" strokeWidth="1.5" fill="none" />
      <rect x="12" y="12" width="168" height="120" rx="6" stroke="#818cf8" strokeWidth="1" fill="none" strokeDasharray="4 4" />
      <line x1="12" y1="36" x2="180" y2="36" stroke="#6366f1" strokeWidth="1" />
      <line x1="12" y1="56" x2="120" y2="56" stroke="#818cf8" strokeWidth="1" />
      <line x1="12" y1="72" x2="90" y2="72" stroke="#6366f1" strokeWidth="1" />
    </svg>

    {/* Center-right bezier path with nodes */}
    <svg
      className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-64 opacity-[0.26]"
      style={{ animation: 'pathDraw 16s ease-in-out infinite' }}
      viewBox="0 0 160 240"
    >
      <path d="M80 10 C 140 60, 20 100, 80 150 C 140 200, 30 220, 80 240" stroke="#6366f1" strokeWidth="1.8" fill="none" />
      <circle cx="80" cy="10" r="4" fill="#6366f1" />
      <circle cx="80" cy="150" r="4" fill="#38bdf8" />
      <circle cx="80" cy="240" r="4" fill="#6366f1" />
    </svg>

    {/* Small cross cluster top-left */}
    <svg
      className="absolute top-12 left-12 w-28 h-28 opacity-[0.26]"
      style={{ animation: 'breathe 10s ease-in-out infinite' }}
      viewBox="0 0 96 96"
    >
      {[16, 48, 80].flatMap(x => [16, 48, 80].map(y => (
        <g key={`${x}-${y}`}>
          <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#6366f1" strokeWidth="1.5" />
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#6366f1" strokeWidth="1.5" />
        </g>
      )))}
    </svg>

    {/* Floating slide frame top-center */}
    <svg
      className="absolute top-8 left-1/3 w-36 h-24 opacity-[0.22]"
      style={{ animation: 'floatY 14s ease-in-out infinite 2s' }}
      viewBox="0 0 128 80"
    >
      <rect x="1" y="1" width="126" height="78" rx="6" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
      <line x1="1" y1="22" x2="127" y2="22" stroke="#6366f1" strokeWidth="1" />
      <circle cx="12" cy="11" r="2.5" fill="#38bdf8" />
      <circle cx="20" cy="11" r="2.5" fill="#818cf8" />
      <circle cx="28" cy="11" r="2.5" fill="#6366f1" />
    </svg>
  </div>
);

// ─── Founders Section Vectors ─────────────────────────────────────────────────
export const FoundersVectors = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Subtle Dot Matrix — Top Right Corner */}
    <svg
      className="absolute top-8 right-12 w-32 h-32 opacity-[0.12]"
      style={{ animation: 'breathe 12s ease-in-out infinite' }}
      viewBox="0 0 120 120"
    >
      {[20, 50, 80, 110].flatMap(x => [20, 50, 80, 110].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#6366f1" />
      )))}
    </svg>

    {/* Subtle Floating Mini Badge — Top Left */}
    <svg
      className="absolute top-12 left-10 w-28 h-18 opacity-[0.12]"
      style={{ animation: 'floatY 14s ease-in-out infinite' }}
      viewBox="0 0 112 72"
    >
      <rect x="1" y="1" width="110" height="70" rx="8" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="4 4" />
      <line x1="12" y1="20" x2="60" y2="20" stroke="#818cf8" strokeWidth="1" />
      <line x1="12" y1="36" x2="90" y2="36" stroke="#6366f1" strokeWidth="0.8" />
    </svg>

    {/* Delicate Micro Corner Bracket — Bottom Left */}
    <svg className="absolute bottom-10 left-10 w-16 h-16 opacity-[0.12]" viewBox="0 0 64 64">
      <path d="M0 48 L0 64 L16 64" stroke="#6366f1" strokeWidth="1.2" fill="none" />
      <path d="M48 64 L64 64 L64 48" stroke="#818cf8" strokeWidth="1" fill="none" />
      <circle cx="8" cy="56" r="2" fill="#6366f1" />
    </svg>

    {/* Gentle Floating Ring — Bottom Right */}
    <svg
      className="absolute bottom-12 right-12 w-20 h-20 opacity-[0.10]"
      style={{ animation: 'slowRotate 24s linear infinite' }}
      viewBox="0 0 80 80"
    >
      <circle cx="40" cy="40" r="34" stroke="#818cf8" strokeWidth="1" fill="none" strokeDasharray="6 6" />
      <circle cx="40" cy="6" r="2.5" fill="#6366f1" />
    </svg>
  </div>
);

// ─── Services Section Vectors ─────────────────────────────────────────────────
export const ServicesVectors = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Perspective grid fragment right side */}
    <svg
      className="absolute right-0 top-1/4 w-56 h-72 opacity-[0.24]"
      style={{ animation: 'floatY 18s ease-in-out infinite' }}
      viewBox="0 0 192 256"
    >
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`h${i}`} x1="0" y1={52 * i} x2="192" y2={32 + 32 * i} stroke="#6366f1" strokeWidth="1.2" />
      ))}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={`v${i}`} x1={32 * i} y1="0" x2={16 + 28 * i} y2="256" stroke="#38bdf8" strokeWidth="1" />
      ))}
    </svg>

    {/* Top-left dotted arc */}
    <svg
      className="absolute -top-12 -left-12 w-72 h-72 opacity-[0.28]"
      style={{ animation: 'slowRotate 30s linear infinite' }}
      viewBox="0 0 256 256"
    >
      <path d="M 128 10 A 118 118 0 0 1 246 128" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="6 10" />
      <path d="M 128 10 A 80 80 0 0 1 208 128" stroke="#38bdf8" strokeWidth="1" fill="none" />
      <circle cx="128" cy="10" r="5" fill="#6366f1" />
      <circle cx="246" cy="128" r="4.5" fill="#38bdf8" />
    </svg>

    {/* Small dot trail bottom-center */}
    <svg
      className="absolute bottom-10 left-1/3 w-36 h-14 opacity-[0.30]"
      style={{ animation: 'breathe 9s ease-in-out infinite 0.5s' }}
      viewBox="0 0 128 48"
    >
      {[8, 24, 40, 56, 72, 88, 104, 120].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 === 0 ? 16 : 32} r="3" fill="#6366f1" opacity={0.8 - i * 0.06} />
      ))}
    </svg>
  </div>
);

// ─── Contact Section Vectors ──────────────────────────────────────────────────
export const ContactVectors = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Top-right thin arc stack */}
    <svg
      className="absolute -top-12 -right-12 w-72 h-72 opacity-[0.28]"
      style={{ animation: 'slowRotate 25s linear infinite reverse' }}
      viewBox="0 0 256 256"
    >
      <circle cx="128" cy="128" r="110" stroke="#6366f1" strokeWidth="1.4" fill="none" />
      <circle cx="128" cy="128" r="80" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="10 14" />
      <circle cx="128" cy="128" r="50" stroke="#818cf8" strokeWidth="0.8" fill="none" />
    </svg>

    {/* Bottom-left corner geometry */}
    <svg className="absolute bottom-4 left-4 w-32 h-32 opacity-[0.26]" viewBox="0 0 112 112">
      <path d="M0 80 L80 0 L112 0 L112 112 L0 112 Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
      <path d="M0 112 L112 0" stroke="#38bdf8" strokeWidth="0.8" fill="none" strokeDasharray="5 7" />
    </svg>

    {/* Scanning horizontal glow line */}
    <div
      className="absolute left-0 right-0 h-[2px] opacity-[0.25]"
      style={{
        top: '38%',
        background: 'linear-gradient(90deg, transparent, #6366f1 40%, #38bdf8 60%, transparent)',
        animation: 'scanLine 10s ease-in-out infinite',
      }}
    />

    {/* Floating small slide frame */}
    <svg
      className="absolute top-10 right-14 w-28 h-20 opacity-[0.24]"
      style={{ animation: 'floatY 11s ease-in-out infinite 3s' }}
      viewBox="0 0 96 64"
    >
      <rect x="1" y="1" width="94" height="62" rx="6" stroke="#6366f1" strokeWidth="1.2" fill="none" />
      <line x1="1" y1="18" x2="95" y2="18" stroke="#38bdf8" strokeWidth="1" />
      <line x1="10" y1="28" x2="65" y2="28" stroke="#818cf8" strokeWidth="0.9" />
      <line x1="10" y1="38" x2="50" y2="38" stroke="#6366f1" strokeWidth="0.8" />
    </svg>
  </div>
);
