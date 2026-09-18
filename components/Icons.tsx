type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function ArrowRight({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <path d="M3 12h18" />
      <path d="m15 6 6 6-6 6" />
    </svg>
  );
}

export function Chevron({ size = 20, dir = "right", className }: P & { dir?: "left" | "right" }) {
  return (
    <svg {...base(size)} strokeWidth={2} className={className}>
      <path d={dir === "right" ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7"} />
    </svg>
  );
}

export function Search({ size = 24, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="m20.5 20.5-5-5" />
    </svg>
  );
}

export function Check({ size = 20, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2.2} className={className}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function Plus({ size = 30, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2} className={className}>
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

export function Close({ size = 30, className }: P) {
  return (
    <svg {...base(size)} strokeWidth={2.4} className={className}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function Phone({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.6 2.5c.6-.3 1.3-.1 1.7.4l2.1 3c.4.6.3 1.3-.1 1.8L9 9c1.1 2.4 3.4 4.8 6 6l1.3-1.3c.5-.5 1.3-.5 1.8-.1l3 2.1c.6.4.8 1.1.4 1.7l-1.2 2.3c-.5.9-1.5 1.4-2.5 1.2C9.9 19.4 4.6 14.1 3.1 6.2c-.2-1 .3-2 1.2-2.5z" />
    </svg>
  );
}

export function Chat({ size = 44, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" className={className}>
      <path fill="#fff" d="M22 5c10 0 18 6.3 18 14.5S32 34 22 34c-1.4 0-2.8-.1-4.1-.4L13 39.5c-.5.6-1.4.2-1.3-.6l.7-7.4C7.3 29 4 24.6 4 19.5 4 11.3 12 5 22 5z" />
      <circle cx="14.5" cy="19.5" r="2.4" fill="#fd6a00" />
      <circle cx="22" cy="19.5" r="2.4" fill="#fd6a00" />
      <circle cx="29.5" cy="19.5" r="2.4" fill="#fd6a00" />
    </svg>
  );
}
