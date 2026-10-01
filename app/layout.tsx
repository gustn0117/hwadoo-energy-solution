import type { Metadata } from "next";
import { COMPANY, OG_IMAGE, SITE_URL } from "@/lib/content";
import "./globals.css";

const TITLE = "화두에너지솔루션 — 아파트 전기차 충전기 비교부터 설치까지";
const DESC =
  "전국 아파트 1,300개 현장, 충전기 12,000대 설치. 주요 충전사업자를 한 번에 비교하고 전문 컨설턴트와 1:1 맞춤 상담을 받아보세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // 하위 페이지는 제목만 넘기면 뒤에 회사명이 붙는다
    template: `%s — ${COMPANY.name}`,
  },
  description: DESC,
  // 카카오톡·메신저 공유 미리보기
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: "ko_KR",
    url: "/",
    title: TITLE,
    description: DESC,
    images: [{ url: OG_IMAGE, width: 800, height: 400, alt: COMPANY.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
};

/** JS가 켜진 환경에서만 스크롤 등장 효과용 숨김 상태를 켠다 (모션 줄이기 설정이면 끔) */
const REVEAL_BOOT = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal')`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
        <link rel="preload" href="/fonts/JalnanGothic.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/NotoSansKR-Variable.subset.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* 폰트는 고객사 전달 원본(잘난체 고딕 · Noto Sans KR)만 사용한다 */}
      </head>
      <body>{children}</body>
    </html>
  );
}
