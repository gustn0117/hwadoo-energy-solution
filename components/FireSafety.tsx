import { FIRE_ITEMS } from "@/lib/content";
import { Hatch } from "./Hatch";

export function FireSafety() {
  return (
    <section className="section fire" id="화재대응">
      <div className="shell">
        <div className="section__head">
          <p className="eyebrow eyebrow--kr">화재 대응</p>
          <h2 className="section__title">
            충전기를 놓기 전에, 대응 장비부터 갖춥니다
          </h2>
          <p className="section__lead">
            국토교통부·LH의 공동주택 전기자동차 화재대응 매뉴얼을 기준으로
            단지에 필요한 품목을 제안합니다.
          </p>
        </div>

        <ul className="fire__grid">
          {FIRE_ITEMS.map((item, i) => (
            <li className="fireCard" key={item.name}>
              <Hatch className="fireCard__img" label="제품" />
              <div>
                <span className="fireCard__no">
                  ITEM {String(i + 1).padStart(2, "0")}
                </span>
                <p className="fireCard__name">{item.name}</p>
                <p className="fireCard__desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="fire__note">
          품목별 구매는 네이버 스마트스토어에서 진행됩니다. 연동 준비 중입니다.
        </p>
      </div>
    </section>
  );
}
