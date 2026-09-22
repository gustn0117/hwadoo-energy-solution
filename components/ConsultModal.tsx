"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitConsultation } from "@/app/actions/consult";
import { Close } from "@/components/Icons";
import { CONSULT_EVENT, openConsult, type ConsultPrefill } from "@/lib/consult-events";
import { BUILDING_OPTIONS, COMPANY, CPO_OPTIONS, TEL_HREF } from "@/lib/content";

/**
 * 상담 접수 팝업 — 연락처와 개인정보 동의를 여기서 받는다.
 * 사이트의 모든 "/#consult" 링크를 가로채 이 팝업을 연다 (JS가 없으면 링크대로 메인 폼으로 이동).
 */
export function ConsultModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [prefill, setPrefill] = useState<ConsultPrefill>({});
  const [version, setVersion] = useState(0); // 열 때마다 본문을 새로 마운트 — 입력값·접수 상태 초기화

  useEffect(() => {
    const open = (e: Event) => {
      setPrefill((e as CustomEvent<ConsultPrefill>).detail ?? {});
      setVersion((v) => v + 1);
      dialog.current?.showModal();
    };
    const intercept = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      if (a.getAttribute("href") === "/#consult") {
        e.preventDefault();
        openConsult();
      }
    };
    window.addEventListener(CONSULT_EVENT, open);
    document.addEventListener("click", intercept);
    return () => {
      window.removeEventListener(CONSULT_EVENT, open);
      document.removeEventListener("click", intercept);
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="cmodal"
      aria-labelledby="cmodal-title"
      onClick={(e) => {
        // 바깥(백드롭) 클릭 시 닫기
        if (e.target === dialog.current) dialog.current.close();
      }}
    >
      <div className="cmodal__box">
        <div className="cmodal__head">
          <h2 id="cmodal-title">
            충전기 <em>설치 상담</em>
          </h2>
          <button className="cmodal__close" onClick={() => dialog.current?.close()} aria-label="닫기">
            <Close size={22} />
          </button>
        </div>

        <ModalBody key={version} prefill={prefill} onClose={() => dialog.current?.close()} />
      </div>
    </dialog>
  );
}

function ModalBody({ prefill, onClose }: { prefill: ConsultPrefill; onClose: () => void }) {
  const [state, action, pending] = useActionState(submitConsultation, null);

  if (state?.ok) {
    return (
      <div className="cmodal__done" role="status">
        <b>상담 신청이 접수되었습니다.</b>
        <p>담당자가 확인 후 곧 연락드리겠습니다.</p>
        <button className="consult__submit" onClick={onClose}>
          확인
        </button>
      </div>
    );
  }

  return (
    <form
      className="cmodal__form"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
    >
      <div className="cmodal__grid">
        <label className="field field--select">
          <span className="sr-only">충전사업자</span>
          <select name="cpo" defaultValue={prefill.cpo ?? ""} required>
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
          <select name="building" defaultValue={prefill.building ?? ""} required>
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
          <input name="name" placeholder="이름" defaultValue={prefill.name} autoComplete="name" required maxLength={40} />
        </label>
        <label className="field">
          <span className="sr-only">연락처</span>
          <input name="phone" type="tel" placeholder="연락처" autoComplete="tel" inputMode="tel" required maxLength={20} />
        </label>
        <label className="field cmodal__full">
          <span className="sr-only">주소</span>
          <input name="address" placeholder="주소 (아파트명)" defaultValue={prefill.address} autoComplete="street-address" />
        </label>
      </div>

      {/* 봇 차단용 숨은 칸 */}
      <input className="consult__trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label className="consult__agree">
        <input type="checkbox" name="agree" required />
        <span>
          개인정보 수집·이용에 동의합니다 <small>(이름·연락처·주소, 상담 목적, 상담 완료 후 1년 보관)</small>
        </span>
      </label>

      {state && !state.ok ? (
        <p className="cmodal__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <button className="consult__submit" type="submit" disabled={pending}>
        {pending ? "접수 중…" : "무료 상담신청"}
      </button>

      <p className="cmodal__tel">
        전화 상담 <a className="num" href={TEL_HREF}>{COMPANY.tel}</a> · {COMPANY.hours}
      </p>
    </form>
  );
}
