/**
 * 회사소개 (시안 1021).
 * 사업영역 카드는 시안에 1번만 글자가 보여서, 나머지 셋은
 * 기존 사업 흐름(BUSINESS_FLOW) 문구를 옮겨 적었다 — 원고가 오면 여기만 고치면 된다.
 */

const A = "/images/about";

export const ABOUT_HERO = {
  eyebrow: "아파트 전기차 충전기",
  title: ["충전 인프라 새로운 기준", "화두에너지솔루션"],
  desc: ["다양한 충전사업자와의 협력을 통해 최적화된 전기차 충전 인프라를", "제공하는 전문 파트너입니다."],
  cta: { label: "충전기 설치 진단", href: "/diagnosis" },
  image: `${A}/hero.png`,
};

export const ABOUT_VALUES_BAND = {
  eyebrow: "OUR CORE VALUES",
  title: ["더함께하는 가치,", "더 나은 미래를 만드는 화두"],
  items: [
    { ko: "함께하는", en: "TOGETHER", icon: `${A}/value-together.png` },
    { ko: "전문성", en: "BEST", icon: `${A}/value-best.png` },
    { ko: "신뢰", en: "TRUST", icon: `${A}/value-trust.png` },
    { ko: "해결", en: "SOLVE", icon: `${A}/value-solve.png` },
  ],
};

export const ABOUT_BUSINESS = {
  title: ["전기차 충전 인프라 모든 과정,", "화두가 함께합니다."],
  badge: "HWADO ENERGY",
  cards: [
    {
      tag: "BUSINESS 01",
      title: "충전사업자 비교 및 선정",
      desc: ["아파트 현 상황과 여러가지를 고려하여 혜택이 좋은", "사업자 브랜드로 찾아드려요."],
      icon: `${A}/biz-01.png`,
      photo: `${A}/biz-photo-01.png`,
    },
    {
      tag: "BUSINESS 02",
      title: "설치 진단과 현장 설계",
      desc: ["총 주차면수와 전력 용량, 소방 이격거리를 확인해", "설치 가능한 위치와 수량을 먼저 진단해요."],
      icon: `${A}/biz-02.png`,
      photo: `${A}/biz-photo-02.png`,
    },
    {
      tag: "BUSINESS 03",
      title: "행정 대행과 설치 시공",
      desc: ["행위신고와 환경부 접수를 대행하고", "전기 공사와 충전기 설치를 진행해요."],
      icon: `${A}/biz-03.png`,
      photo: `${A}/biz-photo-03.png`,
    },
    {
      tag: "BUSINESS 04",
      title: "운영과 화재 안전 관리",
      desc: ["개통 이후 고장 접수와 정기 점검, 민원 대응까지", "같은 담당자가 이어서 관리해요."],
      icon: `${A}/biz-04.png`,
      photo: `${A}/biz-photo-04.png`,
    },
  ],
};

export const ABOUT_HISTORY = {
  eyebrow: "OUR HISTORY",
  title: ["지금까지 걸어온 길이", "더 나은 내일을 만듭니다."],
  desc: ["꾸준한 도전과 성장을 통해", "전기차 충전 인프라의 새로운 기준을", "만들어가고 있습니다."],
  years: [
    {
      year: "2025.10",
      title: "지속적인 성장",
      items: [
        "플러그링크 총판 계약",
        "전국 50여개의 영업사를 통해\n공동주택(아파트)에 전기차 충전기 5,000기 계약 완료",
      ],
    },
    {
      year: "2024.01",
      title: "주요 파트너십 강화",
      items: [
        "플러그링크 총판 계약",
        "LGU+ 총판 계약",
        "한화솔루션 총판 계약",
        "신세계아이앤씨 총판 계약",
        "파킹클라우드, 동양I&C 영업 개시",
        "전국 30여개의 영업사를 통해\n공동주택(아파트)에 전기차 충전기 3,000기 설치",
      ],
    },
    {
      year: "2023",
      title: "법인 전환과 사업 확장",
      items: [
        "법인 전환을 통한 ‘화두에너지솔루션’ 설립",
        "플러그링크 총판 계약",
        "LGU+ 총판 계약",
        "신세계아이앤씨 총판 계약",
        "대영채비, 차지비, 아이마켓 영업 개시",
        "전국 20여개의 영업사를 통해 공동주택(아파트)에 전기차 충전기 2,000기 설치",
        "한라시멘트 전략적 제휴를 통하여 전국 6개 공장에 충전기 설치",
      ],
    },
    {
      year: "2022",
      title: "파트너십 확대",
      items: [
        "플러그링크 전기차 충전기 총판 계약",
        "플러그링크 전기차 충전기 영업을 통해 전국에 1,700기 설치",
      ],
    },
  ],
};

export const ABOUT_WHY = {
  eyebrow: "Why HWADO?",
  title: ["수많은 선택지 속에서", "왜 화두에너지솔루션 인가?"],
  desc: ["다양한 선택지와 풍부한 현장 경험을 바탕으로", "우리 아파트에 꼭 맞는 최적의 솔루션을 제안합니다."],
  image: `${A}/why-illust.png`,
  items: [
    { title: ["아파트 특화", "설치 경험"], icon: `${A}/why-01.png` },
    { title: ["다양한", "충전사업자 비교"], icon: `${A}/why-02.png` },
    { title: ["설치 전 과정", "지원"], icon: `${A}/why-03.png` },
    { title: ["설치 이후", "관리까지"], icon: `${A}/why-04.png` },
    { title: ["안전까지", "고려한 솔루션"], icon: `${A}/why-05.png` },
  ],
};

/** 마지막 섹션 — 6개 충전사업자 한 번에 비교 (시안 1021) */
export const ABOUT_BRANDS = {
  badge: "오직 화두에너지솔루션에서만",
  title: ["6개 충전사업자를", "화두에서 한 번에 비교하세요!"],
  /* 제목 양옆에 떠 있는 앱 아이콘 — 왼쪽 셋 · 오른쪽 셋 */
  icons: [1, 2, 3, 4, 5, 6].map((i) => `${A}/app-${i}.png`),
  cards: [
    { name: "플러그링크", desc: "전기차 충전경험을 기술로", logo: `${A}/logo-pluglink.png`, href: "/compare/partners" },
    { name: "에버온", desc: "스마트한 기술력", logo: `${A}/logo-everon.png`, href: "/compare/partners" },
    { name: "SK일렉링크", desc: "급속충전기 시장점유율 1위", logo: `${A}/logo-sk.png`, href: "/compare/partners" },
    { name: "현대엔지니어링", desc: "전기차 충전경험을 기술로", logo: `${A}/logo-hyundai.png`, href: "/compare/partners" },
    { name: "그리드위즈", desc: "요금, 탄소배출 까지", logo: `${A}/logo-gridwiz.png`, href: "/compare/partners" },
    { name: "나이스차저", desc: "스트레스 없는 충전생활", logo: `${A}/logo-nice.png`, href: "/compare/partners" },
  ],
};
