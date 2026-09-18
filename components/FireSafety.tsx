import { ArrowRight } from "@/components/Icons";

/** 배경 이미지(데스크톱/모바일 2종)에 일러스트가 포함돼 있다 */
export function FireSafety() {
  return (
    <section className="fire" id="fire">
      <div className="shell fire__inner">
        <p className="fire__sub">화재대응용품 지원</p>
        <h2 className="fire__title">
          충전 인프라 구축에서
          <br />
          <em>안전까지 함께 고려합니다.</em>
        </h2>
        <a className="btn btn--white fire__btn" href="#consult">
          화재대응용품 보기
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}
