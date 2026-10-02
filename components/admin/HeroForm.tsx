"use client";

import { useState } from "react";
import { saveHero } from "@/app/admin/actions";
import type { Hero } from "@/lib/data";

const MAX = 10 * 1024 * 1024;

/** 메인 배너 이미지 한 칸 (PC / 모바일) */
function ImageField({
  name,
  label,
  hint,
  current,
  custom,
}: {
  name: "pc_image" | "mobile_image";
  label: string;
  hint: string;
  current: string;
  custom: boolean;
}) {
  const [preview, setPreview] = useState(current);
  const [error, setError] = useState("");

  return (
    <div className="adm-field">
      <span>{label}</span>
      {custom ? <input type="hidden" name={`${name}_current`} value={current} /> : null}
      <div className="adm-upload">
        <div className="adm-upload__preview">{preview ? <img src={preview} alt="" /> : <span>이미지 없음</span>}</div>
        <div className="adm-upload__ctrl">
          <input
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f && f.size > MAX) {
                setError("10MB 이하 이미지만 올릴 수 있습니다.");
                e.target.value = "";
                return;
              }
              setError("");
              if (f) setPreview(URL.createObjectURL(f));
            }}
          />
          <small>{hint}</small>
          {error ? <p className="adm-error">{error}</p> : null}
          {custom ? (
            <label className="adm-check">
              <input type="checkbox" name={`${name}_clear`} value="1" /> 등록한 이미지를 지우고 기본 이미지로
            </label>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function HeroForm({ hero, custom }: { hero: Hero; custom: { pc: boolean; mobile: boolean } }) {
  return (
    <form action={saveHero} className="adm-form">
      <ImageField
        name="pc_image"
        label="PC 배너 이미지"
        hint="JPG · PNG · WEBP, 10MB 이하. 가로로 넓은 이미지(2:1 내외) 권장 — 예) 1012×498"
        current={hero.pcImage}
        custom={custom.pc}
      />

      <ImageField
        name="mobile_image"
        label="모바일 배너 이미지"
        hint="올리지 않으면 PC 이미지를 그대로 씁니다. 세로가 긴 화면에 맞춘 이미지를 권합니다."
        current={hero.mobileImage}
        custom={custom.mobile}
      />

      <div className="adm-grid2">
        <label className="adm-field">
          <span>버튼 이름</span>
          <input name="button_label" defaultValue={hero.buttonLabel} maxLength={30} placeholder="예) 충전기 설치 진단" />
          <small>비워 두면 버튼이 나오지 않습니다.</small>
        </label>
        <label className="adm-field">
          <span>버튼 링크</span>
          <input name="button_href" defaultValue={hero.buttonHref} maxLength={300} placeholder="예) /#diagnosis" />
          <small>
            사이트 안이면 <code>/faq</code> 처럼, 바깥이면 <code>https://</code> 로 시작하는 주소를 넣어 주세요.
            상담 팝업을 열려면 <code>/#consult</code> 입니다.
          </small>
        </label>
      </div>

      <div className="adm-form__actions">
        <a className="adm-btn" href="/" target="_blank" rel="noreferrer">
          사이트에서 보기
        </a>
        <button className="adm-btn adm-btn--primary">저장</button>
      </div>
    </form>
  );
}
