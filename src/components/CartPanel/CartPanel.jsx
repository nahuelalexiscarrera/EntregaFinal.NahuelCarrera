import "./CartPanel.css";

const CartPanel = ({ isOpen, cart, total, onClose, onRemove, onClear, onCheckout }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? " cart-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`cart-panel${isOpen ? " cart-panel--open" : ""}`}
        id="panel-carrito"
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-header-title">Mi Compra</h2>
          <button
            className="cart-close-btn"
            onClick={onClose}
            id="btn-cerrar-carrito"
            aria-label="Cerrar carrito"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p>Tu carrito esta vacio.</p>
              <span>Agrega productos para comenzar</span>
            </div>
          ) : (
            <ul className="cart-list" id="lista-carrito">
              {cart.map((item, index) => (
                <li className="cart-item" key={index}>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.nombre}</span>
                    <span className="cart-item-price">${item.precio.toFixed(2)}</span>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(index)}
                    data-indice={index}
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-amount" id="total-carrito">${total.toFixed(2)}</span>
          </div>
          <button
            className="cart-btn-checkout"
            id="btn-procesar-compra"
            onClick={onCheckout}
            disabled={cart.length === 0}
          >
            Finalizar Compra
          </button>
          <button
            className="cart-btn-clear"
            id="btn-vaciar-carrito"
            onClick={onClear}
            disabled={cart.length === 0}
          >
            Vaciar Carrito
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartPanel;
