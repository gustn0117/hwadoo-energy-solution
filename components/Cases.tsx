import { CASES } from "@/lib/content";
import { Hatch } from "./Hatch";

export function Cases() {
  return (
    <section className="section" id="설치사례">
      <div className="shell">
        <div className="section__head">
          <p className="eyebrow eyebrow--kr">설치 사례</p>
          <h2 className="section__title">
            전국 아파트 1,300개 현장, 12,000대의 완속충전기
          </h2>
          <p className="section__lead">
            한라시멘트, 인천 문학경기장 등 대형 상업시설과 관공서에도 충전기를
            설치했습니다.
          </p>
        </div>

        <ul className="cases__grid">
          {CASES.map((c) => (
            <li className="case" key={c.name}>
              <Hatch className="case__img" label={`${c.name} 현장 사진`} />
              <div className="case__body">
                <p className="case__name">{c.name}</p>
                <p className="case__qty">
                  <b>{c.qty}기</b>
                  <span>완속 7kW</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <nav className="cases__foot" aria-label="설치사례 페이지">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <a
              key={n}
              className="pager"
              href="#설치사례"
              aria-current={n === 1 ? "true" : undefined}
            >
              {n}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
