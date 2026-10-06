# 퍼블리싱 결과물 뽑는 법

고객사에 전달하는 HTML/CSS/JS(+PHP) 묶음을 만드는 스크립트입니다.
사이트 코드를 고친 뒤 이 순서대로 돌리면 결과물이 다시 만들어집니다.

## 1. 준비

```bash
python3 -m venv .venv && .venv/bin/pip install beautifulsoup4 lxml
npm i -D js-beautify            # publish/export.py 가 ../node_modules/.bin/js-beautify 를 씁니다
```

## 2. 샘플 데이터용 임시 API 띄우기

게시판(공지·프로모션·설치사례)과 충전사업자 순위는 운영 DB 값이 적으면
마크업이 비어 버립니다. 운영 DB는 건드리지 않고 읽기만 하는 임시 API를 써서
샘플 행을 끼워 넣습니다.

```bash
.venv/bin/python publish/sample-api.py        # 127.0.0.1:5599
SUPABASE_URL=http://127.0.0.1:5599 npx next start -p 3457
```

## 3. 뽑기

```bash
.venv/bin/python - <<'PY'
import sys; sys.path.insert(0, "publish")
import export as E
E.OUT = "/경로/hwadoo-publishing"
E.main()
PY
```

`export.py` 안의 값들:

| 이름 | 뜻 |
| --- | --- |
| `BASE` | 읽어올 주소 (기본 `http://localhost:3457`) |
| `OUT` | 결과물을 쓸 폴더 |
| `ROUTES` | (Next 경로, 내보낼 파일 경로, 페이지 이름) 목록 |
| `LOOPS` | 반복 출력 주석을 달 영역 |

## 결과물 구성

- `index.html` / `index.php` 와 `sub/<대메뉴>/<소메뉴>.html|.php`
- `include/header.php|html`, `include/footer.php|html` — `.php` 판에는 이미 연결돼 있습니다
- `assets/css/site.css` (globals + pages + board + ranking 합본)
- `assets/js/site.js` — 사이트 동작을 라이브러리 없이 다시 구현한 파일.
  **React 컴포넌트를 고치면 이 파일도 같이 고쳐야 합니다.**
- 페이지마다 맨 위 목차 주석과 영역 구분 주석이 들어갑니다 (`annotate.py`)
