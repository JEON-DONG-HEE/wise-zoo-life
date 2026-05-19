import CommonButton from "./CommonButton";

type ConfirmModalProps = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmModal({
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>

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
