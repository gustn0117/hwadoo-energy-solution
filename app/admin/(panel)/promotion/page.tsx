import Link from "next/link";
import { deletePromotion } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { db, type Promotion } from "@/lib/supabase";

export default async function PromotionAdminPage() {
  const { data, error } = await db()
    .from("promotions")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error("프로모션을 불러오지 못했습니다.");
  const rows = (data ?? []) as Promotion[];

  return (
    <>
      <div className="adm-head adm-head--row">
        <div>
          <h1>프로모션</h1>
          <p>
            공개한 프로모션이{" "}
            <a href="/promotion" target="_blank" rel="noreferrer">
              /promotion
            </a>{" "}
            페이지에 노출됩니다. 종료일이 지나면 ‘종료’로 표시됩니다.
          </p>
        </div>
        <Link className="adm-btn adm-btn--primary" href="/admin/promotion/new">
          + 프로모션 등록
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="adm-empty">등록된 프로모션이 없습니다.</p>
      ) : (
        <ul className="adm-cards">
          {rows.map((p) => (
            <li key={p.id} className="adm-card" data-hidden={!p.is_published}>
              <div className="adm-card__img">
                {p.image_url ? <img src={p.image_url} alt="" loading="lazy" /> : <span>이미지 없음</span>}
              </div>
              <div className="adm-card__body">
                <p className="adm-card__meta">
                  {p.is_published ? <em className="adm-badge">공개</em> : <em className="adm-badge adm-badge--off">비공개</em>}
                  순서 {p.sort_order}
                </p>
                <b>{p.title}</b>
                <span>{[p.starts_on, p.ends_on].filter(Boolean).join(" ~ ") || "기간 미지정"}</span>
              </div>
              <div className="adm-card__actions">
                <Link className="adm-btn" href={`/admin/promotion/${p.id}`}>
                  수정
                </Link>
                <form action={deletePromotion}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton message={`'${p.title}' 프로모션을 삭제할까요? 이미지도 함께 삭제됩니다.`}>삭제</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
