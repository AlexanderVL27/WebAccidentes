let app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
  });
  if (app.view) {
    document.getElementById("animacion").appendChild(app.view);
  } else {
    console.error("Error al inicializar la aplicación PIXI.");
  }
  
  let imagenes = [
    "imagenes/accidente_1.jpg", // Imagen de espalda
    "imagenes/accidente_2.jpg", // Imagen de piernas
  ];
  
  let currentImageIndex = 0;
  let categoriaActual = ""; // Variable para almacenar la categoría actual
  
  function loadNewImage() {
    let imageElement = document.createElement("img");
    imageElement.src = imagenes[currentImageIndex];
  
    let contenedor = document.getElementById("animacion");
    contenedor.innerHTML = "";
    contenedor.appendChild(imageElement);
  }
  
  loadNewImage();
  
  function actualizarImagen(indice) {
    currentImageIndex = indice;
    loadNewImage();
  }
  
  function activarTextToSpeech(mensaje) {
    const speech = new SpeechSynthesisUtterance(mensaje);
    window.speechSynthesis.speak(speech);
  }
  
  let recognition = new webkitSpeechRecognition() || new SpeechRecognition(); // Crear un objeto de reconocimiento de voz
  
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("textoArea").value = transcript;
    document.getElementById("obtenerRutina").click();
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
      const rutinaEncontrada = data.rutinas.find(
        (rutina) =>
          rutina.nombre.toLowerCase().includes(tipo.toLowerCase()) ||
          rutina.descripcion.toLowerCase().includes(tipo.toLowerCase())
      );
      return rutinaEncontrada;
    } else {
      return null;
    }
  }
  
  function obtenerRutinaPorTipo(tipo) {
    if (data && data.rutinas) {
      const rutinaEncontrada = data.rutinas.find(
        (rutina) =>
          rutina.nombre.toLowerCase().includes(tipo.toLowerCase()) ||
          rutina.descripcion.toLowerCase().includes(tipo.toLowerCase())
      );
      return rutinaEncontrada;
    } else {
      return null;
    }
  }
  function mostrarRutinaEnLabel(rutina) {
    const label = document.getElementById("imagenLabel");
    label.innerText = `Nombre: ${rutina.nombre}\nDescripción: ${rutina.descripcion}`;
    activarTextToSpeech(
      `Nombre: ${rutina.nombre}. Descripción: ${rutina.descripcion}`
    );
  }
  
  document.getElementById("obtenerRutina").addEventListener("click", function () {
    const tipoAccidente = document.getElementById("textoArea").value;
    const rutina = obtenerRutinaPorTipo(tipoAccidente);
  
    if (rutina) {
      mostrarRutinaEnLabel(rutina);
      activarTextToSpeech(document.getElementById("textoArea").value);
    } else {
      document.getElementById("textoArea").value = "No se encontró rutina.";
      mostrarRutinaEnLabel({ nombre: "No se encontró rutina", descripcion: "" });
    }
  });
  
  const intervalo = 8000;
  
  function cambiarImagenAutomaticamente() {
    currentImageIndex = (currentImageIndex + 1) % imagenes.length;
    loadNewImage();
  }
  
  const temporizador = setInterval(cambiarImagenAutomaticamente, intervalo);
  