document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", mostrarRegistro);
document.querySelector("#aSalirDelSistema").addEventListener("click", mostrarIngreso);
document.querySelector("#aListarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aIrACompras").addEventListener("click", mostrarCompra);

let sis = new Sistema();
let esAdministrador = false;
mostrarIngreso();
listarProductos();

//  Mostrar / Ocultar
function mostrar(pId, estilo) {
  document.querySelector("#" + pId).style.display = estilo;
}
function ocultar(pId) {
  document.querySelector("#" + pId).style.display = "none";
}
function ocultarTodo() {
  ocultar("secNavegacion");
  ocultar("secIngreso");
  ocultar("secRegistro");
  ocultar("secProductos");
  ocultar("secCompra");
}
function mostrarNavegacion() {
  mostrar("secNavegacion", "block");
  if (esAdministrador) {
    ocultar("navUsuario");
    mostrar("navAdministrador", "flex");
  } else {
    mostrar("navUsuario", "flex");
    ocultar("navAdministrador");
  }
}
function mostrarIngreso() {
  ocultarTodo();
  mostrar("secIngreso", "block");
  document.querySelector("#pErrorIngreso").innerHTML = "";
}
function mostrarRegistro() {
  ocultarTodo();
  mostrar("secRegistro", "block");
  document.querySelector("#pErrorRegistro").innerHTML = "";
}
function mostrarProductos() {
  ocultarTodo();
  mostrarNavegacion();
  mostrar("secProductos", "block");
}
function mostrarCompra() {
  ocultarTodo();
  listarCompra();
  mostrarNavegacion();
  mostrar("secCompra", "block");
}
// FIN Mostrar / Ocultar
// Validaciones
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
// FIN Validaciones
// Registro
function registro() {
  let usuario = document.querySelector("#txtUsuarioRegistro").value;
  let contrasenia = document.querySelector("#txtPassRegistro").value;
  let nombre = document.querySelector("#txtNombreRegistro").value;
  let apellido = document.querySelector("#txtApellidoRegistro").value;
  let tarjeta = document.querySelector("#txtTarjetaRegistro").value;
  let cvc = document.querySelector("#txtCVCRegistro").value;
  document.querySelector("#pErrorRegistro").innerHTML = "";

  if (
    campoVacio(usuario) ||
    campoVacio(contrasenia) ||
    campoVacio(nombre) ||
    campoVacio(apellido) ||
    campoVacio(tarjeta) ||
    campoVacio(cvc)
  ) {
    document.querySelector("#pErrorRegistro").innerHTML = "No pueden haber campos vacios";
  } else {
    if (contrasenia.length <= 5) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener más de 5 caracteres ";
    } else if (!validacionCampo(contrasenia)[0]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una mayúscula ";
    } else if (!validacionCampo(contrasenia)[1]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una minúscula ";
    } else if (!validacionCampo(contrasenia)[2]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos un número ";
    } else if (sis.existeAdministrador(usuario) || sis.existeUsuario(usuario)) {
      document.querySelector("#pErrorRegistro").innerHTML = "Nombre de usuario en uso";
    } else {
      sis.registrarUsuario(usuario, contrasenia, nombre, apellido, tarjeta, cvc);
      // Mostrar
      mostrarIngreso();
    }
  }
}
// Fin Registro
// Ingreso
function ingreso() {
  usuario = document.querySelector("#txtUsuarioIngreso").value;
  contrasenia = document.querySelector("#passContraseniaIngreso").value;

  if (campoVacio(usuario) || campoVacio(contrasenia)) {
    document.querySelector("#pErrorIngreso").innerHTML = "No pueden haber campos vacios";
  } else if (sis.verificarCredencialesAdministrador(usuario, contrasenia)) {
    esAdministrador = true;
    ocultarTodo();
    mostrarNavegacion();
    mostrarProductos();
  } else if (sis.verificarCredencialesUsuario(usuario, contrasenia)) {
    ocultarTodo();
    mostrarNavegacion();
    mostrarProductos();
  } else {
    document.querySelector("#pErrorIngreso").innerHTML = "Usario y/o contraseña incorrectos";
  }
}
// Fin Ingreso
// Productos
function listarProductos() {
  let cuerpoTabla = creacionCuerpoProductos();

  document.querySelector("#curpoProductos").innerHTML = cuerpoTabla;
  bindearBotonComprar();
}
function bindearBotonComprar() {
  let botones = document.querySelectorAll(".btnAgregarCompra");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", agregarCompra);
  }
}
function creacionCuerpoProductos() {
  let cuerpoTabla = "";
  for (i = 0; i < sis.Productos.length; i++) {
    let prod = sis.Productos[i];
    cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><label for="numCantUnidades"><input type="number" id="numCantUnidades" min=1 value=1"></td>
        <td>${prod.precio}</td>
        <td><input type="button" value="Comprar" class="btnAgregarCompra" data-id-producto="${prod.id}"></td>
      </tr>`;
  }
  return cuerpoTabla;
}
// FIN Productos
// Compra
function listarCompra() {
  let cuerpoTabla = creacionCuerpoCompras();

  document.querySelector("#cuerpoCompra").innerHTML = cuerpoTabla;
  bindearBotonEliminarCompra();
}
function bindearBotonEliminarCompra() {
  let botones = document.querySelectorAll(".btnEliminarCompra");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", eliminarCompra);
  }
}
function creacionCuerpoCompras() {
  let cuerpoTabla = "";
  for (i = 0; i < sis.Compra.length; i++) {
    let producto = sis.Compra[i];
    cuerpoTabla += `<tr>
        <td><img src="${producto.imagen}"></td>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.cantUnidades}</td>
        <td>${producto.precio}</td>
        <td><input type="button" value="Elimindar Producto" class="btnEliminarCompra" data-id-Compra="${producto.id}"></td>
      </tr>`;
  }
  return cuerpoTabla;
}
// Editar compra
function agregarCompra() {
  let idProducto = this.getAttribute("data-id-producto");
  sis.agregarCompra(idProducto);
  listarCompra();
}
function eliminarCompra() {
  let idCompra = this.getAttribute("data-id-Compra");
  sis.eliminarCompra(idCompra);
  listarCompra();
}
// Fin Compra
