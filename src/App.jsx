import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <main>
        <ItemListContainer greeting="Tu próxima tech te está esperando 🚀" />
      </main>
      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} <strong>TechStore</strong> — Desarrollado por{" "}
          <strong>Nahuel Carrera</strong>
        </p>
      </footer>
    </div>
  );
};

export default App;
