import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "화두에너지솔루션 — 아파트 전기차 충전기 설치 상담",
  description:
    "화재 예방부터 보상까지. 전국 아파트 1,300개 현장에 12,000대의 완속충전기를 설치한 화두에너지솔루션이 무상설치 상담을 진행합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
