import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 관리자 세션 — 만료시각에 HMAC 서명을 붙인 토큰을 httpOnly 쿠키로 둔다.
 * proxy.ts(요청 전 1차 확인)와 서버 액션(실제 권한 확인) 양쪽에서 쓴다.
 */
export const SESSION_COOKIE = "hwadoo_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12시간

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("환경변수 ADMIN_SESSION_SECRET가 없습니다.");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createToken() {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return expected.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}
