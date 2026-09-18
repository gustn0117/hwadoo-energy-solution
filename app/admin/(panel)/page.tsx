import Link from "next/link";
import { deleteConsultation, updateConsultation } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { STATUS_LABEL, db, type Consultation } from "@/lib/supabase";

const STATUSES = Object.keys(STATUS_LABEL) as Consultation["status"][];

const fmt = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = STATUSES.includes(status as Consultation["status"]) ? (status as Consultation["status"]) : null;

  const client = db();
  let query = client.from("consultations").select("*").order("created_at", { ascending: false }).limit(500);
  if (filter) query = query.eq("status", filter);

  const [{ data, error }, counts] = await Promise.all([
    query,
    Promise.all(
      STATUSES.map((s) =>
        client.from("consultations").select("id", { count: "exact", head: true }).eq("status", s),
      ),
    ),
  ]);
  if (error) throw new Error("상담 목록을 불러오지 못했습니다.");

  const rows = (data ?? []) as Consultation[];
  const total = counts.reduce((n, c) => n + (c.count ?? 0), 0);

  return (
    <>
      <div className="adm-head">
        <h1>상담 신청</h1>
        <p>메인 페이지 상담 폼으로 들어온 신청입니다. 상태와 메모를 바꾸고 저장하세요.</p>
      </div>

      <nav className="adm-tabs" aria-label="상태 필터">
        <Link href="/admin" aria-current={!filter ? "page" : undefined}>
          전체 <b>{total}</b>
        </Link>
        {STATUSES.map((s, i) => (
          <Link key={s} href={`/admin?status=${s}`} aria-current={filter === s ? "page" : undefined}>
            {STATUS_LABEL[s]} <b>{counts[i].count ?? 0}</b>
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <p className="adm-empty">아직 들어온 상담 신청이 없습니다.</p>
      ) : (
        <div className="adm-tableWrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>접수일</th>
                <th>이름</th>
                <th>연락처</th>
                <th>충전사업자</th>
                <th>건물용도</th>
                <th>주소</th>
                <th>상태 · 메모</th>
                <th aria-label="삭제" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} data-status={r.status}>
                  <td className="adm-nowrap">{fmt.format(new Date(r.created_at))}</td>
                  <td className="adm-nowrap">
                    <b>{r.name}</b>
                  </td>
                  <td className="adm-nowrap">
                    <a href={`tel:${r.phone.replace(/\D/g, "")}`}>{r.phone}</a>
                  </td>
                  <td>{r.cpo ?? "-"}</td>
                  <td>{r.building ?? "-"}</td>
                  <td className="adm-wide">{r.address ?? "-"}</td>
                  <td>
                    <form action={updateConsultation} className="adm-inline">
                      <input type="hidden" name="id" value={r.id} />
                      <select name="status" defaultValue={r.status} aria-label="상태">
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </option>
                        ))}
                      </select>
                      <input name="memo" defaultValue={r.memo ?? ""} placeholder="메모" aria-label="메모" />
                      <button className="adm-btn">저장</button>
                    </form>
                  </td>
                  <td>
                    <form action={deleteConsultation}>
                      <input type="hidden" name="id" value={r.id} />
                      <ConfirmButton message={`${r.name}님의 상담 신청을 삭제할까요?`}>삭제</ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
