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
  document.querySelector("#pErrorRegistro").innerHTML = "";
}
function mostrarContenido() {
  mostrar("secContenido");
}
function crearCuenta() {
  // Mostrar
  ocultarTodo();
  mostrarRegistro();
}
//
//
//
function registro() {
  let user = document.querySelector("#txtUsuarioRegistro").value;
  let pass = document.querySelector("#txtPassRegistro").value;
  let nombre = document.querySelector("#txtNombreRegistro").value;
  let apellido = document.querySelector("#txtApellidoRegistro").value;
  let tarjeta = document.querySelector("#txtTarjetaRegistro").value;
  let cvc = document.querySelector("#txtCVCRegistro").value;
  document.querySelector("#pErrorRegistro").innerHTML = "";

  if (campoVacio(user) || campoVacio(pass) || campoVacio(nombre) || campoVacio(apellido) || campoVacio(tarjeta) || campoVacio(cvc)) {
    document.querySelector("#pErrorRegistro").innerHTML = "No pueden haber campos vacios";
  } else {
    if (pass.length <= 5) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener más de 5 caracteres ";
    } else if (!validacionCampo(pass)[0]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una mayúscula ";
    } else if (!validacionCampo(pass)[1]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una minúscula ";
    } else if (!validacionCampo(pass)[2]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos un número ";
    } else if (sis.existeAdministrador(user) || sis.existeUsuario(user)) {
      document.querySelector("#pErrorRegistro").innerHTML = "Nombre de usuario en uso";
    } else {
      sis.registrarUsuario(user, pass, nombre, apellido, tarjeta, cvc);
      // Mostrar
      ocultarTodo();
      mostrarIngreso();
    }
  }
}
function ingreso() {
  user = document.querySelector("#txtUsuarioIngreso").value;
  pass = document.querySelector("#passContraseniaIngreso").value;

  if (campoVacio(user) || campoVacio(pass)) {
    document.querySelector("#pErrorIngreso").innerHTML = "No pueden haber campos vacios";
  } else if (sis.verificarCredencialesAdministrador(user, pass)) {
    // Navegacion en true muestra la navegación del administrador
    ocultarTodo();
    mostrarNavegacion(true);
    mostrarContenido();
  } else if (sis.verificarCredencialesUsuario(user, pass)) {
    // Navegacion en false muestra la navegación del usuario
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
function validacionCampo(campo) {
  let mayuscula = false;
  let minuscula = false;
  let numero = false;

  for (let i = 0; i < campo.length; i++) {
    let l = campo.charAt(i);
    if (l.toLowerCase() !== l) {
      mayuscula = true;
    } else if (l.toUpperCase() !== l) {
      minuscula = true;
    } else if (!isNaN(l)) {
      numero = true;
    }
  }
  return [mayuscula, minuscula, numero];
}