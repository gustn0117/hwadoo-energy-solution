/**
 * 기획서(Ver.3) / 상세기능정의서 / 마인드맵에서 추출한 콘텐츠.
 * 마인드맵 지시에 따라 시안 기준 충전사업자는 '에버온'.
 */

export const COMPANY = {
  name: "㈜화두에너지솔루션",
  nameEn: "HWADOO ENERGY SOLUTION",
  tel: "1660-4589",
} as const;

/**
 * 메인 비주얼 배경 사진.
 * public/ 에 파일을 넣고 경로를 적으면 빗금 플레이스홀더가 사진으로 바뀐다.
 * 예: "/hero.jpg"
 */
export const HERO_PHOTO: string | null = "/images/generated/hero-ev-parking.webp";

export const HERO_PHOTO_SPEC = {
  subject: "아파트 지하주차장 완속충전 구역",
  size: "2400 × 1400 px 이상 · 가로형",
} as const;

/** 헤더 메가메뉴 — 어떤 메뉴에 올려도 전체가 보인다 */
export const MENU = [
  {
    title: "설치(상담)신청",
    items: [
      { label: "플러그링크" },
      { label: "에버온", badge: "시안" },
      { label: "현대엔지니어링" },
      { label: "SK일렉링크" },
    ],
  },
  {
    title: "충전사업자 비교",
    items: [{ label: "4개사 비교표" }],
  },
  {
    title: "관련규정",
    items: [{ label: "의무설치란?" }, { label: "관련 규정 FAQ" }],
  },
  {
    title: "설치사례",
    items: [{ label: "현장 사진 · 설치 수량" }],
  },
  {
    title: "화재대응 용품",
    items: [
      { label: "상방향 주수장치" },
      { label: "질식소화포" },
      { label: "전기차전용 소화기" },
      { label: "전기차 충전소 격벽" },
      { label: "AI BOX (Fire Box)" },
      { label: "전기차 화재예방 시스템" },
    ],
  },
] as const;

export const HERO_STATS = [
  { value: "51,238", unit: "기", label: "에버온 환경부 충전기 운영수량 (2026.05)" },
  { value: "1,300", unit: "개 현장", label: "화두에너지솔루션 아파트 설치 현장" },
  { value: "12,000", unit: "대", label: "누적 완속충전기 설치 실적" },
] as const;

/** 시그니처 게이지 — 기획서 화면 002의 설치절차 8단계 */
export const PROCESS = [
  "상담 신청",
  "담당자 상담",
  "현장 실사",
  "실사 보고서",
  "계약서 작성",
  "환경부 접수·승인",
  "설치 시공",
  "개통 및 사용",
] as const;

export const CPO_OPTIONS = [
  "에버온",
  "플러그링크",
  "현대엔지니어링",
  "SK일렉링크",
] as const;

export const BUILDING_OPTIONS = [
  "공동주택(아파트)",
  "단독주택",
  "지식산업센터/빌딩(상가)",
  "기타건물(오피스텔 등)",
] as const;

export const PRODUCT_SPEC = [
  { key: "충전 방식", val: "SAE J1772 표준 · 완속 7kW" },
  { key: "통신", val: "환경부 인증 PLC 모뎀 (차량 BMS 연동)" },
  { key: "디스플레이", val: "2.8인치 컬러 터치스크린 · LED 상태 표시" },
  { key: "인증", val: "KC 형식승인" },
  { key: "보호 등급", val: "IP44 이상 · 난연성 재질" },
  { key: "사용자 인증", val: "RF 태그 · QR · 바로ON 오토차징" },
] as const;

export const SAFETY_FEATURES = [
  { b: "누전 · 과전류 차단", t: "누전 감지, 과전류 40A 초과 시 충전기 전원 차단" },
  { b: "서지 프로텍터", t: "순간적인 고전압 인입 시 고전압을 제거해 안전범위 전압 공급" },
  { b: "과열 방지 온도감지", t: "충전 전류를 제어해 충전기 과열 방지" },
  { b: "방수 · 방진 및 난연", t: "불에 잘 타지 않는 난연성 재질 사용" },
  { b: "리모트 H/W 리셋", t: "장애 발생 시 즉시 원격 조치" },
] as const;

export const APP_FEATURES = [
  { b: "바로ON", t: "커플러를 꽂기만 하면 인증 없이 충전부터 결제까지 — 국내 유일 오토차징" },
  { b: "모바일카드", t: "회원가입 즉시 모바일 회원카드 발급 및 이용" },
  { b: "QR코드 · 간편코드", t: "충전기 QR 스캔 또는 하단 6자리 코드 입력 후 충전" },
  { b: "간편결제", t: "Payco, 네이버페이, Toss pay 등 복수 결제수단 등록" },
  { b: "스마트 분석", t: "충전 이용 패턴 분석과 충전소 추천" },
  { b: "토크ON", t: "충전소별 쌍방향 커뮤니케이션 — 각종 알림, 정보공유" },
] as const;

export const RATES = [
  { name: "완속 · 일반 회원", sub: null, was: "296원", now: "246", tag: "그린세이브" },
  { name: "완속 · 알뜰ON AI 회원", sub: "스마트요금 가입 시", was: "276원", now: "226", tag: "그린세이브" },
  { name: "급속 · 일반 회원", sub: "그린세이브 반값 할인", was: "296원", now: "148", tag: "반값" },
] as const;

export const CASES = [
  { name: "힐스테이트자이계양", qty: 149, image: "/images/generated/case-1.webp" },
  { name: "김포 풍무푸르지오", qty: 128, image: "/images/generated/case-2.webp" },
  { name: "수원SK스카이뷰아파트", qty: 119, image: "/images/generated/case-3.webp" },
  { name: "창원센트럴파크에일린의뜰", qty: 119, image: "/images/generated/case-4.webp" },
  { name: "봉담자이프라이드시티", qty: 113, image: "/images/generated/case-5.webp" },
  { name: "부평캐슬앤더샵퍼스트", qty: 107, image: "/images/generated/case-6.webp" },
  { name: "힐스테이트검단웰카운티", qty: 104, image: "/images/generated/case-7.webp" },
  { name: "다산이편한세상자이", qty: 100, image: "/images/generated/case-8.webp" },
] as const;

export const FIRE_ITEMS = [
  { name: "상방향 주수장치", desc: "차량 하부 배터리팩에 직접 주수해 열폭주를 억제합니다.", image: "/images/generated/fire-1.webp" },
  { name: "질식소화포", desc: "차량 전체를 덮어 산소를 차단, 인접 차량으로의 연소 확대를 막습니다.", image: "/images/generated/fire-2.webp" },
  { name: "전기차전용 소화기", desc: "리튬이온 배터리 화재에 대응하도록 설계된 전용 소화 약제.", image: "/images/generated/fire-3.webp" },
  { name: "전기차 충전소 격벽", desc: "충전 구역을 물리적으로 구획해 화재 확산 경로를 차단합니다.", image: "/images/generated/fire-4.webp" },
  { name: "AI BOX (Fire Box)", desc: "충전 중 이상 징후를 영상·온도로 감지해 관리사무소에 즉시 알립니다.", image: "/images/generated/fire-5.webp" },
  { name: "전기차 화재예방 시스템", desc: "감지부터 초기 진압까지 연동 제어하는 통합 대응 시스템.", image: "/images/generated/fire-6.webp" },
] as const;

export const COMPARE = {
  asOf: "2026.05",
  pick: 0,
  cpos: [
    { name: "에버온", image: "/images/generated/charger-1.webp" },
    { name: "플러그링크", image: "/images/generated/charger-2.webp" },
    { name: "현대엔지니어링", image: "/images/generated/charger-3.webp" },
    { name: "SK일렉링크", image: "/images/generated/charger-4.webp" },
  ],
  /** 크기가 곧 의미인 수치 — 막대로 읽힌다 */
  bars: [
    {
      key: "환경부 충전기 운영수량",
      unit: "기",
      vals: [51238, 44636, 11736, 10164],
    },
    {
      key: "환경부 사업 운영기간",
      unit: "년",
      vals: [9, 4, 3, 9],
    },
  ],
  /** 큰 활자로 세우는 단일 수치 */
  price: {
    key: "충전 기본요금",
    unit: "원/kWh",
    vals: ["296", "324.4", "292", "295"],
  },
  rows: [
    { key: "운영사 설립연도", vals: ["2017년 1월", "2021년 1월", "2022년 1월", "2017년 1월"] },
    { key: "제조사", vals: ["에버온 (자체생산)", "에바", "제니스코리아", "SK일렉링크 (OEM)"] },
    { key: "계약기간 / 무상 유지보수", vals: ["5년 · 7년 · 10년", "7년 · 10년", "7년 · 10년", "7년 · 10년"] },
    { key: "A/S 유지관리", vals: ["365일 24시간 · 점검주기 최소 연 6회", "365일 24시간 · 분기 1회", "365일 24시간 · 반기 1회", "365일 24시간 콜센터"] },
    { key: "손해보험 보상범위", vals: ["생산물배상책임보험 30억 (대인/대물 일괄)", "영업배상책임보험 50억 · 생산물 10억", "사고배상책임보험 대인 1.5억 · 대물 10억", "영업배상책임보험 100억"] },
    { key: "업계 특징", vals: [
      "국내 유일 오토차징 '바로ON플러스' · 스마트제어 PLC · 충전 패턴 분석",
      "업계 최초 PnC 간편충전 · QR 인증 · BNPL 결제",
      "현대차그룹 전용 플랫폼 · 자체 개발 시설 유지관리 시스템",
      "9년 연속 기후부 급·완속 보조사업자 선정 · 급속 최다 보유",
    ] },
  ],
} as const;

export const FAQ = [
  {
    q: "친환경자동차법에 따른 충전시설 의무설치란 무엇일까요?",
    a: [
      "‘환경친화적 자동차의 개발 및 보급 촉진에 관한 법률 시행령’이 2022년 1월 28일부터 시행되었습니다.",
      "신축/공공 기축시설은 총 주차면수의 5% 이상, 기축시설은 2% 이상을 설치해야 합니다.",
      "의무설치 기한은 2025년 1월 27일(유예기간 2026년 1월 27일)이며, 미이행 시 시정명령 및 3,000만원 이하의 이행강제금이 부과될 수 있습니다.",
    ],
  },
  {
    q: "충전구역 설치 위치 지정 시 핵심 고려사항은 무엇이 있을까요?",
    a: [
      "어린이 놀이터, 유치원, 노유자시설 등과 같은 공간으로부터 20m 이상 이격 설치",
      "쓰레기 처리장 등 가연물 보관장소와 20m 이상 이격 설치",
      "가연성 또는 인화성 물질을 보관하는 장소와 20m 이상 이격 설치",
      "지하주차장의 경우 지하 3층 이하의 층은 충전구역 설치 제한",
      "소방대가 쉽게 접근 가능한 위치 선정 필요",
    ],
  },
  {
    q: "전기차 주차구역 설치는 입대의 의결로 진행 가능한 사항일까요?",
    a: [
      "공동주택관리법 제14조 제11항에 따라 단지 안의 주차장 등의 유지·운영 기준은 입주자대표회의 의결사항입니다.",
      "고정형 충전기 및 충전 전용 주차구획을 설치·교체하는 행위로서 입대의의 동의를 받은 경우를 규정하고 있습니다.",
    ],
  },
  {
    q: "행위신고와 행위허가의 차이점이 무엇일까요?",
    a: [
      "행위신고 — 고정형 충전기 설치/교체/이동 등을 입주자 대표회의 의결로 신고하는 절차. 입대의 회의록이 필요합니다.",
      "행위허가 — 부대시설 및 입주자 공유인 복리시설의 파손 철거 시 진행하는 절차. 지하주차장은 전체 입주자의 1/2 이상 동의, 지상주차장은 2/3 이상의 동의서가 필요합니다.",
    ],
  },
] as const;
