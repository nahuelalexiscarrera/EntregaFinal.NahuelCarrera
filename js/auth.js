export function inicializarAuth() {
    const btnLogin = document.getElementById('btn-login');
    const btnRegistro = document.getElementById('btn-registro');
    const linksAlternar = document.querySelectorAll('.btn-alternar');
    
    // Precargar email si existe un usuario registrado en localStorage
    const userDB = JSON.parse(localStorage.getItem('userDB'));
    if (userDB && userDB.email) {
        if (document.getElementById('log-email')) {
            document.getElementById('log-email').value = userDB.email;
        }
        if (document.getElementById('reg-email')) {
            document.getElementById('reg-email').value = userDB.email;
        }
    }

    if (btnLogin) btnLogin.addEventListener('click', iniciarSesion);
    if (btnRegistro) btnRegistro.addEventListener('click', registrarUsuario);
    
    linksAlternar.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alternarVista();
        });
    });
}

function alternarVista() {
    document.getElementById('vista-login').classList.toggle('d-none');
    document.getElementById('vista-registro').classList.toggle('d-none');
    document.getElementById('mensaje-auth').innerText = '';
}

function registrarUsuario() {
    const nombre = document.getElementById('reg-nombre').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();

    if (!nombre || !email || !pass) {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Por favor, completa todos los campos.',
            confirmButtonColor: 'var(--celeste-oscuro)'
        });
        return;
    }

    const usuario = { nombre, email, pass };
    localStorage.setItem('userDB', JSON.stringify(usuario)); // guardo en localstorage
    
    Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Redirigiendo a la tienda...',
        showConfirmButton: false,
        timer: 1500
    });
    
    setTimeout(() => {
        localStorage.setItem('sesionActiva', JSON.stringify(usuario));
        window.location.href = 'store.html';
    }, 1500);
}

function iniciarSesion() {
    const email = document.getElementById('log-email').value.trim();
    const pass = document.getElementById('log-pass').value.trim();
    const userDB = JSON.parse(localStorage.getItem('userDB'));

    if (userDB && userDB.email === email && userDB.pass === pass) {
        localStorage.setItem('sesionActiva', JSON.stringify(userDB));
        window.location.href = 'store.html';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Datos incorrectos o usuario no registrado.',
            confirmButtonColor: 'var(--celeste-oscuro)'
        });
    }
}