const buttonLogin = document.getElementById('button-login');
const homeAdminSection = document.getElementById('container__monitor');

// Función para manejar el inicio de sesión
buttonLogin.addEventListener('click', handleLogin);
function handleLogin() {

    const emailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value;
    const password = passwordInput.value;

    // Validar que ambos campos estén llenos
    if (email.trim() === '' || password.trim() === '') {
        alert('Por favor, ingresa tu email y contraseña.');
        return;
    }

    // Validar credenciales
 else if (email === 'beatriz@monitor.pe' && password === '123456') {
        // Redirigir a la página del monitor
        window.location.href = 'indexMonitor.html';
    } else {
        // Credenciales incorrectas
        alert('Credenciales incorrectas. Intenta de nuevo.');
        // Limpiar campos de contraseña después de un intento fallido
        passwordInput.value = '';
    }
}