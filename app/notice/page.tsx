import type { Metadata } from "next";
import Link from "next/link";
import { PageSection } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { getNotices } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "공지·소식 — 화두에너지솔루션",
  description: "화두에너지솔루션의 공지사항과 전기차 충전 인프라 관련 소식을 확인하세요.",
};

export default async function NoticeListPage() {
  const notices = await getNotices();

  return (
    <SubPage eyebrow="고객지원" title={<>공지·<em>소식</em></>} desc="제도 변경과 서비스 안내를 알려드립니다.">
      <PageSection>
        {notices.length === 0 ? (
          <p className="pg-empty">등록된 글이 없습니다.</p>
        ) : (
          <ul className="pg-list" data-reveal-group>
            {notices.map((n) => (
              <li key={n.id}>
                <Link href={`/notice/${n.id}`}>
                  <div className="pg-list__body">
                    <span className="pg-list__tag">{n.is_pinned ? "중요" : n.category}</span>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                  </div>
                  <time dateTime={n.published_on}>{n.published_on.replaceAll("-", ".")}</time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageSection>
    </SubPage>
  );
}
