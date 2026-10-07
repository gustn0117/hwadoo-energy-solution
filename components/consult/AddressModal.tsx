"use client";

import "@/app/styles/consult.css";
import { useEffect, useRef, useState } from "react";
import { AddressResult } from "@/components/consult/AddressResult";
import { ArrowRight, Close } from "@/components/Icons";

/**
 * 설치 주소 확인 팝업 (시안 1007).
 * 메인 주소 검색에서 주소를 넣고 검색하면 열리고, 다음을 누르면 설치 상담 2단계로 넘어간다.
 */
export function AddressModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("form.finder__bar");
    if (!form) return;
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const q = String(new FormData(form).get("q") ?? "").trim();
      setAddress(q);
      dialog.current?.showModal();
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return (
    <dialog
      ref={dialog}
      className="amodal"
      aria-labelledby="amodal-title"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current.close();
      }}
    >
      <div className="amodal__box">
        <div className="amodal__head">
          <h2 id="amodal-title">설치 주소 확인</h2>
          <button className="amodal__close" onClick={() => dialog.current?.close()} aria-label="닫기">
            <Close size={24} />
          </button>
        </div>

        <div className="amodal__body">
          <AddressResult compact />

          <div className="amodal__foot">
            <b>해당 부지로 설치 신청을 진행하시겠습니까?</b>
            <span>※ 혹시 해당 주소의 부지 정보가 다르다면, 추후 담당자와 연락 시 전달해주시면 수정해드리겠습니다.</span>
            <a className="cw__next" href={`/consult?address=${encodeURIComponent(address)}`}>
              다음
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
