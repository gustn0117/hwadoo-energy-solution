import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "관리자 — 화두에너지솔루션",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
