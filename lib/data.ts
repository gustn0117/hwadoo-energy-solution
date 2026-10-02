import "server-only";
import { FAQ } from "@/lib/content";
import { db, type Case, type CpoRanking, type Notice, type Promotion, type SiteSetting } from "@/lib/supabase";

export type FaqItem = { q: string; answer: string };

/** 공개 FAQ — DB를 못 읽으면 lib/content.ts의 기본 문항으로 대신한다 */
export async function getFaqs(limit?: number): Promise<FaqItem[]> {
  try {
    let query = db()
      .from("faqs")
      .select("question, answer")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data.map((f) => ({ q: f.question, answer: f.answer }));
  } catch (e) {
    console.error("[faq] fallback to static", e);
    return limit ? FAQ.slice(0, limit) : FAQ;
  }
}

export async function getCases(): Promise<Case[]> {
  try {
    const { data, error } = await db()
      .from("cases")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Case[];
  } catch (e) {
    console.error("[cases] load failed", e);
    return [];
  }
}

export async function getNotices(limit?: number): Promise<Notice[]> {
  try {
    let q = db()
      .from("notices")
      .select("*")
      .eq("is_published", true)
      .order("is_pinned", { ascending: false })
      .order("published_on", { ascending: false })
      .order("id", { ascending: false });
    if (limit) q = q.limit(limit);
    const { data, error } = await q;
    if (error) throw error;
    return data as Notice[];
  } catch (e) {
    console.error("[notices] load failed", e);
    return [];
  }
}

export async function getNotice(id: number): Promise<Notice | null> {
  const { data } = await db().from("notices").select("*").eq("id", id).eq("is_published", true).maybeSingle();
  return (data as Notice) ?? null;
}

export async function getPromotions(): Promise<Promotion[]> {
  try {
    const { data, error } = await db()
      .from("promotions")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Promotion[];
  } catch (e) {
    console.error("[promotions] load failed", e);
    return [];
  }
}

export async function getPromotion(id: number): Promise<Promotion | null> {
  const { data } = await db().from("promotions").select("*").eq("id", id).eq("is_published", true).maybeSingle();
  return (data as Promotion) ?? null;
}

/** 진행중 / 예정 / 종료 — 종료일이 지나면 종료로 본다 (KST 기준 날짜 문자열 비교) */
export function promotionState(p: Promotion): "ongoing" | "upcoming" | "ended" {
  const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
  if (p.ends_on && p.ends_on < today) return "ended";
  if (p.starts_on && p.starts_on > today) return "upcoming";
  return "ongoing";
}

export type Rankings = { fast: CpoRanking[]; slow: CpoRanking[]; asOf: string | null };

/** 충전사업자 순위 — 급속/완속으로 나눠서 순서대로 */
export async function getRankings(): Promise<Rankings> {
  try {
    const { data, error } = await db()
      .from("cpo_rankings")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });
    if (error) throw error;
    const rows = (data ?? []) as CpoRanking[];
    return {
      fast: rows.filter((r) => r.kind === "fast"),
      slow: rows.filter((r) => r.kind === "slow"),
      asOf: rows.find((r) => r.as_of)?.as_of ?? null,
    };
  } catch (e) {
    console.error("[rankings] load failed", e);
    return { fast: [], slow: [], asOf: null };
  }
}

/** 26.08.20 형식 */
export function shortDate(date: string | null) {
  return date ? date.slice(2).replaceAll("-", ".") : "";
}


/* ---------- 메인 배너 (관리자에서 등록) ---------- */

export type Hero = {
  pcImage: string;
  mobileImage: string;
  buttonLabel: string;
  buttonHref: string;
};

/** 고객사 전달 원본 — 관리자에서 아직 등록하지 않았을 때 쓴다 */
export const HERO_DEFAULT: Hero = {
  pcImage: "/images/main-banner.jpg",
  mobileImage: "/images/main-banner.jpg",
  buttonLabel: "충전기 설치 진단",
  buttonHref: "/#diagnosis",
};

export const HERO_KEYS = ["hero_pc_image", "hero_mobile_image", "hero_button_label", "hero_button_href"] as const;

/** 설정 테이블을 아직 만들지 않았거나 값이 없으면 기본값으로 돌아간다 */
export async function getSettings(keys: readonly string[]): Promise<Record<string, string>> {
  try {
    const { data, error } = await db().from("site_settings").select("key, value").in("key", [...keys]);
    if (error) throw error;
    return Object.fromEntries((data as SiteSetting[]).filter((r) => r.value).map((r) => [r.key, r.value as string]));
  } catch (e) {
    console.error("[settings] fallback to default", e);
    return {};
  }
}

export async function getHero(): Promise<Hero> {
  const s = await getSettings(HERO_KEYS);
  const pc = s.hero_pc_image || HERO_DEFAULT.pcImage;
  return {
    pcImage: pc,
    // 모바일 이미지를 따로 올리지 않았으면 PC 이미지를 그대로 쓴다
    mobileImage: s.hero_mobile_image || pc,
    buttonLabel: s.hero_button_label || HERO_DEFAULT.buttonLabel,
    buttonHref: s.hero_button_href || HERO_DEFAULT.buttonHref,
  };
}
