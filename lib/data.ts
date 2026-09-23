import "server-only";
import { FAQ } from "@/lib/content";
import { db, type Case, type Notice, type Promotion } from "@/lib/supabase";

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
