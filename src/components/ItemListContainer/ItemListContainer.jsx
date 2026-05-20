import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  const categories = [
    { id: "monitores", label: "Monitores", icon: "🖥️" },
    { id: "perifericos", label: "Periféricos", icon: "⌨️" },
    { id: "audio", label: "Audio y Video", icon: "🎧" },
    { id: "sillas", label: "Sillas Gamer", icon: "🪑" },
  ];

  return (
    <section className="item-list-container" id="catalogo" aria-label="Catálogo de productos">
      {/* Hero greeting */}
      <div className="hero-greeting">
        <div className="hero-greeting__badge">Bienvenido a TechStore</div>
        <h1 className="hero-greeting__title">{greeting}</h1>
        <p className="hero-greeting__subtitle">
          Descubrí los mejores productos tecnológicos con garantía y envío a todo el país.
        </p>
        <a href="#catalogo" className="hero-greeting__cta" id="cta-catalogo">
          Ver Catálogo
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Category filter strip */}
      <div className="category-strip" id="categorias" role="navigation" aria-label="Categorías">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="category-chip"
            id={`cat-${cat.id}`}
            aria-label={`Filtrar por ${cat.label}`}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Placeholder product grid */}
      <div className="products-coming-soon">
        <div className="coming-soon-icon" aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
        <p className="coming-soon-text">Los productos se cargarán aquí próximamente</p>
        <span className="coming-soon-sub">Catálogo en construcción</span>
      </div>
    </section>
  );
};

export default ItemListContainer;
