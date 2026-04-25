let productos = [];
let carrito = JSON.parse(localStorage.getItem('carritoApp')) || [];

export async function inicializarTienda() {
    document.getElementById('btn-toggle-carrito').addEventListener('click', toggleCarrito);
    document.getElementById('btn-cerrar-carrito').addEventListener('click', toggleCarrito);
    document.getElementById('btn-vaciar-carrito').addEventListener('click', vaciarCarrito);
    document.getElementById('btn-procesar-compra').addEventListener('click', procesarCompra);
    document.getElementById('btn-cerrar-sesion').addEventListener('click', cerrarSesion);

    // delegacion de eventos para los botones dinámicos
    document.getElementById('grid-productos').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });

    document.getElementById('lista-carrito').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const indice = parseInt(e.target.getAttribute('data-indice'));
            eliminarDelCarrito(indice);
        }
    });

    // Funcionalidad de botones de categorías
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria');
            filtrarCatalogo(categoria);

            // Estilos activos para botones
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline-secondary');
            });
            e.target.classList.remove('btn-outline-secondary');
            e.target.classList.add('btn-primary');
        });
    });

    // Funcionalidad del buscador de texto
    const buscador = document.getElementById('buscador');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase();
            const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
            renderizarCatalogo(filtrados);

            // Reiniciar botones al estado Todos
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline-secondary');
            });
            const btnTodos = document.querySelector('[data-categoria="Todos"]');
            if (btnTodos) {
                btnTodos.classList.remove('btn-outline-secondary');
                btnTodos.classList.add('btn-primary');
            }
        });
    }

    await cargarProductos();
    actualizarCarritoDOM();
}

async function cargarProductos() {
    try {
        const respuesta = await fetch('./data.json');
        if (!respuesta.ok) throw new Error('Error al cargar los productos');
        productos = await respuesta.json();
        renderizarCatalogo();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos. Por favor intenta más tarde.'
        });
    }
}

function renderizarCatalogo(productosAMostrar = productos) {
    const grid = document.getElementById('grid-productos');
    grid.innerHTML = '';

    productosAMostrar.forEach(prod => {
        grid.innerHTML += `
            <div class="col">
                <div class="tarjeta-producto h-100 d-flex flex-column text-center">
                    <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid p-3">
                    <div class="p-3 mt-auto bg-light border-top">
                        <h5 class="mb-1" style="color: var(--celeste-oscuro);">${prod.nombre}</h5>
                        <p class="fw-bold fs-5 mb-3">$${prod.precio.toFixed(2)}</p>
                        <button class="btn-principal w-100 btn-agregar" data-id="${prod.id}">Agregar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filtrarCatalogo(categoria) {
    // Limpiar el buscador cuando se usa un filtro de categoría
    const buscador = document.getElementById('buscador');
    if (buscador) buscador.value = '';

    if (categoria === 'Todos' || !categoria) {
        renderizarCatalogo(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        renderizarCatalogo(filtrados);
    }
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    sincronizarStorage();
    actualizarCarritoDOM();
    mostrarToast(`Agregaste ${producto.nombre} al carrito`, "success");
}

function actualizarCarritoDOM() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    let total = 0;

    carrito.forEach((prod, indice) => {
        total += prod.precio;
        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                <div>
                    <small class="d-block fw-bold">${prod.nombre}</small>
                    <small class="text-muted">$${prod.precio.toFixed(2)}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger btn-eliminar" data-indice="${indice}">X</button>
            </li>
        `;
    });

    document.getElementById('total-carrito').innerText = total.toFixed(2);
    document.getElementById('contador-carrito').innerText = carrito.length;
}

function eliminarDelCarrito(indice) {
    const prodEliminado = carrito[indice];
    carrito.splice(indice, 1);
    sincronizarStorage();
    actualizarCarritoDOM();
    mostrarToast(`Eliminaste ${prodEliminado.nombre}`, "error");
}

function vaciarCarrito() {
    if (carrito.length === 0) return;
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminarán todos los productos de tu carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            sincronizarStorage();
            actualizarCarritoDOM();
            Swal.fire('Vaciado', 'Tu carrito ahora está vacío.', 'success');
        }
    });
}

function procesarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Agrega productos a tu carrito antes de comprar.'
        });
        return;
    }

    Swal.fire({
        title: 'Finalizar compra',
        text: `El total es de $${document.getElementById('total-carrito').innerText}. ¿Deseas confirmar tu compra?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--celeste-oscuro)',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Confirmar pago',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            sincronizarStorage();
            actualizarCarritoDOM();
            toggleCarrito();
            Swal.fire({
                title: '¡Compra exitosa!',
                text: 'Tu pedido ha sido procesado. Gracias por elegirnos.',
                icon: 'success'
            });
        }
    });
}

function sincronizarStorage() { localStorage.setItem('carritoApp', JSON.stringify(carrito)); }
function toggleCarrito() { document.getElementById('panel-carrito').classList.toggle('abierto'); }
function cerrarSesion() { localStorage.removeItem('sesionActiva'); window.location.href = 'index.html'; }

function mostrarToast(mensaje, tipo = "success") {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom", 
        position: "right", 
        style: {
            background: tipo === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #ff5f6d, #ffc371)",
            borderRadius: "8px"
        }
    }).showToast();
}