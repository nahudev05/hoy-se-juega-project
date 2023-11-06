function traerDatos() {
    fetch('http://localhost:1337/api/canchas', {
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
        mostrarDatos(data.data);
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

function mostrarDatos(data) {
    var lista = document.getElementById('lista');
    
    if (lista) {
        lista.innerHTML = '';

        data.forEach(item => {
            var a = document.createElement('a');
            a.href = '../templates/info_cancha.html';
            a.classList.add('info');
            a.textContent = item.attributes.nombre;
            a.setAttribute('data-id', item.id);

            a.addEventListener('click', (event) => {
                const id = a.getAttribute('data-id');
                localStorage.setItem('id', id);
            });

            lista.appendChild(a);
        });
    }
}

traerDatos();
