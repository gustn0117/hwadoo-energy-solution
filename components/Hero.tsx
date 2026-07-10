"use client";

import {
  BUILDING_OPTIONS,
  COMPANY,
  CPO_OPTIONS,
  HERO_STATS,
} from "@/lib/content";
import { Hatch } from "./Hatch";

function Chevron() {
  return (
    <svg className="field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="상담신청">
      <div className="shell hero__grid">
        <div>
          <p className="eyebrow eyebrow--kr eyebrow--onDark">환경부 인증 완속충전기 · 무상설치</p>

          <h1 className="hero__title">
            화재 예방부터 보상까지,
            <br />
            가장 안전한 아파트
            <br />
            <em>전기차 충전 인프라</em>
          </h1>

          <p className="hero__lead">
            단지 주소만 넣으면 기설 충전기 현황과 주차면수를 조회해
            필요한 설치 수량과 사업자를 함께 정리해 드립니다.
          </p>

          <dl className="hero__stats">
            {HERO_STATS.map((s) => (
              <div className="stat" key={s.label}>
                <dd className="stat__value">
                  {s.value}
                  <sub>{s.unit}</sub>
                </dd>
                <dt className="stat__label">{s.label}</dt>
              </div>
            ))}
          </dl>

          <Hatch
            onDark
            className="hero__visual"
            label="메인 비주얼 — 아파트 지하주차장 완속충전 구역 (16:9)"
          />
        </div>

        {/* 상담 신청 — 이 페이지의 전환 목표 */}
        <div className="quote">
          <div className="quote__head">
            <h2 className="quote__title">
              충전기설치 <em>전문 상담</em>
            </h2>
            <span className="quote__free">무상설치</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label className="field__label" htmlFor="cpo">
                충전사업자
              </label>
              <div className="field__control">
                <select id="cpo" name="cpo" defaultValue="에버온">
                  {CPO_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="building">
                건물용도
              </label>
              <div className="field__control">
                <select id="building" name="building">
                  {BUILDING_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="addr">
                설치주소
              </label>
              <div className="field__control">
                <input id="addr" name="addr" placeholder="도로명 또는 지번 검색" />
                <svg className="field__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>
            </div>

            <button className="btn btn--volt btn--block quote__submit" type="submit">
              간편 상담신청
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>

          <a className="quote__tel" href={`tel:${COMPANY.tel}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z" />
            </svg>
            <span>
              전화 상담
              <br />
              평일 09:00 – 18:00
            </span>
            <b>{COMPANY.tel}</b>
          </a>

          <p className="quote__note">
            현장 실사와 견적 산출까지 비용이 발생하지 않습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
