import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";

const ItemDetail = ({ product, onAdd }) => {
  const handleAdd = (quantity) => onAdd(product, quantity);

  return (
    <article className="item-detail" id={`detalle-${product.id}`}>
      <div className="item-detail-media">
        <img src={product.img} alt={product.nombre} className="item-detail-image" />
      </div>

      <div className="item-detail-info">
        <span className="item-detail-category">{product.categoria}</span>
        <h1 className="item-detail-name">{product.nombre}</h1>
        <p className="item-detail-price">${product.precio.toFixed(2)}</p>
        <p className="item-detail-desc">{product.descripcion}</p>
        <p className="item-detail-stock">
          Stock disponible: <strong>{product.stock}</strong>
        </p>

        <ItemCount stock={product.stock} onAdd={handleAdd} />

        <Link to="/" className="item-detail-back">
          Volver al catalogo
        </Link>
      </div>
    </article>
  );
};

export default ItemDetail;
