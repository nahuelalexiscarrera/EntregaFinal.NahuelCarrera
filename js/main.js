import { inicializarAuth } from './auth.js';
import { inicializarTienda } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // verifico si estoy en index.html
    if (document.getElementById('vista-login')) {
        if (localStorage.getItem('sesionActiva')) {
            window.location.href = 'store.html'; 
        } else {
            inicializarAuth(); 
        }
    }

    // verifico si estoy en store.html
    if (document.getElementById('grid-productos')) {
        const sesion = JSON.parse(localStorage.getItem('sesionActiva'));
        if (!sesion) {
            window.location.href = 'index.html'; 
        } else {
            document.getElementById('saludo-usuario').innerText = `Hola, ${sesion.nombre}`;
            inicializarTienda(); 
        }
    }
});