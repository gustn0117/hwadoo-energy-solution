import { COMPARE } from "@/lib/content";

const fmt = new Intl.NumberFormat("ko-KR");

export function Compare() {
  const { cpos, pick, bars, price, rows, asOf } = COMPARE;
  const cell = (i: number, extra = "") =>
    ["cmp__cell", i === pick ? "cmp__cell--pick" : "", extra]
      .filter(Boolean)
      .join(" ");

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

        <p className="cmp__hint" aria-hidden="true">
          표를 옆으로 밀어 나머지 사업자를 확인하세요
        </p>

        <div className="cmp__scroll">
          <table className="cmp">
            <caption className="sr-only">
              충전사업자별 제품 경쟁력 비교표 ({asOf} 기준)
            </caption>

            <thead>
              <tr>
                <th scope="col" className="cmp__corner">
                  <span className="cmp__asOf">AS OF {asOf}</span>
                </th>
                {cpos.map((c, i) => (
                  <th scope="col" key={c.name} className={cell(i, "cmp__head")}>
                    <span className="cmp__shot">
                      <img src={c.image} alt="" loading="lazy" />
                    </span>
                    <span className="cmp__name">
                      {c.name}
                      {i === pick && <em className="cmp__tag">시안 기준</em>}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* 규모는 숫자보다 길이로 읽힌다 */}
              {bars.map((row) => {
                const max = Math.max(...row.vals);
                return (
                  <tr key={row.key}>
                    <th scope="row" className="cmp__label">
                      {row.key}
                    </th>
                    {row.vals.map((v, i) => (
                      <td key={`${row.key}-${i}`} className={cell(i)}>
                        <span className="cmp__figure">
                          {fmt.format(v)}
                          <small>{row.unit}</small>
                        </span>
                        <span className="cmp__bar">
                          <span
                            className="cmp__barFill"
                            style={{ width: `${(v / max) * 100}%` }}
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}

              <tr>
                <th scope="row" className="cmp__label">
                  {price.key}
                </th>
                {price.vals.map((v, i) => (
                  <td key={`price-${i}`} className={cell(i)}>
                    <span className="cmp__price">
                      {v}
                      <small>{price.unit}</small>
                    </span>
                  </td>
                ))}
              </tr>

              {rows.map((row) => (
                <tr key={row.key}>
                  <th scope="row" className="cmp__label">
                    {row.key}
                  </th>
                  {row.vals.map((v, i) => (
                    <td key={`${row.key}-${i}`} className={cell(i, "cmp__text")}>
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
