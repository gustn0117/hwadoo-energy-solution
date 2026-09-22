import { Hatch } from "@/components/Hatch";
import { WHY } from "@/lib/content";

export function WhyHwadoo() {
  return (
    <section className="sec why" id="service">
      <div className="shell">
        <div className="sec-head sec-head--center" data-reveal>
          <p className="why__badge">HWADO ENERGY</p>
          <h2 className="sec-title">
            화두와 함께라면, <em>더 나은 충전환경을 만듭니다</em>
          </h2>
        </div>

        <ol className="why__list">
          {WHY.map((w, i) => (
            <li key={i} className="why__row" data-flip={i % 2 === 1} data-reveal-group>
              <Hatch className="why__img" src={w.image} label={`${w.imageLabel} (1268×738 이상)`} />
              <div className="why__text">
                <span className="why__num num">{String(i + 1).padStart(2, "0")}</span>
                <h3>
                  {w.title[0]}
                  <br />
                  {w.title[1]}
                </h3>
                <p>
                  {w.desc[0]} <br className="why__br" />
                  {w.desc[1]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
