import { useState } from "react";
import "./CartWidget.css";

const CartWidget = () => {
  const [quantity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      className={`cart-widget-btn ${isAnimating ? "cart-widget-btn--bounce" : ""}`}
      onClick={handleClick}
      aria-label={`Carrito de compras, ${quantity} artículos`}
      id="cart-widget"
    >
      <span className="cart-icon" aria-hidden="true">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </span>

      {quantity > 0 && (
        <span className="cart-badge" aria-live="polite">
          {quantity > 99 ? "99+" : quantity}
        </span>
      )}
    </button>
  );
};

export default CartWidget;
