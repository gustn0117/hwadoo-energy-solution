import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "화두에너지솔루션 — 아파트 전기차 충전기 비교부터 설치까지",
  description:
    "전국 아파트 1,300개 현장, 충전기 12,000대 설치. 주요 충전사업자를 한 번에 비교하고 전문 컨설턴트와 1:1 맞춤 상담을 받아보세요.",
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
        <link rel="preload" href="/fonts/NotoSansKR-Variable.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* 본문 Noto Sans KR은 고객사 전달 원본을 로컬 사용 · 숫자만 Poppins */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
