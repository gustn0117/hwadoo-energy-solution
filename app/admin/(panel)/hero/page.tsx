import { HeroForm } from "@/components/admin/HeroForm";
import { getHero, HERO_DEFAULT } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = { title: "메인 배너" };

export default async function AdminHeroPage() {
  const hero = await getHero();

  return (
    <>
      <div className="adm-head">
        <h1>메인 배너</h1>
        <p>메인 첫 화면에 들어가는 이미지와 버튼을 바꿉니다.</p>
      </div>
      <HeroForm
        hero={hero}
        custom={{
          pc: hero.pcImage !== HERO_DEFAULT.pcImage,
          mobile: hero.mobileImage !== hero.pcImage,
        }}
      />
    </>
  );
}
