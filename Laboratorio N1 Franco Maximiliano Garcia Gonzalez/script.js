var listaPalabras = [
  "vaca",
  "coco",
  "casa",
  "gato",
  "altura",
  "letras",
  "cuenta",
  "estaba",
  "camaron",
  "segunda",
  "trabajo",
  "conmigo",
  "popo",
];

function registroUsuario() {
  var nombre = prompt("Ingrese nombre");
  var fechaHora = new Date().toLocaleString();
  var nombreUsuario = nombre.replace(/\s+/g, "");

  var cookieExistente = getCookie(nombreUsuario);

  if (cookieExistente !== "") {
    var datosUsuario = cookieExistente.split("&");
    var ultimoAcceso = datosUsuario[1].split("=")[1];
    document.getElementById("ultimoAcceso").innerHTML =
      "Último acceso: " + ultimoAcceso;
  } else {
    document.getElementById("ultimoAcceso").innerHTML = "Es tu primer acceso.";
  }

  document.getElementById("saludo").innerHTML = "Bienvenido " + nombre;

  // Almacenar o actualizar la cookie con la información del usuario
  var datosUsuario = "Nombre=" + nombre + "&UltimoAcceso=" + fechaHora;
  document.cookie = nombreUsuario + "=" + datosUsuario;
  document.getElementById("saludo2").innerHTML = "A jugar" + nombre; // aca agregue una cosa
} // creo que esta mal por el echo que no especifico en que html se haceS

// Función para obtener el valor de una cookie por nombre
function getCookie(nombre) {
  var nombreCookie = nombre + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(nombreCookie) == 0) {
      return cookie.substring(nombreCookie.length, cookie.length);
    }
  }
  return "";
}

function iniciar() {
  registroUsuario();
}

function obtenerPalabraAleatoria(longitud) {
  var palabrasFiltradas = listaPalabras.filter(
    (palabra) => palabra.length === longitud
  );
  var indiceAleatorio = Math.floor(Math.random() * palabrasFiltradas.length);
  return palabrasFiltradas[indiceAleatorio];
}

function crearTablero(cantidadLetras) {
  document.getElementById("selector").disabled = true; //con esto desabilito el selector
  var divJuego = document.getElementById("divjuego");
  var fila = document.createElement("tr");

  for (let i = 0; i < cantidadLetras; i++) {
    var td = document.createElement("td");
    td.setAttribute("id", i);
    fila.appendChild(td);
  }
  divJuego.appendChild(fila);
  var cantLetras = parseInt(cantidadLetras);
  jugar(cantLetras);
}
var palabra;
function jugar(cantLetras) {
  switch (cantLetras) {
    case 4:
      palabra = obtenerPalabraAleatoria(4);
      break;
    case 6:
      palabra = obtenerPalabraAleatoria(6);
      break;
    case 7:
      palabra = obtenerPalabraAleatoria(7);
      break;
  }
}

function adivinarPalabra() {
  var letraIngresada = document.getElementById("letraInput");
  var letraValor = letraIngresada.value;
  console.log(letraValor);
  for (let i = 0; i < palabra.length; i++) {
    console.log(i);
    var id = i.toString();
    document.getElementById(id).innerHTML = letraValor;
    //alert(palabra[i]);
    //if (letraIngresada.toLowerCase() === palabra[i].toLowerCase()) {
    //alert(palabra[i]);
  }
}
