import { useState } from "react";
import "./AuthPage.css";

const AuthPage = ({ onLogin, onRegister }) => {
  const [view, setView] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", pass: "" });
  const [regData, setRegData] = useState({ nombre: "", email: "", pass: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = onLogin(loginData);
    if (!result.ok) setError(result.message);
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!regData.nombre || !regData.email || !regData.pass) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    onRegister(regData);
    setLoading(false);
  };

  const toggleView = (e) => {
    e.preventDefault();
    setError("");
    setView((v) => (v === "login" ? "register" : "login"));
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" aria-hidden="true" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo" aria-label="TechStore">
          <svg width="44" height="44" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="36" height="36" rx="8" fill="url(#authLogoGrad)" />
            <path d="M8 10h20M18 10v16" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="26" cy="22" r="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" />
            <circle cx="10" cy="22" r="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" />
            <path d="M14 22h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="authLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2a9df4" />
                <stop offset="1" stopColor="#4db8ff" />
              </linearGradient>
            </defs>
          </svg>
          <span className="auth-logo-text">
            Tech<span className="auth-logo-accent">Store</span>
          </span>
        </div>

        <h2 className="auth-title">
          {view === "login" ? "Bienvenido de vuelta" : "Crear cuenta"}
        </h2>
        <p className="auth-subtitle">
          {view === "login"
            ? "Ingresa tus datos para acceder a la tienda."
            : "Registrate para comenzar a comprar."}
        </p>

        {/* Login form */}
        {view === "login" && (
          <form className="auth-form" onSubmit={handleLogin} id="form-login" noValidate>
            <div className="field-group">
              <label htmlFor="log-email" className="field-label">Correo electronico</label>
              <input
                id="log-email"
                type="email"
                className="field-input"
                placeholder="tu@email.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>
            <div className="field-group">
              <label htmlFor="log-pass" className="field-label">Contrasena</label>
              <input
                id="log-pass"
                type="password"
                className="field-input"
                placeholder="Tu contrasena"
                value={loginData.pass}
                onChange={(e) => setLoginData({ ...loginData, pass: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button
              type="submit"
              className={`auth-btn ${loading ? "auth-btn--loading" : ""}`}
              id="btn-login"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
            <p className="auth-switch">
              No tienes cuenta?{" "}
              <a href="#" className="auth-switch-link" onClick={toggleView} id="link-to-register">
                Registrate
              </a>
            </p>
          </form>
        )}

        {/* Register form */}
        {view === "register" && (
          <form className="auth-form" onSubmit={handleRegister} id="form-registro" noValidate>
            <div className="field-group">
              <label htmlFor="reg-nombre" className="field-label">Nombre completo</label>
              <input
                id="reg-nombre"
                type="text"
                className="field-input"
                placeholder="Nahuel Carrera"
                value={regData.nombre}
                onChange={(e) => setRegData({ ...regData, nombre: e.target.value })}
                required
                autoComplete="name"
              />
            </div>
            <div className="field-group">
              <label htmlFor="reg-email" className="field-label">Correo electronico</label>
              <input
                id="reg-email"
                type="email"
                className="field-input"
                placeholder="tu@email.com"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>
            <div className="field-group">
              <label htmlFor="reg-pass" className="field-label">Contrasena</label>
              <input
                id="reg-pass"
                type="password"
                className="field-input"
                placeholder="Minimo 6 caracteres"
                value={regData.pass}
                onChange={(e) => setRegData({ ...regData, pass: e.target.value })}
                required
                autoComplete="new-password"
              />
            </div>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button
              type="submit"
              className={`auth-btn ${loading ? "auth-btn--loading" : ""}`}
              id="btn-registro"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
            <p className="auth-switch">
              Ya tienes cuenta?{" "}
              <a href="#" className="auth-switch-link" onClick={toggleView} id="link-to-login">
                Inicia sesion
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
