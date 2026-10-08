import "server-only";
import type { Case, CpoRanking, Notice, Promotion } from "@/lib/supabase";

/**
 * 화면(스타일) 확인용 샘플 데이터.
 * 주소 끝에 ?preview=1 을 붙였을 때만 쓰이고, 실제 DB 는 건드리지 않는다.
 * 데이터가 등록되기 전에도 게시판·순위 디자인을 그대로 볼 수 있게 하기 위한 것이다.
 */

const BODY = "샘플 본문입니다. 실제 글로 교체해 주세요.";

export const SAMPLE_PROMOTIONS: Promotion[] = [
  ["플러그링크", "9월 한정 특가", "2026-09-01", "2026-09-30"],
  ["에버온", "화재대응용품 지원", "2026-09-10", "2026-10-09"],
  ["SK일렉링크", "카드 출시 이벤트", "2026-08-15", "2026-10-31"],
  ["현대엔지니어링", "단독 혜택 서비스 증정", "2026-06-01", "2026-06-30"],
].map(([cpo, title, starts_on, ends_on], i) => ({
  id: i + 1,
  created_at: `${starts_on}T00:00:00Z`,
  cpo,
  title: `[샘플] ${title}`,
  summary: null,
  body: BODY,
  image_url: null,
  starts_on,
  ends_on,
  is_published: true,
  sort_order: i + 1,
}));

export const SAMPLE_CASES: Case[] = [
  ["양주 옥정 제일풍경채", "경기", "플러그링크", "아파트", 149, "2026-08-01"],
  ["수원 SK스카이뷰 아파트", "경기", "SK일렉링크", "아파트", 80, "2026-07-01"],
  ["창원 센트럴파크 에일린의 뜰", "경남", "에버온", "아파트", 149, "2026-06-01"],
  ["힐스테이트 검단 웰카운티", "인천", "현대엔지니어링", "아파트", 203, "2026-08-01"],
  ["힐스테이트 푸르지오 주안아파트", "인천", "플러그링크", "오피스텔", 107, "2026-07-01"],
  ["광명 이편한세상 센트레빌", "경기", "에버온", "상업시설", 78, "2026-06-01"],
].map(([title, region, cpo, facility_type, charger_count, installed_on], i) => ({
  id: i + 1,
  created_at: `${installed_on}T00:00:00Z`,
  title: `[샘플] ${title}`,
  region: region as string,
  cpo: cpo as string,
  facility_type: facility_type as string,
  charger_count: charger_count as number,
  installed_on: installed_on as string,
  image_url: null,
  description: BODY,
  is_published: true,
  sort_order: i + 1,
}));

export const SAMPLE_NOTICES: Notice[] = [
  ["공지", "전기차 충전기 의무설치 유예기간 안내", "2026-09-20", true],
  ["안내", "추석 연휴 고객센터 운영 안내", "2026-09-15", false],
  ["소식", "화재대응용품 라인업 추가", "2026-09-01", false],
].map(([category, title, published_on, is_pinned], i) => ({
  id: i + 1,
  created_at: `${published_on}T00:00:00Z`,
  published_on: published_on as string,
  category: category as string,
  title: `[샘플] ${title}`,
  body: BODY,
  is_published: true,
  is_pinned: is_pinned as boolean,
}));

/** 팝업에서 50위까지 스크롤되는 걸 확인하실 수 있도록 각 50곳씩 */
const CPO = [
  "채비(주)", "SK일렉링크(주)", "(주)펌프킨", "EVSIS(주)", "GS차지비(주)", "(주)블루네트웍스",
  "(주)휴맥스이브이", "엘에스이링크(주)", "(주)이차저", "한국전기차충전서비스", "(주)에버온",
  "(주)플러그링크", "(주)대영채비", "(주)차지인", "(주)스타코프",
];

export const SAMPLE_RANKINGS: CpoRanking[] = (["fast", "slow"] as const).flatMap((kind) =>
  Array.from({ length: 50 }, (_, i) => ({
    id: (kind === "fast" ? 0 : 50) + i + 1,
    kind,
    name: i < CPO.length ? CPO[i] : `${CPO[i % CPO.length]} 샘플${i + 1}`,
    charger_count: kind === "fast" ? Math.max(80, 6300 - i * 120) : Math.max(900, 80000 - i * 1500),
    price: kind === "fast" ? Math.max(180, 320 - i * 2) : Math.max(120, 250 - i * 2),
    sort_order: i + 1,
    as_of: "2026-08-20",
  })),
);
