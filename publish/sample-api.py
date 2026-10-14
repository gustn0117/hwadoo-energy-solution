"""퍼블리싱 추출 전용 로컬 샘플 API.

운영 DB 는 건드리지 않는다. 게시판·순위·FAQ 샘플을 돌려주고,
나머지 테이블은 빈 목록으로 답해 바깥을 전혀 부르지 않는다.

    python3 publish/sample-api.py          # 127.0.0.1:5599
    SUPABASE_URL=http://127.0.0.1:5599 npx next start -p 3457
"""
import json, re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

B = "샘플 본문입니다. 실제 글로 교체해 주세요."

PROMOTIONS = [
    dict(id=1, created_at="2026-09-01T00:00:00Z", cpo="플러그링크", title="[샘플] 9월 한정 특가", summary=None,
         body=B, image_url=None, starts_on="2026-09-01", ends_on="2026-09-30", is_published=True, sort_order=1),
    dict(id=2, created_at="2026-09-10T00:00:00Z", cpo="에버온", title="[샘플] 화재대응용품 지원", summary=None,
         body=B, image_url=None, starts_on="2026-09-10", ends_on="2026-10-09", is_published=True, sort_order=2),
    dict(id=3, created_at="2026-08-15T00:00:00Z", cpo="SK일렉링크", title="[샘플] 카드 출시 이벤트", summary=None,
         body=B, image_url=None, starts_on="2026-08-15", ends_on="2026-10-31", is_published=True, sort_order=3),
    dict(id=4, created_at="2026-06-01T00:00:00Z", cpo="현대엔지니어링", title="[샘플] 단독 혜택 서비스 증정", summary=None,
         body=B, image_url=None, starts_on="2026-06-01", ends_on="2026-06-30", is_published=True, sort_order=4),
]

CASES = [
    dict(id=i + 1, created_at="2026-08-01T00:00:00Z", title=f"[샘플] {t}", region=r, cpo=c, facility_type=f,
         charger_count=n, installed_on=d, image_url=None, description=B, is_published=True, sort_order=i + 1)
    for i, (t, r, c, f, n, d) in enumerate([
        ("양주 옥정 제일풍경채", "경기", "플러그링크", "아파트", 149, "2026-08-01"),
        ("수원 SK스카이뷰 아파트", "경기", "SK일렉링크", "아파트", 80, "2026-07-01"),
        ("창원 센트럴파크 에일린의 뜰", "경남", "에버온", "아파트", 149, "2026-06-01"),
        ("힐스테이트 검단 웰카운티", "인천", "현대엔지니어링", "아파트", 203, "2026-08-01"),
        ("힐스테이트 푸르지오 주안아파트", "인천", "플러그링크", "오피스텔", 107, "2026-07-01"),
        ("광명 이편한세상 센트레빌", "경기", "에버온", "상업시설", 78, "2026-06-01"),
    ])
]

NOTICES = [
    dict(id=1, created_at="2026-09-20T00:00:00Z", published_on="2026-09-20", category="공지",
         title="[샘플] 전기차 충전기 의무설치 유예기간 안내", body=B, is_published=True, is_pinned=True),
    dict(id=2, created_at="2026-09-15T00:00:00Z", published_on="2026-09-15", category="안내",
         title="[샘플] 추석 연휴 고객센터 운영 안내", body=B, is_published=True, is_pinned=False),
    dict(id=3, created_at="2026-09-01T00:00:00Z", published_on="2026-09-01", category="소식",
         title="[샘플] 화재대응용품 라인업 추가", body=B, is_published=True, is_pinned=False),
]

# 퍼블리싱 파일에서 50위까지 스크롤되는 걸 확인하실 수 있도록 샘플 순위를 채운다
_CPO = ["채비(주)", "SK일렉링크(주)", "(주)펌프킨", "EVSIS(주)", "GS차지비(주)", "(주)블루네트웍스",
        "(주)휴맥스이브이", "엘에스이링크(주)", "(주)이차저", "한국전기차충전서비스", "(주)에버온",
        "(주)플러그링크", "(주)대영채비", "(주)차지인", "(주)스타코프"]

CPO_RANKINGS = [
    dict(id=i + 1, kind=kind, name=f"{_CPO[i % len(_CPO)]}{'' if i < len(_CPO) else f' 샘플{i + 1}'}",
         charger_count=max(80, 6300 - i * 120) if kind == "fast" else max(900, 80000 - i * 1500),
         price=max(180, 320 - i * 2) if kind == "fast" else max(120, 250 - i * 2),
         sort_order=i + 1, as_of="2026-08-20")
    for kind in ("fast", "slow")
    for i in range(50)
]

# FAQ 도 여기서 준다 — 바깥 호출을 하지 않아 추출이 빨라진다
FAQS = [
    dict(id=1, question="친환경자동차법에 따른 충전시설 의무설치란 무엇일까요?",
         answer="- ‘환경친화적 자동차의 개발 및 보급 촉진에 관한 법률 시행령’이 2022년 1월 28일부터 시행되었습니다.\n"
                "- 신축/공공 기축시설은 총 주차면수의 5% 이상, 기축시설은 2% 이상을 설치해야 합니다.\n"
                "- 의무설치 기한은 2025년 1월 27일(유예기간 2026년 1월 27일)이며, 미이행 시 시정명령 및 3,000만원 이하의 이행강제금이 부과될 수 있습니다.",
         is_published=True, sort_order=1),
    dict(id=2, question="충전구역 설치 위치 지정시 핵심 고려 사항은 무엇이 있을까요?",
         answer="국토교통부·LH가 발간한 공동주택 전기자동차 화재대응 매뉴얼에 따르면 아래와 같습니다.\n"
                "- 어린이 놀이터, 유치원, 노유자시설 등과 20m 이상 이격 설치\n"
                "- 쓰레기 처리장 등 가연물 보관장소와 20m 이상 이격 설치\n"
                "- 지하주차장의 경우 지하 3층 이하의 층은 충전구역 설치 제한\n"
                "- 소방대가 쉽게 접근 가능한 위치 선정 필요",
         is_published=True, sort_order=2),
    dict(id=3, question="전기차 주차구역 설치는 입대의 의결로 진행 가능한 사항일까요?",
         answer="- 공동주택관리법 제14조 제11항에 따라 단지 안의 주차장 등의 유지·운영 기준은 입주자대표회의 의결사항입니다.\n"
                "- 고정형 충전기 및 충전 전용 주차구획을 설치·교체하는 행위로서 입대의의 동의를 받은 경우를 규정하고 있습니다.",
         is_published=True, sort_order=3),
    dict(id=4, question="행위신고와 행위 허가의 차이점이 무엇일까요?",
         answer="- 행위신고 — 고정형 충전기 설치/교체/이동 등을 입주자 대표회의 의결로 신고하는 절차. 입대의 회의록이 필요합니다.\n"
                "- 행위허가 — 부대시설 및 입주자 공유인 복리시설의 파손 철거 시 진행하는 절차. 지하주차장은 전체 입주자의 1/2 이상, 지상주차장은 2/3 이상의 동의서가 필요합니다.",
         is_published=True, sort_order=4),
]

TABLES = {"promotions": PROMOTIONS, "cases": CASES, "notices": NOTICES,
          "cpo_rankings": CPO_RANKINGS, "faqs": FAQS}


class H(BaseHTTPRequestHandler):
    # 기본값(HTTP/1.0)이면 연결이 닫힐 때까지 호출한 쪽이 기다려 한 요청에 7초씩 걸린다
    protocol_version = "HTTP/1.1"

    def log_message(self, *a):
        pass

    def do_GET(self):
        m = re.match(r"/rest/v1/(\w+)", self.path)
        name = m.group(1) if m else None
        if name in TABLES:
            rows = TABLES[name]
            eq = re.search(r"[?&]id=eq\.(\d+)", self.path)
            if eq:
                rows = [r for r in rows if r["id"] == int(eq.group(1))]
            kind = re.search(r"[?&]kind=eq\.(\w+)", self.path)
            if kind:
                rows = [r for r in rows if r.get("kind") == kind.group(1)]
            body = json.dumps(rows, ensure_ascii=False).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        # 모르는 테이블은 빈 목록으로 — 바깥을 부르지 않아 추출이 빠르고 결과가 늘 같다
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", "2")
        self.end_headers()
        self.wfile.write(b"[]")


ThreadingHTTPServer(("127.0.0.1", 5599), H).serve_forever()
