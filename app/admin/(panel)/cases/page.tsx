import Link from "next/link";
import { deleteCase } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { db, type Case } from "@/lib/supabase";

export default async function CasesAdminPage() {
  const { data, error } = await db()
    .from("cases")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error("설치사례를 불러오지 못했습니다.");
  const rows = (data ?? []) as Case[];

  return (
    <>
      <div className="adm-head adm-head--row">
        <div>
          <h1>설치사례</h1>
          <p>
            공개로 설정한 사례가 <a href="/cases" target="_blank" rel="noreferrer">/cases</a> 페이지에 노출됩니다. 정렬
            순서가 작을수록 앞에 나옵니다.
          </p>
        </div>
        <Link className="adm-btn adm-btn--primary" href="/admin/cases/new">
          + 사례 등록
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="adm-empty">등록된 설치사례가 없습니다.</p>
      ) : (
        <ul className="adm-cards">
          {rows.map((c) => (
            <li key={c.id} className="adm-card" data-hidden={!c.is_published}>
              <div className="adm-card__img">
                {c.image_url ? <img src={c.image_url} alt="" loading="lazy" /> : <span>사진 없음</span>}
              </div>
              <div className="adm-card__body">
                <p className="adm-card__meta">
                  {c.is_published ? <em className="adm-badge">공개</em> : <em className="adm-badge adm-badge--off">비공개</em>}
                  순서 {c.sort_order}
                </p>
                <b>{c.title}</b>
                <span>
                  {[c.region, c.cpo, c.charger_count ? `${c.charger_count}기` : null, c.installed_on]
                    .filter(Boolean)
                    .join(" · ") || "-"}
                </span>
              </div>
              <div className="adm-card__actions">
                <Link className="adm-btn" href={`/admin/cases/${c.id}`}>
                  수정
                </Link>
                <form action={deleteCase}>
                  <input type="hidden" name="id" value={c.id} />
                  <ConfirmButton message={`'${c.title}' 사례를 삭제할까요? 사진도 함께 삭제됩니다.`}>삭제</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
