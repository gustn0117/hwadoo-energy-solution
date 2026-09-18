"use client";

import { useState } from "react";
import { saveCase } from "@/app/admin/actions";
import { CPO_OPTIONS } from "@/lib/content";
import type { Case } from "@/lib/supabase";

const MAX = 10 * 1024 * 1024;

export function CaseForm({ item }: { item?: Case }) {
  const [preview, setPreview] = useState<string | null>(item?.image_url ?? null);
  const [fileError, setFileError] = useState("");

  return (
    <form action={saveCase} className="adm-form">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      {item?.image_url ? <input type="hidden" name="current_image" value={item.image_url} /> : null}

      <label className="adm-field">
        <span>단지명 *</span>
        <input name="title" defaultValue={item?.title} required maxLength={100} placeholder="예) 힐스테이트자이계양" />
      </label>

      <div className="adm-grid2">
        <label className="adm-field">
          <span>지역</span>
          <input name="region" defaultValue={item?.region ?? ""} placeholder="예) 인천 계양구" />
        </label>
        <label className="adm-field">
          <span>충전사업자</span>
          <input name="cpo" defaultValue={item?.cpo ?? ""} list="cpo-list" placeholder="선택 또는 직접 입력" />
          <datalist id="cpo-list">
            {CPO_OPTIONS.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </label>
        <label className="adm-field">
          <span>설치 대수</span>
          <input name="charger_count" type="number" min={0} defaultValue={item?.charger_count ?? ""} placeholder="예) 149" />
        </label>
        <label className="adm-field">
          <span>설치 시기</span>
          <input name="installed_on" defaultValue={item?.installed_on ?? ""} placeholder="예) 2025.11" />
        </label>
      </div>

      <label className="adm-field">
        <span>설명</span>
        <textarea name="description" rows={4} defaultValue={item?.description ?? ""} placeholder="현장 특징, 설치 내용 등" />
      </label>

      <div className="adm-field">
        <span>대표 사진</span>
        <div className="adm-upload">
          <div className="adm-upload__preview">{preview ? <img src={preview} alt="" /> : <span>사진 없음</span>}</div>
          <div className="adm-upload__ctrl">
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && f.size > MAX) {
                  setFileError("10MB 이하 이미지만 올릴 수 있습니다.");
                  e.target.value = "";
                  return;
                }
                setFileError("");
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
            <small>JPG · PNG · WEBP, 10MB 이하. 가로 사진(3:2) 권장</small>
            {fileError ? <p className="adm-error">{fileError}</p> : null}
            {item?.image_url ? (
              <label className="adm-check">
                <input type="checkbox" name="remove_image" /> 기존 사진 삭제
              </label>
            ) : null}
          </div>
        </div>
      </div>

      <div className="adm-grid2">
        <label className="adm-field">
          <span>정렬 순서</span>
          <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
        </label>
        <label className="adm-check adm-check--field">
          <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> 사이트에 공개
        </label>
      </div>

      <div className="adm-form__actions">
        <a className="adm-btn" href="/admin/cases">
          취소
        </a>
        <button className="adm-btn adm-btn--primary">{item ? "수정 저장" : "등록"}</button>
      </div>
    </form>
  );
}
