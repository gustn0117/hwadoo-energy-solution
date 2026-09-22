/** 배경 이미지(데스크톱/모바일 2종)에 곡선 장식과 점 격자가 포함돼 있다 */
export function CtaBand() {
  return (
    <section className="cta is-dark" aria-label="설치 진단 및 상담 바로가기">
      <div className="shell cta__inner">
        <h2 className="sec-title sec-title--md" data-reveal>
          아파트 전기차 충전기,
          <br />
          <em>어디서 부터 시작해야 할지 고민되시나요?</em>
        </h2>
        <div className="cta__btns" data-reveal-group>
          <a className="cta__btn" href="/#diagnosis">
            <img src="/images/diagnosis-icon.png" alt="" width={190} height={190} loading="lazy" />
            설치 진단하기
          </a>
          <a className="cta__btn cta__btn--orange" href="/#consult">
            <img src="/images/consultation-icon.png" alt="" width={190} height={190} loading="lazy" />
            설치 상담하기
          </a>
        </div>
      </div>
    </section>
  );
}
