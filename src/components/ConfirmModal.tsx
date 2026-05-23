import { useEffect } from "react";
import CommonButton from "./CommonButton";

type ConfirmModalProps = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  cancelDisabled?: boolean;
  confirmDisabled?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmModal({
  title,
  message,
  cancelText = "취소" /* 기본값 */,
  confirmText = "확인" /* 값을 안넘기면 기본값 노출 */,
  cancelDisabled = false,
  confirmDisabled = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // 이 정리를 안 하면 나중에 이벤트가 중복으로 쌓일 수 있음
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      {/* event.stopPropagation() : 부모 쪽 클릭 이벤트로 번지는 걸(이벤트 버블링) 막는 기능 */}
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <CommonButton
            variant="secondary"
            onClick={onCancel}
            disabled={cancelDisabled}
          >
            {cancelText}
          </CommonButton>

          <CommonButton
            variant="danger"
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmText}
          </CommonButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
