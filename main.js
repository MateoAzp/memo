
function repartirCartas() {
  const arraySrcs = ['chrome.svg','facebook.svg','firefox.svg','google-icon.svg',
                   'html-5.svg', 'instagram-icon.svg','internetexplorer.svg','opera.svg',
                   'chrome.svg','facebook.svg','firefox.svg','google-icon.svg',
                   'html-5.svg', 'instagram-icon.svg','internetexplorer.svg','opera.svg']                   
  let arrayRepartir = arraySrcs
    
  let cartasDorsos = document.querySelectorAll('.carta-dorso')
    for (carta of cartasDorsos) {
      let randomIndice = Math.floor(( Math.random() * (arrayRepartir.length - 1) ))      
      let srcImagen = arrayRepartir[randomIndice]
      arrayRepartir.splice(randomIndice, 1)

      let img = carta.children[0]
      img.src = 'img/'+srcImagen
    }  
} 
repartirCartas()

function jugarDeNuevo () {
  repartirCartas()
  activarTablero()
  activarCeldas()
  cartasSeleccionadas = new Array();

  const boton = document.getElementById('btnJugarDeNuevo')
    boton.style.display = 'none'
    boton.classList.remove('animated', 'bounce')
}


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
      chequearSiGano()
    }
    else {
      // No coinciden, ocultar de nuevo y volver a activar seleccionadas 
      setTimeout( () => {
      resetearCartas()   
      },500)   
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


function chequearSiGano() {
  const celdas = document.querySelectorAll('.celda')
  let contadorActivas = 0
  for (celda of celdas) {
    if(celda.style.pointerEvents == 'auto')
    {
      contadorActivas++
    }
  }    

  if(contadorActivas == 0){
    const boton = document.getElementById('btnJugarDeNuevo')
    boton.style.display = 'block'
    boton.classList.add('animated', 'bounce')
  }

}

function activarCeldas(){
  const celdas = document.querySelectorAll('.celda')
  for (celda of celdas) {
    celda.style.pointerEvents = 'auto'    
    let frente = celda.children[0].children[1]
    let imagen = celda.children[0].children[0]         
    
    //Mostrar Frente
    frente.classList.remove('animated', 'flipOutY')
    
    //Ocultar Imagen
    imagen.style.display = "none";
    imagen.classList.remove('animated', 'flash')
  }  
}
