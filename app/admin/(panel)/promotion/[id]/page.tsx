import { notFound } from "next/navigation";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { db, type Promotion } from "@/lib/supabase";

export default async function EditPromotionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await db().from("promotions").select("*").eq("id", Number(id)).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <div className="adm-head">
        <h1>프로모션 수정</h1>
      </div>
      <PromotionForm item={data as Promotion} />
    </>
  );
}
