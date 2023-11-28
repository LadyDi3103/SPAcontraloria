
const monitorLoginLink = document.getElementById('login');
const showModal = document.getElementById('container__login');
const hideModal = document.getElementById('button-login');
const homeAdminSection = document.getElementById('container__monitor');

monitorLoginLink.addEventListener('click', () => {
    showModal.style.display = 'block';
});

hideModal.addEventListener('click', () => {
    showModal.style.display = 'none';
});

// Función para manejar el inicio de sesión
function login() {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    if (email === 'beatriz@monitor.pe' && password === '123456') {
        // Autenticación exitosa
        alert('Inicio de sesión exitoso');
        showModal.style.display = 'none'; // Oculta el modal

        // Muestra la sección home-admin
        homeAdminSection.style.display = 'block';
    } else {
        // Credenciales incorrectas
        alert('Credenciales incorrectas. Intenta de nuevo.');
    }
}