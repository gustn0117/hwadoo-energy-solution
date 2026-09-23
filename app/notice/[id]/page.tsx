import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSection } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { getNotice } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const notice = await getNotice(Number(id));
  return {
    title: `${notice?.title ?? "공지·소식"} — 화두에너지솔루션`,
    description: notice?.body.slice(0, 120),
  };
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = await getNotice(Number(id));
  if (!notice) notFound();

  return (
    <SubPage eyebrow="고객지원" title={<>공지·<em>소식</em></>}>
      <PageSection>
        <article>
          <header className="pg-article__head">
            <span className="pg-list__tag">{notice.category}</span>
            <h1>{notice.title}</h1>
            <p className="pg-article__meta">
              <time dateTime={notice.published_on}>{notice.published_on.replaceAll("-", ".")}</time>
            </p>
          </header>
          <div className="pg-article__body">{notice.body}</div>
          <footer className="pg-article__nav">
            <Link className="btn btn--white" href="/notice">
              목록으로
            </Link>
          </footer>
        </article>
      </PageSection>
    </SubPage>
  );
}
