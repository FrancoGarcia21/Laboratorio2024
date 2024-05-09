// Global Variables
var nroPartidas = 0;
var card1 = null;
var card2 = null;
var intentos = 0;
var aciertos = 0;
var aciertosMsg = [
  "EXCELENTE MEMORIA",
  "MUY BUENA MEMORIA",
  "BUENA MEMORIA, PUEDES MEJORAR",
  "MALA MEMORIA, DEBES PRACTICAR MAS",
  "QUE PENA ABANDONASTE",
];
var abandono = false;

function createTable() {
  var table = document.getElementById("table");
  for (let i = 0; i < 5; i++) {
    var tr = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
      var td = document.createElement("td");
      td.setAttribute("class", "card");
      td.innerHTML = 0;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function enableTable(boolean) {
  let cards = document.getElementsByClassName("card");
  if (boolean) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].setAttribute("onclick", "selectCard(this);");
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      cards[i].setAttribute("onclick", "");
    }
  }
}

function play(btn) {
  enableTable(true);
  btn.disabled = true;
  document.getElementById("surrender").disabled = false;
  generateRandomTable();
}

function generateRandomTable() {
  let nmbrs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
  for (let i = nmbrs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nmbrs[i], nmbrs[j]] = [nmbrs[j], nmbrs[i]];
  }
  setValueToCards(nmbrs);
}

function setValueToCards(nmbrs) {
  var cards = document.getElementsByClassName("card");
  for (let i = 0; i < 20; i++) {
    cards[i].setAttribute("value", nmbrs[i]);
    i++;
    cards[i].setAttribute("value", nmbrs[i]);
  }
}

function selectCard(card) {
  if (card1 == null) {
    card1 = card;
    card1.setAttribute("onclick", "null");
    flipCard(card1, false);
  } else {
    card2 = card;
    card2.setAttribute("onclick", "null");
    flipCard(card2, false);
    checkMatch();
  }
}

function flipCard(card, flipped) {
  if (flipped) {
    card.style.backgroundColor = "rgb(244, 244, 181)";
    card.innerHTML = 0;
  } else {
    card.style.backgroundColor = "white";
    card.innerHTML = card.getAttribute("value");
  }
}

function checkMatch() {
  if (card1.getAttribute("value") != card2.getAttribute("value")) {
    enableTable(false);
    setTimeout(() => {
      flipCard(card1, true);
      flipCard(card2, true);
      card1.setAttribute("onclick", "selectCard(this);");
      card2.setAttribute("onclick", "selectCard(this);");
      card1 = null;
      card2 = null;
      intentos++;
      addPoints();
      enableTable(true);
    }, 700);
  } else {
    card1 = null;
    card2 = null;
    aciertos++;
    addPoints();
  }
}

function addPoints() {
  document.getElementById("aciertos").innerHTML = "ACIERTOS: " + aciertos;
  document.getElementById("intentos").innerHTML = "INTENTOS: " + intentos;
  checkGameState();
}
function checkGameState() {
  if (aciertos == 10) {
    finalMsg();
  }
  if (intentos == 20) {
    console.log("intentos 20");
    finalMsg();
  }
}
function surrender() {
  abandono = true;
  finalMsg();
}

function finalMsg() {
  enableTable(false);
  let msgFinal = document.getElementById("msgFinal");
  if (abandono) {
    msgFinal.innerHTML = aciertosMsg[4];
  } else {
    switch (aciertos) {
      case 10:
        msgFinal.innerHTML = aciertosMsg[0];
        break;
      case 9:
      case 8:
        msgFinal.innerHTML = aciertosMsg[1];
        break;
      case 7:
      case 6:
        msgFinal.innerHTML = aciertosMsg[2];
        break;
      default:
        msgFinal.innerHTML = aciertosMsg[3];
    }
  }
}
