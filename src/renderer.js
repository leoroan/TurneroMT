import './index.css';

// URL de la API para obtener los servicios
const apiServiciosURL = 'http://localhost:8081/api/servicios/';

// URL de la API para hacer el POST de turnos
const apiTurnosURL = 'http://localhost:8081/api/turnos/';

// Función para obtener los servicios y agregarlos como botones
async function cargarServicios() {
  try {
    // Realizar la solicitud a la API
    const response = await fetch(apiServiciosURL);
    const servicios = await response.json();

    // Seleccionar el contenedor donde se agregarán los botones
    const serviciosDiv = document.getElementById('servicios');

    // Iterar sobre los servicios y crear un botón para cada uno
    servicios.forEach(servicio => {
      // Crear un botón
      const boton = document.createElement('button');
      boton.classList.add('button-54', 'btn', 'btn-success', 'm-3', 'shadow-lg', 'btn-lg', 'p-5', 'w-25', 'fs-1');
      boton.textContent = servicio.nombre;
      boton.onclick = () => {
        // console.log(`Seleccionaste el servicio: ${servicio.nombre}, ${servicio.id}`);
        crearTurno(servicio.id);
      };

      // Agregar el botón al div de servicios
      serviciosDiv.appendChild(boton);
    });
  } catch (error) {
    console.error('Error al cargar los servicios:', error);
  }
}

// Función para hacer POST del turno con el servicioId
async function crearTurno(servicioId) {
  try {
    const data = { servicioId: servicioId };
    const response = await fetch(`${apiTurnosURL}${servicioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const turno = await response.json();
      console.log(turno);
      alert(`Su turno es: ${turno.servicio}, N° ${turno.dataValues.numeroTurno}, Fecha: ${turno.dataValues.fecha}`);
      // window.electronAPI.imprimirTurno({ servicio: turno.servicio, numero: turno.dataValues.numeroTurno, fecha: turno.dataValues.fecha });
    } else {
      alert('Error al crear el turno');
    }
  } catch (error) {
    console.error('Error al crear el turno: ', error);
    alert('Hubo un error al crear el turno');
  }
}

// Cargar los servicios al cargar la página
window.onload = cargarServicios;

