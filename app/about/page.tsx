import type { Metadata } from "next";
import "@/app/styles/about.css";
import { AboutBusiness } from "@/components/about/AboutBusiness";
import { AboutHistory } from "@/components/about/AboutHistory";
import { AboutBrands } from "@/components/about/AboutBrands";
import { Hatch } from "@/components/Hatch";
import { ArrowRight } from "@/components/Icons";
import { SubPage } from "@/components/SubPage";
import { ABOUT_HERO, ABOUT_VALUES_BAND, ABOUT_WHY } from "@/lib/about-data";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "화두에너지솔루션은 아파트 전기차 충전 인프라를 상담부터 설치, 운영까지 맡는 충전 인프라 전문 기업입니다.",
};

export default function AboutPage() {
  return (
    <SubPage
      eyebrow="HWADOO ENERGY"
      title="회사소개"
      desc="화두에서 인기있는, 나에게 맞는 충전사업자를 비교하세요"
    >
      {/* 01. 머리 소개 */}
      <section className="abHero">
        <div className="shell abHero__inner" data-reveal>
          <div>
            <p className="abHero__eyebrow">{ABOUT_HERO.eyebrow}</p>
            <h2>
              {ABOUT_HERO.title[0]}
              <em>{ABOUT_HERO.title[1]}</em>
            </h2>
            <p className="abHero__desc">
              {ABOUT_HERO.desc.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </p>
            <a className="abHero__cta" href={ABOUT_HERO.cta.href}>
              {ABOUT_HERO.cta.label}
              <ArrowRight size={18} />
            </a>
          </div>
          <span className="abHero__img">
            <Hatch label="전기차 충전 인프라 일러스트" src={ABOUT_HERO.image} />
          </span>
        </div>
      </section>

      {/* 02. 핵심 가치 */}
      <section className="abValues">
        <div className="shell abValues__inner" data-reveal>
          <div>
            <p className="abValues__eyebrow">{ABOUT_VALUES_BAND.eyebrow}</p>
            <h2>
              {ABOUT_VALUES_BAND.title.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </h2>
          </div>
          <ul className="abValues__list">
            {ABOUT_VALUES_BAND.items.map((v) => (
              <li className="abValues__item" key={v.en}>
                <span className="abValues__icon">
                  <Hatch label={v.ko} src={v.icon} />
                </span>
                <b>{v.ko}</b>
                <span>{v.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03. 사업영역 슬라이드 */}
      <AboutBusiness />

      {/* 04. 연혁 */}
      <AboutHistory />

      {/* 05. Why 화두 */}
      <section className="abWhy">
        <div className="shell">
          <div className="abWhy__top" data-reveal>
            <div>
              <p className="abWhy__eyebrow">{ABOUT_WHY.eyebrow}</p>
              <h2 className="sec-title sec-title--md">
                {ABOUT_WHY.title[0]}
                <br />
                <em>{ABOUT_WHY.title[1]}</em>
              </h2>
              <p className="abWhy__desc">
                {ABOUT_WHY.desc.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </p>
            </div>
            <span className="abWhy__img">
              <Hatch label="단지 점검 일러스트" src={ABOUT_WHY.image} />
            </span>
          </div>

          <ul className="abWhy__list" data-reveal>
            {ABOUT_WHY.items.map((it) => (
              <li className="abWhy__item" key={it.title.join("")}>
                <span className="abWhy__icon">
                  <Hatch label={it.title.join(" ")} src={it.icon} />
                </span>
                <b>
                  {it.title.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </b>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06. 6개 충전사업자 한 번에 비교 */}
      <AboutBrands />
    </SubPage>
  );
}
