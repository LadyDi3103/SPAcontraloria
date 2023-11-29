let user 

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    // Obtener usuario al cargar la página
    obtenerUsuario();

    // Función para manejar el inicio de sesión
    function handleLogin() {
        const email = emailInput.value;
        const password = passwordInput.value;
console.log(email, "EMAIL");
console.log(password, "Password");
        // Validar que ambos campos estén llenos
        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, ingresa tu email y contraseña.');
            return;
        }

        // Validar credenciales después de obtener el usuario
        if (email === user.user1 && password === user.psw) {
            // Redirigir a la página del monitor
            window.location.href = 'indexMonitor.html';
        } else {
            // Credenciales incorrectas
            alert('Credenciales incorrectas. Intenta de nuevo.');
            // Limpiar campo de contraseña después de un intento fallido
            passwordInput.value = '';
        }
    }

    // Evento de clic en el botón de inicio de sesión
    const loginButton = document.getElementById('button-login');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    // Lógica para obtener el usuario
    function obtenerUsuario() {
        fetch('https://books-tsfn.onrender.com/user/1')
            .then(response => response.json())
            .then(data => {
                user = {
                    user1: data.us,
                    psw: data.pw
                };
                console.log(user);
            })
            .catch(error => console.error('Error al obtener el usuario:', error));
    }
});