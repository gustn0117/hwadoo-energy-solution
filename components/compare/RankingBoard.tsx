"use client";

import "@/app/styles/ranking.css";
import { useRef, useState } from "react";
import { ArrowRight, Close } from "@/components/Icons";
import type { CpoRanking } from "@/lib/supabase";

type Metric = "count" | "price";
const TOP = 5;
const MEDAL = ["🥇", "🥈", "🥉"];

const value = (r: CpoRanking, metric: Metric) =>
  metric === "count"
    ? r.charger_count != null
      ? `${r.charger_count.toLocaleString()} 대`
      : "-"
    : r.price != null
      ? `${r.price.toLocaleString()}원`
      : "…원";

function Rows({ items, metric }: { items: CpoRanking[]; metric: Metric }) {
  return (
    <ol className="rank__list">
      {items.slice(0, TOP).map((r, i) => (
        <li className="rank__row" key={r.id} data-top={i + 1}>
          {i < 3 ? (
            <span className="rank__medal" aria-label={`${i + 1}위`}>
              {MEDAL[i]}
            </span>
          ) : (
            <span className="rank__no">{i + 1}</span>
          )}
          <span className="rank__name">{r.name}</span>
          <span className="rank__value num">{value(r, metric)}</span>
        </li>
      ))}
    </ol>
  );
}

/** 팝업 안의 표 한 개 */
function Table({ title, items, metric }: { title: string; items: CpoRanking[]; metric: Metric }) {
  return (
    <div className="rtable">
      <h4>{title}</h4>
      <table>
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">사업자명</th>
            <th scope="col">{metric === "count" ? "대수" : "요금"}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={r.id} data-top={i + 1}>
              <td>{i < 3 ? MEDAL[i] : i + 1}</td>
              <td>{r.name}</td>
              <td className="num">{value(r, metric)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RankingBoard({
  fast,
  slow,
  asOf,
}: {
  fast: CpoRanking[];
  slow: CpoRanking[];
  asOf: string;
}) {
  const [metric, setMetric] = useState<Metric>("count");
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <section className="rank">
      <div className="shell">
        <div className="rank__head" data-reveal>
          <h2>
            <em>충전사업자 순위,</em> 한눈에 확인하세요!
          </h2>
          <p>충전사업자별 운영 현황과 주요 정보를 비교해 한눈에 확인해보세요.</p>
        </div>

        <div className="rank__metric" role="tablist" aria-label="비교 기준">
          <button role="tab" aria-selected={metric === "count"} onClick={() => setMetric("count")}>
            운영대수
          </button>
          <button role="tab" aria-selected={metric === "price"} onClick={() => setMetric("price")}>
            충전요금
          </button>
        </div>

        <div className="rank__cols">
          <div>
            <p className="rank__colHead">
              급속 충전기
              <button className="rank__info" aria-label="급속 요금 기준 보기">
                ?
              </button>
              <span className="rank__tip" role="tooltip">
                <b>급속 요금 기준</b>
                현재 운영 중인 100kW 이상 200kW 미만 충전기의 요금정보
              </span>
            </p>
            <Rows items={fast} metric={metric} />
            <p className="rank__asOf">🕘 기준일자 : {asOf}</p>
          </div>

          <div>
            <p className="rank__colHead">
              완속 충전기
              <button className="rank__info" aria-label="완속 요금 기준 보기">
                ?
              </button>
              <span className="rank__tip" role="tooltip">
                <b>완속 요금 기준</b>
                현재 운영 중인 7kW급 완속 충전기의 요금정보
              </span>
            </p>
            <Rows items={slow} metric={metric} />
            <p className="rank__asOf">🕘 기준일자 : {asOf}</p>
          </div>
        </div>

        <div className="rank__more">
          <button onClick={() => dialog.current?.showModal()}>전체보기</button>
        </div>

        <div className="rank__cta" data-reveal>
          <img src="/images/bottom-banner-icon.png" alt="" width={500} height={400} loading="lazy" />
          <h3>
            아파트 전기차 충전기,
            <br />
            어디서 부터 시작해야 할지 고민되시나요?
          </h3>
          <a className="btn btn--orange" href="/#consult">
            설치 상담하기
            <ArrowRight />
          </a>
        </div>
      </div>

      {/* 전체보기 팝업 */}
      <dialog
        ref={dialog}
        className="rmodal"
        aria-labelledby="rmodal-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="rmodal__box">
          <div className="rmodal__head">
            <span className="rmodal__icon">
              <img src="/images/diagnosis-icon.png" alt="" width={190} height={190} />
            </span>
            <div>
              <h2 id="rmodal-title">
                전기차 충전사업자 <em>비교</em>
              </h2>
              <p>
                충전소 운영 대수와 충전 요금을 <b>한눈에</b> 비교해보세요.
              </p>
            </div>
            <p className="rmodal__notice">ℹ️ 운영 대수와 요금은 사업자별 정책에 따라 변경될 수 있습니다.</p>
            <button className="rmodal__close" onClick={() => dialog.current?.close()} aria-label="닫기">
              <Close size={24} />
            </button>
          </div>

          <div className="rmodal__panels">
            <section className="rpanel">
              <div className="rpanel__head">
                <span aria-hidden="true">📊</span>
                <div>
                  <h3>
                    전기차 충전소 <em>운영 대수</em>
                  </h3>
                  <p>전국에 운영 중인 충전소와 충전기 대수를 비교할 수 있습니다.</p>
                </div>
              </div>
              <div className="rpanel__tables">
                <Table title="급속" items={fast} metric="count" />
                <Table title="완속" items={slow} metric="count" />
              </div>
            </section>

            <section className="rpanel rpanel--price">
              <div className="rpanel__head">
                <span aria-hidden="true">💰</span>
                <div>
                  <h3>
                    전기차 <em>충전 요금</em>
                  </h3>
                  <p>사업자별 충전 요금을 비교할 수 있습니다.</p>
                </div>
              </div>
              <div className="rpanel__tables">
                <Table title="급속" items={fast} metric="price" />
                <Table title="완속" items={slow} metric="price" />
              </div>
            </section>
          </div>

          <p className="rmodal__asOf">🕘 기준일자 : {asOf}</p>
        </div>
      </dialog>
    </section>
  );
}
