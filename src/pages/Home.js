import { vaca } from '../images.js';

// sin llaves es  dame lo que exportes x default y lo llamo vaca
const Home = (navigateTo) => {
  const viewHome = `
  <div id="carouselExample" class="container-md carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="http://localhost:4200/assets/img/reporta.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="http://localhost:4200/assets/img/previene.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="http://localhost:4200/assets/img/informate.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="http://localhost:4200/assets/img/combate.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `;

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  mainContainer.innerHTML = viewHome;
  // // botones Iniciar sesión y Registrarse
  // const btnLogin = mainContainer.querySelector('#btn-login');
  // btnLogin.addEventListener('click', () => {
  //   navigateTo('/login'); // se le pasa el argumento, redirige a la vista login
  // });
  // const btnRegister = mainContainer.querySelector('#btn-register');
  // btnRegister.addEventListener('click', () => {
  //   navigateTo('/register');
  // });
  return mainContainer;
};
export default Home;
