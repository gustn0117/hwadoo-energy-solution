"use client";

import { openConsult } from "@/lib/consult-events";
import { FINDER_BG, SEARCH_STEPS } from "@/lib/content";

export function AddressSearch() {
  return (
    <section
      className="sec finder"
      id="diagnosis"
      data-hatch={!FINDER_BG}
      style={FINDER_BG ? { backgroundImage: `url(${FINDER_BG})` } : undefined}
    >
      {FINDER_BG ? null : (
        <span className="hatch__label finder__hatchLabel" aria-hidden="true">
          배경 사진 · 흐린 아파트 단지 (3840×2060 이상)
        </span>
      )}
      <div className="shell">
        <div className="sec-head sec-head--center" data-reveal>
          <img className="finder__pin" src="/images/location-icon.png" alt="" width={160} height={192} loading="lazy" />
          <h2 className="sec-title">
            우리 아파트 단지,
            <br />
            충전기 <em>얼마나 더 설치 가능</em>할까요?
          </h2>
          <p className="sec-desc">설치를 원하는 주소를 검색하면 충전기 설치 현황과 추가 설치 가능 여부를 확인할 수 있습니다.</p>
        </div>

        <form
          className="finder__bar"
          role="search"
          data-reveal
          onSubmit={(e) => {
            e.preventDefault();
            // 단지 조회 API 연동 전까지는 입력한 주소로 상담 팝업을 연다
            const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
            openConsult({ address: q });
          }}
        >
          <img src="/images/logo-emblem.png" alt="" width={150} height={180} />
          <label className="sr-only" htmlFor="finder-q">
            아파트명 또는 주소
          </label>
          <input id="finder-q" type="search" name="q" placeholder="아파트명 또는 주소를 입력하세요." autoComplete="off" />
          <button type="submit" aria-label="검색">
            <img src="/images/search-icon.png" alt="" width={92} height={92} />
          </button>
        </form>

        <ol className="finder__steps" data-reveal-group>
          {SEARCH_STEPS.map((s) => (
            <li key={s.title}>
              <span className="finder__icon">
                <img src={s.icon} alt="" width={160} height={148} loading="lazy" />
              </span>
              <b>{s.title}</b>
              <span>
                {s.desc[0]}
                <br />
                {s.desc[1]}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
