import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ product }) => {
  return (
    <article className="item-card" id={`product-${product.id}`}>
      <Link to={`/item/${product.id}`} className="item-card-image-wrapper" aria-label={`Ver ${product.nombre}`}>
        <img
          src={product.img}
          alt={product.nombre}
          className="item-card-image"
          loading="lazy"
        />
      </Link>
      <div className="item-card-body">
        <span className="item-card-category">{product.categoria}</span>
        <h3 className="item-card-name">
          <Link to={`/item/${product.id}`} className="item-card-name-link">
            {product.nombre}
          </Link>
        </h3>
        <p className="item-card-price">${product.precio.toFixed(2)}</p>
        <Link
          to={`/item/${product.id}`}
          className="item-card-btn"
          id={`btn-detalle-${product.id}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default ItemCard;
