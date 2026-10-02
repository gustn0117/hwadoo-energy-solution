# 화두에너지솔루션 웹사이트

아파트 전기차 충전기 상담·설치 안내 사이트와 관리자 페이지입니다.

- 프레임워크: Next.js 16 (App Router) · React 19 · TypeScript
- 스타일: 순수 CSS (`app/globals.css`, `app/styles/pages.css`)
- 데이터베이스: Supabase (PostgREST + Storage)
- 배포: Docker 셀프호스팅 (`output: "standalone"`)

## 실행 방법

```bash
npm install
cp .env.example .env.local   # 값을 채운 뒤
npm run dev                  # http://localhost:3000
```

운영 빌드는 아래와 같습니다.

```bash
npm run build
npm start
```

## 환경변수

`.env.example` 을 복사해 값을 채웁니다. 개발은 `.env.local`, 운영 서버는 `.env.production` 을 사용합니다.

| 키 | 설명 |
| --- | --- |
| `SUPABASE_URL` | Supabase 주소 |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버 전용 키 — 브라우저에 노출하면 안 됩니다 |
| `SUPABASE_SCHEMA` | 사용할 스키마 (기본 `hwadoo_energy_solution`) |
| `SUPABASE_BUCKET` | 이미지 업로드 버킷 |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 |
| `ADMIN_SESSION_SECRET` | 관리자 세션 서명용 임의 문자열 (`openssl rand -hex 32`) |

## 폴더 구조

```
app/                  페이지 (App Router)
  admin/              관리자 — 상담 신청, 설치사례, FAQ, 공지·소식, 프로모션
  about/ compare/ service/ fire/ …   사이트 하위 페이지
  globals.css         디자인 토큰과 메인 페이지 스타일
  styles/pages.css    하위 페이지 공용 블록 스타일
components/           화면 컴포넌트
  page/Blocks.tsx     하위 페이지를 구성하는 공용 블록
lib/
  content.ts          메뉴·메인 문구·브랜드 등 사이트 문구
  site-content.ts     하위 페이지 본문 데이터
  supabase.ts         DB 연결(서버 전용)과 테이블 타입
  session.ts          관리자 세션
proxy.ts              /admin 접근 차단 (로그인 확인)
public/               이미지·폰트
```

## 콘텐츠 수정 위치

| 바꿀 내용 | 위치 |
| --- | --- |
| 메뉴 구성, 대표번호, 회사 정보 | `lib/content.ts` |
| 하위 페이지 본문·수치 | `lib/site-content.ts` |
| 이용약관·개인정보처리방침 | `lib/legal.ts` |
| 색상·글자 크기·콘텐츠 폭 | `app/globals.css` 상단 토큰 (`--container` 등) |
| 메인 배너 이미지·버튼, 상담 신청 내역, 설치사례, FAQ, 공지, 프로모션, 충전사업자 순위 | 관리자 페이지 `/admin` |

## 데이터베이스

스키마 `hwadoo_energy_solution` 에 아래 테이블을 사용합니다. 모든 테이블은 RLS가 켜져 있고 정책이 없어, 서버의 service_role 키로만 읽고 쓸 수 있습니다.

- `consultations` 상담 신청
- `cases` 설치사례
- `faqs` 자주 묻는 질문
- `notices` 공지·소식
- `promotions` 프로모션
- `cpo_rankings` 충전사업자 순위
- `site_settings` 메인 배너 등 관리자에서 바꾸는 설정 (키-값)

설치사례·프로모션·메인 배너 이미지는 Supabase Storage 버킷에 저장됩니다.

`site_settings` 는 아래 SQL 로 만듭니다. 테이블이 없으면 메인 배너는 기본 이미지로 나오고
관리자 저장만 실패하므로, 사이트가 멈추지는 않습니다.

```sql
create table hwadoo_energy_solution.site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);
alter table hwadoo_energy_solution.site_settings enable row level security;
```

쓰는 키: `hero_pc_image`, `hero_mobile_image`, `hero_button_label`, `hero_button_href`

## 배포

서버에서 아래를 실행하면 이미지 빌드 후 컨테이너가 교체됩니다.

```bash
docker compose up -d --build
```

`.env.production` 은 저장소에 포함하지 않으며 서버에만 둡니다.
