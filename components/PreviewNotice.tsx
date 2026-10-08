/** 미리보기 모드 안내 — 샘플 데이터로 보고 있다는 것을 분명히 알린다 */
export function PreviewNotice() {
  return (
    <p className="previewBar" role="status">
      화면 확인용 <b>미리보기</b>입니다. 아래 내용은 <b>샘플 데이터</b>이며 실제로 등록된 글이 아닙니다.
    </p>
  );
}
