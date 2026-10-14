/**
 * 한 눈에 비교 — 충전사업자 비교표 (시안 1014).
 * 값은 전달받은 시안과 기존 비교 자료에서 가져왔다.
 * 자료가 없는 사업자는 "-" 로 두었다 — 값이 들어오면 이 파일만 고치면 된다.
 */

export type CompareBrand = {
  name: string;
  /** 카드 머리의 띠 색 */
  color: string;
  logo: string | null;
  /** 충전기 제품 사진 — 원본 미전달분은 기존 사진으로 대신함 */
  photo: string | null;
};

export const COMPARE_BRANDS: CompareBrand[] = [
  { name: "플러그링크", color: "#015aff", logo: "/images/brands/pluglink.png", photo: "/images/photos/charger-2.webp" },
  { name: "에버온", color: "#21a9e5", logo: "/images/brands/everon.svg", photo: "/images/photos/charger-1.webp" },
  { name: "현대엔지니어링", color: "#009a44", logo: "/images/brands/hyundai-engineering.png", photo: "/images/photos/charger-3.webp" },
  { name: "SK일렉링크", color: "#ed2046", logo: "/images/brands/sk-electlink.svg", photo: "/images/photos/charger-4.webp" },
  { name: "나이스차저", color: "#6b7280", logo: null, photo: null },
  { name: "그리드위즈", color: "#6b7280", logo: null, photo: null },
];

/** 카드 제휴 혜택 — 네 곳이 같은 조건이라 한 번만 적어 둔다 */
const CARDS = [
  { b: "현대카드", t: "최대 70%할인 및 포인트 적립" },
  { b: "신한카드", t: "최대 50% 할인" },
  { b: "롯데카드", t: "최대 50% 할인" },
];
const NONE = { text: "-" } as const;

export type CompareCell =
  /** 로고와 제품 사진이 들어가는 첫 줄 */
  | { brand: true }
  /** 큰 글씨 + 작은 설명 */
  | { text: string; sub?: string; accent?: boolean }
  /** 글머리표 목록 */
  | { list: { b: string; t: string }[] };

export type CompareRow = { key: string; cells: CompareCell[] };
export type CompareGroup = { label: string; rows: CompareRow[] };

/** 값 네 개만 받아 나머지(나이스차저·그리드위즈)는 "-" 로 채운다 */
const row = (key: string, cells: CompareCell[]): CompareRow => ({
  key,
  cells: [...cells, ...Array(COMPARE_BRANDS.length - cells.length).fill(NONE)],
});

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    label: "기본정보",
    rows: [
      { key: "충전사업자 브랜드", cells: COMPARE_BRANDS.map(() => ({ brand: true as const })) },
      row("환경부 충전기 운영기간", [
        { text: "5년", sub: "(2021년 ~ 현재)" },
        { text: "9년", sub: "(2017년 ~ 현재)" },
        { text: "9년", sub: "(2022년 ~ 현재)" },
        { text: "9년", sub: "(2017년 ~ 현재)" },
      ]),
      row("충전기 운영수량", [
        { text: "44,636+", accent: true },
        { text: "51,238+", accent: true },
        { text: "11,763+", accent: true },
        { text: "10,164+", accent: true },
      ]),
      row("제조사", [
        { text: "휴맥스" },
        { text: "에버온(자체생산)" },
        { text: "제네스코리아" },
        { text: "SK일렉링크" },
      ]),
      row("카드 제휴사", [{ list: CARDS }, { list: CARDS }, { list: CARDS }, { list: CARDS }]),
    ],
  },
  {
    label: "요금·계약",
    rows: [
      row("충전 기본요금", [
        { text: "324.4원", sub: "/kWh" },
        { text: "296원", sub: "/kWh" },
        { text: "292원", sub: "/kWh" },
        { text: "295원", sub: "/kWh" },
      ]),
      row("계약기간 / 무상 유지보수", [
        { text: "7년 · 10년" },
        { text: "5년 · 7년 · 10년" },
        { text: "7년 · 10년" },
        { text: "7년 · 10년" },
      ]),
      row("운영사 설립연도", [
        { text: "2021년 1월" },
        { text: "2017년 1월" },
        { text: "2022년 1월" },
        { text: "2017년 1월" },
      ]),
    ],
  },
  {
    label: "지원·할인 혜택",
    rows: [
      row("결제 · 부가 서비스", [
        { text: "업계 최초 PnC 간편충전", sub: "QR 인증 · BNPL 결제" },
        { text: "국내 유일 오토차징", sub: "‘바로ON플러스’ · 스마트제어 PLC" },
        { text: "현대차그룹 전용 플랫폼", sub: "자체 개발 시설 유지관리 시스템" },
        { text: "9년 연속 기후부 보조사업자", sub: "급속 최다 보유" },
      ]),
    ],
  },
  {
    label: "유지관리·보증",
    rows: [
      row("A/S 유지관리", [
        { text: "365일 24시간", sub: "분기 1회 점검" },
        { text: "365일 24시간", sub: "최소 연 6회 점검" },
        { text: "365일 24시간", sub: "반기 1회 점검" },
        { text: "365일 24시간", sub: "콜센터 운영" },
      ]),
      row("손해보험 보상범위", [
        { text: "영업배상 50억", sub: "생산물 10억" },
        { text: "생산물배상 30억", sub: "대인 · 대물 일괄" },
        { text: "사고배상 대물 10억", sub: "대인 1.5억" },
        { text: "영업배상 100억", sub: "" },
      ]),
    ],
  },
];

export const COMPARE_AS_OF = "2026.05";
