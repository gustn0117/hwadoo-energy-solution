import { saveNotice } from "@/app/admin/actions";
import { NOTICE_CATEGORIES, type Notice } from "@/lib/supabase";

/** KST 기준 오늘 (date input 기본값) */
const today = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

export function NoticeForm({ item }: { item?: Notice }) {
  return (
    <form action={saveNotice} className="adm-form">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="adm-grid2">
        <label className="adm-field">
          <span>분류</span>
          <select name="category" defaultValue={item?.category ?? "공지"}>
            {NOTICE_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="adm-field">
          <span>게시일</span>
          <input type="date" name="published_on" defaultValue={item?.published_on ?? today()} />
        </label>
      </div>

      <label className="adm-field">
        <span>제목 *</span>
        <input name="title" defaultValue={item?.title} required maxLength={200} />
      </label>

      <label className="adm-field">
        <span>내용 *</span>
        <textarea name="body" rows={14} defaultValue={item?.body} required />
        <small>줄바꿈은 그대로 보입니다.</small>
      </label>

      <div className="adm-grid2">
        <label className="adm-check adm-check--field">
          <input type="checkbox" name="is_pinned" defaultChecked={item?.is_pinned ?? false} /> 목록 상단 고정
        </label>
        <label className="adm-check adm-check--field">
          <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> 사이트에 공개
        </label>
      </div>

      <div className="adm-form__actions">
        <a className="adm-btn" href="/admin/notice">
          취소
        </a>
        <button className="adm-btn adm-btn--primary">{item ? "수정 저장" : "등록"}</button>
      </div>
    </form>
  );
}
