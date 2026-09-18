import { notFound } from "next/navigation";
import { FaqForm } from "@/components/admin/FaqForm";
import { db, type Faq } from "@/lib/supabase";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await db().from("faqs").select("*").eq("id", Number(id)).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <div className="adm-head">
        <h1>FAQ 수정</h1>
      </div>
      <FaqForm item={data as Faq} />
    </>
  );
}
