
//Armar los pares
//Ordenar Random
//Empezar juego
//comparar pares
//contar intentos
//marcar ganado
let tablero = document.getElementById('tablero')
activarTablero = () => tablero.style.pointerEvents = 'auto';
desactivarTablero = () => tablero.style.pointerEvents = 'none';

let cartasSeleccionadas = new Array();

let cartasFrentes = document.querySelectorAll('.carta-frente')
for ( carta of cartasFrentes) {
  carta.addEventListener("click", desactivarTablero)
  carta.addEventListener("click", animacionGiro)
  carta.addEventListener("animationend", esconderFrenteMostrarDorso)  
}
function animacionGiro() {
  this.classList.add('animated', 'flipOutY') 
}
function esconderFrenteMostrarDorso() {  
  let padre = this.parentNode;
  let celda = padre.parentNode;

  desactivarCelda(celda)

  let dorso = padre.children[0];
  dorso.style.display = "block"

  cartasSeleccionadas.push(padre)

  chequearSiCoinciden()
  activarTablero()
}

function chequearSiCoinciden() {

  if(cartasSeleccionadas.length >= 2)
  {    
    const imagen1 = cartasSeleccionadas[0].children[0]
    const imagen2 = cartasSeleccionadas[1].children[0]

    if(imagen1.src === imagen2.src)
    { //Coinciden, animación exito
      
      setTimeout( () => {
        imagen1.classList.add('animated', 'flash') 
        imagen2.classList.add('animated', 'flash') 
      }, 300)
      
      //Se limpian las cartas seleccionadas para seguir Jugando
      cartasSeleccionadas = new Array()
    }
    else {
      // No coinciden, ocultar de nuevo y volver a activar seleccionadas 
      resetearCartas()      
    }
  }
}
function resetearCartas() {
  cartasSeleccionadas.forEach(carta => {
    let frente = carta.children[1]
    let dorso = carta.children[0]
    
    //Mostrar Frente
    frente.classList.remove('animated', 'flipOutY')
    
    //Ocultar Imagen
    dorso.style.display = "none";

    //Habilitar click en celda
    carta.parentNode.style.pointerEvents = "auto";
  });
  cartasSeleccionadas = new Array()
}

function desactivarCelda(celda)
{
  celda.style.pointerEvents = "none"
}



