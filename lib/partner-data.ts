/**
 * 제휴 충전사업자 — 사업자별 상세 (시안 1021).
 * 사업자 하나에 상세 탭 다섯 개가 붙고, 탭마다 구역(Section)이 이어진다.
 * 자료를 받은 곳은 플러그링크뿐이라 나머지는 tabs 를 비워 두었다 —
 * 자료가 들어오면 이 파일에 같은 모양으로 채우면 된다.
 */

const P = "/images/partners";

/* ------------------------------------------------------------------ */
/* 구역 종류 — 컴포넌트가 kind 로 갈라 그린다                            */
/* ------------------------------------------------------------------ */

/** 구역 머리글 — 번호 뱃지와 두 줄 제목 */
type Head = {
  /** 01, 02 … 없으면 뱃지를 그리지 않는다 */
  no?: string;
  sub: string;
  title: string;
  lead?: string;
};

/** 강조할 부분을 뒤쪽에 따로 적는다 — "앞말" + <em>뒷말</em> */
export type Line = { text: string; hi?: string };

export type Section = Head &
  (
    | {
        /** 제품 사진 + 오른쪽 설명 카드 (제품 소개 01) */
        kind: "photoFeatures";
        photo: string | null;
        photoLabel: string;
        cards: { icon: string | null; title: string; desc: string }[];
      }
    | {
        /** 두 칸짜리 사양표 (제품 소개 02) */
        kind: "specTable";
        rows: { key: string; val: string }[];
      }
    | {
        /** 제목 + 체크 목록 + 오른쪽 아이콘 (제품 소개 03, 책임보험 02) */
        kind: "bulletCards";
        cards: { no?: string; title: string; icon: string | null; tone?: "blue" | "purple"; items: Line[] }[];
      }
    | {
        /** 번호 뱃지 + 이미지 + 라벨 (QR 인증, A/S 절차) */
        kind: "stepCards";
        tone?: "blue" | "purple";
        steps: { label: string; desc?: string; image: string | null }[];
      }
    | {
        /** 좌우 번갈아 놓이는 앱 화면 + 체크 목록 (이용 방법) */
        kind: "zigzag";
        items: { title: string; image: string | null; points: string[] }[];
      }
    | {
        /** 충전요금표 (요금·할인 혜택 01) */
        kind: "rateTables";
        tables: {
          badge: string;
          tone: "blue" | "purple";
          asOf: string;
          rows: { group: string; span: number; range: string; price: string }[];
          note: string;
        }[];
      }
    | {
        /** 카드사 혜택 그리드 (요금·할인 혜택 02) */
        kind: "benefitCards";
        summary: string;
        cards: { brand: string; product: string; benefit: Line }[];
        more?: string;
        notes?: string[];
      }
    | {
        /** 아이콘 + 제목 + 설명이 한 줄씩 (A/S 01) */
        kind: "infoRows";
        rows: { icon: string | null; title: string; desc: string }[];
        note?: string;
      }
    | {
        /** 이름표 + 설명 + 아이콘 카드 (A/S 02) */
        kind: "tagCards";
        cards: { tag: string; desc: string; hi?: string; icon: string | null }[];
        note?: string;
      }
    | {
        /** 증빙 이미지 + 항목 줄 (책임보험 01) */
        kind: "proofRows";
        proofs: { label: string; image: string | null }[];
        rows: { key: string; val: string }[];
      }
  );

export type PartnerTab = { key: string; label: string; sections: Section[] };

export type Partner = {
  slug: string;
  name: string;
  /** 탭 띠에서 고른 칸의 색 */
  color: string;
  logo: string | null;
  headline: string;
  desc: string;
  tags: string[];
  /** 오른쪽 문의 카드의 체크 항목 */
  points: string[];
  /** 머리글 아래 가로 슬라이드 (자료 미전달) */
  slides: { image: string | null; label: string }[];
  tabs: PartnerTab[];
};

/* ------------------------------------------------------------------ */
/* 플러그링크                                                           */
/* ------------------------------------------------------------------ */

const PLUGLINK_TABS: PartnerTab[] = [
  {
    key: "product",
    label: "제품 소개",
    sections: [
      {
        kind: "photoFeatures",
        no: "01",
        sub: "공간 맞춤형 전기차 충전소 설치",
        title: "플러그링크",
        photo: `${P}/pluglink-charger.png`,
        photoLabel: "플러그링크 완속충전기",
        cards: [
          { icon: `${P}/feature-safety.png`, title: "과압류·과전류·과열", desc: "사전 감지 기능 탑재" },
          { icon: `${P}/feature-plc.png`, title: "PLC 통신 기반", desc: "배터리 충전량 제어 가능" },
          { icon: `${P}/feature-tech.png`, title: "PnC, V2G 등", desc: "정부 요청 기술 개발 예정" },
        ],
      },
      {
        kind: "specTable",
        no: "02",
        sub: "아파트 환경에 최적화된 사양",
        title: "플러그링크 완속충전기 주요 사양",
        rows: [
          { key: "모델명", val: "에버 ACE PRO+ 스마트 충전기 (E01AS007K10KR0101)" },
          { key: "입력", val: "단상 220V AC, 32A, 7kW" },
          { key: "출력", val: "단상 220V AC, 32A, 7kW" },
          { key: "동작온도", val: "-30℃ ~ 50℃" },
          { key: "UI", val: "LED 상태 표시등, E-ink 디스플레이" },
          { key: "통신", val: "BlueTooth, 4G LTE, LAN, WiFi" },
          { key: "보호등급", val: "IP55" },
          { key: "크기(MM)", val: "306(W) x 116(D) x 381(H)" },
          { key: "결제방식", val: "NFC, QR, 블루투스 PnC" },
          { key: "인증", val: "OCPP 1.6 인증, KC인증, UL인증, 형식승인" },
          { key: "설치방식", val: "벽부형, 스탠드형 모두 가능" },
        ],
      },
      {
        kind: "bulletCards",
        no: "03",
        sub: "아파트 충전에 특화된",
        title: "플러그링크만의 차별점",
        cards: [
          {
            title: "배터리 충전량(SOC) 실시간 확인",
            icon: `${P}/diff-battery.png`,
            items: [
              { text: "차량에서만 확인이 가능했던 배터리 충전상태를 ", hi: "충전기에서도 확인 가능" },
              { text: "차량의 ", hi: "현재 충전량 표시" },
              { text: "차량의 배터리 충전량을 건물관리자 및 주민들이 ", hi: "직접 충전기에서 모니터링 가능" },
            ],
          },
          {
            title: "충전기에서 직접 충전량 제어",
            icon: `${P}/diff-control.png`,
            items: [
              { text: "급속충전기와 동일하게 ", hi: "차량의 목표 충전량을 충전기에서도 제어" },
              { text: "충전량 제어 버튼" },
              { text: "목표 충전량 설정을 위한 동작 버튼 구현 (최소 충전 목표량은 차량마다 상이할 수 있음)" },
              { text: "충전기별 디스플레이 터치형 또는 물리적 버튼으로 적용됨" },
            ],
          },
          {
            title: "충전소별 최대 충전량 일괄 적용",
            icon: `${P}/diff-limit.png`,
            items: [
              { text: "관리소 요청 시 플러그링크 운영서버를 통해 ", hi: "모든 충전기의 최대 충전량을 일괄 제한 가능" },
              { text: "서버원격 제어" },
              { text: "설치 후 별도 요청 시 모든 충전기에 95% 이내 충전량 제한을 일괄 적용" },
            ],
          },
        ],
      },
      {
        kind: "stepCards",
        sub: "업계 최초",
        title: "QR코드 인증방식 적용",
        steps: [
          { label: "QR스캔", image: `${P}/pluglink-qr-scan.jpg` },
          { label: "커넥터 연결", image: `${P}/pluglink-qr-connect.jpg` },
          { label: "충전시작", image: `${P}/pluglink-qr-charging.jpg` },
          { label: "APP으로 자동결제", image: `${P}/pluglink-qr-payment.jpg` },
        ],
      },
    ],
  },
  {
    key: "usage",
    label: "이용 방법",
    sections: [
      {
        kind: "zigzag",
        sub: "간편한 충전부터 맞춤 알림까지",
        title: "플러그링크 앱 하나로 간편하게",
        items: [
          {
            title: "모바일 간편인증",
            image: `${P}/pluglink-step01.png`,
            points: ["QR스캔", "충전기ID입력", "간편충전"],
          },
          {
            title: "이용내역 확인",
            image: `${P}/pluglink-step02.png`,
            points: ["플러그링크 충전내역", "타사로밍 충전내역"],
          },
          {
            title: "결제수단/회원카드 등록관리",
            image: `${P}/pluglink-step03.png`,
            points: ["결제수단 관리", "회원카드 관리"],
          },
          {
            title: "알림설정",
            image: `${P}/pluglink-step04.png`,
            points: ["충전 상태 알림", "심야 알림"],
          },
        ],
      },
    ],
  },
  {
    key: "fee",
    label: "요금/할인 혜택",
    sections: [
      {
        kind: "rateTables",
        no: "01",
        sub: "한눈에 확인하는 충전요금",
        title: "충전요금 및 이용 안내",
        tables: [
          {
            badge: "회원 요금",
            tone: "blue",
            asOf: "2026년 8월 1일 기준",
            rows: [
              { group: "완속", span: 1, range: "전 구간", price: "299" },
              { group: "급속", span: 2, range: "40~100kW 미만", price: "322" },
              { group: "", span: 0, range: "100kW 이상", price: "345" },
            ],
            note: "별도 협의 요금이 적용된 일부 충전소의 경우, 플러그링크 앱을 통해 확인하실 수 있습니다.",
          },
          {
            badge: "비회원 요금",
            tone: "purple",
            asOf: "2026년 8월 1일 기준",
            rows: [
              { group: "완속", span: 1, range: "40kW 미만", price: "357" },
              { group: "급속", span: 1, range: "40kW 이상", price: "528" },
            ],
            note: "IC 단말기 결제가 가능한 충전기에서, 회원가입 없이 IC카드 결제로 충전하는 경우에만 적용되는 요금입니다.",
          },
        ],
      },
      {
        kind: "benefitCards",
        no: "02",
        sub: "카드사 제휴로 더 가볍게",
        title: "충전요금 할인 혜택을 확인해보세요",
        summary: "총 9개사 20개 카드상품 할인/포인트 적립 혜택 제휴",
        cards: [
          { brand: "BC카드", product: "그린카드 v3", benefit: { text: "충전요금 ", hi: "월 최대 40%" } },
          { brand: "신한카드", product: "신한카드 EV", benefit: { text: "충전요금 ", hi: "월 최대 50%" } },
          { brand: "현대카드", product: "기아멤버스카드", benefit: { text: "충전요금 ", hi: "월 최대 70%" } },
          { brand: "신한카드", product: "EVerywhere", benefit: { text: "충전요금 ", hi: "월 최대 50%" } },
          { brand: "롯데카드", product: "MY RENTAL+", benefit: { text: "충전요금 ", hi: "50%" } },
          { brand: "현대카드", product: "현대 EV카드", benefit: { text: "충전요금 ", hi: "월 최대 100%" } },
          { brand: "현대카드", product: "제네시스 카드", benefit: { text: "충전요금 ", hi: "월 최대 100%" } },
          { brand: "우체국", product: "브라보 체크카드", benefit: { text: "충전요금 ", hi: "월 2회 5%" } },
          { brand: "KB국민카드", product: "EVO 티타늄 카드", benefit: { text: "충전요금 ", hi: "월 50%" } },
        ],
        more: "더 보기",
        notes: [
          "플러그링크 제휴된 다양한 신용카드사의 할인 및 포인트 전환 서비스 혜택 제공",
          "로밍을 통해 전국 환경부 및 한전, 플러그링크와 제휴된 주요 충전사업자 충전기 자유롭게 이용 가능",
        ],
      },
    ],
  },
  {
    key: "insurance",
    label: "책임 보험 가입",
    sections: [
      {
        kind: "proofRows",
        no: "01",
        sub: "고객의 안전을 먼저 생각하는",
        title: "책임보험 가입현황",
        lead: "충전시설 운영 중 발생할 수 있는 사고에 대비한 보험 가입 정보를 안내합니다.",
        proofs: [
          { label: "영업배상책임보험 증권", image: null },
          { label: "사고보상책임보험 증권", image: null },
        ],
        rows: [
          { key: "보험종류", val: "영업배상책임보험 / 사고배상책임보험" },
          { key: "보험사", val: "메리츠화재보험" },
          { key: "보험계약자", val: "(주)플러그링크" },
        ],
      },
      {
        kind: "bulletCards",
        no: "02",
        sub: "안전한 충전 환경,",
        title: "철저한 보험 보장",
        cards: [
          {
            no: "01",
            title: "영업배상책임보험",
            icon: `${P}/insurance-business.png`,
            tone: "blue",
            items: [
              { text: "시설소유(관리)자 배상책임\n대인대물 일괄 1사고당 / 연간총보상한도액 ", hi: "50억원" },
              { text: "시설소유(관리)자 배상책임\n대인대물 일괄 1사고당 / 연간총보상한도액 ", hi: "50억원" },
              { text: "시설소유(관리)자 배상책임\n대인대물 일괄 1사고당 / 연간총보상한도액 ", hi: "50억원" },
              { text: "시설소유(관리)자 배상책임\n대인대물 일괄 1사고당 / 연간총보상한도액 ", hi: "50억원" },
            ],
          },
          {
            no: "02",
            title: "사고보상책임보험",
            icon: `${P}/insurance-accident.png`,
            tone: "purple",
            items: [
              { text: "시설소유(관리)자 배상책임\n대인대물 일괄 1사고당 / 연간총보상한도액 ", hi: "50억원" },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "as",
    label: "AS/유지보수",
    sections: [
      {
        kind: "infoRows",
        no: "01",
        sub: "설치 이후에도 안심할 수 있도록",
        title: "운영부터 유지보수까지",
        rows: [
          { icon: `${P}/support.png`, title: "고객센터 운영", desc: "운영시간 및 문의 접수 안내" },
          { icon: `${P}/monitoring.png`, title: "원격 모니터링", desc: "충전기 상태 및 장애 감지" },
          { icon: `${P}/repair.png`, title: "현장 유지보수", desc: "전문 인력 점검 및 수리" },
        ],
        note: "※ 24시간 운영 여부와 원격 모니터링 범위는 CPO별 실제 제공 기준으로 기재합니다.",
      },
      {
        kind: "tagCards",
        no: "02",
        sub: "안전한 충전 환경을 위한",
        title: "체계적인 점검과 신속한 대응",
        cards: [
          {
            tag: "정기점검",
            desc: "점검 주기 및 충전기 상태·안전 점검 항목",
            hi: "(연간2회)",
            icon: `${P}/inspection-regular.png`,
          },
          {
            tag: "수시점검",
            desc: "이상 징후 또는 고장 발생 시 점검",
            hi: "(수시)",
            icon: `${P}/inspection-occasional.png`,
          },
          {
            tag: "긴급출동",
            desc: "긴급 장애 발생 시 현장 출동 기준 및 목표 시간",
            hi: "(1시간이내출동)",
            icon: `${P}/inspection-emergency.png`,
          },
          {
            tag: "특별점검",
            desc: "재난·사고 등 특정 상황 발생 시 추가 점검",
            hi: "(자체판단후출동)",
            icon: `${P}/inspection-special.png`,
          },
        ],
        note: "※ 제공하지 않는 점검 유형은 제외하고,\n출동 시간은 '접수 후 ○시간 이내' 등 실제 계약·운영 기준으로 표기합니다.",
      },
      {
        kind: "stepCards",
        no: "03",
        sub: "고장 접수부터 정상 운영까지",
        title: "신속하고 체계적인 A/S 서비스",
        lead: "고장 접수부터 정상 운영 재개까지의 과정을 단계별로 안내합니다.",
        tone: "purple",
        steps: [
          { label: "장애 접수", desc: "고객센터 또는 모니터링\n시스템을 통한 장애 확인", image: `${P}/as-report.png` },
          { label: "원격 진단 및 조치", desc: "장애 원인 분석 및\n원격 복구 가능 여부 확인", image: `${P}/as-remote.png` },
          { label: "현장 출동 및 수리", desc: "필요시 전문 인력 출동,\n부품 교체 및 현장 조치", image: `${P}/as-repair.png` },
          { label: "정상 운영 확인", desc: "충전기 정상 작동 확인 및\n처리 결과 안내", image: `${P}/as-complete.png` },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 사업자 목록 — 탭 띠에 나오는 순서 (시안 1021)                          */
/* ------------------------------------------------------------------ */

/** 자료를 아직 못 받은 곳도 탭 구성은 같게 둔다 */
const EMPTY_TABS: PartnerTab[] = PLUGLINK_TABS.map((t) => ({ ...t, sections: [] }));

export const PARTNERS: Partner[] = [
  {
    slug: "everon",
    name: "에버온",
    color: "#21a9e5",
    logo: "/images/brands/everon.svg",
    headline: "스마트한 기술력",
    desc: "자료를 받는 대로 이 자리에 사업자 소개가 들어갑니다.",
    tags: [],
    points: [],
    slides: [],
    tabs: EMPTY_TABS,
  },
  {
    slug: "hyundai-engineering",
    name: "현대엔지니어링",
    color: "#009a44",
    logo: "/images/brands/hyundai-engineering.png",
    headline: "전기차 충전경험을 기술로",
    desc: "자료를 받는 대로 이 자리에 사업자 소개가 들어갑니다.",
    tags: [],
    points: [],
    slides: [],
    tabs: EMPTY_TABS,
  },
  {
    slug: "sk-electlink",
    name: "SK일렉링크",
    color: "#ed2046",
    logo: "/images/brands/sk-electlink.svg",
    headline: "급속충전기 시장점유율 1위",
    desc: "자료를 받는 대로 이 자리에 사업자 소개가 들어갑니다.",
    tags: [],
    points: [],
    slides: [],
    tabs: EMPTY_TABS,
  },
  {
    slug: "nice-charger",
    name: "나이스차저",
    color: "#6b7280",
    logo: null,
    headline: "스트레스 없는 충전생활",
    desc: "자료를 받는 대로 이 자리에 사업자 소개가 들어갑니다.",
    tags: [],
    points: [],
    slides: [],
    tabs: EMPTY_TABS,
  },
  {
    slug: "pluglink",
    name: "플러그링크",
    color: "#015aff",
    logo: `${P}/pluglink-logo.png`,
    headline: "가장 안전한 아파트 전기차 충전인프라",
    desc: "화재 예방부터 보상까지, 가장 안전한 아파트 전기차 충전 인프라를 제공합니다.",
    tags: ["완속충전기 1위", "교통카드 연동", "화재예방"],
    points: ["화재예방부터 보상까지", "2025년 완속 충전기 1위", "교통카드 연동"],
    slides: [
      { image: null, label: "플러그링크 소개 이미지 1" },
      { image: null, label: "플러그링크 소개 이미지 2" },
    ],
    tabs: PLUGLINK_TABS,
  },
  {
    slug: "gridwiz",
    name: "그리드위즈",
    color: "#6b7280",
    logo: null,
    headline: "요금, 탄소배출 까지",
    desc: "자료를 받는 대로 이 자리에 사업자 소개가 들어갑니다.",
    tags: [],
    points: [],
    slides: [],
    tabs: EMPTY_TABS,
  },
];

/** 처음 열었을 때 보이는 사업자 (시안 기준) */
export const PARTNER_DEFAULT = "pluglink";

/** 메뉴에는 두되 연결은 뒤로 미룬 항목 */
export const PARTNER_EXTRA_TAB = { key: "faq", label: "관련규정 FAQ" };
