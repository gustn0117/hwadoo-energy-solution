"use client";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="adm-empty">
      <p>처리 중 오류가 발생했습니다. 입력값을 확인하고 다시 시도해주세요.</p>
      <button className="adm-btn" onClick={reset} style={{ marginTop: 16 }}>
        다시 시도
      </button>
    </div>
  );
}
