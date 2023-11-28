let likeCount = 0;
let dislikeCount = 0;
let GlobalId = 0;

async function fetchData() {
  try {
    const response = await fetch('https://books-tsfn.onrender.com/Obras/' + GlobalId);
    const data = await response.json();

    likeCount = data.like_total;
    dislikeCount = data.dislike_total;

    document.getElementById('likeCount').innerText = likeCount;
    document.getElementById('dislikeCount').innerText = dislikeCount;

  } catch (error) {
    console.error('Error fetching data:', error);
    // Agregar más información sobre el error
    console.error('Error details:', error.message, error.stack);
  }
}

async function handleInteraction(interactionType) {
  await fetchData();

  if (interactionType === 'like') {
    likeCount = await updateCounter('like', likeCount);
    document.getElementById('likeCount').innerText = likeCount;
  } else if (interactionType === 'dislike') {
    dislikeCount = await updateCounter('dislike', dislikeCount);
    document.getElementById('dislikeCount').innerText = dislikeCount;
  }
}

async function updateCounter(type, count) {
  try {
    const updateResponse = await fetch('https://books-tsfn.onrender.com/Obras/' + GlobalId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [type + '_total']: count + 1
      })
    });

    const updateData = await updateResponse.json();

    return count + 1;

  } catch (error) {
    console.error('Error updating data:', error);
    return count;
  }
}


let obrasInfo = [];
let puentesInfo = [];

const conseguirObras = () => {
  return fetch('https://www.datos.gov.co/resource/g373-n3yy.json')
    .then(response => response.json())
    .then(obras => {
      //console.log(obras);

      obras.forEach(obra => {
        let obraInfo = {
          posicion: { lat: obra.punto.coordinates[1], lng: obra.punto.coordinates[0] },
          nombre: obra.nombre_sede,

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
    url: "img/icono_negro.png",
    scaledSize: new google.maps.Size(30, 30)
  };

  const icon2 = {
    url: "img/obras.png",
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
          content: obra.nombre
        });
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
        
        GlobalId = puente.currentId

        fetchData();
        infoWindow.open(mapa, marker);
      });

      return marker;
    });

    resolve();
  });
};

conseguirObras();
