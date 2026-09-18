"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { submitConsultation } from "@/app/actions/consult";
import { Phone, Search } from "@/components/Icons";
import { BUILDING_OPTIONS, COMPANY, CPO_OPTIONS, TEL_HREF } from "@/lib/content";

/** 주소 검색 섹션에서 보내는 이벤트 — 입력한 주소를 폼에 채운다 */
export const FINDER_EVENT = "hwadoo:finder";

export function ConsultForm() {
  const [state, action, pending] = useActionState(submitConsultation, null);
  const formRef = useRef<HTMLFormElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  useEffect(() => {
    const fill = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (addressRef.current && value) addressRef.current.value = value;
    };
    window.addEventListener(FINDER_EVENT, fill);
    return () => window.removeEventListener(FINDER_EVENT, fill);
  }, []);

  return (
    <form
      ref={formRef}
      className="consult"
      id="consult"
      aria-labelledby="consult-title"
      // action prop 대신 직접 호출 — React 19의 자동 폼 초기화로 검증 실패 시 입력값이 날아가지 않게
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
    >
      <h2 className="consult__title" id="consult-title">
        충전기 <em>설치 상담</em>
      </h2>

      <div className="consult__body">
        <label className="field field--select">
          <span className="sr-only">충전사업자</span>
          <select name="cpo" defaultValue="" required>
            <option value="" disabled>
              충전사업자 선택
            </option>
            {CPO_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="field field--select">
          <span className="sr-only">건물용도</span>
          <select name="building" defaultValue="" required>
            <option value="" disabled>
              건물용도
            </option>
            {BUILDING_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="sr-only">이름</span>
          <input name="name" placeholder="이름" autoComplete="name" required maxLength={40} />
        </label>

        <label className="field">
          <span className="sr-only">연락처</span>
          <input name="phone" type="tel" placeholder="연락처" autoComplete="tel" inputMode="tel" required maxLength={20} />
        </label>

        <label className="field field--search">
          <span className="sr-only">주소</span>
          <input ref={addressRef} name="address" placeholder="주소를 입력해주세요." autoComplete="street-address" />
          <Search size={26} />
        </label>

        {/* 봇 차단용 숨은 칸 */}
        <input className="consult__trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <label className="consult__agree">
          <input type="checkbox" name="agree" required />
          <span>
            개인정보 수집·이용에 동의합니다 <small>(이름·연락처·주소, 상담 목적, 상담 완료 후 1년 보관)</small>
          </span>
        </label>

        <p className="consult__tel">
          상담(설치)문의
          <a className="num" href={TEL_HREF}>
            <Phone size={28} />
            {COMPANY.tel}
          </a>
        </p>

        <button className="consult__submit" type="submit" disabled={pending}>
          {pending ? "접수 중…" : "무료 상담신청"}
        </button>

        <p className="consult__done" role="status" data-ok={state?.ok}>
          {state?.message ?? ""}
        </p>
      </div>
    </form>
  );
}
