/**
 * 한 눈에 비교 — 충전사업자 비교표 (시안 1014).
 * 시안대로 표는 하나다 — 브랜드 줄 아래로 항목 네 개가 이어진다.
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

/** 값 네 개만 받아 나머지(나이스차저·그리드위즈)는 "-" 로 채운다 */
const row = (key: string, cells: CompareCell[]): CompareRow => ({
  key,
  cells: [...cells, ...Array(COMPARE_BRANDS.length - cells.length).fill(NONE)],
});

export const COMPARE_ROWS: CompareRow[] = [
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
];

export const COMPARE_AS_OF = "2026.05";
