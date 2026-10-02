import { ArrowRight } from "@/components/Icons";
import { ConsultForm } from "@/components/ConsultForm";
import { getHero } from "@/lib/data";

/**
 * 메인 첫 화면 — 배너 이미지와 버튼은 관리자(/admin/hero)에서 바꾼다 (시안 1002).
 * PC: 배너 | 상담 폼, 모바일: 배너 → 버튼 (상담 폼은 팝업으로 대체).
 */
export async function Hero() {
  const hero = await getHero();
  const sameImage = hero.mobileImage === hero.pcImage;

  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__banner" data-split={sameImage ? undefined : ""} data-reveal>
          <img
            className="hero__img hero__img--pc"
            src={hero.pcImage}
            alt="아파트 전기차 충전기, 비교부터 설치까지 한 번에 OK!"
            fetchPriority="high"
          />
          {/* 모바일 이미지를 따로 올린 경우에만 두 장을 번갈아 보여준다 */}
          {sameImage ? null : (
            <img className="hero__img hero__img--mo" src={hero.mobileImage} alt="" fetchPriority="high" />
          )}
        </div>

        {hero.buttonLabel ? (
          <div className="hero__cta" data-reveal>
            <a className="btn btn--orange hero__btn" href={hero.buttonHref}>
              {hero.buttonLabel}
              <ArrowRight />
            </a>
          </div>
        ) : null}

        <div className="hero__form">
          <ConsultForm />
        </div>
      </div>
    </section>
  );
}
