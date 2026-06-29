import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getProducts } from "../../services/asyncMock";
import { categories, getCategoryById } from "../../data/categories";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setSearchQuery("");

    getProducts(categoryId)
      .then((res) => setProducts(res))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const activeCategory = getCategoryById(categoryId);
  const query = searchQuery.trim().toLowerCase();
  const visibleProducts = query
    ? products.filter((p) => p.nombre.toLowerCase().includes(query))
    : products;

  const linkClass = ({ isActive }) =>
    `ilc-filter-btn${isActive ? " ilc-filter-btn--active" : ""}`;

  return (
    <section className="item-list-section" aria-label="Catalogo de productos">
      <div className="ilc-hero">
        <div className="ilc-hero-badge">Tu tienda de tecnologia</div>
        <h1 className="ilc-hero-title">{greeting}</h1>
        <p className="ilc-hero-sub">
          {activeCategory
            ? `Estas viendo la categoria ${activeCategory.label}.`
            : "Los mejores productos tech con garantia y envio a todo el pais."}
        </p>
      </div>

      <div className="ilc-toolbar">
        <div className="ilc-search-wrapper">
          <svg className="ilc-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="buscador"
            type="search"
            className="ilc-search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        <div className="ilc-filters" role="group" aria-label="Filtros por categoria">
          <NavLink to="/" end className={linkClass}>
            Todos
          </NavLink>
          {categories.map((cat) => (
            <NavLink key={cat.id} to={`/category/${cat.id}`} className={linkClass}>
              {cat.label}
            </NavLink>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="ilc-loading" aria-live="polite">
          <div className="ilc-spinner" aria-hidden="true" />
          <p>Cargando productos...</p>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="ilc-no-results" aria-live="polite">
          <p>No se encontraron productos.</p>
          <NavLink to="/" className="ilc-reset-btn">
            Ver todos
          </NavLink>
        </div>
      ) : (
        <ItemList products={visibleProducts} />
      )}
    </section>
  );
};

export default ItemListContainer;
