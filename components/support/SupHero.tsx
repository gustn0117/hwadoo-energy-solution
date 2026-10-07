import "@/app/styles/board.css"; // 상단 띠(.sup) 스타일

/** 하위 페이지 상단 띠 — 고객지원 · 충전사업자 비교 · 설치 상담이 함께 쓴다 */
export function SupHero({ title, desc, eyebrow = "HWADOO ENERGY" }: { title: string; desc?: string; eyebrow?: string }) {
  return (
    <section className="sup">
      <div className="shell sup__inner">
        <div>
          <p className="sup__eyebrow">{eyebrow}</p>
          <h1 className="sup__title">{title}</h1>
        </div>
        {desc ? <p className="sup__desc">{desc}</p> : null}
      </div>
    </section>
  );
}
