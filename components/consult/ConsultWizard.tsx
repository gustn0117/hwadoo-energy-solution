"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { submitConsultation } from "@/app/actions/consult";
import { AddressResult } from "@/components/consult/AddressResult";
import { ArrowRight, Search } from "@/components/Icons";
import { BUILDING_OPTIONS, CPO_OPTIONS } from "@/lib/content";

const STEPS = ["주소 검색", "정보입력", "신청완료"] as const;

/**
 * 설치 상담 3단계 (시안 1007).
 * 1 주소 검색 → 2 정보입력 → 3 신청완료.
 * 주소 검색은 단지 정보 API 가 붙기 전까지 예시 결과를 보여준다.
 */
export function ConsultWizard({ initialAddress = "" }: { initialAddress?: string }) {
  const [step, setStep] = useState(initialAddress ? 2 : 1);
  const [query, setQuery] = useState(initialAddress);
  const [found, setFound] = useState(Boolean(initialAddress));
  const [state, action, pending] = useActionState(submitConsultation, null);

  useEffect(() => {
    if (state?.ok) setStep(3);
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <section className="cw">
      <div className="shell">
        <div className="cw__box">
          <ol className="cw__steps" aria-label="상담 신청 단계">
            {STEPS.map((label, i) => {
              const no = i + 1;
              return (
                <li key={label} data-state={step === no ? "on" : step > no ? "done" : "off"}>
                  <span className="cw__dot num">{no}</span>
                  <b>{label}</b>
                </li>
              );
            })}
          </ol>

          {step === 1 ? (
            <div className="cw__panel">
              <div className="cw__lead">
                <h2>
                  설치를 원하는 <em>주소</em>를 입력해주세요.
                </h2>
                <p>정확한 도로명 주소로 검색해주시면, 해당 장소의 충전기 설치 가능 여부와 주변 현황을 빠르게 확인할 수 있습니다.</p>
              </div>

              <form
                className="cw__search"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) setFound(true);
                }}
              >
                <img src="/images/location-icon.png" alt="" width={160} height={192} />
                <label className="sr-only" htmlFor="cw-q">
                  아파트명 또는 주소
                </label>
                <input
                  id="cw-q"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setFound(false);
                  }}
                  placeholder="아파트명 또는 주소를 입력하세요."
                  autoComplete="off"
                />
                <button type="submit" aria-label="검색">
                  <Search size={26} />
                </button>
              </form>

              {found ? (
                <AddressResult />
              ) : (
                <div className="cw__empty">
                  <img src="/images/consult-search-empty.png" alt="" width={445} height={342} />
                  <b>
                    <em>주소를 검색</em>하시면 주변 현황을 확인할 수 있습니다.
                  </b>
                  <span>설치 장소의 기본 정보와 현재 충전기 설치 현황을 확인해보세요.</span>
                </div>
              )}

              <div className="cw__actions">
                <button className="cw__next" disabled={!found} onClick={() => setStep(2)}>
                  다음
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <form
              className="cw__panel"
              onInput={(e) => recalcTotals(e.currentTarget)}
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                fd.set("address", query || "");
                startTransition(() => action(fd));
              }}
            >
              <AddressResult compact />

              <div className="cw__form">
                <h3>충전기 수량 입력</h3>
                <div className="cw__qtyWrap">
                  <table className="cw__qty">
                    <thead>
                      <tr>
                        <th scope="col">구분</th>
                        <th scope="col">현재(기설)</th>
                        <th scope="col">추가</th>
                        <th scope="col">합계</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">급속</th>
                        <td>
                          <QtyInput name="fast_now" label="급속 현재 대수" />
                        </td>
                        <td className="cw__none">-</td>
                        <td>
                          <QtyInput name="fast_total" label="급속 합계" readOnly />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">완속</th>
                        <td>
                          <QtyInput name="slow_now" label="완속 현재 대수" />
                        </td>
                        <td>
                          <QtyInput name="slow_add" label="완속 추가 대수" />
                        </td>
                        <td>
                          <QtyInput name="slow_total" label="완속 합계" readOnly />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>기본정보</h3>
                <div className="cw__grid">
                  <label className="cw__field">
                    <span>충전사업자</span>
                    <select name="cpo" defaultValue="" required>
                      <option value="" disabled>
                        충전사업자 선택
                      </option>
                      {CPO_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                  <label className="cw__field">
                    <span>건물용도</span>
                    <select name="building" defaultValue="" required>
                      <option value="" disabled>
                        건물 용도 선택
                      </option>
                      {BUILDING_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                  <label className="cw__field">
                    <span>신청자</span>
                    <input name="name" placeholder="( OOO 관리자명 등 )" autoComplete="name" required maxLength={40} />
                  </label>
                  <label className="cw__field">
                    <span>연락처</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="( 휴대폰 등 )"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      maxLength={20}
                    />
                  </label>
                </div>

                {/* 봇이 채우는 숨은 칸 */}
                <input className="consult__trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <label className="cw__agree">
                  <input type="checkbox" name="agree" required defaultChecked />
                  <span>
                    <b>개인정보처리방침</b>에 동의합니다.
                  </span>
                  <button type="button" data-legal="privacy" className="cw__terms">
                    [약관보기]
                  </button>
                </label>

                {state && !state.ok ? (
                  <p className="cw__error" role="alert">
                    {state.message}
                  </p>
                ) : null}
              </div>

              <div className="cw__actions">
                <button type="button" className="cw__prev" onClick={() => setStep(1)}>
                  이전
                </button>
                <button type="submit" className="cw__next" disabled={pending}>
                  {pending ? "접수 중…" : "다음"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          ) : null}

          {step === 3 ? (
            <div className="cw__panel cw__done">
              <img src="/images/consult-done.png" alt="" width={513} height={363} />
              <h2>
                신청이 <em>완료</em>되었습니다.
              </h2>
              <p>
                빠른 시일 내에 담당자가 확인 후 연락드리겠습니다.
                <br />
                감사합니다.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** 현재(기설) + 추가 = 합계 를 입력할 때마다 다시 계산한다 */
function recalcTotals(form: HTMLFormElement) {
  const num = (name: string) => {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    const n = Number((el?.value ?? "").replace(/\D/g, ""));
    return Number.isFinite(n) ? n : 0;
  };
  const put = (name: string, value: number) => {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (el) el.value = String(value);
  };
  put("fast_total", num("fast_now"));
  put("slow_total", num("slow_now") + num("slow_add"));
}

/** 수량 칸 — 숫자만, 비어 있으면 0 */
function QtyInput({ name, label, readOnly }: { name: string; label: string; readOnly?: boolean }) {
  return (
    <span className="cw__qtyCell">
      <label className="sr-only" htmlFor={`cw-${name}`}>
        {label}
      </label>
      <input
        id={`cw-${name}`}
        name={name}
        type="text"
        inputMode="numeric"
        defaultValue="0"
        readOnly={readOnly}
        maxLength={5}
        className="num"
      />
      <i>대</i>
    </span>
  );
}
