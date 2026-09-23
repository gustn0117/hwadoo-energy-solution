"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "상담 신청" },
  { href: "/admin/cases", label: "설치사례" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/notice", label: "공지·소식" },
  { href: "/admin/promotion", label: "프로모션" },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav className="adm-nav" aria-label="관리자 메뉴">
      {ITEMS.map((it) => {
        const active = it.href === "/admin" ? path === "/admin" : path.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} aria-current={active ? "page" : undefined}>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
