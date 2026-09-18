import { logout } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="adm-hd">
        <a className="adm-hd__logo" href="/admin">
          <img src="/images/logo-img.png" alt="화두에너지솔루션" width={500} height={181} />
          <span>관리자</span>
        </a>
        <AdminNav />
        <div className="adm-hd__right">
          <a href="/" target="_blank" rel="noreferrer">
            사이트 보기 ↗
          </a>
          <form action={logout}>
            <button className="adm-btn">로그아웃</button>
          </form>
        </div>
      </header>
      <main className="adm-main">{children}</main>
    </>
  );
}
