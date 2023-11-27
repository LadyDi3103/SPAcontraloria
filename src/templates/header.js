const Header = () => {
    const viewHeader = `
 
      <div id="logo">
          <img src="./assets/img/descarga.jpeg" alt="Logo" class='logo_header'> 
      </div>
    
      <div id="search">
          <input type="text" placeholder="Buscar...">
          <button><img  id="lupa" src="./assets/img/search.svg" alt="Lupa"></button>
      </div>
    
      <span class="material-symbols-outlined">
    menu
    </span>
    
      <nav class="offcanvas-body">
        <ul class="navbar_list navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item"><a href="#/home" class="nav-link">Prevención</a></li>
          <li class="nav-item"><a href="#/dashboard" class="nav-link">Prevención</a></li>
          <li class="nav-item"><a href="#/geo-colaborador" class="nav-link">Geo-Colaborador</a></li>
          <li class="nav-item"><a href="#/home-admin" class="nav-link">Sesión Monitor</a></li>
        </ul>
      </nav>

      `;
    return viewHeader;
};
export default Header;