import { ArrowRight } from "@/components/Icons";
import { ConsultForm } from "@/components/ConsultForm";
import { HERO_POINTS } from "@/lib/content";

/**
 * 배치는 CSS grid 영역으로 바꾼다 — PC: 카피 | 폼 (일러스트는 폼 뒤로 겹침),
 * 태블릿: 카피 · 일러스트 / 폼, 모바일: 카피 → 일러스트 → 진단 버튼 (폼은 팝업으로 대체).
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__copy" data-reveal>
          <h1 className="hero__title">
            <span className="hero__t1">아파트 전기차 충전기</span>
            <span className="hero__t2">비교부터 설치까지</span>
            <span className="hero__t3">한 번에 OK!</span>
          </h1>

          <ul className="hero__points">
            {HERO_POINTS.map((p) => (
              <li key={p.title}>
                <img src={p.icon} alt="" width={220} height={220} />
                <b>{p.title}</b>
                <span>{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <img
          className="hero__visual"
          src="/images/main-visual-img.png"
          alt=""
          width={1390}
          height={1012}
          fetchPriority="high"
        />

        <div className="hero__cta" data-reveal>
          <a className="btn btn--orange hero__btn" href="/#diagnosis">
            충전기 설치 진단
            <ArrowRight />
          </a>
        </div>

        <div className="hero__form">
          <ConsultForm />
        </div>
      </div>
    </section>
  );
}
