document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", crearCuenta);

// let sis = new Sistema();

function mostrar(pId) {
  document.querySelector("#" + pId).style.display = "block";
}
function ocultar(pId) {
  document.querySelector("#" + pId).style.display = "none";
}

function ocultarTodo() {
  ocultar("secIngreso");
  ocultar("secRegistro");
  ocultar("secContenido");
}
function mostrarIngreso() {
  ocultarTodo();
  mostrar("secIngreso");
}
function mostrarRegistro() {
  ocultarTodo();
  mostrar("secRegistro");
}
mostrarIngreso();
function mostrarContenido() {
  ocultarTodo();
  mostrar("secContenido");
}
//
//
//
function ingreso() {
  mostrarContenido();
}
function registro() {
  mostrarIngreso();
}
function crearCuenta() {
  ocultarTodo();
  mostrarRegistro();
}
