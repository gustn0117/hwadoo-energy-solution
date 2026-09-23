import type { MetadataRoute } from "next";
import { MENU } from "@/lib/content";
import { FIRE_PRODUCTS } from "@/lib/site-content";

const BASE = "https://hwadoo-energy-solution.hsweb.pics";

/** 메뉴에 걸린 정적 페이지 + 화재안전 상세 + 약관 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"]);
  for (const group of MENU) {
    paths.add(group.href);
    for (const item of group.items) paths.add(item.href);
  }
  for (const p of FIRE_PRODUCTS) paths.add(`/fire/${p.slug}`);
  paths.add("/terms");
  paths.add("/privacy");

  return [...paths]
    .filter((p) => p.startsWith("/") && !p.includes("#"))
    .map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));
}
