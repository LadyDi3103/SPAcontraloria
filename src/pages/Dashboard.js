const Dashboard = (navigateTo) => {
  const viewDashboard = `
    <div id="headerDashboard">
      <h1 class="tittle-dashboard">Frikis Del Espacio</h1>
      <article id= "LogOut">
        <img id="logoSignOut" src= "${vaca2}" alt="Imagen  "/>
        <button id ="button-signOut">Cerrar Sesión</button>
      </article>
    </div>
    <div id="barDashboard"></div>
    
    <div id="profile">
    <div id="circleAlien">
      <div id= "circleAlien2">
        <img id="imgAlien" src= "${imgAlien}" alt="Imagen de Alien "/>
      </div>
    </div>
    <span id= "userName"> Gabriela79 </span>
    </div>
    <div id = "border-textArea">
      <textarea id="post-text" name="textarea" placeholder="Escribir publicación..."></textarea>
    </div>
    <div id = "msg-post">
      <span id="msg-post-text">Se ha compartido tu publicación</span>
    </div>
    <div id="container-btn">
      <button id="button-post" class="btn-post">Publicar</button>
    </div>
    <div id='containerPosts'>
      <div class="box-gradient">
        <div id="postPublic">
          <span class="loading">Cargando...</span>
          <img id="ovniL" src= "${logoAlien}" alt="Ovni girando"/>
        </div>
      </div>    
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <p>¿Estás seguro(a) de eliminar tu publicación?</p>
        <button id="yes">Sí</button>
        <button id="not">No</button>
      </div>
    </div>
    `;

  const mainDashboard = document.createElement('div');
  mainDashboard.classList.add('main-dashboard');
  mainDashboard.innerHTML = viewDashboard;
  const userName = mainDashboard.querySelector('#userName');
  const buttonOut = mainDashboard.querySelector('#button-signOut');
  const postText = mainDashboard.querySelector('#post-text');
  const msgPosT = mainDashboard.querySelector('#msg-post');
  const btnPost = mainDashboard.querySelector('#button-post');
  const containerPost = mainDashboard.querySelector('#containerPosts');
  // El modal para pedir confirmación para borrar un post propio.
  const myModal = mainDashboard.querySelector('#myModal');
  const not = mainDashboard.querySelector('#not');
  const yes = mainDashboard.querySelector('#yes');
  // not.addEventListener('click', () => {
  //   myModal.style.display = 'none';
  // });
  // Email recortado para que sea el nombre de usuario.
  let emailCutted;
  const cutted = (user) => {
    const emailName = user.email;
    const emailAt = emailName.search('@');
    emailCutted = emailName.slice(0, emailAt);
    userName.innerHTML = emailCutted;
    return emailCutted;
  };

  onAuthStateChanged(auth, cutted);

  // funcion para traer el usuario
  const userAuthor = (idAuthor) => {
    if (emailCutted === idAuthor) {
      return true;
    }
    return false;
  };

  let editStatus = false;
  let id = '';
  // savePost(); Es una función que recibe un
  // callback donde vamos a recibir los posts
  // para iterarlos
  gettingPosts((posts) => { // Recibe un array de posts
    const postTemplates = posts.map((post) => {
      const dataPost = post.data();
      console.log(dataPost);
      const taskContainerPost = `
        <div class="box-gradient">
          <div id="postPublic">
            <span id="name-post" class="name-user-post">${dataPost.idUser}</span>
              <p id="description-post">
              ${dataPost.post}
              </p>
            <button class="btn-edit icon-pencil" data-id="${post.id}" data-user ="${dataPost.idUser}">
              <i class="fa-solid fa-pencil"></i>
            </button>
            <button class="btn-delete icon-trash" data-id="${post.id}" data-user ="${dataPost.idUser}">
              <i class="fa-solid fa-trash-can" data-id= "${post.id}"></i>
            </button>
            <button class="btn-like icon-star" data-id="${post.id}">
              <span class="counterLikes" data-id="${post.id}">${dataPost.likes.length}</span>
              <i class="fa-solid fa-star animated" data-id="${post.id}"></i>
            </button>
          </div>
        </div> 
        `;

      return taskContainerPost;
    });

    containerPost.innerHTML = postTemplates.join(''); // porque devuelve un template

    // array de strings
    const btnsDelete = containerPost.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      // Corrigiendo el bug Observación Coach Sebastian
      btn.addEventListener('click', (event) => {
        const idPost2 = event.target.dataset.id;
        myModal.style.display = 'block';
        const deleting = () => {
          deletePost(idPost2);
          myModal.style.display = 'none';
        };
        yes.addEventListener('click', deleting, true);
        not.addEventListener('click', () => {
          myModal.style.display = 'none';
          yes.removeEventListener('click', deleting, true);
        });
      });
      // --------------------
      const btnDeleteUser = btn.dataset.user;
      if (userAuthor(btnDeleteUser)) {
        btn.style.display = 'block';
      }
    });
    const btnsEdit = containerPost.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async () => {
        postText.focus();
        const idPost = btn.dataset.id;
        const post = await getPost(idPost);
        const dataPost = post.data();
        postText.value = dataPost.post;
        editStatus = true;
        id = idPost;
        btnPost.innerHTML = 'Guardar';
      });
      const btnEditUser = btn.dataset.user;
      if (userAuthor(btnEditUser)) {
        btn.style.display = 'block';
      }
    });

    const btnsLikes = containerPost.querySelectorAll('.btn-like');
    btnsLikes.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        onAuthStateChanged(auth, async (user) => {
          const idPost3 = event.target.dataset.id;
          const post = await getPost(idPost3);
          const dataPost = post.data();
          const likes = dataPost.likes;
          if (likes.includes(user.email)) {
            await dislikePost(idPost3, user.email);
          } else {
            await likePost(idPost3, user.email);
          }
        });
      });
    });
  });
  btnPost.addEventListener('click', () => {
    if (!editStatus) {
      savePostFire(postText);
      msgPosT.style.display = 'block';
      setTimeout(() => {
        msgPosT.style.display = 'none';
      }, 2000);
    } else {
      editPost(id, { post: postText.value });
      editStatus = false;
      btnPost.innerHTML = 'Publicar';
      postText.value = '';
      msgPosT.style.display = 'block';
      msgPosT.innerHTML = 'Se ha editado tu publicación';
      setTimeout(() => {
        msgPosT.style.display = 'none';
      }, 2000);
    }
  });
  buttonSignOut(buttonOut, navigateTo);
  return mainDashboard;
};
export default Dashboard;
