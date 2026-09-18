/** 이미지를 표시하고, 아직 없으면 빗금으로 자리를 표시한다 */
export function Hatch({
  label,
  src,
  className = "",
}: {
  label: string;
  src?: string | null;
  className?: string;
}) {
  if (src) return <img className={className} src={src} alt="" loading="lazy" />;

  return (
    <div className={`hatch ${className}`} role="img" aria-label={`이미지 자리: ${label}`}>
      <span className="hatch__label" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
