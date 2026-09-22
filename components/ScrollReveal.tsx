"use client";

import { useEffect } from "react";

/**
 * 스크롤 등장 효과 — 타이틀이 먼저 올라오고, 콘텐츠가 순서대로 따라 올라온다.
 * - [data-reveal]        : 요소 하나가 올라옴
 * - [data-reveal-group]  : 자식들이 0.1초 간격으로 차례로 올라옴
 * 숨김 스타일은 layout의 인라인 스크립트가 <html class="reveal">을 붙였을 때만 적용된다.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal")) return;

    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 8) * 110}ms`);
      });
    });

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group] > *");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return null;
}
