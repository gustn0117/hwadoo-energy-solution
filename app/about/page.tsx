import type { Metadata } from "next";
import { Card, CardGrid, PageCta, PageSection, Prose, SpecList } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { COMPANY } from "@/lib/content";
import { ABOUT_INTRO, ABOUT_STATS, ABOUT_VALUES } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "회사소개 — 화두에너지솔루션",
  description:
    "화두에너지솔루션은 아파트 전기차 충전 인프라를 상담부터 설치, 운영까지 맡는 충전 인프라 전문 기업입니다.",
};

const PROFILE = [
  { key: "회사명", val: COMPANY.name },
  { key: "대표자명", val: COMPANY.ceo },
  { key: "대표전화", val: `${COMPANY.tel} (${COMPANY.hours})` },
  { key: "이메일", val: COMPANY.email },
  { key: "FAX", val: COMPANY.fax },
  { key: "주소", val: COMPANY.address },
];

export default function AboutPage() {
  return (
    <SubPage
      eyebrow="화두에너지솔루션"
      title={
        <>
          아파트 충전 인프라의 <em>기준</em>
        </>
      }
      desc="상담부터 설치, 개통 이후 관리까지 한 곳에서 이어갑니다."
    >
      <PageSection eyebrow="ABOUT" title="화두에너지솔루션은">
        <Prose>
          {ABOUT_INTRO.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      </PageSection>

      <PageSection tone="soft" title="숫자로 보는 화두" center>
        <CardGrid cols={3}>
          {ABOUT_STATS.map((s) => (
            <Card key={s.label} flat title={`${s.value}${s.unit}`}>
              {s.label}
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      <PageSection title="화두가 일하는 기준" desc="단지마다 다른 조건을 같은 절차로 확인하고 제안합니다.">
        <CardGrid cols={3}>
          {ABOUT_VALUES.map((v, i) => (
            <Card key={v.title} num={i + 1} title={v.title}>
              {v.desc}
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      <PageSection tone="off" title="회사 개요">
        <SpecList rows={PROFILE} cols={2} />
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
