export default function CatFallback() {
  return (
    <svg className="cat-fallback" viewBox="0 0 200 200" role="img" aria-label="Blue cat illustration">
      <path fill="var(--cat)" d="M40 30l40 38a64 64 0 0 1 40 0l40-38v80a60 60 0 0 1-120 0z" />
      <ellipse cx="78" cy="112" rx="10" ry="12" fill="var(--eye)" />
      <ellipse cx="122" cy="112" rx="10" ry="12" fill="var(--eye)" />
      <ellipse cx="78" cy="112" rx="3" ry="9" fill="#0b1e3f" />
      <ellipse cx="122" cy="112" rx="3" ry="9" fill="#0b1e3f" />
      <path d="M94 134l6 6 6-6" fill="none" stroke="#f9a8d4" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
