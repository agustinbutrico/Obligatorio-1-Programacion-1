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
  document.querySelector("#pErrorIngreso").innerHTML = "";
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
function ingreso() {
  nombre = document.querySelector("#txtUsuarioIngreso").value;
  contrasenia = document.querySelector("#passContraseniaIngreso").value;
  if (sis.bucarAdministrador(nombre, contrasenia)) {
    // Navegacion en true muestra la navegación de administrador
    ocultarTodo();
    mostrarNavegacion(true);
    mostrarContenido();
  } else if (sis.bucarUsuario(nombre, contrasenia)) {
    ocultarTodo();
    mostrarNavegacion(false);
    mostrarContenido();
  } else {
    document.querySelector("#pErrorIngreso").innerHTML = "Usario y/o contraseña incorrectos";
  }
}
function registro() {
  // Mostrar
  ocultarTodo();
  mostrarIngreso();
}
function crearCuenta() {
  // Mostrar
  ocultarTodo();
  mostrarRegistro();
}
//
//
//
