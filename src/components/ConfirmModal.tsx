import CommonButton from "./CommonButton";

type ConfirmModalProps = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmModal({
  title,
  message,
  cancelText = "취소" /* 기본값 */,
  confirmText = "확인" /* 값을 안넘기면 기본값 노출 */,
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
            {cancelText}
          </CommonButton>

          <CommonButton variant="danger" onClick={onConfirm}>
            {confirmText}
          </CommonButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
