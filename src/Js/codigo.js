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
  ocultar("secProductosOferta");
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
  mostrar("secProductosOferta", "block");
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
  let cuerpoTablaOferta = "";
  for (i = 0; i < sis.Productos.length; i++) {
    let prod = sis.Productos[i];
    cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><label for="numCantUnidades${prod.id}"><input type="number" id="numCantUnidades${prod.id}" min=1 value=1></td>
        <td>${prod.precio}</td>
        <td></td>
        <td><input type="button" value="Comprar" class="btnAgregarCompra" data-id-producto="${prod.id}"></td>
      </tr>`;
    if (prod.oferta === 1) {
      let precioConDescuento = descuentoFijo(prod.precio, 20);
      cuerpoTablaOferta += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><label for="numCantUnidadesOferta${prod.id}"><input type="number" id="numCantUnidadesOferta${prod.id}" min=1 value=1></td>
        <td>${prod.precio}</td>
        <td>20% OFF ${precioConDescuento.toFixed(0)}</td>
        <td><input type="button" value="Comprar" class="btnAgregarCompraOferta" data-id-producto="${prod.id}"></td>
      </tr>`;
    }
  }
  document.querySelector("#curpoProductos").innerHTML = cuerpoTabla;
  document.querySelector("#curpoProductosOferta").innerHTML = cuerpoTablaOferta;
  bindearBotonComprar();
}
function bindearBotonComprar() {
  let botones = document.querySelectorAll(".btnAgregarCompra");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", agregarCompra);
  }
}
function bindearBotonComprarOferta() {
  let botones = document.querySelectorAll(".btnAgregarCompraOferta");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", agregarCompraOferta);
  }
}
// FIN Productos
// Compra
function descuentoFijo(precio, descuento) {
  return precio - (precio * descuento) / 100;
}
function listarCompra() {
  let cuerpoTabla = "";
  for (i = 0; i < sis.Compra.length; i++) {
    let prod = sis.Compra[i];
    if (prod.oferta === 1) {
      let precioConDescuento = descuentoFijo(prod.precio, 20);
      cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${precioConDescuento.toFixed(0) * prod.cantUnidades}</td>
        <td>${prod.cantUnidades}</td>
        <td><input type="button" value="Cancelar Compra" class="btnCancelarCompra" data-id-Cancelar-Compra="${prod.id}">
        <input type="button" value="Confirmar Compra" class="btnConfirmarCompra" data-id-Confirmar-Compra="${prod.id}"></td>
      </tr>`;
    } else {
      cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.precio * prod.cantUnidades}</td>
        <td>${prod.cantUnidades}</td>
        <td><input type="button" value="Cancelar Compra" class="btnCancelarCompra" data-id-Cancelar-Compra="${prod.id}">
        <input type="button" value="Confirmar Compra" class="btnConfirmarCompra" data-id-Confirmar-Compra="${prod.id}"></td>
      </tr>`;
    }
  }
  document.querySelector("#cuerpoCompra").innerHTML = cuerpoTabla;
  bindearBotonEliminarCompra();
}
function bindearBotonEliminarCompra() {
  let botones = document.querySelectorAll(".btnCancelarCompra");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", eliminarCompra);
  }
}

// Editar compra
function agregarCompra() {
  let idProducto = this.getAttribute("data-id-producto");
  sis.agregarCompra(idProducto);
  listarCompra();
}
function agregarCompraOferta() {
  let idProducto = this.getAttribute("data-id-producto");
  sis.agregarCompraOferta(idProducto);
  listarCompra();
}
function eliminarCompra() {
  let idCompra = this.getAttribute("data-id-Cancelar-Compra");
  sis.eliminarCompra(idCompra);
  listarCompra();
}
// Fin Compra
