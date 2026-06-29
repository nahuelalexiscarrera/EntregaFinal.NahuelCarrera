import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";

const ItemDetailContainer = ({ onAdd }) => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductById(itemId)
      .then((res) => setProduct(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [itemId]);

  return (
    <section className="item-detail-container">
      {loading ? (
        <div className="idc-loading" aria-live="polite">
          <div className="idc-spinner" aria-hidden="true" />
          <p>Cargando producto...</p>
        </div>
      ) : error || !product ? (
        <div className="idc-error" aria-live="polite">
          <h2>No encontramos ese producto</h2>
          <p>El producto que buscas no existe o ya no esta disponible.</p>
          <Link to="/" className="idc-error-btn">
            Volver al catalogo
          </Link>
        </div>
      ) : (
        <ItemDetail product={product} onAdd={onAdd} />
      )}
    </section>
  );
};

export default ItemDetailContainer;
