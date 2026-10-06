"""퍼블리싱 추출 전용 로컬 목 API.
운영 DB 는 그대로 두고, 게시판 세 테이블만 샘플 행을 돌려준다. 나머지는 실제 API 로 넘긴다."""
import json, os, re, urllib.request, urllib.error
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ENV = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
cfg = {}
for line in open(ENV, encoding="utf-8"):
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        cfg[k.strip()] = v.strip().strip('"').strip("'")
REAL = cfg["SUPABASE_URL"].rstrip("/")

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

TABLES = {"promotions": PROMOTIONS, "cases": CASES, "notices": NOTICES, "cpo_rankings": CPO_RANKINGS}


class H(BaseHTTPRequestHandler):
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
        # 나머지는 실제 API 로 (읽기만)
        req = urllib.request.Request(REAL + self.path, method="GET")
        for k, v in self.headers.items():
            if k.lower() not in ("host", "connection", "content-length", "accept-encoding"):
                req.add_header(k, v)
        try:
            with urllib.request.urlopen(req) as r:
                data = r.read()
                self.send_response(r.status)
                self.send_header("Content-Type", r.headers.get("Content-Type", "application/json"))
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as e:
            data = e.read()
            self.send_response(e.code)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)


ThreadingHTTPServer(("127.0.0.1", 5599), H).serve_forever()
