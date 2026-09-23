import type { Metadata } from "next";
import { PageSection, Prose } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { COMPANY } from "@/lib/content";
import { TERMS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "이용약관 — 화두에너지솔루션",
  description: `${COMPANY.name} 웹사이트 이용약관입니다.`,
};

export default function TermsPage() {
  return (
    <SubPage eyebrow="약관" title="이용약관" desc={`시행일 ${TERMS.effectiveOn}`}>
      <PageSection>
        <Prose>
          {TERMS.articles.map((a) => (
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
