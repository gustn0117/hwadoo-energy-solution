import { ArrowRight, Phone } from "@/components/Icons";
import { COMPANY, TEL_HREF } from "@/lib/content";

export function ContactBanner() {
  return (
    <section className="contact" aria-label="대표전화 및 문의">
      <div className="shell contact__inner">
        <img className="contact__img" src="/images/bottom-banner-icon.png" alt="" width={500} height={400} loading="lazy" />
        <div className="contact__copy">
          <h2>
            화두에너지솔루션
            <br />
            <em>더 스마트한 내일을 위한 선택</em>
          </h2>
          <p>아파트 단지에 가장 적합한 충전 솔루션을 제안합니다.</p>
        </div>
        <div className="contact__action">
          <p className="contact__tel">
            대표전화
            <a className="num" href={TEL_HREF}>
              <Phone size={44} />
              {COMPANY.tel}
            </a>
          </p>
          <a className="contact__btn" href="/#consult">
            전기차 충전기 문의
            <ArrowRight size={30} />
          </a>
        </div>
      </div>
    </section>
  );
}
