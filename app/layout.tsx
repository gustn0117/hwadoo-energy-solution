import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "화두에너지솔루션 — 아파트 전기차 충전기 비교부터 설치까지",
  description:
    "전국 아파트 1,300개 현장, 충전기 12,000대 설치. 주요 충전사업자를 한 번에 비교하고 전문 컨설턴트와 1:1 맞춤 상담을 받아보세요.",
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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
