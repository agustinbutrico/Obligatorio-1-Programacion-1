document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);

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
  document.querySelector("#pErrorRegistro").innerHTML = "";
}
function mostrarContenido() {
  mostrar("secContenido");
}
//
//
//
function registro() {
  let usuario = document.querySelector("#txtUsuarioRegistro").value;
  let pass = document.querySelector("#txtPassRegistro").value;
  let nombre = document.querySelector("#txtNombreRegistro").value;
  let apellido = document.querySelector("#txtApellidoRegistro").value;
  let tarjeta = document.querySelector("#txtTarjetaRegistro").value;
  let cvc = document.querySelector("#txtCVCRegistro").value;
  if (sis.existeAdministrador(usuario) || sis.existeUsuario(usuario)) {
    document.querySelector("#pErrorRegistro").innerHTML = "Nombre de usuario ya en uso";
  } else {
    sis.registrarUsuario(usuario, pass, nombre, apellido, tarjeta, cvc);
    // Mostrar
    ocultarTodo();
    mostrarIngreso();
  }
}
function ingreso() {
  usuario = document.querySelector("#txtUsuarioIngreso").value;
  contrasenia = document.querySelector("#passContraseniaIngreso").value;
  if (campoVacio(usuario) || campoVacio(contrasenia)) {
    document.querySelector("#pErrorIngreso").innerHTML = "Los campos no pueden estar vacios";
  }
  if (sis.buscarAdministrador(usuario, contrasenia)) {
    // Navegacion en true muestra la navegación de administrador
    ocultarTodo();
    mostrarNavegacion(true);
    mostrarContenido();
  } else if (sis.buscarUsuario(usuario, contrasenia)) {
    ocultarTodo();
    mostrarNavegacion(false);
    mostrarContenido();
  } else {
    document.querySelector("#pErrorIngreso").innerHTML = "Usario y/o contraseña incorrectos";
  }
}

//
//
//
function campoVacio(campo) {
  return campo === "";
}
