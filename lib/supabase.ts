import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트 (service_role).
 * 테이블은 RLS로 anon 접근이 막혀 있어, 모든 읽기/쓰기는 이 클라이언트로만 한다.
 * 키는 .env.production(서버) / .env.local(로컬)에만 둔다 — 레포가 public이다.
 */
function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`환경변수 ${name}가 없습니다.`);
  return v;
}

export const SCHEMA = process.env.SUPABASE_SCHEMA ?? "hwadoo_energy_solution";
export const BUCKET = process.env.SUPABASE_BUCKET ?? "hwadoo-energy-solution";

export function db() {
  return createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    db: { schema: SCHEMA },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type Consultation = {
  id: number;
  created_at: string;
  cpo: string | null;
  building: string | null;
  name: string;
  phone: string;
  address: string | null;
  status: "new" | "contacting" | "done";
  memo: string | null;
};

export type Case = {
  id: number;
  created_at: string;
  title: string;
  region: string | null;
  cpo: string | null;
  charger_count: number | null;
  installed_on: string | null;
  image_url: string | null;
  description: string | null;
  is_published: boolean;
  sort_order: number;
};

export type Faq = {
  id: number;
  created_at: string;
  question: string;
  answer: string;
  is_published: boolean;
  sort_order: number;
};

export type Notice = {
  id: number;
  created_at: string;
  published_on: string;
  category: string;
  title: string;
  body: string;
  is_published: boolean;
  is_pinned: boolean;
};

export type Promotion = {
  id: number;
  created_at: string;
  title: string;
  summary: string | null;
  body: string;
  image_url: string | null;
  starts_on: string | null;
  ends_on: string | null;
  is_published: boolean;
  sort_order: number;
};

export const NOTICE_CATEGORIES = ["공지", "소식", "안내"] as const;

export const STATUS_LABEL: Record<Consultation["status"], string> = {
  new: "신규",
  contacting: "상담중",
  done: "완료",
};
