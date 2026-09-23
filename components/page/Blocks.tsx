import "@/app/styles/pages.css";
import { ArrowRight, Check } from "@/components/Icons";

/**
 * 서브 페이지 공용 블록.
 * 모든 하위 페이지는 이 블록만 조합해서 만든다 — 페이지마다 CSS를 새로 짜지 않는다.
 */

type Tone = "white" | "soft" | "off";

export function PageSection({
  eyebrow,
  title,
  desc,
  tone = "white",
  center,
  children,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  tone?: Tone;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`pg ${tone === "soft" ? "pg--soft" : tone === "off" ? "pg--off" : ""}`}>
      <div className="shell">
        {title || eyebrow || desc ? (
          <div className={`pg__head sec-head ${center ? "sec-head--center" : ""}`} data-reveal>
            {eyebrow ? <p className="sec-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="sec-title sec-title--md">{title}</h2> : null}
            {desc ? <p className="sec-desc">{desc}</p> : null}
          </div>
        ) : null}
        <div className="pg__body">{children}</div>
      </div>
    </section>
  );
}

/** 문단 — 문자열 배열을 그대로 넘긴다 */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="pg-prose">{children}</div>;
}

export function CardGrid({ cols = 3, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <ul className="pg-grid" style={{ "--cols": cols } as React.CSSProperties} data-reveal-group>
      {children}
    </ul>
  );
}

export function Card({
  icon,
  num,
  tag,
  title,
  children,
  flat,
}: {
  icon?: string;
  num?: number | string;
  tag?: string;
  title: string;
  children?: React.ReactNode;
  flat?: boolean;
}) {
  return (
    <li className={`pg-card ${flat ? "pg-card--flat" : ""}`}>
      {icon ? <img className="pg-card__icon" src={icon} alt="" loading="lazy" /> : null}
      {num !== undefined ? <span className="pg-card__num num">{num}</span> : null}
      {tag ? <span className="pg-card__tag">{tag}</span> : null}
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
    </li>
  );
}

/** 사양표 — [{ key, val }] */
export function SpecList({ rows, cols = 2 }: { rows: readonly { key: string; val: string }[]; cols?: number }) {
  return (
    <dl className="pg-spec" style={{ "--cols": cols } as React.CSSProperties} data-reveal>
      {rows.map((r) => (
        <div key={r.key}>
          <dt>{r.key}</dt>
          <dd>{r.val}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 비교표 — 첫 열은 항목명, 나머지는 업체별 값 */
export function CompareTable({
  heads,
  rows,
  pick,
}: {
  heads: readonly string[];
  rows: readonly { key: string; vals: readonly string[] }[];
  pick?: number;
}) {
  return (
    <div className="pg-tableWrap" data-reveal>
      <table className="pg-table">
        <thead>
          <tr>
            <th scope="col">구분</th>
            {heads.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <th scope="row">{r.key}</th>
              {r.vals.map((v, i) => (
                <td key={i} data-pick={pick === i || undefined}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 단계 — STEP 번호는 CSS가 자동으로 붙인다 */
export function Steps({ items, cols = 4 }: { items: readonly { title: string; desc?: string }[]; cols?: number }) {
  return (
    <ol className="pg-steps" style={{ "--cols": cols } as React.CSSProperties} data-reveal-group>
      {items.map((s) => (
        <li key={s.title}>
          <b>{s.title}</b>
          {s.desc ? <span>{s.desc}</span> : null}
        </li>
      ))}
    </ol>
  );
}

export function MediaRow({
  image,
  alt = "",
  title,
  flip,
  children,
}: {
  image: string;
  alt?: string;
  title: string;
  flip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="pg-media" data-flip={flip || undefined} data-reveal-group>
      <figure>
        <img src={image} alt={alt} loading="lazy" />
      </figure>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

/** 체크 목록 — { b: 굵은 제목, t: 설명 } */
export function CheckList({ items, cols = 2 }: { items: readonly { b: string; t?: string }[]; cols?: number }) {
  return (
    <ul className="pg-checks" style={{ "--cols": cols } as React.CSSProperties} data-reveal-group>
      {items.map((i) => (
        <li key={i.b}>
          <Check size={22} />
          <span>
            <b>{i.b}</b>
            {i.t}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="pg-note" data-reveal>
      {children}
    </p>
  );
}

/** 페이지 하단 상담 유도 — 버튼은 상담 팝업을 연다 */
export function PageCta({
  title = "우리 단지에 맞는 충전 솔루션이 궁금하세요?",
  desc = "전문 컨설턴트가 단지 상황에 맞춰 1:1로 안내해드립니다.",
  label = "1:1 설치 상담",
}: {
  title?: string;
  desc?: string;
  label?: string;
}) {
  return (
    <div className="pg-cta" data-reveal>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <a className="btn btn--orange" href="/#consult">
        {label}
        <ArrowRight />
      </a>
    </div>
  );
}
