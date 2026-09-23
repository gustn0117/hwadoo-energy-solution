import Link from "next/link";
import { deleteNotice } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { db, type Notice } from "@/lib/supabase";

export default async function NoticeAdminPage() {
  const { data, error } = await db()
    .from("notices")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("published_on", { ascending: false })
    .order("id", { ascending: false });
  if (error) throw new Error("공지를 불러오지 못했습니다.");
  const rows = (data ?? []) as Notice[];

  return (
    <>
      <div className="adm-head adm-head--row">
        <div>
          <h1>공지·소식</h1>
          <p>
            공개한 글이{" "}
            <a href="/notice" target="_blank" rel="noreferrer">
              /notice
            </a>{" "}
            페이지에 노출됩니다. 상단 고정한 글이 맨 위에 옵니다.
          </p>
        </div>
        <Link className="adm-btn adm-btn--primary" href="/admin/notice/new">
          + 글 등록
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="adm-empty">등록된 글이 없습니다.</p>
      ) : (
        <ul className="adm-list">
          {rows.map((n) => (
            <li key={n.id} data-hidden={!n.is_published}>
              <div>
                <p className="adm-card__meta">
                  {n.is_published ? <em className="adm-badge">공개</em> : <em className="adm-badge adm-badge--off">비공개</em>}
                  {n.is_pinned ? <em className="adm-badge">고정</em> : null}
                  {n.category} · {n.published_on}
                </p>
                <b>{n.title}</b>
              </div>
              <div className="adm-card__actions">
                <Link className="adm-btn" href={`/admin/notice/${n.id}`}>
                  수정
                </Link>
                <form action={deleteNotice}>
                  <input type="hidden" name="id" value={n.id} />
                  <ConfirmButton message={`'${n.title}' 글을 삭제할까요?`}>삭제</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
