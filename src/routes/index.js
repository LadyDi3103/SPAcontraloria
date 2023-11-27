// import Header from './components/Header.js';
// import Footer from './components/Footer.js';
// import Home from './components/Home.js';
// import Login from './components/Login.js';
// import Dashboard from './components/Dashboard.js';
// import GeoColaborador from './components/GeoColaborador.js';

// const routes = {
//   '/home': Home,
//   '/login': Login,
//   '/dashboard': Dashboard,
//   '/geo-colaborador': GeoColaborador,
// };

// const router = () => {
//   const content = document.getElementById('app');
//   const header = document.getElementById('header');
//   const footer = document.getElementById('footer');

//   const path = window.location.hash;

//   header.innerHTML = Header();
//   footer.innerHTML = Footer();

//   if (routes[path]) {
//     content.innerHTML = routes[path]();
//   } else {
//     content.innerHTML = Home();
//   }
// };

// window.addEventListener('hashchange', router);
// window.addEventListener('load', router);