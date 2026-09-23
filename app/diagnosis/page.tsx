import type { Metadata } from "next";
import { AddressSearch } from "@/components/AddressSearch";
import { Note, PageSection, Prose, Steps } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { INSTALL_STEPS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "설치진단 — 화두에너지솔루션",
  description: "아파트 주소로 충전기 설치 현황과 추가 설치 가능 여부를 확인하고, 실사보고서까지 받아보세요.",
};

export default function DiagnosisPage() {
  return (
    <SubPage
      eyebrow="설치진단"
      title={
        <>
          우리 단지, <em>얼마나 더 설치할 수 있을까요?</em>
        </>
      }
      desc="주소만 알려주시면 기설 충전기 현황과 추가 설치 가능 수량부터 확인해드립니다."
    >
      {/* 메인과 같은 주소 검색 — 검색하면 입력한 주소로 상담 팝업이 열린다 */}
      <AddressSearch />

      <PageSection title="진단에서 확인하는 것" desc="설치가 가능한지, 몇 대까지 가능한지부터 확인합니다.">
        <Steps
          items={[
            { title: "기설 충전기 현황", desc: "단지에 이미 설치된 완속·급속 충전기 수량과 운영사를 확인합니다." },
            { title: "의무 설치 수량", desc: "총 주차면수를 기준으로 법정 의무 설치 수량을 계산합니다." },
            { title: "설치 가능 위치", desc: "전력 인입 경로와 소방 이격거리 기준으로 설치 가능한 구획을 찾습니다." },
            { title: "실사보고서", desc: "확인한 내용을 문서로 정리해 입주자대표회의 자료로 쓸 수 있게 드립니다." },
          ]}
          cols={4}
        />
        <Note>
          주소 검색은 상담 접수로 이어집니다. 단지 정보 자동 조회 기능은 준비 중이며, 접수 후 담당자가 확인해 결과를 안내해드립니다.
        </Note>
      </PageSection>

      <PageSection tone="soft" title="진단 이후 절차" desc="진단 결과가 나오면 아래 순서로 진행됩니다.">
        <Steps items={INSTALL_STEPS.map((s) => ({ title: s.title, desc: s.desc }))} cols={4} />
        <Prose>
          <p>
            진단과 상담은 무료이며, 진단 결과를 받아본 뒤 진행 여부를 결정하셔도 됩니다.
          </p>
        </Prose>
      </PageSection>
    </SubPage>
  );
}
