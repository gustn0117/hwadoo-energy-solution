"use client";

import { useState } from "react";
import { savePromotion } from "@/app/admin/actions";
import type { Promotion } from "@/lib/supabase";

const MAX = 10 * 1024 * 1024;

export function PromotionForm({ item }: { item?: Promotion }) {
  const [preview, setPreview] = useState<string | null>(item?.image_url ?? null);
  const [fileError, setFileError] = useState("");

  return (
    <form action={savePromotion} className="adm-form">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      {item?.image_url ? <input type="hidden" name="current_image" value={item.image_url} /> : null}

      <label className="adm-field">
        <span>제목 *</span>
        <input name="title" defaultValue={item?.title} required maxLength={200} placeholder="예) 9월 무상설치 상담 이벤트" />
      </label>

      <label className="adm-field">
        <span>한 줄 요약</span>
        <input name="summary" defaultValue={item?.summary ?? ""} maxLength={200} placeholder="목록에 보이는 설명" />
      </label>

      <label className="adm-field">
        <span>내용 *</span>
        <textarea name="body" rows={12} defaultValue={item?.body} required />
        <small>줄바꿈은 그대로 보입니다.</small>
      </label>

      <div className="adm-grid2">
        <label className="adm-field">
          <span>시작일</span>
          <input type="date" name="starts_on" defaultValue={item?.starts_on ?? ""} />
        </label>
        <label className="adm-field">
          <span>종료일</span>
          <input type="date" name="ends_on" defaultValue={item?.ends_on ?? ""} />
          <small>종료일이 지나면 목록에 ‘종료’로 표시됩니다.</small>
        </label>
      </div>

      <div className="adm-field">
        <span>대표 이미지</span>
        <div className="adm-upload">
          <div className="adm-upload__preview">{preview ? <img src={preview} alt="" /> : <span>이미지 없음</span>}</div>
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
            <small>JPG · PNG · WEBP, 10MB 이하. 가로 이미지(3:2) 권장</small>
            {fileError ? <p className="adm-error">{fileError}</p> : null}
            {item?.image_url ? (
              <label className="adm-check">
                <input type="checkbox" name="remove_image" /> 기존 이미지 삭제
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
        <a className="adm-btn" href="/admin/promotion">
          취소
        </a>
        <button className="adm-btn adm-btn--primary">{item ? "수정 저장" : "등록"}</button>
      </div>
    </form>
  );
}
