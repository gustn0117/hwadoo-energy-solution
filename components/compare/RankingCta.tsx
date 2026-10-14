import "@/app/styles/ranking.css";
import { ArrowRight } from "@/components/Icons";

/** 하단 상담 유도 배너 — 충전사업자 순위·한 눈에 비교가 함께 쓴다 */
export function RankingCta() {
  return (
    <div className="shell">
      <div className="rank__cta" data-reveal>
        <img src="/images/bottom-banner-icon.png" alt="" width={500} height={400} loading="lazy" />
        <h3>
          아파트 전기차 충전기,
          <br />
          어디서 부터 시작해야 할지 고민되시나요?
        </h3>
        <a className="btn btn--orange" href="/consult">
          설치 상담하기
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}
