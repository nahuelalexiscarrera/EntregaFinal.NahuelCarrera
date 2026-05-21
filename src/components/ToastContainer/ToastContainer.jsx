import "./ToastContainer.css";

const ToastContainer = ({ toasts }) => {
  if (!toasts.length) return null;

  return (
    <div className="toast-container" id="toast-container" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-item toast-item--${t.type}`}
        >
          <span className="toast-dot" aria-hidden="true" />
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
