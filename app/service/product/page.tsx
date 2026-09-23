import type { Metadata } from "next";
import { CheckList, MediaRow, Note, PageCta, PageSection, Prose, SpecList } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { APP_FEATURES, PRODUCT_SPEC, SAFETY_FEATURES } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "제품안내 — 화두에너지솔루션",
  description:
    "아파트에 설치하는 완속충전기의 사양과 안전 기능, 입주민이 쓰는 앱 기능을 정리했습니다. 완속 7kW, KC 형식승인, IP44 이상 보호 등급.",
};

export default function ProductPage() {
  return (
    <SubPage
      eyebrow="제품안내"
      title={
        <>
          아파트에 맞춘 <em>완속충전기</em>
        </>
      }
      desc="장비 사양과 안전장치, 입주민이 실제로 쓰는 앱 기능까지 확인하세요."
    >
      {/* 장비 개요 */}
      <PageSection eyebrow="PRODUCT" title="생활 동선에 맞는 완속 충전" desc="아파트는 차를 오래 세워두는 곳입니다.">
        <Prose>
          <p>
            아파트 주차장에서는 급하게 충전할 일이 많지 않습니다. 퇴근 후 세워둔 차가 다음 날 아침까지 충전되면 충분하기
            때문에, 전력 부담이 적고 배터리에도 무리가 덜한 <strong>완속충전기</strong>를 기본으로 설치합니다.
          </p>
          <p>
            설치 형태는 기둥이나 벽에 붙이는 벽부형과 바닥에 세우는 스탠드형 중에서 주차 구획과 전력 인입 경로를 보고
            정합니다. 어느 쪽이든 사양과 안전 기능은 동일합니다.
          </p>
        </Prose>
        <MediaRow
          image="/images/generated/charger-1.webp"
          alt="아파트 주차장에 설치된 완속충전기"
          title="벽부형 · 스탠드형"
        >
          기둥 옆 벽부형은 주차면을 잃지 않아 좁은 지하주차장에 적합하고, 스탠드형은 벽이 없는 구간이나 지상 주차장에
          설치합니다. 현장 실사 때 구획별로 어느 쪽이 맞는지 정리해 드립니다.
        </MediaRow>
      </PageSection>

      {/* 사양표 */}
      <PageSection tone="soft" eyebrow="SPEC" title="충전기 사양" desc="환경부 보조사업 기준을 충족하는 장비만 설치합니다.">
        <SpecList rows={PRODUCT_SPEC} cols={2} />
        <Note>
          충전사업자에 따라 외형과 디스플레이 구성은 달라질 수 있습니다. 계약 전 실제 설치 모델의 사양서를 함께
          확인해드립니다.
        </Note>
      </PageSection>

      {/* 안전 기능 */}
      <PageSection
        eyebrow="SAFETY"
        title="안전 기능"
        desc="충전 중 이상이 생기면 사람이 확인하기 전에 장비가 먼저 차단합니다."
      >
        <CheckList items={SAFETY_FEATURES} cols={2} />
        <Note>
          충전구역 단위의 화재 대응 설비(질식소화포, 상방향 주수장치, 열화상카메라 등)는 화재안전 메뉴에서 별도로
          안내합니다.
        </Note>
      </PageSection>

      {/* 앱 기능 */}
      <PageSection tone="soft" eyebrow="APP" title="앱 기능" desc="입주민이 카드 없이 충전하고 내역을 확인합니다.">
        <MediaRow image="/images/generated/app.webp" alt="충전 앱 화면" title="꽂으면 끝, 오토차징" flip>
          차량을 한 번 등록해두면 커플러를 꽂는 것만으로 인증과 결제가 끝납니다. 회원카드를 들고 다니거나 앱을 열 필요가
          없어, 고령 입주민의 문의가 크게 줄어듭니다.
        </MediaRow>
        <CheckList items={APP_FEATURES} cols={2} />
      </PageSection>

      <PageSection tone="off">
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
