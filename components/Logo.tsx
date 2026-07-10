/** 로고 마크 — 충전기 본체 + 커넥터, 상단에 태양 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="var(--forest)"
        strokeWidth="2.5"
        strokeDasharray="112 26"
        strokeLinecap="round"
        transform="rotate(-105 24 24)"
      />
      <rect
        x="14"
        y="12"
        width="16"
        height="24"
        rx="3"
        stroke="var(--forest)"
        strokeWidth="2.5"
      />
      <rect x="17.5" y="16" width="4" height="4" fill="var(--volt)" />
      <rect x="23" y="16" width="4" height="4" fill="var(--volt)" />
      <rect x="17.5" y="21.5" width="4" height="4" fill="var(--volt)" />
      <rect x="23" y="21.5" width="4" height="4" fill="var(--volt)" />
      <path
        d="M30 20h4v7a4 4 0 0 1-4 4"
        stroke="var(--forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="34" cy="10" r="3" fill="var(--volt)" />
    </svg>
  );
}
