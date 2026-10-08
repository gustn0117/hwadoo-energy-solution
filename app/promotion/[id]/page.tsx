import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta, PageSection } from "@/components/page/Blocks";
import { SupportShell } from "@/components/support/SupportShell";
import { getPromotion, promotionState } from "@/lib/data";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SAMPLE_PROMOTIONS } from "@/lib/sample";

export const dynamic = "force-dynamic";

const STATE_LABEL = { ongoing: "진행중", upcoming: "예정", ended: "종료" } as const;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const promotion = await getPromotion(Number(id));
  return {
    title: `${promotion?.title ?? "프로모션"} — 화두에너지솔루션`,
    description: promotion?.summary ?? promotion?.body.slice(0, 120),
  };
}

export default async function PromotionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { id } = await params;
  const preview = (await searchParams).preview === "1";
  const promotion = preview
    ? (SAMPLE_PROMOTIONS.find((p) => p.id === Number(id)) ?? SAMPLE_PROMOTIONS[0])
    : await getPromotion(Number(id));
  if (!promotion) notFound();
  const state = promotionState(promotion);

  return (
    <SupportShell current="/promotion">
      {preview ? <PreviewNotice /> : null}
      <PageSection>
        <article>
          <header className="pg-article__head">
            <span className="pg-list__tag" data-state={state}>
              {STATE_LABEL[state]}
            </span>
            <h1>{promotion.title}</h1>
            <p className="pg-article__meta">
              {[promotion.starts_on, promotion.ends_on].filter(Boolean).join(" ~ ").replaceAll("-", ".")}
            </p>
          </header>
          <div className="pg-article__body">
            {promotion.image_url ? <img src={promotion.image_url} alt="" /> : null}
            {promotion.body}
          </div>
          <footer className="pg-article__nav">
            <Link className="btn btn--white" href="/promotion">
              목록으로
            </Link>
          </footer>
        </article>
        <PageCta title="이 혜택으로 상담받고 싶으신가요?" desc="상담 신청 시 담당자가 적용 가능 여부를 확인해드립니다." />
      </PageSection>
    </SupportShell>
  );
}
