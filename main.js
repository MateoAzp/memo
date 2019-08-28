
//Armar los pares
//Ordenar Random
//Empezar juego
//comparar pares
//contar intentos
//marcar ganado

let imagen = document.createElement('img')
imagen.src = 'img/chrome.svg';

let cartasFrentes = document.querySelectorAll('.carta-frente');

for ( carta of cartasFrentes) {
  carta.addEventListener("click", animacionGiro)
  carta.addEventListener("animationend", esconderFrente)
}

function animacionGiro() {
  this.classList.add('animated', 'flipOutY') 
}

function esconderFrente() {
  this.appendChild(imagen)
}

