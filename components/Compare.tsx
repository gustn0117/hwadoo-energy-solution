import { COMPARE } from "@/lib/content";
import { Hatch } from "./Hatch";

export function Compare() {
  return (
    <section className="section compare" id="비교">
      <div className="shell">
        <div className="section__head">
          <p className="eyebrow eyebrow--kr eyebrow--onDark">충전사업자 비교</p>
          <h2 className="section__title">
            환경부 화재예방형 충전기, 4개 사업자를 한눈에
          </h2>
          <p className="section__lead">
            운영 규모, 계약 조건, 보상 범위까지 같은 기준으로 비교했습니다.
            단지 여건에 맞는 사업자는 상담에서 함께 정합니다.
          </p>
        </div>

        <div className="compare__scroll">
          <table className="compare__table">
            <caption className="sr-only">충전사업자별 제품 경쟁력 비교표</caption>
            <thead>
              <tr>
                <th scope="col">CPO / 2026.05</th>
                {COMPARE.cpos.map((c, i) => (
                  <th
                    scope="col"
                    key={c}
                    className={i === COMPARE.pick ? "compare__pick" : undefined}
                  >
                    {c}
                    {i === COMPARE.pick && (
                      <span className="compare__pickTag">시안 기준</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">제품 사진</th>
                {COMPARE.cpos.map((c, i) => (
                  <td key={c} className={i === COMPARE.pick ? "compare__pick" : undefined}>
                    <Hatch onDark className="compare__thumb" label={`${c} 충전기`} src={`/images/generated/charger-${i + 1}.webp`} fit="contain" />
                  </td>
                ))}
              </tr>
              {COMPARE.rows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.key}</th>
                  {row.vals.map((v, i) => (
                    <td
                      key={`${row.key}-${i}`}
                      className={[
                        row.num ? "num" : "",
                        i === COMPARE.pick ? "compare__pick" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="compare__note">
          * 환경부 무공해차 통합누리집 공시 기준 · 별도 협의 요금이 적용된 일부
          충전소는 공시 요금과 다를 수 있습니다.
        </p>
      </div>
    </section>
  );
}
