import type { Metadata } from "next";
import { NoticeBoard } from "@/components/support/NoticeBoard";
import { SupportShell } from "@/components/support/SupportShell";
import { getNotices } from "@/lib/data";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SAMPLE_NOTICES } from "@/lib/sample";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "공지·소식",
  description: "화두에너지솔루션의 공지사항과 전기차 충전 인프라 관련 소식을 확인하세요.",
};

export default async function NoticeListPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const preview = (await searchParams).preview === "1";
  const notices = preview ? SAMPLE_NOTICES : await getNotices();

  return (
    <SupportShell current="/notice" desc="제도 변경과 서비스 안내를 알려드립니다">
      {preview ? <PreviewNotice /> : null}
      <NoticeBoard items={notices} />
    </SupportShell>
  );
}
