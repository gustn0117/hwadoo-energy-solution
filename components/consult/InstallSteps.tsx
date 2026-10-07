import { Chevron } from "@/components/Icons";
import { INSTALL_STEPS } from "@/lib/content";

/** 설치 절차 8단계 띠 — 설치 상담 페이지 하단 (시안 1007) */
export function InstallSteps() {
  return (
    <section className="iproc" aria-label="설치 절차">
      <div className="shell">
        <div className="iproc__box" data-reveal>
          <div className="iproc__head">
            <div>
              <p className="iproc__eyebrow">INSTALLATION PROCESS</p>
              <h2>설치 절차</h2>
            </div>
            <p className="iproc__desc">상담부터 설치까지, 화두에너지솔루션이 처음부터 끝까지 함께 합니다.</p>
          </div>

          <ol className="iproc__list">
            {INSTALL_STEPS.map((s, i) => (
              <li key={s.label}>
                <span className="iproc__icon">
                  <em className="num">{i + 1}</em>
                  <img src={s.icon} alt="" width={85} height={88} loading="lazy" />
                </span>
                <b>{s.label}</b>
                {i < INSTALL_STEPS.length - 1 ? <Chevron className="iproc__arrow" size={18} /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
