"use client";

import { saveRankings } from "@/app/admin/actions";
import type { CpoRanking } from "@/lib/supabase";

/** 한 줄 = 사업자명, 대수, 요금 — 엑셀에서 복사해 붙여넣기 쉽게 텍스트로 관리한다 */
function toText(rows: CpoRanking[]) {
  return rows
    .map((r) => [r.name, r.charger_count ?? "", r.price ?? ""].join(", "))
    .join("\n");
}

export function RankingForm({
  fast,
  slow,
  asOf,
}: {
  fast: CpoRanking[];
  slow: CpoRanking[];
  asOf: string | null;
}) {
  return (
    <form action={saveRankings} className="adm-form">
      <label className="adm-field">
        <span>기준일자</span>
        <input type="date" name="as_of" defaultValue={asOf ?? ""} />
        <small>목록 아래와 팝업에 “기준일자 : 26.08.20” 형태로 표시됩니다.</small>
      </label>

      <label className="adm-field">
        <span>급속 충전기</span>
        <textarea name="fast" rows={12} defaultValue={toText(fast)} spellCheck={false} />
        <small>한 줄에 하나씩 · 순서대로 순위가 매겨집니다. 형식: 사업자명, 운영대수, 충전요금</small>
      </label>

      <label className="adm-field">
        <span>완속 충전기</span>
        <textarea name="slow" rows={12} defaultValue={toText(slow)} spellCheck={false} />
        <small>요금을 모를 때는 비워두면 화면에 “…원”으로 표시됩니다. 예) GS차지비(주), 79980,</small>
      </label>

      <div className="adm-form__actions">
        <a className="adm-btn" href="/compare/ranking" target="_blank" rel="noreferrer">
          사이트에서 보기 ↗
        </a>
        <button className="adm-btn adm-btn--primary">저장</button>
      </div>
    </form>
  );
}
