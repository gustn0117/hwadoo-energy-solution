"""퍼블리싱 HTML 에 영역 구분 주석과 맨 위 목차를 넣는다."""

from bs4 import Comment, NavigableString

BAR = "=" * 14

# 전 페이지에서 똑같이 쓰는 영역 — PHP include 로 분리하기 좋은 곳
COMMON = [
    ("header.hd", "상단 헤더"),
    ("footer.ft", "하단 푸터"),
    ("aside.dock", "우측 하단 플로팅 버튼"),
    ("div.toast", "하단 상담 유도 말풍선"),
    ("dialog.cmodal", "상담 신청 팝업"),
]

# 본문(main) 영역 이름 — 위에서부터 먼저 맞는 것을 쓴다
SECTIONS = [
    ("section.hero", "메인 비주얼"),
    ("section.stats", "실적 숫자"),
    ("section.services", "서비스 안내"),
    ("section.finder", "주소로 설치 가능 대수 조회"),
    ("section.brands", "제휴 브랜드 슬라이드"),
    ("section.fire", "화재안전 안내"),
    ("section.why", "화두를 선택하는 이유"),
    ("section.cta", "하단 배너"),
    ("section.faq", "자주 묻는 질문"),
    ("section.contact", "상담 문의"),
    ("section.subHero", "페이지 상단 타이틀"),
    ("section.sup", "페이지 상단 타이틀"),
    ("nav.supTabs", "하위 메뉴 탭"),
    ("section.rank", "충전사업자 순위"),
    ("section.board", "게시판 목록"),
    ("div.faqPage", "FAQ 목록"),
]

# 영역 안쪽의 작은 덩어리
PARTS = [
    (".hd__bar", "헤더 바 — 로고 · 상단 메뉴 · 상담 버튼 · 햄버거"),
    (".hd__mega", "전체메뉴 패널"),
    (".hd__dim", "전체메뉴 배경 가림막"),
    (".ft__top", "푸터 상단 — 로고 · 약관 링크"),
    (".ft__info", "사업자 정보"),
    (".ft__copy", "저작권 표시"),
    (".dock__talk", "상담문의 버튼"),
    (".dock__call", "전화상담 버튼"),
    (".dock__top", "TOP 버튼"),
    (".cmodal__head", "팝업 머리말"),
    (".cmodal__form", "상담 입력 폼"),
    (".lmodal", "이용약관 · 개인정보처리방침 팝업"),
    (".board__intro", "상단 안내 띠"),
    (".rank__head", "제목"),
    (".rank__metric", "비교 기준 탭 — 운영대수 / 충전요금"),
    (".rank__cols", "순위 목록 — 급속 · 완속"),
    (".rank__more", "전체보기 버튼"),
    (".rank__cta", "하단 배너"),
    (".rmodal", "전체보기 팝업"),
    (".rmodal__head", "팝업 머리말"),
    (".rmodal__panels", "비교 패널 — 운영대수 · 충전요금"),
    (".board__bar", "검색 · 분류 필터"),
    (".board__grid", "목록"),
    (".pg-list", "목록"),
    (".board__more", "더보기 버튼"),
    (".supTabs__list", "탭 메뉴"),
]


def strip_previous(soup):
    """이미 들어간 구분 주석을 걷어낸다 (여러 번 돌려도 같은 결과가 나오도록)"""
    known = {n for _, n in PARTS}
    for c in soup.find_all(string=lambda t: isinstance(t, Comment)):
        text = c.strip()
        if text.startswith(BAR) or text in known or text.startswith("화두에너지솔루션"):
            prev = c.previous_sibling
            c.extract()
            if isinstance(prev, NavigableString) and not isinstance(prev, Comment) and prev.strip() == "":
                prev.extract()


def _ids(soup, selectors):
    """선택자별로 해당하는 요소를 id 로 모아둔다 (순서 유지)"""
    table = {}
    for sel, name in selectors:
        for el in soup.select(sel):
            table.setdefault(id(el), name)
    return table


def _heading(el):
    h = el.find(["h2", "h3", "h1"])
    if not h:
        return None
    text = " ".join(h.get_text(" ", strip=True).split())
    return text[:24] + ("…" if len(text) > 24 else "")


def _before(el, text):
    """주석이 항상 줄 맨 앞에서 시작하도록 줄바꿈을 함께 넣는다"""
    el.insert_before(NavigableString("\n"), Comment(text))


def _wrap(el, open_text, close_text):
    _before(el, f" {BAR} {open_text} {BAR} ")
    el.insert_after(Comment(f" {BAR} {close_text} {BAR} "))


def annotate(soup, label):
    """영역마다 시작·끝 주석을 달고, 맨 위에 목차를 넣는다."""
    body = soup.body
    strip_previous(soup)
    common = _ids(soup, COMMON)
    named = _ids(soup, SECTIONS)
    toc = []

    # 1) 본문 영역 — 번호를 붙인다
    main = body.find("main")
    if main is not None:
        no = 0
        for el in main.find_all(True, recursive=False):
            name = named.get(id(el)) or _heading(el) or "본문"
            no += 1
            tag = f"{no:02d}. {name}"
            _wrap(el, tag, f"{tag} 끝")
            toc.append("  " + tag)

    # 2) 전 페이지 공통 영역
    for sel, name in COMMON:
        for el in body.select(sel):
            if id(el) not in common:
                continue
            _wrap(el, f"공통 · {name}", f"공통 · {name} 끝")

    # 3) 영역 안쪽 덩어리 — 한 줄 주석만 앞에 붙인다
    for sel, name in PARTS:
        for el in soup.select(sel):
            _before(el, f" {name} ")

    # 4) 맨 위 목차
    order = []
    for el in body.find_all(True, recursive=False):
        if el.name == "main":
            order.append("  ── 본문 ──")
            order += toc
        else:
            n = common.get(id(el))
            if n:
                order.append(f"  공통 · {n}")
    lines = "\n".join(order)
    # 주석 안에 "-->" 를 쓰면 주석이 거기서 끊기므로 기호만 적는다
    soup.html.insert_before(
        Comment(
            f"\n  화두에너지솔루션 — {label}\n\n"
            f"  이 파일의 영역 구성\n{lines}\n\n"
            f"  각 영역은 {BAR} 이름 {BAR} 주석으로 시작해 {BAR} 이름 끝 {BAR} 주석으로 닫힙니다.\n"
            "  '공통' 으로 표시된 영역은 모든 페이지가 같으므로 include 파일로 빼서 쓰셔도 됩니다.\n"
        )
    )
    return soup
