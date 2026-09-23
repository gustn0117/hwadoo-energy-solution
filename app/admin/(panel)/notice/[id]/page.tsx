import { notFound } from "next/navigation";
import { NoticeForm } from "@/components/admin/NoticeForm";
import { db, type Notice } from "@/lib/supabase";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await db().from("notices").select("*").eq("id", Number(id)).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <div className="adm-head">
        <h1>공지·소식 수정</h1>
      </div>
      <NoticeForm item={data as Notice} />
    </>
  );
}
