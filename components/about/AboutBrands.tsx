import { Hatch } from "@/components/Hatch";
import { ArrowRight } from "@/components/Icons";
import { ABOUT_BRANDS } from "@/lib/about-data";

/**
 * 6개 충전사업자 한 번에 비교 (시안 1021).
 * 제목 양옆에 앱 아이콘이 떠 있고, 아래로 사업자 카드가 2줄 3칸으로 놓인다.
 */
export function AboutBrands() {
  return (
    <section className="abBrand">
      <div className="shell">
        <div className="abBrand__head" data-reveal>
          {/* 떠 있는 앱 아이콘 — 장식이라 읽어 줄 필요가 없다 */}
          <ul className="abBrand__icons" aria-hidden="true">
            {ABOUT_BRANDS.icons.map((src, i) => (
              <li key={src} data-i={i + 1}>
                <img src={src} alt="" loading="lazy" />
              </li>
            ))}
          </ul>

          <span className="abBrand__badge">{ABOUT_BRANDS.badge}</span>
          <h2 className="abBrand__title">
            {ABOUT_BRANDS.title[0]}
            <br />
            <em>{ABOUT_BRANDS.title[1]}</em>
          </h2>
        </div>

        <ul className="abBrand__grid" data-reveal>
          {ABOUT_BRANDS.cards.map((c, i) => (
            <li key={c.name}>
              {/* 시안은 첫 칸을 테두리로 짚어 둔다 */}
              <a className="abBrand__card" href={c.href} data-on={i === 0 || undefined}>
                <span className="abBrand__logo">
                  <Hatch label={`${c.name} 로고`} src={c.logo} />
                </span>
                <span className="abBrand__text">
                  <b>{c.name}</b>
                  <span>{c.desc}</span>
                </span>
                <span className="abBrand__go" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
