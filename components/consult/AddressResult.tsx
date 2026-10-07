import { ADDRESS_SAMPLE } from "@/lib/content";

/**
 * 주소 검색 결과 — 기본 정보(파랑)와 현재 충전기 설치 현황(보라) 두 장 (시안 1007).
 * 단지 정보 API 가 붙기 전까지는 lib/content.ts 의 ADDRESS_SAMPLE 을 보여준다.
 */
export function AddressResult({ compact }: { compact?: boolean }) {
  const d = ADDRESS_SAMPLE;

  return (
    <div className="addr">
      <p className="addr__eyebrow">검색 결과 예시</p>
      <h3 className="addr__name">{d.name}</h3>

      <div className="addr__cards">
        <section className="addrCard addrCard--basic">
          <h4>
            <img src="/images/location-icon.png" alt="" width={160} height={192} />
            기본 정보
          </h4>
          <dl>
            {d.basic.map((b) => (
              <div key={b.key}>
                <dt>{b.key}</dt>
                <dd>{b.val}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="addrCard addrCard--chargers">
          <h4>
            <img src="/images/installation-status.png" alt="" width={160} height={148} />
            현재(기설) 충전기 설치 현황
          </h4>
          <div className="addrCard__tableWrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">CPO</th>
                  <th scope="col">용량</th>
                  <th scope="col">수량</th>
                  <th scope="col">총수량</th>
                </tr>
              </thead>
              <tbody>
                {d.chargers.map((c, i) => (
                  <tr key={`${c.kind}-${c.cpo}-${i}`}>
                    <th scope="row" data-kind={c.kind}>
                      {c.kind}
                    </th>
                    <td>{c.cpo}</td>
                    <td>{c.power}</td>
                    <td className="num">{c.count}</td>
                    {i === 0 ? (
                      <td className="num addr__total" rowSpan={2}>
                        {d.total}
                      </td>
                    ) : null}
                    {i === 2 ? <td className="num">-</td> : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {compact ? null : <p className="sr-only">단지 정보 연동 전까지는 예시 값입니다.</p>}
    </div>
  );
}
