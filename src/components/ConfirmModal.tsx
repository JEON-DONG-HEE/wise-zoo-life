import CommonButton from "./CommonButton";

function ConfirmModal() {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>확인</h3>
        <p>정말 삭제하시겠습니까?</p>

        <div className="modal-actions">
          <CommonButton variant="secondary" onClick={() => {}}>
            취소
          </CommonButton>

          <CommonButton variant="secondary" onClick={() => {}}>
            삭제
          </CommonButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
