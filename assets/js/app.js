// Variables
const listaTweets = document.querySelector('#lista-notas')
// Event Listeners
eventListener()

function eventListener() {
  // Cuando se envia el formulario
  document.querySelector('#formulario').addEventListener('submit', agregarNota)
  // Borrar notas
  listaTweets.addEventListener('click', eliminarNota)
  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageListo)
}

// Funciones

// Añadir nota al formulario
function agregarNota(e) {
  e.preventDefault()
  // Leer el valor del textarea
  const nota = document.querySelector('#note').value
  // Crear boton eliminar
  const btnEliminar = document.createElement('a')
  btnEliminar.classList = 'borrar-nota'
  btnEliminar.innerText = 'x'
  // Crear un elemento, y añadirle el contenido a la lista
  const li = document.createElement('li')
  li.innerText = nota
  // Añade el btn a la nota
  li.appendChild(btnEliminar)
  // Añade la nota a la lista
  listaTweets.appendChild(li)
  // Añadir a localStorage
  agregarNotaLocalStorage(nota)
}

// Eliminar nota de la lista
function eliminarNota(e) {
  e.preventDefault()
  if (e.target.className === 'borrar-nota') {
    // Elimina la nota
    e.target.parentElement.remove()
    borrarNotaLocalStorage(e.target.parentElement.innerText)
  }
}

// Mostrar datos del localStorage en la lista
function localStorageListo() {
  let notas
  notas = obtenerNotaLocalStorage()

  notas.forEach(nota => {
    // Crear boton eliminar
    const btnEliminar = document.createElement('a')
    btnEliminar.classList = 'borrar-nota'
    btnEliminar.innerText = 'x'
    // Crear un elemento, y añadirle el contenido a la lista
    const li = document.createElement('li')
    li.innerText = nota
    // Añade el btn a la nota
    li.appendChild(btnEliminar)
    // Añade la nota a la lista
    listaTweets.appendChild(li)
  });
}

// Agrega la nota al localStorage
function agregarNotaLocalStorage(nota) {
  let notas;
  notas = obtenerNotaLocalStorage()
  // Añadir la nueva nota
  notas.push(nota)
  // Convertir de String a Array para localStorage
  localStorage.setItem('notas', JSON.stringify(notas))
}

// Comprueba que exista elementos en localStorage, return Array
function obtenerNotaLocalStorage() {
  let notas;
  if (localStorage.getItem('notas') === null) {
    notas = []
  } else {
    notas = JSON.parse(localStorage.getItem('notas'))
  }
  return notas
}

// Eliminar nota del localStorage
function borrarNotaLocalStorage(nota) {
  let notas, borrarNota

  borrarNota = nota.slice(0, -1)

  notas = obtenerNotaLocalStorage()

  notas.forEach((nota, i) => {
    if (borrarNota === nota) {
      notas.splice(i, 1)
    }
  });
  localStorage.setItem('notas', JSON.stringify(notas))
}