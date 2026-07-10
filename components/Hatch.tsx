/** 사진을 표시하고, 아직 없으면 빗금으로 자리를 표시한다 */
export function Hatch({
  label,
  className = "",
  onDark = false,
  src,
  fit = "cover",
}: {
  label: string;
  className?: string;
  onDark?: boolean;
  src?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div
      className={`hatch ${src ? "hatch--image" : ""} ${onDark ? "hatch--onDark" : ""} ${className}`}
      role="img"
      aria-label={src ? label : `이미지 자리: ${label}`}
    >
      {src ? (
        <img className="hatch__image" src={src} alt="" loading="lazy" style={{ objectFit: fit }} />
      ) : (
        <span className="hatch__label" aria-hidden="true">{label}</span>
      )}
    </div>
  );
}
