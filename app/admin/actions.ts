"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BUCKET, db } from "@/lib/supabase";
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createToken, verifyToken } from "@/lib/session";

/** 서버 액션은 URL로 직접 호출될 수 있어 proxy와 별개로 매번 세션을 확인한다 */
async function requireAdmin() {
  const store = await cookies();
  if (!verifyToken(store.get(SESSION_COOKIE)?.value)) redirect("/admin/login");
}

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const optional = (fd: FormData, key: string) => text(fd, key) || null;
const id = (fd: FormData) => {
  const n = Number(fd.get("id"));
  if (!Number.isInteger(n) || n <= 0) throw new Error("잘못된 id");
  return n;
};
const fail = (what: string, error: unknown) => {
  console.error(`[admin] ${what}`, error);
  throw new Error(`${what}에 실패했습니다.`);
};

/* ---------- 로그인 ---------- */

export type LoginState = { error: string } | null;

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  if (!checkPassword(text(fd, "password"))) return { error: "비밀번호가 올바르지 않습니다." };

  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  const next = text(fd, "next");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ---------- 상담 신청 ---------- */

export async function updateConsultation(fd: FormData) {
  await requireAdmin();
  const status = text(fd, "status");
  if (!["new", "contacting", "done"].includes(status)) throw new Error("잘못된 상태값");

  const { error } = await db()
    .from("consultations")
    .update({ status, memo: optional(fd, "memo") })
    .eq("id", id(fd));
  if (error) fail("상담 저장", error);
  revalidatePath("/admin");
}

export async function deleteConsultation(fd: FormData) {
  await requireAdmin();
  const { error } = await db().from("consultations").delete().eq("id", id(fd));
  if (error) fail("상담 삭제", error);
  revalidatePath("/admin");
}

/* ---------- 이미지 ---------- */

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function uploadImage(file: File) {
  if (!IMAGE_TYPES.includes(file.type)) throw new Error("JPG, PNG, WEBP, GIF 이미지만 올릴 수 있습니다.");
  if (file.size > 10 * 1024 * 1024) throw new Error("이미지는 10MB 이하만 올릴 수 있습니다.");

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `cases/${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const storage = db().storage.from(BUCKET);
  const { error } = await storage.upload(path, file, { contentType: file.type });
  if (error) fail("이미지 업로드", error);
  return storage.getPublicUrl(path).data.publicUrl;
}

/** 우리 버킷에 올린 이미지면 지운다 (외부 URL은 건드리지 않음) */
async function removeImage(url: string | null) {
  const marker = `/object/public/${BUCKET}/`;
  if (!url?.includes(marker)) return;
  await db().storage.from(BUCKET).remove([url.split(marker)[1]]);
}

/* ---------- 설치사례 ---------- */

export async function saveCase(fd: FormData) {
  await requireAdmin();
  const editing = fd.get("id") ? id(fd) : null;
  const title = text(fd, "title");
  if (!title) throw new Error("단지명을 입력해주세요.");

  const count = Number(text(fd, "charger_count"));
  const row: Record<string, unknown> = {
    title,
    region: optional(fd, "region"),
    cpo: optional(fd, "cpo"),
    charger_count: Number.isFinite(count) && count > 0 ? Math.round(count) : null,
    installed_on: optional(fd, "installed_on"),
    description: optional(fd, "description"),
    is_published: fd.get("is_published") === "on",
    sort_order: Number(text(fd, "sort_order")) || 0,
  };

  const prevImage = optional(fd, "current_image");
  const file = fd.get("image");
  if (file instanceof File && file.size > 0) {
    row.image_url = await uploadImage(file);
  } else if (fd.get("remove_image") === "on") {
    row.image_url = null;
  }

  const table = db().from("cases");
  const { error } = editing ? await table.update(row).eq("id", editing) : await table.insert(row);
  if (error) fail("설치사례 저장", error);

  if (editing && "image_url" in row) await removeImage(prevImage);

  revalidatePath("/admin/cases");
  revalidatePath("/cases");
  redirect("/admin/cases");
}

export async function deleteCase(fd: FormData) {
  await requireAdmin();
  const { data, error } = await db().from("cases").delete().eq("id", id(fd)).select("image_url").single();
  if (error) fail("설치사례 삭제", error);
  await removeImage(data?.image_url ?? null);
  revalidatePath("/admin/cases");
  revalidatePath("/cases");
}

/* ---------- FAQ ---------- */

export async function saveFaq(fd: FormData) {
  await requireAdmin();
  const editing = fd.get("id") ? id(fd) : null;
  const question = text(fd, "question");
  const answer = text(fd, "answer");
  if (!question || !answer) throw new Error("질문과 답변을 모두 입력해주세요.");

  const row = {
    question,
    answer,
    is_published: fd.get("is_published") === "on",
    sort_order: Number(text(fd, "sort_order")) || 0,
  };
  const table = db().from("faqs");
  const { error } = editing ? await table.update(row).eq("id", editing) : await table.insert(row);
  if (error) fail("FAQ 저장", error);

  revalidatePath("/admin/faq");
  revalidatePath("/");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function deleteFaq(fd: FormData) {
  await requireAdmin();
  const { error } = await db().from("faqs").delete().eq("id", id(fd));
  if (error) fail("FAQ 삭제", error);
  revalidatePath("/admin/faq");
  revalidatePath("/");
  revalidatePath("/faq");
}
