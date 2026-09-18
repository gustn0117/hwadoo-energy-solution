/**
 * 확정 시안(2026.09.18 전달)의 문구와 이미지 경로.
 * 이미지는 public/images/ — 고객사 전달 원본(0918.zip).
 * 값이 null인 이미지는 원본 미전달분 — 경로를 채우면 빗금 자리가 이미지로 바뀐다.
 */

/** 주소 검색 섹션 배경 — 시안의 흐린 아파트 단지 사진 */
export const FINDER_BG: string | null = null;

export const COMPANY = {
  name: "화두에너지솔루션",
  nameEn: "Hwadu Energy Solution",
  tel: "1660-4589",
  hours: "평일 오전 9시~오후 6시",
  // 시안 푸터의 자리표시 값 — 실제 사업자 정보 수령 후 교체
  ceo: "홍길동",
  email: "gildong@naver.com",
  fax: "02-0000-0000",
  address: "경기도 광명시 ㅇㅇ로 00",
} as const;

export const TEL_HREF = `tel:${COMPANY.tel.replaceAll("-", "")}`;

/** 헤더 메뉴 — 설치사례·고객지원은 별도 페이지, 나머지는 메인의 해당 섹션 */
export const MENU = [
  { label: "화두에너지솔루션", href: "/#about" },
  { label: "비교하기", href: "/#compare" },
  { label: "설치·운영", href: "/#service" },
  { label: "화재안전", href: "/#fire" },
  { label: "설치사례", href: "/cases" },
  { label: "고객지원", href: "/faq" },
] as const;

export const HERO_POINTS = [
  { icon: "/images/apartment-icon.png", title: "전국 아파트", desc: "설치 경험 보유" },
  { icon: "/images/charging-partner-icon.png", title: "주요 충전사업자", desc: "한 번에 비교" },
  { icon: "/images/consultant-icon.png", title: "전문 컨설턴트", desc: "1:1 맞춤 상담" },
] as const;

export const CPO_OPTIONS = ["플러그링크", "에버온", "현대엔지니어링", "SK일렉링크"] as const;

export const BUILDING_OPTIONS = [
  "공동주택(아파트)",
  "단독주택",
  "지식산업센터/빌딩(상가)",
  "기타건물(오피스텔 등)",
] as const;

export const STATS = [
  { label: "전국 아파트", value: "1,300" },
  { label: "충전기 설치", value: "12,000" },
  { label: "충전사업자 제휴", value: "6" },
] as const;

export const SERVICES = [
  { icon: "/images/installation-diagnosis.png", title: "충전기 설치 진단", desc: "주소 기반으로 설치여부 확인", href: "#diagnosis", tone: "purple" },
  { icon: "/images/charging-business-compare.png", title: "충전사업소 비교", desc: "사업자별 조건 및 혜택 비교", href: "#compare", tone: "navy" },
  { icon: "/images/installation-operation.png", title: "설치·운영", desc: "설치부터 유지관리까지", href: "#service", tone: "purple" },
  { icon: "/images/installation-case.png", title: "설치 사례", desc: "실제 구축현장 확인", href: "/cases", tone: "navy" },
] as const;

export const SEARCH_STEPS = [
  { icon: "/images/installation-status.png", title: "설치현황 확인", desc: ["아파트 단지별 충전기", "설치 현황을 확인"] },
  { icon: "/images/complex-info.png", title: "단지정보 확인", desc: ["설치 가능한 위치와", "상세정보 확인"] },
  { icon: "/images/additional-installation.png", title: "추가설치 검토", desc: ["추가 설치 가능여부", "간편하게 확인"] },
] as const;

/** 로고 이미지 미전달 — logo 경로를 채우면 빗금 자리가 로고로 바뀐다 */
export const BRANDS: {
  name: string;
  logo: string | null;
  features: readonly string[];
}[] = [
  { name: "플러그링크", logo: null, features: ["화재예방부터 보상까지", "2025년 완속 충전기 1위", "교통카드 연동"] },
  { name: "에버온", logo: null, features: ["화재예방부터 보상까지", "2025년 완속 충전기 1위", "교통카드 연동"] },
  { name: "현대엔지니어링", logo: null, features: ["화재예방부터 보상까지", "2025년 완속 충전기 1위", "교통카드 연동"] },
  { name: "SK일렉링크", logo: null, features: ["화재예방부터 보상까지", "2025년 완속 충전기 1위", "교통카드 연동"] },
];

export const WHY = [
  {
    title: ["충전기 전문가가", "제안하는 맞춤 설치 상담"],
    desc: ["아파트 현 상황과 여러가지를 고려하여 혜택이 좋은", "사업자 브랜드로 찾아드려요."],
    image: null as string | null,
    imageLabel: "사진 · 현장 상담",
  },
  {
    title: ["현장 확인부터", "설치 전 과정 지원"],
    desc: ["아파트 현 상황과 여러가지를 고려하여 혜택이 좋은", "사업자 브랜드로 찾아드려요."],
    image: null as string | null,
    imageLabel: "사진 · 현장 점검",
  },
  {
    title: ["설치 이후", "안정적인 관리 지원"],
    desc: ["아파트 현 상황과 여러가지를 고려하여 혜택이 좋은", "사업자 브랜드로 찾아드려요."],
    image: null as string | null,
    imageLabel: "사진 · 관제 모니터링",
  },
  {
    title: ["충전기 전문가가", "제안하는 맞춤 설치 상담"],
    desc: ["아파트 현 상황과 여러가지를 고려하여 혜택이 좋은", "사업자 브랜드로 찾아드려요."],
    image: null as string | null,
    imageLabel: "사진 · 설치 상담",
  },
] as const;

/**
 * FAQ 기본 문항 — 실제 노출은 관리자(/admin/faq)에서 관리하는 DB 값이다.
 * DB를 읽지 못할 때만 이 값을 쓴다. 줄 맨 앞 "- "는 글머리표.
 */
export const FAQ: { q: string; answer: string }[] = [
  {
    q: "친환경자동차법에 따른 충전시설 의무설치란 무엇일까요?",
    answer:
      "- ‘환경친화적 자동차의 개발 및 보급 촉진에 관한 법률 시행령’이 2022년 1월 28일부터 시행되었습니다.\n- 신축/공공 기축시설은 총 주차면수의 5% 이상, 기축시설은 2% 이상을 설치해야 합니다.\n- 의무설치 기한은 2025년 1월 27일(유예기간 2026년 1월 27일)이며, 미이행 시 시정명령 및 3,000만원 이하의 이행강제금이 부과될 수 있습니다.",
  },
  {
    q: "충전구역 설치 위치 지정시 핵심 고려 사항은 무엇이 있을까요?",
    answer:
      "국토교통부·LH가 [공동주택 전기차 충전·소방시설 점검 및 화재 예방·대응 행동요령] 체계를 정리해 발간 및 배포한 자료(공동주택 전기자동차 화재대응 매뉴얼)에 따르면 아래와 같습니다.\n- 어린이 놀이터, 유치원, 노유자시설 등과 같은 공간으로부터 20m이상 이격 설치\n- 쓰레기 처리장 등 가연물 보관장소 등과 20m이상 이격 설치\n- 가연성 또는 인화성 물질을 보관하는 장소와 20m이상 이격 설치\n- 지하주차장의 경우 지하 3층 이하의 층은 충전구역 설치 제한\n- 소방대가 쉽게 접근 가능한 위치 선정 필요",
  },
  {
    q: "전기차 주차구역 설치는 입대의 의결로 진행 가능한 사항일까요?",
    answer:
      "- 공동주택관리법 제14조 제11항에 따라 단지 안의 주차장 등의 유지·운영 기준은 입주자대표회의 의결사항입니다.\n- 고정형 충전기 및 충전 전용 주차구획을 설치·교체하는 행위로서 입대의의 동의를 받은 경우를 규정하고 있습니다.",
  },
  {
    q: "행위신고와 행위 허가의 차이점이 무엇일까요?",
    answer:
      "- 행위신고 — 고정형 충전기 설치/교체/이동 등을 입주자 대표회의 의결로 신고하는 절차. 입대의 회의록이 필요합니다.\n- 행위허가 — 부대시설 및 입주자 공유인 복리시설의 파손 철거 시 진행하는 절차. 지하주차장은 전체 입주자의 1/2 이상 동의, 지상주차장은 2/3 이상의 동의서가 필요합니다.",
  },
];
