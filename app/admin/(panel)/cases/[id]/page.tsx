import { notFound } from "next/navigation";
import { CaseForm } from "@/components/admin/CaseForm";
import { db, type Case } from "@/lib/supabase";

export default async function EditCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await db().from("cases").select("*").eq("id", Number(id)).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <div className="adm-head">
        <h1>설치사례 수정</h1>
      </div>
      <CaseForm item={data as Case} />
    </>
  );
}
