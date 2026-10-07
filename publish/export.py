"""Next.js 로 렌더된 화면을 PHP 환경에 쓸 정적 HTML/CSS/JS 로 뽑는다."""

import os
import re
import shutil
import subprocess
import urllib.request
from bs4 import BeautifulSoup, Comment
from annotate import annotate

BASE = "http://localhost:3457"  # 게시판 샘플이 들어간 추출 전용 인스턴스
SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # 프로젝트 루트
OUT = os.path.expanduser("~/Desktop/hwadoo-publishing")  # 윈도우에서 한글 폴더명이 깨지지 않도록 영문

# (Next 경로, 내보낼 파일 경로, 페이지 이름)
# 시안 1001 — 하위 페이지를 sub/<대메뉴>/<소메뉴> 로 묶는다
ROUTES = [
    ("/", "index.html", "메인"),

    # 충전사업자 비교
    ("/compare/ranking", "sub/compare/ranking.html", "충전사업자 순위"),
    ("/compare", "sub/compare/index.html", "한 눈에 비교"),

    # 제휴 충전사업자
    ("/compare/partners", "sub/partners/index.html", "제휴 충전사업자"),

    # 화재안전용품
    ("/fire", "sub/fire/index.html", "화재안전용품"),
    ("/fire/extinguisher", "sub/fire/extinguisher.html", "소화기"),
    ("/fire/blanket", "sub/fire/blanket.html", "질식소화포"),
    ("/fire/sprinkler", "sub/fire/sprinkler.html", "상방향 주수장치"),
    ("/fire/thermal", "sub/fire/thermal.html", "열화상카메라"),
    ("/fire/barrier", "sub/fire/barrier.html", "충전소 격벽"),

    # 고객지원
    ("/promotion", "sub/support/promotion.html", "프로모션"),
    ("/promotion/1", "sub/support/promotion-view.html", "프로모션 상세"),
    ("/faq", "sub/support/faq.html", "자주 묻는 질문"),
    ("/notice", "sub/support/notice.html", "공지·소식"),
    ("/notice/1", "sub/support/notice-view.html", "공지·소식 상세"),
    ("/cases", "sub/support/cases.html", "설치사례"),

    # 회사소개
    ("/about", "sub/about/index.html", "회사소개"),
    ("/about/business", "sub/about/business.html", "사업영역"),
    ("/about/why", "sub/about/why.html", "Why 화두?"),
    ("/about/partners", "sub/about/partners.html", "주요 파트너"),

    # 설치·운영
    ("/service", "sub/service/index.html", "설치·운영"),
    ("/service/product", "sub/service/product.html", "제품안내"),
    ("/service/install", "sub/service/install.html", "설치·시공"),
    ("/service/operation", "sub/service/operation.html", "운영·유지관리"),
    ("/service/process", "sub/service/process.html", "설치절차"),

    # 설치진단
    ("/diagnosis", "sub/diagnosis/index.html", "설치진단"),

    # 설치 상담 — 3단계 (시안 1007). 단계별로 따로 뽑는다
    ("/consult", "sub/consult/index.html", "설치 상담 — 1 주소 검색"),
    ("/consult?found=1", "sub/consult/step1-found.html", "설치 상담 — 1 주소 검색 후"),
    ("/consult?step=2", "sub/consult/step2.html", "설치 상담 — 2 정보입력"),
    ("/consult?step=3", "sub/consult/step3.html", "설치 상담 — 3 신청완료"),
]

# 내부 링크를 바뀐 파일 경로로 바꾼다
LINKS = {route: "/" + out for route, out, _ in ROUTES}
LINKS["/"] = "/index.html"

# 반복 출력(PHP 루프)이 필요한 영역 → 주석으로 표시
LOOPS = [
    (".pg-list", "li", "목록 한 줄"),
    (".cases__grid", "li", "설치사례 카드"),
    (".faq__list", "li", "FAQ 문항"),
    (".services__list", "li", "서비스 카드"),
    (".pg-grid", "li", "카드"),
    (".board__grid", "li", "게시판 카드"),
]

REVEAL_BOOT = (
    "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)"
    "document.documentElement.classList.add('reveal')"
)


def fetch(path):
    with urllib.request.urlopen(BASE + path) as r:
        return r.read().decode("utf-8")


DETAIL = {"/notice/": "/sub/support/notice-view.html", "/promotion/": "/sub/support/promotion-view.html"}


def relink(soup):
    """Next 경로로 된 내부 링크를 내보낸 파일 경로로 바꾼다"""
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not href.startswith("/") or href.startswith("//"):
            continue
        path, _, hash_ = href.partition("#")
        hash_ = ("#" + hash_) if hash_ else ""
        path, _, query = path.partition("?")  # /consult?address=... 처럼 뒤에 붙는 값은 떼고 본다
        if path in LINKS:
            a["href"] = LINKS[path] + hash_
            continue
        if path == "" and hash_:  # "/#consult" 같은 링크는 메인으로
            a["href"] = "/index.html" + hash_
            continue
        for prefix, target in DETAIL.items():
            if path.startswith(prefix) and path[len(prefix):].isdigit():
                a["href"] = target + hash_
                break


def extract_includes(soup, out_dir):
    """전 페이지가 똑같이 쓰는 머리말·꼬리말을 include 파일로 뽑아 둔다"""
    import os

    header = soup.select_one("header.hd")
    # 스크립트 태그까지 넣어야 include 만으로 화면이 다 돌아간다
    pieces = [soup.select_one("footer.ft"), soup.select_one("aside.dock"),
              soup.select_one("div.toast"), *soup.select("dialog"),
              soup.select_one('body > script[src]')]
    os.makedirs(os.path.join(out_dir, "include"), exist_ok=True)

    def write(name, html, note):
        body = f"<!-- {note} -->\n" + beautify(html)
        for ext in ("html", "php"):
            with open(os.path.join(out_dir, "include", f"{name}.{ext}"), "w", encoding="utf-8") as f:
                f.write(body)

    if header is not None:
        write("header", header.decode(formatter="html5"),
              "화두에너지솔루션 — 상단 헤더 (모든 페이지 공통). 각 페이지의 '공통 · 상단 헤더' 주석 자리에 그대로 들어갑니다.")
    body = "\n".join(p.decode(formatter="html5") for p in pieces if p is not None)
    if body:
        write("footer", body,
              "화두에너지솔루션 — 하단 푸터 · 플로팅 버튼 · 팝업 (모든 페이지 공통). 각 페이지의 '공통 · 하단 푸터' 주석부터 끝까지가 이 내용입니다.")


HEAD_OPEN = "<!-- ============== 공통 · 상단 헤더 ============== -->"
HEAD_CLOSE = "<!-- ============== 공통 · 상단 헤더 끝 ============== -->"
FOOT_OPEN = "<!-- ============== 공통 · 하단 푸터 ============== -->"


def to_php(html, out_path):
    """머리말·꼬리말을 include 로 바꾼 PHP 판을 만든다."""
    depth = out_path.count("/")
    up = "/.." * depth
    inc = lambda name: f"<?php include __DIR__ . '{up}/include/{name}.php'; ?>"

    # 헤더 블록 → include
    a, b = html.find(HEAD_OPEN), html.find(HEAD_CLOSE)
    if a == -1 or b == -1:
        return None
    html = html[:a] + inc("header") + html[b + len(HEAD_CLOSE):]

    # 푸터부터 </body> 앞까지 → include
    a, b = html.find(FOOT_OPEN), html.rfind("</body>")
    if a == -1 or b == -1:
        return None
    return html[:a] + inc("footer") + "\n  " + html[b:]


def clean(html, label):
    soup = BeautifulSoup(html, "lxml")

    # Next.js 런타임 제거
    for tag in soup.find_all("script"):
        tag.decompose()
    for tag in soup.find_all("link"):
        href = tag.get("href", "")
        rel = " ".join(tag.get("rel", []))
        if "/_next/" in href or rel in ("preload", "prefetch") and tag.get("as") == "script":
            tag.decompose()
    for tag in soup.select('div[hidden] > template, template'):
        tag.decompose()
    # React 가 남긴 빈 주석 제거
    for c in soup.find_all(string=lambda t: isinstance(t, Comment) and not t.strip()):
        c.extract()

    # 빈 <div hidden> 껍데기 정리
    for tag in soup.find_all("div", attrs={"hidden": True}):
        if not tag.get_text(strip=True) and not tag.find(True):
            tag.decompose()

    # 해시가 붙은 아이콘 경로를 단순 경로로
    for tag in soup.find_all("link"):
        rel = tag.get("rel") or []
        rel = rel if isinstance(rel, list) else [rel]
        if "apple-touch-icon" in rel:
            tag["href"] = "/apple-icon.png"
        elif "icon" in rel:
            tag["href"] = "/favicon.ico"

    head = soup.head
    # 공용 CSS
    css = soup.new_tag("link", rel="stylesheet", href="/assets/css/site.css")
    head.append(css)
    # 등장 효과 준비 (깜빡임 방지용 인라인)
    boot = soup.new_tag("script")
    boot.string = REVEAL_BOOT
    head.insert(0, boot)

    # 공용 JS
    js = soup.new_tag("script", src="/assets/js/site.js")
    js["defer"] = ""
    soup.body.append(js)

    # 반복 영역 표시
    for selector, child, name in LOOPS:
        for holder in soup.select(selector):
            kids = holder.find_all(child, recursive=False)
            if len(kids) < 2:
                continue
            kids[0].insert_before(Comment(f" 반복 시작: {name} "))
            kids[-1].insert_after(Comment(f" 반복 끝: {name} "))

    # 폼에 PHP 연동 표시
    for form, note in (
        (soup.select_one("form.consult"), "메인 상담 폼 — 제출 시 상담 팝업으로 값이 넘어갑니다"),
        (soup.select_one(".cmodal__form"), "상담 접수 폼 — action 에 PHP 파일 경로를 넣으면 그대로 전송됩니다"),
        (soup.select_one("form.finder__bar"), "주소 검색 — action 을 비워두면 상담 팝업이 열립니다"),
    ):
        if form is not None:
            form.insert_before(Comment(f" PHP 연동 지점: {note} "))

    # 내부 링크를 내보낸 파일 경로로
    relink(soup)

    # 영역 구분 주석과 맨 위 목차
    annotate(soup, label)

    return beautify(soup.decode(formatter="html5"))


# 줄바꿈·들여쓰기 (인라인 요소는 그대로 둬서 화면이 바뀌지 않게 한다)
BEAUTIFY_RC = os.path.join(os.path.dirname(__file__), ".jsbeautifyrc")
BEAUTIFY_BIN = os.path.join(os.path.dirname(__file__), "..", "node_modules", ".bin", "js-beautify")


def beautify(html):
    result = subprocess.run(
        [BEAUTIFY_BIN, "--type", "html", "--config", BEAUTIFY_RC, "-"],
        input=html,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr[:400])
    return result.stdout


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    # 이미지·폰트 등 정적 파일
    skip = {"file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg", "logo-hwadoo.png", ".DS_Store"}
    for name in os.listdir(os.path.join(SRC, "public")):
        if name in skip:
            continue
        src = os.path.join(SRC, "public", name)
        dst = os.path.join(OUT, name)
        if os.path.isdir(src):
            shutil.copytree(src, dst, ignore=shutil.ignore_patterns(".DS_Store", "Thumbs.db"))
        elif name not in (".DS_Store",):
            shutil.copy2(src, dst)

    # 아이콘 (Next 는 app/ 안의 파일을 자동 제공하므로 직접 복사한다)
    for name in ("favicon.ico", "apple-icon.png"):
        src = os.path.join(SRC, "app", name)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(OUT, name))

    # CSS 합치기
    os.makedirs(os.path.join(OUT, "assets/css"), exist_ok=True)
    parts = []
    for path, title in (
        ("app/globals.css", "공통 토큰 · 메인 페이지"),
        ("app/styles/pages.css", "하위 페이지 공용 블록"),
        ("app/styles/board.css", "고객지원 게시판"),
        ("app/styles/ranking.css", "충전사업자 순위"),
    ):
        with open(os.path.join(SRC, path), encoding="utf-8") as f:
            parts.append(f"/* ===== {title} ===== */\n" + f.read())
    with open(os.path.join(OUT, "assets/css/site.css"), "w", encoding="utf-8") as f:
        f.write("\n\n".join(parts))

    # JS
    os.makedirs(os.path.join(OUT, "assets/js"), exist_ok=True)
    shutil.copy2(os.path.join(os.path.dirname(__file__), "site.js"), os.path.join(OUT, "assets/js/site.js"))

    # 페이지
    first = None
    for route, out_path, label in ROUTES:
        html = clean(fetch(route), label)
        if first is None:
            first = html
        full = os.path.join(OUT, out_path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "w", encoding="utf-8") as f:
            f.write(html)
        php = to_php(html, out_path)
        if php:
            with open(full.rsplit(".", 1)[0] + ".php", "w", encoding="utf-8") as f:
                f.write(php)
        print(f"  {out_path:<36} {label}  ({len(html) // 1024}KB){'  + php' if php else ''}")

    # 전 페이지 공통 머리말·꼬리말
    if first:
        extract_includes(BeautifulSoup(first, "lxml"), OUT)
        print("  include/header.html, include/footer.html")


if __name__ == "__main__":
    main()
