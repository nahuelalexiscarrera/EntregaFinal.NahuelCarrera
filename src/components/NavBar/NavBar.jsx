import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo" aria-label="TechStore inicio">
          <div className="logo-icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="url(#logoGradient)" />
              <path d="M8 10h20M18 10v16" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="26" cy="22" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2" />
              <circle cx="10" cy="22" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2" />
              <path d="M14 22h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2a9df4" />
                  <stop offset="1" stopColor="#4db8ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">
            Tech<span className="logo-accent">Store</span>
          </span>
        </a>

        {/* Nav Links */}
        <ul className="navbar-links" role="list">
          <li>
            <a href="#inicio" className="nav-link">
              Inicio
            </a>
          </li>
          <li>
            <a href="#catalogo" className="nav-link">
              Catálogo
            </a>
          </li>
          <li>
            <a href="#categorias" className="nav-link">
              Categorías
            </a>
          </li>
          <li>
            <a href="#contacto" className="nav-link">
              Contacto
            </a>
          </li>
        </ul>

        {/* Cart Widget */}
        <CartWidget />
      </nav>
    </header>
  );
};

export default NavBar;
