const id = localStorage.getItem('id');

function traerDatosEspecifico(id) {
    fetch(`http://localhost:1337/api/canchas?filters[id][$eq]=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            mostrarDatosEspecifico(data.data);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}

function mostrarDatosEspecifico(data) {
    var infoContainer = document.getElementById('info-container');

    if (infoContainer) {
        infoContainer.innerHTML = '';

        data.forEach(item => {
            var h1 = document.createElement('h1');
            var direccion = document.createElement('p');
            var telefono = document.createElement('p');
            h1.classList.add('titulo-cancha');
            direccion.classList.add('p-cancha');
            telefono.classList.add('p-cancha');
            h1.textContent = item.attributes.nombre;
            direccion.textContent = item.attributes.direccion;
            telefono.textContent = item.attributes.telefono;
            infoContainer.appendChild(h1);
            infoContainer.appendChild(direccion);
            infoContainer.appendChild(telefono);


            var coord = {lat:parseFloat(item.attributes.latitud), lng:parseFloat(item.attributes.longitud)};
            console.log(coord);
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: coord
            });
            var marker = new google.maps.Marker({
                position: coord,
                map: map
            });
        });
    }
}

traerDatosEspecifico(id);