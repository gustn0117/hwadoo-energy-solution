import { RankingForm } from "@/components/admin/RankingForm";
import { getRankings } from "@/lib/data";

export default async function RankingAdminPage() {
  const { fast, slow, asOf } = await getRankings();

  return (
    <>
      <div className="adm-head">
        <h1>충전사업자 순위</h1>
        <p>
          <a href="/compare/ranking" target="_blank" rel="noreferrer">
            /compare/ranking
          </a>{" "}
          페이지와 전체보기 팝업에 쓰이는 자료입니다. 엑셀에서 복사해 붙여넣어도 됩니다.
        </p>
      </div>
      <RankingForm fast={fast} slow={slow} asOf={asOf} />
    </>
  );
}
