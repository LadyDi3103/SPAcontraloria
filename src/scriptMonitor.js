document.addEventListener('DOMContentLoaded', () => {
    const elemsModal = document.querySelectorAll('.modal');
    let instancesModal = M.Modal.init(elemsModal);
  
  });
  
  
  
  
  
  
  let likeCount = 0;
  let dislikeCount = 0;
  let ObraId = 0;

  const obrasApi = 'https://books-tsfn.onrender.com/Obras/'

  
  let obrasReacciones2 ={}

  function noRedSocial(){
    document.getElementById('likeCount').innerText = "";
    document.getElementById('dislikeCount').innerText = "";
  }
  
  async function fetchData(url, id) {
    try {
      const response = await fetch(url + id);
      const data = await response.json();
  
      likeCount = data.like_total;
      dislikeCount = data.dislike_total;
  
      document.getElementById('likeCount').innerText = likeCount;
      document.getElementById('dislikeCount').innerText = dislikeCount;
  
      if(!obrasReacciones2.hasOwnProperty(ObraId)){
        obrasReacciones2[ObraId] = {likePressed: false, dislikePressed: false}
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
      // Agregar más información sobre el error
      console.error('Error details:', error.message, error.stack);
    }
  }
  
  let botonLike = document.getElementById('likeButton');
  let botonDislike = document.getElementById('dislikeButton');


  async function handleInteraction(interactionType) {
  
    if (ObraId !== 0){
        await fetchData();
  
        if (interactionType === 'like') {
          if (!obrasReacciones2[ObraId].likePressed && !obrasReacciones2[ObraId].dislikePressed) {
            obrasReacciones2[ObraId].likePressed = true;
            console.log(obrasReacciones2[ObraId])
            likeCount = await updateCounter('like', likeCount + 1);
          } else if (obrasReacciones2[ObraId].likePressed && !obrasReacciones2[ObraId].dislikePressed){
            obrasReacciones2[ObraId].likePressed = false;
            likeCount = await updateCounter('like', likeCount - 1);
          }
          document.getElementById('likeCount').innerText = likeCount;

          if (obrasReacciones2[ObraId].likePressed) {
            botonLike.classList.add('clicked');
          } else {
            botonLike.classList.remove('clicked');
          }

  
        } else if (interactionType === 'dislike') {
          if (!obrasReacciones2[ObraId].dislikePressed && !obrasReacciones2[ObraId].likePressed) {
            obrasReacciones2[ObraId].dislikePressed = true;
            dislikeCount = await updateCounter('dislike', dislikeCount + 1);
  
          } else if (obrasReacciones2[ObraId].dislikePressed && !obrasReacciones2[ObraId].likePressed) {
            obrasReacciones2[ObraId].dislikePressed = false;
            dislikeCount = await updateCounter('dislike', dislikeCount - 1);
  
          }
          document.getElementById('dislikeCount').innerText = dislikeCount;

          if (obrasReacciones2[ObraId].dislikePressed) {
            botonDislike.classList.add('clicked');
          } else {
            botonDislike.classList.remove('clicked');
          }
        }
    } else {
      document.getElementById('likeCount').innerText = "";
      document.getElementById('dislikeCount').innerText = "";
    }
  }
  
  async function updateCounter(type, count) {
    try {
      const updateResponse = await fetch('https://books-tsfn.onrender.com/Obras/' + ObraId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [type + '_total']: count
        })
      });
  
      return count;
  
    } catch (error) {
      console.error('Error updating data:', error);
      return count;
    }
  }
  
  
  let obrasInfo = [];
  let puentesInfo = [];
  
  const conseguirObras = () => {
    return fetch('https://books-tsfn.onrender.com/Peligros')
      .then(response => response.json())
      .then(obras => {
        //console.log(obras);
  
        obras.forEach(obra => {
          let obraInfo = {
            posicion: { lat: obra.punto.coordinates[1], lng: obra.punto.coordinates[0] },
            nombre: obra.TipoPeligroFEN,
            FechaDeReporte: obra.Fecha_Reporte,
            Clasificacion: obra.Clasificacion
  
          };
  
          obrasInfo.push(obraInfo);
        });
      })
      .then(conseguirPuentes)
      .catch(error => {
        console.error("Error al obtener obras:", error);
      });
  };
  
  const conseguirPuentes = () => {
    return fetch('https://books-tsfn.onrender.com/Obras')
      .then(response => response.json())
      .then(puentes => {
        //console.log(puentes);
  
        puentes.forEach(puente => {
          let puenteInfo = {
            posicion: { lat: puente.punto.coordinates[1], lng: puente.punto.coordinates[0] },
            nombre: puente.NombreProy,
            FechaDeInicio: puente.Fecha_Inicio,
            FechaDeFin: puente.Fecha_Fin,
            PorcentajeDeAvance: puente.Porcentaje_avance,
            currentId: puente.id
          };
  
          puentesInfo.push(puenteInfo);
        });
      })
      .then(miUbicacion)
      .catch(error => {
        console.error("Error al obtener puentes:", error);
      });
  };
  
  const miUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(usuarioUbicacion => {
        let ubicacion = {
          lat: usuarioUbicacion.coords.latitude,
          lng: usuarioUbicacion.coords.longitude
        };
        console.log(ubicacion);
        crearMapaYUbicar(ubicacion).then(() => console.log("Operaciones completadas."));
      });
    }
  };
  
  const crearMapaYUbicar = (obj) => {
    const icon1 = {
      url: "./assets/img/peligro.png",
      scaledSize: new google.maps.Size(30, 30)
    };
  
    const icon2 = {
      url: "./assets/img/obras.png",
      scaledSize: new google.maps.Size(30, 30)
    };
  
    return new Promise((resolve, reject) => {
      let mapa = new google.maps.Map(document.getElementById('map'), {
        center: obj,
        zoom: 10
      });
  
      let marcadorUsuario = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
      });
  
      marcadorUsuario.setMap(mapa);
  
      let marcadores = obrasInfo.map(obra => {
        let marker = new google.maps.Marker({
          position: obra.posicion,
          title: obra.nombre,
          map: mapa,
          icon: icon1
        });
  
        // Add click event listener to the marker
        marker.addListener('click', () => {
          // Show a popup with the message when the marker is clicked
          const infoWindow = new google.maps.InfoWindow({
            content: `Tipo de Peligro: ${obra.nombre}<br>Fecha de Reporte: ${obra.FechaDeReporte}<br>Riesgo: ${obra.Clasificacion}`
          });

          noRedSocial()
          infoWindow.open(mapa, marker);
        });
  
        return marker;
      });
  
      let marcadores2 = puentesInfo.map(puente => {
        let marker = new google.maps.Marker({
          position: puente.posicion,
          title: puente.nombre,
          map: mapa,
          icon: icon2
        });
  
        // Add click event listener to the marker
        marker.addListener('click', () => {
          // Show a popup with the message when the marker is clicked
          const infoWindow = new google.maps.InfoWindow({
            content: `NOMBRE DE LA OBRA: ${puente.nombre}<br>Fecha de Inicio: ${puente.FechaDeInicio}<br>Fecha de Fin: ${puente.FechaDeFin}<br>Porcentaje de avance: ${puente.PorcentajeDeAvance}`
          });
          
          ObraId = puente.currentId
  
          fetchData(obrasApi, ObraId);
          infoWindow.open(mapa, marker);
        });
  
        return marker;
      });
  
      resolve();
    });
  };
  
  conseguirObras();
  