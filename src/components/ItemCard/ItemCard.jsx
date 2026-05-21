import "./ItemCard.css";

const ItemCard = ({ product, onAdd }) => {
  return (
    <article className="item-card" id={`product-${product.id}`}>
      <div className="item-card-image-wrapper">
        <img
          src={product.img}
          alt={product.nombre}
          className="item-card-image"
          loading="lazy"
        />
      </div>
      <div className="item-card-body">
        <span className="item-card-category">{product.categoria}</span>
        <h3 className="item-card-name">{product.nombre}</h3>
        <p className="item-card-price">${product.precio.toFixed(2)}</p>
        <button
          className="item-card-btn btn-agregar"
          data-id={product.id}
          onClick={() => onAdd(product)}
          id={`btn-agregar-${product.id}`}
          aria-label={`Agregar ${product.nombre} al carrito`}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
};

export default ItemCard;
