// import { buttonLoginG } from '../lib/LoginGoogle';
// import { buttonLogin } from '../lib/LoginEmail';
// // import logo from '../img/vaca1_480.png';
// import { vaca, google } from '../images.js'; // No corre

// // import vaca from '../images.js';
// const Login = (navigateTo) => { // parámetro
//   const viewLogin = `
//     <h1 id="tittleLogo-2">Frikis del Espacio</h1>
//     <img id="logo-2" src="${vaca}" alt="Imagen del logo"/>  
//       <div class="login-view">
//         <div id="container-logo">
//           <img src="${vaca}" alt="Imagen del Logo" id="logo" />
//           <h1 class="tittle-login" id="title">Frikis Del Espacio</h1>
//         </div>
//         <div class="container-login">
//           <button id="button-google" class="btn">
//             <img src="${google}" alt="Imagen de Google" id="logo-google" />
//             Continúa con Google
//           </button>
//           <div id="bars">
//             <div id="bar-left"></div>
//             <span id="bar-text">O</span>
//             <div id="bar-right"></div>
//           </div>
//           <form action="" id="form-login">
//             <label for="mail">EMAIL</label>
//             <input class="btn" type="email" id="mail" name="user_mail" title="El email es incorrecto" placeholder="ejemplo@ejemplo.com" required/>
//             <p id= "errorEmail" class=input-error>*Ingresa un email válido.</p>
//             <label for="password">CONTRASEÑA</label>
//             <div class="icon-login">
//               <span class="icon-eye" id="icon-password">
//                 <i class="fa-regular fa-eye-slash"></i>
//               </span>
//               <input class="btn" type="password" id="password" name="user_password" placeholder="**********" required/>
//             </div>
//             <p id= "errorPassword" class=input-error>*Contraseña [5-10] caracteres. </p>
//             <button id="button-login" type="submit">Iniciar Sesión</button>
//             <div id="links">
//               <p id="create-account">¿No tienes una cuenta? <a href="/register">Crea una</a></span></p>
//             </div>
//           </form>
//         </div>
//       </div>
//       `;

//   const mainLogin = document.createElement('div');
//   mainLogin.classList.add('main-login');
//   mainLogin.innerHTML = viewLogin;
//   const formLogin = mainLogin.querySelector('#form-login');
//   const mail = mainLogin.querySelector('#mail');
//   const password = mainLogin.querySelector('#password');
//   const buttonLog = mainLogin.querySelector('#button-login');
//   const btnGoogle = mainLogin.querySelector('#button-google');
//   const errorEmail = mainLogin.querySelector('#errorEmail');
//   const errorPassword = mainLogin.querySelector('#errorPassword');

//   // Enmascarar y desenmascarar el password haciendo click al ícono
//   const iconEye = mainLogin.querySelector('.icon-eye');
//   iconEye.addEventListener('click', () => {
//     const icon = iconEye.querySelector('i');

//     if (iconEye.nextElementSibling.type === 'password') {
//       iconEye.nextElementSibling.type = 'text';
//       icon.classList.remove('fa-eye-slash');
//       icon.classList.add('fa-eye');
//     } else {
//       iconEye.nextElementSibling.type = 'password';
//       icon.classList.remove('fa-eye');
//       icon.classList.add('fa-eye-slash');
//     }
//   });
//   // Se transforma los mensajes de error de Firebase y se muestra en pantalla
//   buttonLog.addEventListener('click', (event) => {
//     event.preventDefault(); // evita de que se recarge la función de submit en formulario.
//     const passwordValue = password.value;
//     const emailValue = mail.value;
//     if (emailValue === '' && passwordValue === '') { // Validaciones
//       errorEmail.style.visibility = 'visible';
//       errorEmail.textContent = 'Es un campo obligatorio';
//       errorPassword.style.visibility = 'visible';
//       errorPassword.textContent = 'Es un campo obligatorio';
//       setTimeout(() => { // Para que los mensajes de error se muestren por 5 segundos
//         errorEmail.style.visibility = 'hidden';
//         errorPassword.style.visibility = 'hidden';
//       }, 5000);
//     }
//     // función y 2arg - Valido que el usuario esté en la base de datos de firebase al darle click
//     buttonLogin(passwordValue, emailValue)
//       .then((user) => {
//         console.log(user.nameUser);
//         if (user.nameUser) {
//           navigateTo('/dashboard');
//         }
//       })
//       .catch((error) => {
//         if (error === 'auth/invalid-email' && emailValue !== '') {
//           errorEmail.style.visibility = 'visible';
//           errorEmail.textContent = 'Email incorrecto';
//           setTimeout(() => {
//             errorEmail.style.visibility = 'hidden';
//             errorPassword.style.visibility = 'hidden';
//           }, 5000);
//         } else if (error === 'auth/wrong-password') {
//           errorPassword.style.visibility = 'visible';
//           errorPassword.textContent = 'Contraseña Incorrecta';
//           setTimeout(() => {
//             errorPassword.style.visibility = 'hidden';
//             errorEmail.style.visibility = 'hidden';
//           }, 5000);
//         } else if (error === 'auth/missing-password') {
//           errorPassword.style.visibility = 'visible';
//           errorPassword.textContent = 'Ingresa una contraseña';
//           setTimeout(() => {
//             errorPassword.style.visibility = 'hidden';
//             errorEmail.style.visibility = 'hidden';
//           }, 5000);
//         } else if (error === 'auth/user-not-found') {
//           errorPassword.style.visibility = 'visible';
//           errorPassword.textContent = 'Usuario no registrado';
//           errorEmail.style.visibility = 'visible';
//           errorEmail.textContent = 'Usuario no registrado';
//           setTimeout(() => {
//             errorEmail.style.visibility = 'hidden';
//             errorPassword.style.visibility = 'hidden';
//           }, 5000);
//         } else if (error === 'auth/invalid-email' && passwordValue !== '') {
//           errorEmail.style.visibility = 'visible';
//           errorEmail.textContent = 'Ingresa una email';
//           setTimeout(() => {
//             errorEmail.style.visibility = 'hidden';
//             errorPassword.style.visibility = 'hidden';
//           }, 5000);
//         }
//       });
//     formLogin.reset(); // Limpio el formulario
//   });

//   buttonLoginG(btnGoogle, navigateTo);
//   return mainLogin; // es el div contenedor de la estructura html
// };
// export default Login;
