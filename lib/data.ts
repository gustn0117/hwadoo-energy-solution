import "server-only";
import { FAQ } from "@/lib/content";
import { db, type Case } from "@/lib/supabase";

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
