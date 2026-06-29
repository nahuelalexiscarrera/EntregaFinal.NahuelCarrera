import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const decrement = () => setCount((c) => Math.max(1, c - 1));
  const increment = () => setCount((c) => Math.min(stock, c + 1));

  if (stock === 0) {
    return <p className="item-count-empty">Producto sin stock disponible.</p>;
  }

  return (
    <div className="item-count">
      <div className="item-count-selector">
        <button
          className="item-count-step"
          onClick={decrement}
          disabled={count <= 1}
          aria-label="Restar una unidad"
        >
          &minus;
        </button>
        <span className="item-count-value" aria-live="polite">{count}</span>
        <button
          className="item-count-step"
          onClick={increment}
          disabled={count >= stock}
          aria-label="Sumar una unidad"
        >
          +
        </button>
      </div>
      <button
        className="item-count-add"
        id="btn-agregar-detalle"
        onClick={() => onAdd(count)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
