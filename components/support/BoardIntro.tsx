/** 게시판 상단 안내 띠 — 고객지원 네 페이지가 같은 모양으로 쓴다 (시안 1004) */
export function BoardIntro({
  icon,
  lead,
  title,
  desc,
}: {
  icon: string;
  lead: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="board__intro" data-reveal>
      <img src={icon} alt="" width={306} height={286} />
      <div>
        <h2>
          <em>{lead}</em> {title}
        </h2>
        <p>{desc}</p>
      </div>
    </div>
  );
}

/** 페이지별 문구 — 문구만 바꾸면 네 페이지에 그대로 반영된다 */
export const BOARD_INTRO = {
  promotion: {
    icon: "/images/installation-case.png",
    lead: "지금 진행 중인 혜택,",
    title: "단지에 맞는 프로모션을 골라보세요",
    desc: "충전사업자별로 제공하는 혜택이 다릅니다. 상담 시 적용 가능 여부를 확인해드립니다.",
  },
  faq: {
    icon: "/images/customer-support-icon.png",
    lead: "설치 전에 가장 많이 묻는 것,",
    title: "궁금한 점을 먼저 확인해보세요",
    desc: "의무설치 기준부터 입주자대표회의 절차까지, 자주 받는 질문을 정리했습니다.",
  },
  notice: {
    icon: "/images/installation-status.png",
    lead: "제도 변경부터 서비스 소식까지,",
    title: "화두가 먼저 알려드립니다",
    desc: "충전 인프라 관련 제도와 서비스 변경 사항을 가장 빠르게 전해드립니다.",
  },
  cases: {
    icon: "/images/installation-diagnosis.png",
    lead: "아파트부터 대형 시설까지,",
    title: "현장에서 검증된 화두 충전 인프라",
    desc: "아파트는 물론 상업시설과 관공서까지, 화두의 설치 경험은 계속되고 있습니다.",
  },
} as const;
