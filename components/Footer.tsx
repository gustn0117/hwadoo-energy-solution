import { COMPANY } from "@/lib/content";

export function Footer() {
  const info = [
    ["회사명", COMPANY.name],
    ["대표자명", COMPANY.ceo],
    ["대표전화", COMPANY.tel],
    ["이메일", COMPANY.email],
    ["FAX", COMPANY.fax],
    ["주소", COMPANY.address],
  ];

  return (
    <footer className="ft">
      <div className="shell">
        <div className="ft__top">
          <img className="ft__logo" src="/images/logo-img.png" alt={COMPANY.name} width={500} height={181} loading="lazy" />
          <nav className="ft__links" aria-label="약관">
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보처리방침</a>
          </nav>
        </div>
        <dl className="ft__info">
          {info.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="ft__copy">
        © <b>{COMPANY.nameEn}</b>. All rights reserved
      </p>
    </footer>
  );
}
