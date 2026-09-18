"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="adm-login__form">
      <input type="hidden" name="next" value={next} />
      <label>
        <span className="sr-only">비밀번호</span>
        <input type="password" name="password" placeholder="비밀번호" autoFocus required autoComplete="current-password" />
      </label>
      <button className="adm-btn adm-btn--primary" disabled={pending}>
        {pending ? "확인 중…" : "로그인"}
      </button>
      {state?.error ? <p className="adm-error">{state.error}</p> : null}
    </form>
  );
}
