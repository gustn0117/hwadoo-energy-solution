"use client";

import { useState } from "react";
import { Phone, Search } from "@/components/Icons";
import { BUILDING_OPTIONS, COMPANY, CPO_OPTIONS, TEL_HREF } from "@/lib/content";

export function ConsultForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="consult"
      id="consult"
      aria-labelledby="consult-title"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: 접수 API 연동 — 지금은 화면 확인용으로 완료 문구만 띄운다
        setSent(true);
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
          <input name="name" placeholder="이름" autoComplete="name" required />
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

        <p className="consult__done" role="status">
          {sent ? "상담 신청이 접수되었습니다. 담당자가 곧 연락드리겠습니다." : ""}
        </p>
      </div>
    </form>
  );
}
