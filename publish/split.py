"""뽑아낸 결과물을 html / php 두 폴더로 나눈다 (각 폴더가 그대로 사이트 루트가 된다)."""
import os, re, shutil, sys


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
        pages = sum(1 for d, _, fs in os.walk(dst) for f in fs if f.endswith(keep))
        print(f"  {kind}/  페이지 {pages}개 (반대쪽 {removed}개 제외)")

    if os.path.exists(readme):
        shutil.copy2(readme, os.path.join(out, "README.md"))


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
