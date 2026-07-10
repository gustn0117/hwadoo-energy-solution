import { Hatch } from "./Hatch";

export function Evos() {
  return (
    <section className="section" id="evos">
      <div className="shell">
        <div className="evos__inner">
          <div>
            <p className="eyebrow eyebrow--onDark">EVOS Platform</p>
            <h2 className="evos__title">
              시공에서 끝나지 않습니다.
              <br />
              우리 단지 충전기를 계속 지켜봅니다.
            </h2>
            <p className="evos__lead">
              공동주택 EV충전 인프라를 단순 시공이 아니라 데이터, 설치검토,
              운영지원, 리포트 서비스까지 연결하는 플랫폼형 서비스입니다.
            </p>
            <div className="evos__list">
              <span className="evos__chip">충전기 실시간 상태</span>
              <span className="evos__chip">긴급 확인 장비 알림</span>
              <span className="evos__chip">월간 분석 리포트</span>
              <span className="evos__chip">설치 컨설팅</span>
            </div>
          </div>

          <Hatch
            onDark
            className="evos__screen"
            label="EVOS 관제 대시보드 스크린샷 — 충전기 34기 실시간 현황"
          />
        </div>
      </div>
    </section>
  );
}
