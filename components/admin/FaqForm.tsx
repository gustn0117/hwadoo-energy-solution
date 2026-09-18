import { saveFaq } from "@/app/admin/actions";
import type { Faq } from "@/lib/supabase";

export function FaqForm({ item }: { item?: Faq }) {
  return (
    <form action={saveFaq} className="adm-form">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <label className="adm-field">
        <span>질문 *</span>
        <input name="question" defaultValue={item?.question} required maxLength={200} />
      </label>

      <label className="adm-field">
        <span>답변 *</span>
        <textarea name="answer" rows={10} defaultValue={item?.answer} required />
        <small>줄바꿈은 그대로 보입니다. 줄 맨 앞에 “- ”를 붙이면 글머리표 목록이 됩니다.</small>
      </label>

      <div className="adm-grid2">
        <label className="adm-field">
          <span>정렬 순서</span>
          <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
        </label>
        <label className="adm-check adm-check--field">
          <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> 사이트에 공개
        </label>
      </div>

      <div className="adm-form__actions">
        <a className="adm-btn" href="/admin/faq">
          취소
        </a>
        <button className="adm-btn adm-btn--primary">{item ? "수정 저장" : "등록"}</button>
      </div>
    </form>
  );
}
