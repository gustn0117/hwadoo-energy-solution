"use server";

import { BUILDING_OPTIONS, CPO_OPTIONS } from "@/lib/content";
import { db } from "@/lib/supabase";

export type ConsultState = { ok: boolean; message: string } | null;

const text = (fd: FormData, key: string, max = 200) =>
  String(fd.get(key) ?? "").trim().slice(0, max);

/** 메인 상담 폼 접수 — 누구나 호출할 수 있으므로 모든 값을 서버에서 다시 검증한다 */
export async function submitConsultation(_prev: ConsultState, fd: FormData): Promise<ConsultState> {
  // 봇이 채우는 숨은 칸 — 채워져 있으면 저장하지 않고 성공처럼 응답
  if (text(fd, "website")) return { ok: true, message: "상담 신청이 접수되었습니다." };

  const name = text(fd, "name", 40);
  const phone = text(fd, "phone", 20);
  const digits = phone.replace(/\D/g, "");
  const cpo = text(fd, "cpo");
  const building = text(fd, "building");

  if (!name) return { ok: false, message: "이름을 입력해주세요." };
  if (digits.length < 9 || digits.length > 11) return { ok: false, message: "연락처를 정확히 입력해주세요." };
  if (fd.get("agree") !== "on") return { ok: false, message: "개인정보 수집·이용에 동의해주세요." };

  const { error } = await db()
    .from("consultations")
    .insert({
      name,
      phone,
      address: text(fd, "address") || null,
      cpo: (CPO_OPTIONS as readonly string[]).includes(cpo) ? cpo : null,
      building: (BUILDING_OPTIONS as readonly string[]).includes(building) ? building : null,
    });

  if (error) {
    console.error("[consult] insert failed", error);
    return { ok: false, message: "접수 중 오류가 발생했습니다. 전화로 문의해주세요." };
  }
  return { ok: true, message: "상담 신청이 접수되었습니다. 담당자가 곧 연락드리겠습니다." };
}
