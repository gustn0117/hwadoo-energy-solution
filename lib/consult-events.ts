/**
 * 상담 팝업 열기 — 메인 상담 폼, 주소 검색, 각종 상담 버튼이 모두 이 이벤트로 팝업을 연다.
 * (고객사 팝업 시안이 오면 ConsultModal의 모양만 바꾸면 된다)
 */
export const CONSULT_EVENT = "hwadoo:consult";

export type ConsultPrefill = {
  cpo?: string;
  building?: string;
  name?: string;
  address?: string;
};

export function openConsult(prefill: ConsultPrefill = {}) {
  window.dispatchEvent(new CustomEvent<ConsultPrefill>(CONSULT_EVENT, { detail: prefill }));
}
