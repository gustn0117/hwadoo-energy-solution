"use client";

import { useEffect, useRef } from "react";

/**
 * 화면에 들어오면 0부터 목표값까지 숫자가 올라간다.
 * 서버 렌더와 JS 미동작 시에는 최종값이 그대로 보인다.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const target = Number(value.replace(/\D/g, ""));
    if (!el || !target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) => n.toLocaleString("en-US");
    let raf = 0;
    el.textContent = "0";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // 빠르게 올라가다 끝에서 감속
          el.textContent = format(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
