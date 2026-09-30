"use client";

import "@/app/styles/ranking.css";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "@/components/Icons";
import type { CpoRanking } from "@/lib/supabase";

type Metric = "count" | "price";
const TOP = 10; // 시안 수정 요청(0930) — 10위까지 노출
const MEDAL = ["/images/medals/1.png", "/images/medals/2.png", "/images/medals/3.png"];

function Medal({ rank, size = 30 }: { rank: number; size?: number }) {
  return <img className="rank__medal" src={MEDAL[rank - 1]} alt={`${rank}위`} width={size} height={size} />;
}

const value = (r: CpoRanking, metric: Metric) =>
  metric === "count"
    ? r.charger_count != null
      ? `${r.charger_count.toLocaleString()} 대`
      : "-"
    : r.price != null
      ? `${r.price.toLocaleString()}원`
      : "…원";

function Rows({ items, metric, active }: { items: CpoRanking[]; metric: Metric; active: number }) {
  return (
    <ol className="rank__list">
      {items.slice(0, TOP).map((r, i) => (
        <li className="rank__row" key={r.id} data-top={i + 1} data-active={i === active || undefined}>
          {i < 3 ? <Medal rank={i + 1} /> : <span className="rank__no">{i + 1}</span>}
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
      <div className="rtable__scroll">
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
                <td>{i < 3 ? <Medal rank={i + 1} size={22} /> : i + 1}</td>
                <td>{r.name}</td>
                <td className="num">{value(r, metric)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const rows = Math.min(TOP, Math.max(fast.length, slow.length));

  // 1위부터 차례로 강조가 굴러간다 (마우스를 올리면 멈춤)
  useEffect(() => {
    if (paused || rows < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % rows), 2200);
    return () => clearInterval(id);
  }, [paused, rows]);

  return (
    <section className="rank" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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
              <span className="rank__infoWrap">
                <button className="rank__info" aria-label="급속 요금 기준 보기">
                  ?
                </button>
                <span className="rank__tip" role="tooltip">
                  <b>급속 요금 기준</b>
                  현재 운영 중인 100kW 이상 200kW 미만 충전기의 요금정보
                </span>
              </span>
            </p>
            <Rows items={fast} metric={metric} active={active} />
            <p className="rank__asOf">기준일자 : {asOf}</p>
          </div>

          <div>
            <p className="rank__colHead">
              완속 충전기
              <span className="rank__infoWrap">
                <button className="rank__info" aria-label="완속 요금 기준 보기">
                  ?
                </button>
                <span className="rank__tip" role="tooltip">
                  <b>완속 요금 기준</b>
                  현재 운영 중인 7kW급 완속 충전기의 요금정보
                </span>
              </span>
            </p>
            <Rows items={slow} metric={metric} active={active} />
            <p className="rank__asOf">기준일자 : {asOf}</p>
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
            <p className="rmodal__notice">
              <img src="/images/installation-status.png" alt="" width={160} height={148} />
              운영 대수와 요금은 사업자별 정책에 따라 변경될 수 있습니다.
            </p>
            <button className="rmodal__close" onClick={() => dialog.current?.close()} aria-label="닫기">
              <Close size={24} />
            </button>
          </div>

          <div className="rmodal__panels">
            <section className="rpanel">
              <div className="rpanel__head">
                <span>
                  <img src="/images/charging-business-compare.png" alt="" width={306} height={286} />
                </span>
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
                <span>
                  <img src="/images/installation-operation.png" alt="" width={306} height={286} />
                </span>
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

          <p className="rmodal__asOf">기준일자 : {asOf}</p>
        </div>
      </dialog>
    </section>
  );
}
