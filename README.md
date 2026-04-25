# TechStore - Simulador E-commerce 🛒

**TechStore** es un proyecto final interactivo desarrollado como simulador de comercio electrónico en JavaScript puro (Vanilla JS). La aplicación demuestra el uso práctico de manipulaciones complejas del DOM, almacenamiento local (Storage), asincronía y la integración de librerías de terceros en un entorno estructurado y modularizado.

## Características Principales

* **Autenticación Simulada:** Sistema interactivo de inicio de sesión y registro de usuarios que emplea `localStorage` para el mantenimiento y persistencia de la sesión activa.
* **Catálogo de Productos Dinámico:** Carga y renderizado de la lista de productos mediante peticiones asíncronas (`fetch()`) solicitadas a una base de datos local simulada (`data.json`).
* **Carrito de Compras:**
  * Agregar y remover productos individuales.
  * Botón para vaciar todo el carrito con validación.
  * Cálculo dinámico del total de la compra.
  * Persistencia constante de los items seleccionados utilizando `localStorage`.
* **Filtros Avanzados:**
  * Barra de búsqueda para filtrar los productos por nombre en tiempo real.
  * Botones clasificadores para filtrar rápidamente por categoría (Monitores, Periféricos, Sillas Gamer, Audio y Video).
* **Diseño Responsivo:** Interfaz gráfica estéticamente limpia y adaptada a dispositivos móviles (Responsive Web Design), implementada usando Bootstrap 5 y estilos CSS nativos.


## Tecnologías y Librerías Utilizadas

* **HTML5:** Marcado semántico.
* **CSS3:** Variables CSS (Custom Properties), Flexbox, Media Queries.
* **JavaScript (ES6+):** Programación orientada a eventos, promesas, métodos de arrays superiores (`map`, `filter`, `find`, `forEach`), y desestructuración.
* **Bootstrap 5.3:** Para utilidades rápidas, layouts de grilla y componentes base.
* **SweetAlert2:** Sustitución de alertas genéricas del navegador.
* **Toastify JS:** Avisos de notificaciones rápidas al manipular el carrito.

## Estructura del Proyecto

```text
EntregaFinal.NahuelCarrera/
├── assents/                # Directorio de recursos multimedia (imágenes, fondos)
├── css/
│   └── styles.css          # Archivo unificado de hojas de estilo
├── js/
│   ├── auth.js             # Módulo encargado de gestionar el registro e inicio de sesión
│   ├── main.js             # Punto de entrada (entry point) y direccionamiento simple
│   └── store.js            # Módulo principal para el renderizado, filtrado y carrito
├── data.json               # Archivo JSON con los datos de productos
├── index.html              # Vista de autenticación
├── store.html              # Vista del catálogo y compras
└── README.md               # Archivo de documentación
```


