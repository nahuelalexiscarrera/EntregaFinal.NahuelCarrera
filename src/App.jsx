import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { useProducts } from "./hooks/useProducts";
import { useToast } from "./hooks/useToast";
import AuthPage from "./components/AuthPage/AuthPage";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import CartPanel from "./components/CartPanel/CartPanel";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import "./App.css";

const App = () => {
  const { session, login, register, logout } = useAuth();
  const { cart, addItem, removeItem, clearCart, total } = useCart();
  const { filtered, loading, activeCategory, searchQuery, filterByCategory, filterBySearch } = useProducts();
  const { toasts, showToast } = useToast();

  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null);

  // --- Auth handlers ---
  const handleLogin = (data) => login(data);

  const handleRegister = (data) => {
    register(data);
    showToast("Cuenta creada. Bienvenido a TechStore.", "success");
  };

  const handleLogout = () => {
    setModal({
      title: "Cerrar sesion",
      text: "Estas seguro que queres salir?",
      confirmLabel: "Salir",
      cancelLabel: "Cancelar",
      variant: "danger",
      onConfirm: () => {
        logout();
        setModal(null);
        setCartOpen(false);
      },
    });
  };

  // --- Cart handlers ---
  const handleAddItem = (product) => {
    addItem(product);
    showToast(`${product.nombre} agregado al carrito.`, "success");
  };

  const handleRemoveItem = (index) => {
    const name = cart[index]?.nombre;
    removeItem(index);
    if (name) showToast(`${name} eliminado del carrito.`, "error");
  };

  const handleClearCart = () => {
    if (!cart.length) return;
    setModal({
      title: "Vaciar carrito",
      text: "Se eliminaran todos los productos. Esta accion no se puede deshacer.",
      confirmLabel: "Vaciar",
      cancelLabel: "Cancelar",
      variant: "danger",
      onConfirm: () => {
        clearCart();
        showToast("Carrito vaciado.", "error");
        setModal(null);
      },
    });
  };

  const handleCheckout = () => {
    if (!cart.length) return;
    setModal({
      title: "Confirmar compra",
      text: `El total es $${total.toFixed(2)}. Confirmas el pago?`,
      confirmLabel: "Confirmar pago",
      cancelLabel: "Cancelar",
      variant: "primary",
      onConfirm: () => {
        clearCart();
        setCartOpen(false);
        setModal(null);
        showToast("Compra realizada. Gracias por elegirnos.", "success");
      },
    });
  };

  // Not logged in — show auth
  if (!session) {
    return (
      <>
        <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  // Logged in — show store
  return (
    <div className="app">
      <NavBar
        session={session}
        cartCount={cart.length}
        onToggleCart={() => setCartOpen((o) => !o)}
        onLogout={handleLogout}
      />

      <main>
        <ItemListContainer
          greeting={`Hola ${session.nombre}, encontra tu proximo gadget`}
          filtered={filtered}
          loading={loading}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onFilter={filterByCategory}
          onSearch={filterBySearch}
          onAdd={handleAddItem}
        />
      </main>

      <footer className="app-footer">
        <p>
          &copy; {new Date().getFullYear()} <strong>TechStore</strong> &mdash; Desarrollado por{" "}
          <strong>Nahuel Carrera</strong>
        </p>
      </footer>

      <CartPanel
        isOpen={cartOpen}
        cart={cart}
        total={total}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveItem}
        onClear={handleClearCart}
        onCheckout={handleCheckout}
      />

      {modal && (
        <ConfirmModal
          isOpen={true}
          title={modal.title}
          text={modal.text}
          confirmLabel={modal.confirmLabel}
          cancelLabel={modal.cancelLabel}
          variant={modal.variant}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal(null)}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default App;
