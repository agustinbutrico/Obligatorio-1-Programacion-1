document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", mostrarRegistro);
document.querySelector("#aSalirDelSistema").addEventListener("click", mostrarIngreso);
document.querySelector("#aListarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aIrAlCarrito").addEventListener("click", mostrarCarrito);

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
  ocultar("secCarrito");
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
function mostrarCarrito() {
  ocultarTodo();
  mostrarNavegacion();
  mostrar("secCarrito", "block");
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

  if (campoVacio(usuario) || campoVacio(contrasenia) || campoVacio(nombre) || campoVacio(apellido) || campoVacio(tarjeta) || campoVacio(cvc)) {
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
  let cuerpoTabla = "";

  for (i = 0; i < sis.Productos.length; i++) {
    cuerpoTabla += `<tr>
        <td><img src="${sis.Productos[i].imagen}"></td>
        <td>${sis.Productos[i].nombre}</td>
        <td>${sis.Productos[i].descripcion}</td>
        <td>${sis.Productos[i].precio}</td>
        <td><input type="button" value="Añadir al Carrito" class="btnAgregarAlCarrito" data-id-producto="${sis.Productos[i].id}"></td>
      </tr>`;
  }
  document.querySelector("#curpoProductos").innerHTML = cuerpoTabla;
  bindearBotonComprar();
}
function bindearBotonComprar() {
  let botones = document.querySelectorAll(".btnAgregarAlCarrito");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", agregarAlCarrito);
  }
}
// FIN Productos
// Carrito
function listarCarrito() {
  let cuerpoTabla = "";

  for (let i = 0; i < sis.Carrito.length; i++) {
    cuerpoTabla += `<tr>
        <td><img src="${sis.Carrito[i].imagen}"></td>
        <td>${sis.Carrito[i].nombre}</td>
        <td>${sis.Carrito[i].precio}</td>
        <td>${sis.Carrito[i].cantUnidades}</td>
        <td><input type="button" value="Eliminar Producto" class="btnEliminarDelCarrito" data-id-Carrito="${sis.Carrito[i].id}"></td>
      </tr>`;
  }
  document.querySelector("#cuerpoCarrito").innerHTML = cuerpoTabla;
  bindearBotonEliminarDelCarrito();
}
function bindearBotonEliminarDelCarrito() {
  let botones = document.querySelectorAll(".btnEliminarDelCarrito");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", eliminarDelCarrito);
  }
}
function agregarAlCarrito() {
  let idProducto = Number(this.getAttribute("data-id-producto"));
  sis.agregarAlCarrito(idProducto);
  listarCarrito();
}
function eliminarDelCarrito() {
  let idCarrito = Number(this.getAttribute("data-id-Carrito"));
  sis.eliminarDelCarrito(idCarrito);
  listarCarrito();
}
// Fin Carrito
