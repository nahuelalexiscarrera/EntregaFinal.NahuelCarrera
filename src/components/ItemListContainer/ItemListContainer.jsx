import ItemCard from "../ItemCard/ItemCard";
import "./ItemListContainer.css";

const CATEGORIES = ["Todos", "Monitores", "Perifericos", "Sillas Gamer", "Audio y Video"];

const ItemListContainer = ({ greeting, products, filtered, loading, activeCategory, searchQuery, onFilter, onSearch, onAdd }) => {
  return (
    <section className="item-list-section" id="catalogo" aria-label="Catalogo de productos">
      {/* Hero */}
      <div className="ilc-hero" id="inicio">
        <div className="ilc-hero-badge">Tu tienda de tecnologia</div>
        <h1 className="ilc-hero-title">{greeting}</h1>
        <p className="ilc-hero-sub">
          Los mejores productos tech con garantia y envio a todo el pais.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="ilc-toolbar" id="categorias">
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
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        <div className="ilc-filters" role="group" aria-label="Filtros por categoria">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`ilc-filter-btn category-btn${activeCategory === cat ? " ilc-filter-btn--active" : ""}`}
              data-categoria={cat}
              onClick={() => onFilter(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="ilc-loading" aria-live="polite">
          <div className="ilc-spinner" aria-hidden="true" />
          <p>Cargando productos...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="ilc-no-results" aria-live="polite">
          <p>No se encontraron productos.</p>
          <button className="ilc-reset-btn" onClick={() => onFilter("Todos")}>
            Ver todos
          </button>
        </div>
      ) : (
        <div className="ilc-grid" id="grid-productos" role="list">
          {filtered.map((product) => (
            <div key={product.id} role="listitem">
              <ItemCard product={product} onAdd={onAdd} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ItemListContainer;
