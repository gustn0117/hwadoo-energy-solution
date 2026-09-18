import { ArrowRight } from "@/components/Icons";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section className="services">
      <div className="shell">
        <h2 className="services__title">아직도 혼자서 알아보시나요?</h2>
        <ul className="services__list">
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
