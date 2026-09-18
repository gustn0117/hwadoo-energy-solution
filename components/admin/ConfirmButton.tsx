"use client";

/** 삭제처럼 되돌릴 수 없는 폼 제출 전에 한 번 더 묻는다 */
export function ConfirmButton({
  message,
  children,
  className = "adm-btn adm-btn--danger",
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
