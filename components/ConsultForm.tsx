"use client";

import { Phone, Search } from "@/components/Icons";
import { openConsult } from "@/lib/consult-events";
import { BUILDING_OPTIONS, COMPANY, CPO_OPTIONS, TEL_HREF } from "@/lib/content";

/**
 * 메인 비주얼 상담 폼 — 시안 항목(충전사업자 · 건물용도 · 이름 · 주소) 그대로.
 * 신청 버튼을 누르면 입력값을 채운 상담 팝업으로 넘어가 연락처를 받고 접수한다.
 */
export function ConsultForm() {
  return (
    <form
      className="consult"
      id="consult"
      aria-labelledby="consult-title"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        openConsult({
          cpo: String(fd.get("cpo") ?? ""),
          building: String(fd.get("building") ?? ""),
          name: String(fd.get("name") ?? ""),
          address: String(fd.get("address") ?? ""),
        });
      }}
    >
      <h2 className="consult__title" id="consult-title">
        충전기 <em>설치 상담</em>
      </h2>

      <div className="consult__body">
        <label className="field field--select">
          <span className="sr-only">충전사업자</span>
          <select name="cpo" defaultValue="">
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
          <select name="building" defaultValue="">
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
          <input name="name" placeholder="이름" autoComplete="name" maxLength={40} />
        </label>

        <label className="field field--search">
          <span className="sr-only">주소</span>
          <input name="address" placeholder="주소를 입력해주세요." autoComplete="street-address" />
          <Search size={26} />
        </label>

        <p className="consult__tel">
          상담(설치)문의
          <a className="num" href={TEL_HREF}>
            <Phone size={28} />
            {COMPANY.tel}
          </a>
        </p>

        <button className="consult__submit" type="submit">
          무료 상담신청
        </button>
      </div>
    </form>
  );
}
