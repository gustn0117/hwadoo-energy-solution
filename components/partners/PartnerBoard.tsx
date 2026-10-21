"use client";

import "@/app/styles/partners.css";
import { useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Icons";
import { Hatch } from "@/components/Hatch";
import {
  PARTNERS,
  PARTNER_DEFAULT,
  PARTNER_EXTRA_TAB,
  type Line,
  type Partner,
  type Section,
} from "@/lib/partner-data";

/** "앞말" + 강조할 "뒷말" */
function Hi({ line }: { line: Line }) {
  return (
    <>
      {line.text}
      {line.hi ? <b className="pt-hi">{line.hi}</b> : null}
    </>
  );
}

/* ------------------------------------------------------------------
   구역 — kind 마다 생김새가 다르다
   ------------------------------------------------------------------ */

function SectionHead({ s }: { s: Section }) {
  return (
    <div className="ptsec__head">
      {s.no ? <span className="ptsec__no">{s.no}</span> : null}
      <p className="ptsec__sub">{s.sub}</p>
      <h3 className="ptsec__title">{s.title}</h3>
      {s.lead ? <p className="ptsec__lead ptsec__lead--icon">{s.lead}</p> : null}
    </div>
  );
}

function SectionBody({ s }: { s: Section }) {
  switch (s.kind) {
    case "photoFeatures":
      return (
        <div className="ptPhoto">
          <div className="ptPhoto__img">
            <Hatch label={s.photoLabel} src={s.photo} />
          </div>
          <div className="ptPhoto__cards">
            {s.cards.map((c) => (
              <div className="ptPhoto__card" key={c.title}>
                <Hatch label={c.title} src={c.icon} />
                <p>
                  <b>{c.title}</b>
                  <span>{c.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "specTable":
      return (
        <table className="ptSpec">
          <caption className="sr-only">{s.title}</caption>
          <tbody>
            {s.rows.map((r) => (
              <tr key={r.key}>
                <th scope="row">{r.key}</th>
                <td>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "bulletCards":
      return (
        <div className="ptBullets">
          {s.cards.map((c) => (
            <article
              className="ptBullets__card"
              data-tone={c.tone}
              data-cols={c.items.length > 1 && c.no ? "" : undefined}
              style={c.no ? ({ "--cols": c.items.length } as React.CSSProperties) : undefined}
              key={c.title + (c.no ?? "")}
            >
              <div>
                {c.no ? <span className="ptBullets__no">{c.no}</span> : null}
                <h4>{c.title}</h4>
                <ul className="ptBullets__list">
                  {c.items.map((it, i) => (
                    <li key={i}>
                      <span>
                        <Hi line={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="ptBullets__icon">
                <Hatch label={c.title} src={c.icon} />
              </span>
            </article>
          ))}
        </div>
      );

    case "stepCards":
      return (
        <ol className="ptSteps" data-tone={s.tone}>
          {s.steps.map((st, i) => (
            <li className="ptSteps__item" key={st.label}>
              <span className="ptSteps__no">{String(i + 1).padStart(2, "0")}</span>
              <span className="ptSteps__img">
                <Hatch label={st.label} src={st.image} />
              </span>
              <b>{st.label}</b>
              {st.desc ? <p>{st.desc}</p> : null}
            </li>
          ))}
        </ol>
      );

    case "zigzag":
      return (
        <ol className="ptZig">
          {s.items.map((it, i) => (
            <li className="ptZig__item" key={it.title}>
              <span className="ptZig__img">
                <Hatch label={it.title} src={it.image} />
              </span>
              <div className="ptZig__text">
                <span className="ptZig__no">{String(i + 1).padStart(2, "0")}</span>
                <h4>{it.title}</h4>
                <ul className="ptZig__points">
                  {it.points.map((p) => (
                    <li key={p}>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      );

    case "rateTables":
      return (
        <div className="ptRate">
          {s.tables.map((t) => (
            <div className="ptRate__group" data-tone={t.tone} key={t.badge}>
              <strong className="ptRate__badge">{t.badge}</strong>
              <p className="ptRate__asOf">{t.asOf}</p>
              <table className="ptRate__table">
                <caption className="sr-only">{`${s.title} — ${t.badge}`}</caption>
                <thead>
                  <tr>
                    <th scope="col">구분</th>
                    <th scope="col">구간</th>
                    <th scope="col">요금 (원/kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.range}>
                      {/* span 0 은 위 칸이 이미 두 줄을 덮고 있다는 뜻 */}
                      {r.span > 0 ? (
                        <th scope="row" rowSpan={r.span}>
                          {r.group}
                        </th>
                      ) : null}
                      <td>{r.range}</td>
                      <td>
                        <b className="ptRate__price">
                          {r.price}
                          <span>원</span>
                        </b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="ptRate__note">
                <span>{t.note}</span>
              </p>
            </div>
          ))}
        </div>
      );

    case "benefitCards":
      return (
        <div className="ptBenefit">
          <p className="ptBenefit__summary">
            <span>{s.summary}</span>
          </p>
          <div className="ptBenefit__grid">
            {s.cards.map((c) => (
              <article className="ptBenefit__card" key={c.brand + c.product}>
                <b>{c.brand}</b>
                <em>{c.product}</em>
                <p>
                  <Hi line={c.benefit} />
                </p>
              </article>
            ))}
          </div>
          {s.more ? (
            <button className="ptBenefit__more" type="button">
              {s.more}
            </button>
          ) : null}
          {s.notes?.length ? (
            <div className="ptBenefit__notes">
              <p className="ptBenefit__notesTitle">
                <span>참고사항</span>
              </p>
              <ul>
                {s.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      );

    case "infoRows":
      return (
        <>
          <div className="ptInfo">
            {s.rows.map((r) => (
              <div className="ptInfo__row" key={r.title}>
                <Hatch label={r.title} src={r.icon} />
                <p>
                  <b>{r.title}</b>
                  <span>{r.desc}</span>
                </p>
              </div>
            ))}
          </div>
          {s.note ? <p className="ptsec__note">{s.note}</p> : null}
        </>
      );

    case "tagCards":
      return (
        <>
          <div className="ptTags">
            {s.cards.map((c) => (
              <article className="ptTags__card" key={c.tag}>
                <div>
                  <span className="ptTags__tag">{c.tag}</span>
                  <p>
                    {c.desc} {c.hi ? <b className="pt-hi">{c.hi}</b> : null}
                  </p>
                </div>
                <Hatch label={c.tag} src={c.icon} />
              </article>
            ))}
          </div>
          {s.note ? <p className="ptsec__note">{s.note}</p> : null}
        </>
      );

    case "proofRows":
      return (
        <div className="ptProof">
          <div className="ptProof__imgs">
            {s.proofs.map((p) => (
              <Hatch label={p.label} src={p.image} key={p.label} />
            ))}
          </div>
          <div className="ptProof__rows">
            {s.rows.map((r) => (
              <div className="ptProof__row" key={r.key}>
                <p className="ptProof__key">
                  <span>{r.key}</span>
                </p>
                <p className="ptProof__val">{r.val}</p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

/** 회색 바탕을 번갈아 깔아 구역을 나눈다 (시안 1021) */
function SectionBlock({ s, tone }: { s: Section; tone: boolean }) {
  return (
    <section className="ptsec" data-tone={tone ? "soft" : undefined}>
      <SectionHead s={s} />
      <SectionBody s={s} />
    </section>
  );
}

/* ------------------------------------------------------------------
   사업자 상세
   ------------------------------------------------------------------ */

export function PartnerBoard() {
  const [brand, setBrand] = useState(() =>
    Math.max(0, PARTNERS.findIndex((p) => p.slug === PARTNER_DEFAULT)),
  );
  const [tab, setTab] = useState(0);
  const [slide, setSlide] = useState(0);
  const brandsRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  const p: Partner = PARTNERS[brand];
  const tabs = p.tabs;
  const sections = tabs[tab]?.sections ?? [];

  // 사업자를 바꾸면 첫 탭부터 다시 본다
  useEffect(() => {
    setTab(0);
    setSlide(0);
  }, [brand]);

  // 손가락으로 넘겼을 때 점 맞추기
  useEffect(() => {
    const box = slidesRef.current;
    if (!box) return;
    const onScroll = () => {
      const w = (box.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
      setSlide(Math.round(box.scrollLeft / w));
    };
    box.addEventListener("scroll", onScroll, { passive: true });
    return () => box.removeEventListener("scroll", onScroll);
  }, [brand]);

  /** 탭 띠를 한 칸 오른쪽으로 */
  const nextBrand = () => {
    const box = brandsRef.current;
    if (!box) return;
    const btn = box.querySelector<HTMLElement>("button");
    box.scrollBy({ left: (btn?.offsetWidth ?? 120) + 12, behavior: "smooth" });
  };

  return (
    <div className="pt">
      {/* 사업자 고르기 */}
      <div className="pt__brands">
        <div className="shell">
          <div className="pt__brandsScroll" role="tablist" aria-label="제휴 충전사업자" ref={brandsRef}>
            {PARTNERS.map((b, i) => (
              <button
                key={b.slug}
                role="tab"
                aria-selected={i === brand}
                onClick={(e) => {
                  setBrand(i);
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
        <button className="pt__brandsNext" onClick={nextBrand} aria-label="다음 충전사업자 보기">
          <Chevron size={16} />
        </button>
      </div>

      <div className="shell">
        {/* 사업자 머리글 */}
        <div className="pt__head" data-reveal>
          <div>
            <p className="pt__headline">{p.headline}</p>
            <span className="pt__logo">
              <Hatch label={`${p.name} 로고`} src={p.logo} />
            </span>
            <p className="pt__desc">{p.desc}</p>
            {p.tags.length ? (
              <ul className="pt__tags">
                {p.tags.map((t) => (
                  <li key={t}>#{t}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="pt__ask">
            <h3>설치 및 운영 문의</h3>
            {p.points.length ? (
              <ul>
                {p.points.map((t) => (
                  <li key={t}>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <a className="pt__askBtn" href="/#consult">
              전문가 1:1 문의하기
            </a>
          </aside>
        </div>

        {/* 머리글 아래 가로 슬라이드 */}
        {p.slides.length ? (
          <div className="pt__slides">
            <div className="pt__slidesTrack" ref={slidesRef}>
              {p.slides.map((s) => (
                <div className="pt__slide" key={s.label}>
                  <Hatch label={s.label} src={s.image} />
                </div>
              ))}
            </div>
            <div className="pt__slideNav" aria-hidden="true">
              <span className="pt__slideCount">
                {slide + 1} / {p.slides.length}
              </span>
              <span className="pt__slideDots">
                {p.slides.map((s, i) => (
                  <span key={s.label} data-on={i === slide || undefined} />
                ))}
              </span>
            </div>
          </div>
        ) : null}

        {/* 메뉴 + 내용 */}
        <div className="pt__body">
          <nav className="pt__menu" role="tablist" aria-label="상세 항목">
            {tabs.map((t, i) => (
              <button key={t.key} role="tab" aria-selected={i === tab} onClick={() => setTab(i)}>
                {t.label}
              </button>
            ))}
            {/* 연결은 추후 — 자리만 둔다 */}
            <button type="button" disabled>
              {PARTNER_EXTRA_TAB.label}
            </button>
          </nav>

          <div className="pt__panel">
            {sections.length ? (
              sections.map((s, i) => <SectionBlock s={s} tone={i % 2 === 1} key={s.title + i} />)
            ) : (
              <div className="pt__empty">
                <b>{p.name} 자료 준비중</b>
                <p>자료를 받는 대로 플러그링크와 같은 구성으로 채워집니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
