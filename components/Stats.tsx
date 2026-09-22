import { CountUp } from "@/components/CountUp";
import { STATS } from "@/lib/content";

export function Stats() {
  return (
    <section className="stats is-dark" id="about" aria-label="화두에너지솔루션 실적">
      <div className="shell stats__inner">
        <h2 className="sec-title sec-title--md" data-reveal>
          이미 현장에서 증명한
          <br />
          <em>화두만의 충전 인프라 노하우</em>
        </h2>
        <dl className="stats__list" data-reveal-group>
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd className="num">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
