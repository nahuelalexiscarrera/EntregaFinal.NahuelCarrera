import { useState, useCallback } from "react";

const CART_KEY = "carritoApp";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function syncStorage(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function useCart() {
  const [cart, setCart] = useState(loadCart);

  const addItem = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const additions = Array.from({ length: quantity }, () => product);
      const next = [...prev, ...additions];
      syncStorage(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((index) => {
    setCart((prev) => {
      const next = prev.filter((_, i) => i !== index);
      syncStorage(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    syncStorage([]);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  return { cart, addItem, removeItem, clearCart, total };
}
