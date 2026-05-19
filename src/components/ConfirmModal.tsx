import CommonButton from "./CommonButton";

type ConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmModal({ onCancel, onConfirm }: ConfirmModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>확인</h3>
        <p>정말 삭제하시겠습니까?</p>

        <div className="modal-actions">
          <CommonButton variant="secondary" onClick={onCancel}>
            취소
          </CommonButton>

          <CommonButton variant="danger" onClick={onConfirm}>
            삭제
          </CommonButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
