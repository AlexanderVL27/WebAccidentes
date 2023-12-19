let app = new PIXI.Application({
  width: 480,
  height: 600,
  backgroundColor: 0xffffff,
});
if (app.view) {
  document.getElementById("animacion").appendChild(app.view);
} else {
  console.error("Error al inicializar la aplicación PIXI.");
}

const imagenesRutinas = {
    "Rutina de recuperación para espalda": "imagenes/accidente_1.jpg",
    "Rutina de rehabilitación de piernas": "imagenes/accidente_2.jpg",
    "Rutina de recuperación post accidente": "imagenes/accidente_3.jpg",
    "Rutina de movilidad y flexibilidad": "imagenes/accidente_4.jpg",
    "Rutina de fortalecimiento de brazos": "imagenes/accidente_5.jpg",
    "Rutina de yoga para relajación": "imagenes/accidente_6.jpg",
    "Rutina de ejercicios de equilibrio": "imagenes/accidente_7.jpg",
    "Rutina de estiramiento de espalda baja": "imagenes/accidente_8.jpg",
    "Rutina de movimientos articulares": "imagenes/accidente_9.png"
  };

let currentImageIndex = 0;
let categoriaActual = ""; 

function loadNewImage(rutina) {
  const imagenRutina = imagenesRutinas[rutina.nombre];
  if (imagenRutina) {
    let imageElement = document.createElement("img");
    imageElement.src = imagenRutina;
    imageElement.classList.add("swirl-in-bck");

    let contenedor = document.getElementById("animacion");
    contenedor.innerHTML = "";
    contenedor.appendChild(imageElement);
  }
}

function removeImage() {
  let contenedor = document.getElementById("animacion");
  let imageElement = contenedor.querySelector("img");

  if (imageElement) {
    imageElement.classList.remove("swirl-in-bck");
    imageElement.classList.add("swirl-out-bck");
  }
}


loadNewImage({ nombre: "Sin rutina", descripcion: "", ejercicios: [] }); // Imagen por defecto

function actualizarImagen(indice) {
  currentImageIndex = indice;
  loadNewImage({ nombre: "Sin rutina", descripcion: "", ejercicios: [] }); // Imagen por defecto
}

function activarTextToSpeech(mensaje) {
  const speech = new SpeechSynthesisUtterance(mensaje);
  window.speechSynthesis.speak(speech);
}

let recognition = new webkitSpeechRecognition() || new SpeechRecognition(); // Crear un objeto de reconocimiento de voz

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  document.getElementById("textoArea").value = transcript;
  if (event.results[0].isFinal) {
    document.getElementById("obtenerRutina").click();
  }
};

document
  .getElementById("activarVoiceRecognition")
  .addEventListener("click", function () {
    recognition.start();
  });

let data;

fetch("./rutasv2.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
  })
  .catch((error) => console.error("Error cargando el archivo JSON:", error));

  function obtenerRutinaPorTipo(tipo) {
    if (data && data.rutinas) {
      const rutinaEncontrada = data.rutinas.find((rutina) => {
        const nombreLowerCase = rutina.nombre ? rutina.nombre.toLowerCase() : "";
        const descripcionLowerCase = rutina.descripcion ? rutina.descripcion.toLowerCase() : "";
  
        return (
          nombreLowerCase.includes(tipo.toLowerCase()) ||
          descripcionLowerCase.includes(tipo.toLowerCase())
        );
      });
  
      if (rutinaEncontrada) {
        removeImage();
        return rutinaEncontrada;
      }
    }
    return null;
  }
  

function mostrarRutinaEnLabel(rutina) {
  const label = document.getElementById("imagenLabel");
  const mensaje = `Nombre: ${rutina.nombre}. Descripción: ${
    rutina.descripcion
  }\nEjercicios:\n${rutina.ejercicios.join("\n")}`;
  label.innerText = mensaje;
  activarTextToSpeech(mensaje);
}

document.getElementById("obtenerRutina").addEventListener("click", function () {
  const tipoAccidente = document.getElementById("textoArea").value;
  const rutina = obtenerRutinaPorTipo(tipoAccidente);

  if (rutina) {
    mostrarRutinaEnLabel(rutina);
    loadNewImage(rutina);
    document.getElementById("textoArea").value = "";
  } else {
    const mensajeNoEncontrado = "No se encontró rutina.";
    mostrarRutinaEnLabel({
      nombre: "No se encontró rutina",
      descripcion: "",
      ejercicios: [],
    });
    activarTextToSpeech(mensajeNoEncontrado);
  }
  document.getElementById("textoArea").value = "";
});

document.getElementById("detenerTextToSpeech").addEventListener("click", function () {
  window.speechSynthesis.cancel(); // Detiene la síntesis de voz activa
})

document.addEventListener("DOMContentLoaded", function () {
  var logo = document.getElementById('logo');
  logo.classList.add('jello-horizontal');
  const titulo = document.querySelector("h1");
  titulo.classList.add("text-focus-in");
});


function mostrarComandos() {
  const comandos = `
    Comandos:
    Rutina de recuperación para espalda
    Rutina de rehabilitación de piernas
    Rutina de recuperación post accidente
    Rutina de movilidad y flexibilidad
    Rutina de fortalecimiento de brazos
    Rutina de yoga para relajación
    Rutina de ejercicios de equilibrio
    Rutina de estiramiento de espalda baja
    Rutina de movimientos articulares
  `;
  alert(comandos); // Muestra los comandos en una alerta, puedes cambiar esto a otra forma de visualización si prefieres
}
const mostrarComandosBtn = document.getElementById("mostrarComandosBtn");
  mostrarComandosBtn.addEventListener("click", mostrarComandos);