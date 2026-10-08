"""뽑아낸 결과물을 html / php 두 폴더로 나눈다 (각 폴더가 그대로 사이트 루트가 된다)."""
import base64, os, re, shutil, sys


def split(src, out):
    if os.path.exists(out):
        shutil.rmtree(out)
    os.makedirs(out)

    readme = os.path.join(src, "README.md")
    for kind, keep, drop in (("html", ".html", ".php"), ("php", ".php", ".html")):
        dst = os.path.join(out, kind)
        shutil.copytree(src, dst, ignore=shutil.ignore_patterns(".DS_Store", "Thumbs.db", "README.md"))
        removed = 0
        for dirpath, _, files in os.walk(dst):
            for f in files:
                if f.endswith(drop):
                    os.remove(os.path.join(dirpath, f))
                    removed += 1
        if kind == "php":
            rewrite_links(dst)
        else:
            # 파일을 그냥 더블클릭해도 열리도록 루트 기준 경로를 상대 경로로 바꾸고
            to_relative(dst)
            # 웹폰트도 CSS 안에 심는다 (file:// 에서는 폰트 파일을 따로 못 읽는다)
            inline_fonts(dst)
        pages = sum(1 for d, _, fs in os.walk(dst) for f in fs if f.endswith(keep))
        print(f"  {kind}/  페이지 {pages}개 (반대쪽 {removed}개 제외)")

    if os.path.exists(readme):
        shutil.copy2(readme, os.path.join(out, "README.md"))


# href="/..." src="/..." url("/...") 처럼 루트 기준으로 적힌 경로
ROOT_PATH = re.compile(r'(?<=["\'(])/(?!/)([^"\')<>]*)')


def to_relative(root):
    """html 폴더 안의 루트 기준 경로를 각 파일 위치에 맞는 상대 경로로 바꾼다"""
    changed = 0
    for dirpath, _, files in os.walk(root):
        for f in files:
            if not f.endswith((".html", ".css")):
                continue
            full = os.path.join(dirpath, f)
            depth = os.path.relpath(dirpath, root).count(os.sep) + 1 if os.path.relpath(dirpath, root) != "." else 0
            up = "../" * depth
            with open(full, encoding="utf-8") as fh:
                text = fh.read()

            def swap(m):
                target = m.group(1)
                # 실제로 있는 파일을 가리킬 때만 바꾼다 (tel: 같은 건 애초에 안 걸린다)
                plain = target.split("#")[0].split("?")[0]
                if plain and not os.path.exists(os.path.join(root, plain)):
                    return m.group(0)
                return (up + target) if (up + target) else "./"

            new_text, n = ROOT_PATH.subn(swap, text)
            if n:
                with open(full, "w", encoding="utf-8") as fh:
                    fh.write(new_text)
                changed += n
    print(f"        루트 기준 경로 {changed}곳을 상대 경로로")


def inline_fonts(root):
    """@font-face 의 폰트 파일을 CSS 안에 base64 로 심는다 — 더블클릭으로 열어도 글꼴이 나오도록"""
    css = os.path.join(root, "assets/css/site.css")
    if not os.path.exists(css):
        return
    with open(css, encoding="utf-8") as f:
        text = f.read()

    done = []

    def swap(m):
        name = m.group(1)
        path = os.path.join(root, "fonts", name)
        if not os.path.exists(path):
            return m.group(0)
        with open(path, "rb") as f:
            data = base64.b64encode(f.read()).decode()
        done.append(name)
        return f'url("data:font/woff2;base64,{data}")'

    text, n = re.subn(r'url\("[^"]*fonts/([^"/]+\.woff2)"\)', swap, text)
    if n:
        with open(css, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"        웹폰트 {len(done)}개를 CSS 안에 심음 ({os.path.getsize(css) // 1024}KB)")

    # 미리 불러오기 링크는 file:// 에서 막히므로 뺀다
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if not fname.endswith(".html"):
                continue
            full = os.path.join(dirpath, fname)
            with open(full, encoding="utf-8") as f:
                html = f.read()
            new_html = re.sub(r'\s*<link[^>]*as="font"[^>]*>', "", html)
            if new_html != html:
                with open(full, "w", encoding="utf-8") as f:
                    f.write(new_html)


def rewrite_links(root):
    """php 폴더 안에서는 내부 링크도 .php 를 가리키게 바꾼다"""
    # href="/...html" / location.href = "/...html" 처럼 루트 기준 경로만 바꾼다
    # 뒤에 #앵커 가 붙은 링크도 함께 바꾼다
    page = re.compile(r'(?<=["\'])(/[^"\'<>]*?)\.html(?=(#[^"\']*)?["\'])')
    changed = 0
    for dirpath, _, files in os.walk(root):
        for f in files:
            if not f.endswith((".php", ".js")):
                continue
            full = os.path.join(dirpath, f)
            with open(full, encoding="utf-8") as fh:
                text = fh.read()
            new_text, n = page.subn(lambda m: m.group(1) + ".php", text)
            if n:
                with open(full, "w", encoding="utf-8") as fh:
                    fh.write(new_text)
                changed += n
    print(f"        내부 링크 {changed}곳을 .php 로")


if __name__ == "__main__":
    split(sys.argv[1], sys.argv[2])
