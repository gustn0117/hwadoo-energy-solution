import { ArrowRight } from "@/components/Icons";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section className="sec services">
      <div className="shell">
        <div className="sec-head" data-reveal>
          <h2 className="sec-title sec-title--md">아직도 혼자서 알아보시나요?</h2>
        </div>
        <ul className="services__list" data-reveal-group>
          {SERVICES.map((s) => (
            <li key={s.title}>
              <a className="svc" href={s.href} data-tone={s.tone}>
                <img src={s.icon} alt="" width={306} height={286} loading="lazy" />
                <b>{s.title}</b>
                <span>{s.desc}</span>
                <i className="svc__arrow">
                  <ArrowRight size={18} />
                </i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
