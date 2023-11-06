function traerDatos() {
    fetch('http://localhost:1337/api/canchas', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('No se pudo obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        mostrarDatos(data.data);
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

function mostrarDatos(data) {
    var lista = document.getElementById('lista');
    lista.innerHTML = '';

    data.forEach(item => {
        var li = document.createElement('li');
        li.textContent = item.attributes.nombre;
        lista.appendChild(li);
    });
}