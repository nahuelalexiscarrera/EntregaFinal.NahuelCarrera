import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="notfound">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">Pagina no encontrada</h1>
      <p className="notfound-text">
        La pagina que buscas no existe o el enlace esta mal formateado.
      </p>
      <Link to="/" className="notfound-btn">
        Volver al inicio
      </Link>
    </section>
  );
};

export default NotFound;
