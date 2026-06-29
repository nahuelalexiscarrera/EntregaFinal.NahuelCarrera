import products from "../data/products.js";
import { getCategoryById } from "../data/categories.js";

const DELAY = 600;

// Simula una llamada asincrona que devuelve el listado de productos.
export const getProducts = (categoryId) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (!categoryId) {
        resolve(products);
        return;
      }
      const category = getCategoryById(categoryId);
      resolve(category ? products.filter((p) => p.categoria === category.value) : []);
    }, DELAY);
  });

// Simula una llamada asincrona que devuelve un unico producto por su id.
export const getProductById = (itemId) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => String(p.id) === String(itemId));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, DELAY);
  });
