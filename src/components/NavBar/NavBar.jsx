import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { categories } from "../../data/categories";
import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";

const NavBar = ({ session, cartCount, onToggleCart, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="TechStore inicio" onClick={closeMenu}>
          <div className="logo-icon" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#4f6e93" />
              <path d="M8 10h20M18 10v16" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="26" cy="22" r="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" />
              <circle cx="10" cy="22" r="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" />
              <path d="M14 22h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="logo-text">
            Tech<span className="logo-accent">Store</span>
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="navbar-links" role="list">
          <li>
            <NavLink to="/" end className="nav-link">
              Inicio
            </NavLink>
          </li>
          <li
            className="navbar-dropdown"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              className="nav-link navbar-dropdown-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              Categorias
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <ul className={`navbar-dropdown-menu${menuOpen ? " navbar-dropdown-menu--open" : ""}`} role="list">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <NavLink
                    to={`/category/${cat.id}`}
                    className="navbar-dropdown-link"
                    onClick={closeMenu}
                  >
                    {cat.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Right side: session greeting + cart + logout */}
        <div className="navbar-actions">
          {session && (
            <span className="navbar-greeting" aria-live="polite">
              Hola, <strong>{session.nombre}</strong>
            </span>
          )}
          <CartWidget count={cartCount} onToggle={onToggleCart} />
          {session && (
            <button
              className="navbar-logout"
              onClick={onLogout}
              id="btn-cerrar-sesion"
              aria-label="Cerrar sesion"
            >
              Salir
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
