document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", crearCuenta);

let sis = new Sistema();
ocultarTodo();
mostrarIngreso();

function mostrar(pId) {
  document.querySelector("#" + pId).style.display = "block";
}
function ocultar(pId) {
  document.querySelector("#" + pId).style.display = "none";
}

function ocultarTodo() {
  ocultar("secNavegacion");
  ocultar("secIngreso");
  ocultar("secRegistro");
  ocultar("secContenido");
}
function mostrarNavegacion(admin) {
  mostrar("secNavegacion");
  if (admin) {
    ocultar("navUsuario");
    mostrar("navAdministrador");
  } else {
    mostrar("navUsuario");
    ocultar("navAdministrador");
  }
}
function mostrarIngreso() {
  mostrar("secIngreso");
}
function mostrarRegistro() {
  mostrar("secRegistro");
}
function mostrarContenido() {
  mostrar("secContenido");
}
//
//
//
function ingreso(admin) {
  ocultarTodo();
  mostrarNavegacion(admin);
  mostrarContenido();
}
function registro() {
  ocultarTodo();
  mostrarIngreso();
}
function crearCuenta() {
  ocultarTodo();
  mostrarRegistro();
}
//
//
//
