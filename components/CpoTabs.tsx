"use client";

import { useState } from "react";
import {
  APP_FEATURES,
  FAQ,
  PRODUCT_SPEC,
  RATES,
  SAFETY_FEATURES,
} from "@/lib/content";
import { Hatch } from "./Hatch";

const TABS = [
  "충전기 제품 소개",
  "충전기 이용 방법",
  "요금/할인 혜택 안내",
  "책임 보험 가입",
  "AS/유지 보수",
  "관련 규정 FAQ",
] as const;

export function CpoTabs() {
  const [tab, setTab] = useState(0);

  return (
    <section className="section" id="에버온">
      <div className="shell">
        <div className="section__head section__head--wide">
          <p className="eyebrow eyebrow--kr">에버온 · EVERON</p>
          <h2 className="section__title">
            에버온 충전기, 시공은 화두에너지솔루션
          </h2>
          <p className="section__lead">
            9년간 51,238기를 운영해 온 사업자의 완속충전기를, 전국 1,300개
            현장을 시공한 화두에너지솔루션이 설치합니다.
          </p>
        </div>

        <div className="tabs__bar" role="tablist" aria-label="충전사업자 상세 안내">
          {TABS.map((t, i) => (
            <button
              key={t}
              role="tab"
              id={`tab-${i}`}
              aria-selected={tab === i}
              aria-controls={`panel-${i}`}
              className="tabs__tab"
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          className="panel"
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
        >
          {tab === 0 && <ProductPanel />}
          {tab === 1 && <UsagePanel />}
          {tab === 2 && <RatePanel />}
          {tab === 3 && <InsurancePanel />}
          {tab === 4 && <ServicePanel />}
          {tab === 5 && <FaqPanel />}
        </div>
      </div>
    </section>
  );
}

function ProductPanel() {
  return (
    <div className="panel__grid">
      <div>
        <p className="eyebrow eyebrow--kr">PLC 모뎀형 완속 충전기</p>
        <h3 className="panel__title">
          꽂기만 하면 충전되는 스마트제어 완속충전기
        </h3>
        <p className="panel__lead">
          환경부 인증 PLC 모뎀을 장착해 차량 BMS와 통신합니다. 배터리 상태를
          충전기가 직접 읽어 충전 동작을 제어합니다.
        </p>

        <dl className="spec">
          {PRODUCT_SPEC.map((s) => (
            <div className="spec__row" key={s.key}>
              <dt className="spec__key">{s.key}</dt>
              <dd className="spec__val">{s.val}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <Hatch
          className="panel__visual"
          label="에버온 스탠드형 완속충전기 제품컷 (누끼, 4:5)"
          src="/images/generated/charger-1.webp"
          fit="contain"
        />
        <ul className="checks">
          {SAFETY_FEATURES.map((f) => (
            <li key={f.b}>
              <span>
                <b>{f.b}</b> — {f.t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function UsagePanel() {
  return (
    <div className="panel__grid">
      <div>
        <p className="eyebrow eyebrow--kr">바로ON 플러스</p>
        <h3 className="panel__title">
          커플러를 꽂기만 하면 인증부터 결제까지 자동으로
        </h3>
        <p className="panel__lead">
          카드나 앱 없이 충전이 시작되는 국내 유일의 오토차징 서비스입니다.
          전기차와 충전기가 상호 통신해 차량 고유식별번호를 자동으로 확인하고,
          충전이 끝나면 등록된 수단으로 결제됩니다.
        </p>

        <ul className="checks">
          {APP_FEATURES.map((f) => (
            <li key={f.b}>
              <span>
                <b>{f.b}</b> — {f.t}
              </span>
            </li>
          ))}
        </ul>

        <div className="evos__list">
          <span className="evos__chip">Google Play</span>
          <span className="evos__chip">App Store</span>
        </div>
      </div>

      <Hatch
        className="panel__visual"
        label="에버온 모바일 앱 화면 3컷 — 바로ON / 내지갑 / 토크ON"
        src="/images/generated/app.webp"
      />
    </div>
  );
}

function RatePanel() {
  return (
    <div className="panel__grid">
      <div>
        <p className="eyebrow eyebrow--kr">요금 · 할인 혜택</p>
        <h3 className="panel__title">
          합리적인 충전요금과 시간대 할인, 그린세이브
        </h3>
        <p className="panel__lead">
          공동주택(아파트)은 계약기간별 프로모션 금액과 기간을 별도 협의합니다.
          아래는 에버온 공시 기준 요금입니다.
        </p>

        <div className="greensave">
          <div>
            <b>그린세이브</b>
            <p>전력 효율화 정책에 따라 전 회원 자동 적용</p>
          </div>
          <time>11:00 – 14:00</time>
        </div>

        <p className="rates__foot">3~5월, 9~10월 주말·공휴일에 한해 적용됩니다.</p>

        <Hatch
          className="rates__banner"
          label="제휴 카드 할인 · 포인트 적립 배너 (9개사 20개 상품)"
          src="/images/generated/rate-benefits.webp"
        />
      </div>

      <div className="rates">
        {RATES.map((r, i) => (
          <div className={`rate ${i === 0 ? "rate--hero" : ""}`} key={r.name}>
            <div className="rate__name">
              {r.name}
              {r.sub && <small>{r.sub}</small>}
            </div>
            <div className="rate__prices">
              <span className="rate__tag">{r.tag}</span>
              <s className="rate__was">{r.was}</s>
              <span className="rate__now">
                {r.now}
                <sub>원/kWh</sub>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsurancePanel() {
  return (
    <div className="panel__grid">
      <div>
        <p className="eyebrow eyebrow--kr">책임 보험</p>
        <h3 className="panel__title">
          고객의 안전을 먼저 생각하는 배상책임보험 가입
        </h3>
        <p className="panel__lead">
          충전 사업자의 책임 또는 충전기의 결함으로 안전사고가 발생했을 때
          이를 보상하는 보험입니다. 입주민 피해까지 담보합니다.
        </p>

        <div className="cover">
          <div className="cover__card">
            <div className="cover__amt">50억 원</div>
            <p className="cover__cap">
              생산물배상책임보험
              <br />1 사고당 보상 한도
            </p>
          </div>
          <div className="cover__card">
            <div className="cover__amt">1.5억 / 10억</div>
            <p className="cover__cap">
              사고배상책임보험
              <br />
              대인 1인당 / 대물 1사고당 (한도 무제한)
            </p>
          </div>
        </div>

        <ul className="checks">
          <li>
            <span>
              <b>담보 내용</b> — 전기차충전기, 전기차 충전구축, 제조·도급위탁·완성작업위험
            </span>
          </li>
          <li>
            <span>
              <b>보험사</b> — DB손해보험 (증권번호 120260416222)
            </span>
          </li>
        </ul>
      </div>

      <Hatch className="panel__visual" label="보험가입증명서 스캔본 (A4 세로)" src="/images/generated/insurance.webp" />
    </div>
  );
}

function ServicePanel() {
  return (
    <div className="panel__grid">
      <div>
        <p className="eyebrow eyebrow--kr">AS · 유지보수</p>
        <h3 className="panel__title">
          24시간 3중 안전보장, 연 6회 이상 충전시설 점검
        </h3>
        <p className="panel__lead">
          고장 조치를 엄격히 준수해 고장률 1% 미만을 유지하며, 다각적인 충전시설
          점검 정책을 수행합니다.
        </p>

        <div className="triad">
          <div className="triad__cell">
            <b>24h</b>
            <span>현장 대응</span>
          </div>
          <div className="triad__cell">
            <b>24h</b>
            <span>원격 모니터링</span>
          </div>
          <div className="triad__cell">
            <b>365d</b>
            <span>콜센터 운영</span>
          </div>
        </div>

        <ul className="checks">
          <li><span><b>시공감리</b> — 시공 후 점검을 통해 충전기 구축 현황 파악 (최초 1회)</span></li>
          <li><span><b>정기점검</b> — 환경부 지침에 따른 점검 (최소 연 6회)</span></li>
          <li><span><b>긴급점검</b> — 화재 발생 및 안전 위험 노출 시 1시간 이내 출동</span></li>
          <li><span><b>특별점검</b> — 자연재해 등 피해 우려 시 사고 방지를 위한 사전 출동</span></li>
        </ul>
      </div>

      <Hatch className="panel__visual" label="점검 인포그래픽 — 3중 보장 체계 아이콘" src="/images/generated/service.webp" />
    </div>
  );
}

function FaqPanel() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="section__head">
        <p className="eyebrow eyebrow--kr">관련 규정</p>
        <h3 className="panel__title">
          전기차 충전시설, 무엇을 언제까지 설치해야 할까요
        </h3>
      </div>

      <div className="faq">
        {FAQ.map((f, i) => (
          <div className="faq__item" key={f.q} data-open={open === i}>
            <h4>
              <button
                className="faq__q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="faq__no">Q{i + 1}</span>
                <span>{f.q}</span>
                <svg className="faq__chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h4>
            <div className="faq__wrap">
              <div className="faq__clip">
                <ul className="faq__a">
                  {f.a.map((line) => (
                    <li key={line}>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
