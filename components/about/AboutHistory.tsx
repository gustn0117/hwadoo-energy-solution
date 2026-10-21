import { ABOUT_HISTORY } from "@/lib/about-data";

/**
 * 연혁 (시안 1021).
 * 오른쪽 목록은 스크롤 스냅이라 굴릴 때마다 한 연도씩 걸린다.
 */
export function AboutHistory() {
  return (
    <section className="abHist">
      <div className="shell abHist__inner">
        <div className="abHist__head" data-reveal>
          <p className="abHist__eyebrow">{ABOUT_HISTORY.eyebrow}</p>
          <h2 className="sec-title sec-title--md">
            {ABOUT_HISTORY.title[0]}
            <br />
            <em>{ABOUT_HISTORY.title[1]}</em>
          </h2>
          <p className="abHist__desc">
            {ABOUT_HISTORY.desc.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </p>
        </div>

        <ol className="abHist__list" tabIndex={0} aria-label="연혁">
          {ABOUT_HISTORY.years.map((y) => (
            <li className="abHist__year" key={y.year}>
              <p className="abHist__when">{y.year}</p>
              <div className="abHist__body">
                <h3>{y.title}</h3>
                <ul>
                  {y.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
