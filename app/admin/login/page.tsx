import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <main className="adm-login">
      <img src="/images/logo-img.png" alt="화두에너지솔루션" width={500} height={181} />
      <h1>관리자 로그인</h1>
      <LoginForm next={next ?? "/admin"} />
    </main>
  );
}
