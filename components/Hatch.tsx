/** 사진·이미지가 들어갈 자리를 빗금으로 표시하는 플레이스홀더 */
export function Hatch({
  label,
  className = "",
  onDark = false,
}: {
  label: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={`hatch ${onDark ? "hatch--onDark" : ""} ${className}`}
      role="img"
      aria-label={`이미지 자리: ${label}`}
    >
      <span className="hatch__label" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
