import Link from "next/link";
import { deleteFaq } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { db, type Faq } from "@/lib/supabase";

export default async function FaqAdminPage() {
  const { data, error } = await db()
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw new Error("FAQ를 불러오지 못했습니다.");
  const rows = (data ?? []) as Faq[];

  return (
    <>
      <div className="adm-head adm-head--row">
        <div>
          <h1>FAQ</h1>
          <p>
            공개 FAQ 중 정렬 순서 앞의 4개가 메인에, 전체가{" "}
            <a href="/faq" target="_blank" rel="noreferrer">
              /faq
            </a>{" "}
            페이지에 노출됩니다.
          </p>
        </div>
        <Link className="adm-btn adm-btn--primary" href="/admin/faq/new">
          + FAQ 등록
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="adm-empty">등록된 FAQ가 없습니다.</p>
      ) : (
        <ul className="adm-list">
          {rows.map((f) => (
            <li key={f.id} data-hidden={!f.is_published}>
              <div>
                <p className="adm-card__meta">
                  {f.is_published ? <em className="adm-badge">공개</em> : <em className="adm-badge adm-badge--off">비공개</em>}
                  순서 {f.sort_order}
                </p>
                <b>{f.question}</b>
              </div>
              <div className="adm-card__actions">
                <Link className="adm-btn" href={`/admin/faq/${f.id}`}>
                  수정
                </Link>
                <form action={deleteFaq}>
                  <input type="hidden" name="id" value={f.id} />
                  <ConfirmButton message="이 FAQ를 삭제할까요?">삭제</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
