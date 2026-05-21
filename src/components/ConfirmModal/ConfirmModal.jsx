import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, title, text, confirmLabel = "Confirmar", cancelLabel = "Cancelar", onConfirm, onCancel, variant = "danger" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box">
        <h2 className="modal-title" id="modal-title">{title}</h2>
        {text && <p className="modal-text">{text}</p>}
        <div className="modal-actions">
          <button className="modal-btn modal-btn--cancel" onClick={onCancel} id="btn-modal-cancel">
            {cancelLabel}
          </button>
          <button
            className={`modal-btn modal-btn--confirm modal-btn--${variant}`}
            onClick={onConfirm}
            id="btn-modal-confirm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
