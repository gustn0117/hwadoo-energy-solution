import type { Metadata } from "next";
import { PageSection, Prose, SpecList } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { COMPANY } from "@/lib/content";
import { PRIVACY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 화두에너지솔루션",
  description: `${COMPANY.name}의 개인정보 수집·이용 및 보호에 관한 안내입니다.`,
};

export default function PrivacyPage() {
  return (
    <SubPage eyebrow="약관" title="개인정보처리방침" desc={`시행일 ${PRIVACY.effectiveOn}`}>
      <PageSection title="수집하는 개인정보">
        <SpecList rows={PRIVACY.collected} cols={1} />
      </PageSection>
      <PageSection tone="soft">
        <Prose>
          {PRIVACY.articles.map((a) => (
            <section key={a.title}>
              <h3 style={{ marginTop: 28, fontSize: 19, fontWeight: 700 }}>{a.title}</h3>
              {a.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </Prose>
      </PageSection>
    </SubPage>
  );
}
