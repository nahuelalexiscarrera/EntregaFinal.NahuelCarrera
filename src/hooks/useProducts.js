import { useState, useEffect, useCallback } from "react";
import productsData from "../data/products.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula fetch asincrono identico al original
    const timer = setTimeout(() => {
      setProducts(productsData);
      setFiltered(productsData);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filterByCategory = useCallback(
    (categoria) => {
      setActiveCategory(categoria);
      setSearchQuery("");
      if (categoria === "Todos") {
        setFiltered(products);
      } else {
        setFiltered(products.filter((p) => p.categoria === categoria));
      }
    },
    [products]
  );

  const filterBySearch = useCallback(
    (texto) => {
      setSearchQuery(texto);
      setActiveCategory("Todos");
      const lower = texto.toLowerCase();
      setFiltered(products.filter((p) => p.nombre.toLowerCase().includes(lower)));
    },
    [products]
  );

  return { products, filtered, loading, activeCategory, searchQuery, filterByCategory, filterBySearch };
}
