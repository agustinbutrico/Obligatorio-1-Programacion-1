document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", mostrarRegistro);

document.querySelector("#aIrACompras").addEventListener("click", mostrarCompra);
document.querySelector("#aIrAOfertas").addEventListener("click", mostrarOfertas);
document.querySelector("#aListarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aSalirDelSistema").addEventListener("click", mostrarIngreso);

document.querySelector("#aIrAComprasAdmin").addEventListener("click", mostrarCompra);
document.querySelector("#aListarProductosAdmin").addEventListener("click", mostrarProductos);
document.querySelector("#aCrearAdmin").addEventListener("click", mostrarAdministrarProductos);
document.querySelector("#aSalirDelSistemaAdmin").addEventListener("click", mostrarIngreso);

document.querySelector("#btnCancelarModificar").addEventListener("click", mostrarProductos);
document.querySelector("#btnConfirmarModificar").addEventListener("click", modificarProducto);

document.querySelector("#slcFiltroCompra").addEventListener("change", listarCompra);

let sis = new Sistema();
let esAdministrador = false;
mostrarIngreso();

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
  ocultar("secModificar");
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
  listarProductos();
  mostrar("secProductos", "block");
  mostrar("secProductosOferta", "block");
}
function mostrarOfertas() {
  ocultarTodo();
  mostrarNavegacion();
  listarProductos();
  mostrar("secProductosOferta", "block");
}

function mostrarCompra() {
  ocultarTodo();
  listarCompra();
  mostrarNavegacion();
  mostrar("secCompra", "block");
}
function mostrarModificarProducto() {
  ocultarTodo();
  mostrar("secModificar", "block");
}
function mostrarAdministrarProductos() {
  // Falta llenar
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
  let tarjeta = document.querySelector("#numTarjetaRegistro").value;
  tarjeta = limpiarTarjeta(tarjeta);
  let cvc = Number(document.querySelector("#txtCVCRegistro").value);
  document.querySelector("#pErrorRegistro").innerHTML = "";

  if (campoVacio(usuario) || campoVacio(contrasenia) || campoVacio(nombre) || campoVacio(apellido) || campoVacio(tarjeta) || campoVacio(cvc)) {
    document.querySelector("#pErrorRegistro").innerHTML = "No pueden haber campos vacios";
  } else {
    if (contrasenia.length <= 5) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener más de 5 caracteres";
    } else if (!validacionCampo(contrasenia)[0]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una mayúscula";
    } else if (!validacionCampo(contrasenia)[1]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una minúscula";
    } else if (!validacionCampo(contrasenia)[2]) {
      document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos un número";
    } else if (sis.existeAdministrador(usuario) || sis.existeUsuario(usuario)) {
      document.querySelector("#pErrorRegistro").innerHTML = "Nombre de usuario en uso";
    } else if (tarjeta.length !== 16) {
      document.querySelector("#pErrorRegistro").innerHTML = "La Tarjeta de credito debe tener 16 números";
    } else if (!validarTarjeta(tarjeta)) {
      document.querySelector("#pErrorRegistro").innerHTML = "La Tarjeta de credito tiene un formato incorrecto";
    } else if (cvc < 0) {
      document.querySelector("#pErrorRegistro").innerHTML = "El código cvc debe un número positivo";
    } else if (validacionCampo(cvc)[2] || cvc.length === 3) {
      document.querySelector("#pErrorRegistro").innerHTML = "El código cvc debe tener 3 números";
    } else {
      sis.registrarUsuario(usuario, contrasenia, nombre, apellido, tarjeta, cvc);
      // Mostrar
      mostrarIngreso();
    }
  }
}

function limpiarTarjeta(pTarjeta) {
  let tarjetaLimpia = "";
  for (let i = 0; i < pTarjeta.length; i++) {
    let l = pTarjeta.charAt(i);
    if (!isNaN(l)) {
      tarjetaLimpia += l;
    }
  }
  return tarjetaLimpia;
}
function validarTarjeta(pTarjeta) {
  if (!pTarjeta) {
    return false;
  } else {
    let suma = 0;
    let duplicar = false;

    for (let i = pTarjeta.length - 1; i >= 0; i--) {
      let n = Number(pTarjeta[i]);
      if (duplicar) {
        n *= 2;
        if (n > 9) {
          n -= 9;
        }
      }
      suma += n;
      duplicar = !duplicar;
    }
    return suma % 10 === 0;
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
    esAdministrador = false;
    ocultarTodo();
    mostrarNavegacion();
    mostrarProductos();
  } else {
    document.querySelector("#pErrorIngreso").innerHTML = "Usario y/o contraseña incorrectos";
  }
}
// FIN Ingreso
// Listar
function tituloTablaProductos(pEsOferta, pExistenProductos, pExistenProductosOferta) {
  tituloTabla = `
    <th style="width: 5%;">Producto</th>
    <th style="width: 10%;">Nombre</th>
    <th style="width: 50%;">Descripcion</th>
    <th style="width: 30px;">Cantidad</th>`;
  if (esAdministrador) {
    if (pExistenProductos && !pEsOferta) {
      tituloTabla += `
        <th style="width: 5%"></th>
        <th style="width: 5%;">Precio</th>
        <th style="width: 5%;">Stock</th>
        <th style="width: 5%;">Estado</th>`;
    } else if (pExistenProductosOferta && pEsOferta) {
      tituloTabla += `
        <th style="width: 5%;">Oferta</th>
        <th style="width: 5%;">Precio</th>
        <th style="width: 5%;">Stock</th>
        <th style="width: 5%;">Estado</th>`;
    }
  } else if (!esAdministrador) {
    if (pExistenProductos && !pEsOferta) {
      tituloTabla += `
        <th style="width: 5%;"></th>
        <th style="width: 5%;">Precio</th>`;
    } else if (pExistenProductosOferta && pEsOferta) {
      tituloTabla += `
        <th style="width: 5%;">Oferta</th>
        <th style="width: 5%;">Precio</th>`;
    }
  }
  tituloTabla += `
    <th style="width: 10%;">Acción</th>`;
  return tituloTabla;
}
function listarProductos() {
  let tituloTabla = "";
  let tituloTablaOferta = "";
  let cuerpoTabla = "";
  let cuerpoTablaOferta = "";
  let existenProductos = false;
  let existenProductosOferta = false;

  for (i = 0; i < sis.Productos.length; i++) {
    let prod = sis.Productos[i];
    if (prod.stock <= 0 || prod.estado === 0) {
    } else {
      // Lista Productos
      existenProductos = true;
      cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><input type="number" id="numCantUnidades${prod.id}" min=1 value=1 style="display: inline-block;"></td>
        <td></td>
        <td>${prod.precio} <small>US$</small></td>`;
      // Separa los botones de administrador y usuario
      if (esAdministrador) {
        // Concatena un boton
        cuerpoTabla += `<td>${prod.stock}</td>
                        <td>${prod.estado}</td>
                        <td><input type="button" value="Modificar" class="btnModificarProducto" data-id-producto="${prod.id}" style="display: inline-block;">
                        <input type="button" value="Eliminar" class="btnEliminarProducto" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
      } else if (!esAdministrador) {
        // Concatena un boton
        cuerpoTabla += `<td><input type="button" value="Comprar" class="btnAgregarCompra" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
      }

      // Lista Productos Oferta
      if (prod.oferta === 1) {
        existenProductosOferta = true;
        let precioConDescuento = descuentoFijo(prod.precio, 20);
        cuerpoTablaOferta += `<tr>
          <td><img src="${prod.imagen}"></td>
          <td>${prod.nombre}</td>
          <td>${prod.descripcion}</td>
          <td><input type="number" id="numCantUnidadesOferta${prod.id}" min=1 value=1 style="display: inline-block;"></td>
          <td>20% OFF</td>
          <td>${precioConDescuento.toFixed(0)} <small>US$</small></td>`;
        // Separa los botones de administrador y usuario
        if (esAdministrador) {
          // Concatena un boton
          cuerpoTablaOferta += `<td>${prod.stock}</td>
                                <td>${prod.estado}</td>
                                <td><input type="button" value="Modificar" class="btnModificarProducto" data-id-producto="${prod.id}" style="display: inline-block;">
                                <input type="button" value="Eliminar" class="btnEliminarProducto" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        } else if (!esAdministrador) {
          // Concatena un boton
          cuerpoTablaOferta += `<td><input type="button" value="Comprar" class="btnAgregarCompraOferta" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        }
      }
    }
  }
  if (existenProductos) {
    tituloTabla = tituloTablaProductos(false, existenProductos, existenProductosOferta);
  }
  if (existenProductosOferta) {
    tituloTablaOferta = tituloTablaProductos(true, existenProductos, existenProductosOferta);
  }
  document.querySelector("#tituloProductos").innerHTML = tituloTabla;
  document.querySelector("#tituloProductosOferta").innerHTML = tituloTablaOferta;
  document.querySelector("#curpoProductos").innerHTML = cuerpoTabla;
  document.querySelector("#curpoProductosOferta").innerHTML = cuerpoTablaOferta;
  bindearBotonComprar();
  bindearBotonComprarOferta();
  bindearBotonEliminarProducto();
  bindearPrecargaModificarProducto();
}
function cuerpoTablaCompra(prod) {
  let cuerpoTabla = "";
  let precioConDescuento = descuentoFijo(prod.precio, 20);
  cuerpoTabla += `
  <tr><td>${prod.estado.slice(1)}</td>
  <td><img src="${prod.imagen}"></td>
  <td>${prod.nombre}</td>`;
  if (prod.oferta === 1) {
    cuerpoTabla += `<td>${precioConDescuento.toFixed(0) * prod.cantUnidades} <small>US$</small></td>`;
  } else {
    cuerpoTabla += `<td>${prod.precio * prod.cantUnidades} <small>US$</small></td>`;
  }
  cuerpoTabla += `<td>${prod.cantUnidades}</td><td>`;
  // Separa los botones de adnimistrador y usuario
  if (esAdministrador) {
    // Concatena un boton
    cuerpoTabla += ``;
  } else {
    // Muestra el boton cuando el producto no está cancelado
    if (prod.estado !== "2Cancelado") {
      // Concatena un boton
      cuerpoTabla += `<input type="button" value="Cancelar Compra" class="btnCancelarCompra" data-id-Cancelar-Compra="${prod.id}" style="display: inline-block;">`;
    }
  }
  return cuerpoTabla;
}
function tituloTablaCompra() {
  let tituloTabla = "";
  tituloTabla = `
    <th>Estado</th>
    <th>Producto</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Cantidad</th>
    <th>Acción</th>`;
  return tituloTabla;
}
function listarCompra() {
  let filtro = document.querySelector("#slcFiltroCompra").value;
  let tituloTabla = "";
  let cuerpoTabla = "";
  if (sis.Compra.length > 0) {
    // Recorre la lista Compra
    for (i = 0; i < sis.Compra.length; i++) {
      let prod = sis.Compra[i];
      // Recorre los filtros
      if (filtro === "0") {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod);
      } else if (filtro === "1" && filtro === prod.estado.charAt(0)) {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod);
      } else if (filtro === "2" && filtro === prod.estado.charAt(0)) {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod);
      } else if (filtro === "3" && filtro === prod.estado.charAt(0)) {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod);
      }
    }
  }

  document.querySelector("#tituloCompra").innerHTML = tituloTabla;
  document.querySelector("#cuerpoCompra").innerHTML = cuerpoTabla;
  bindearBotonCancelarCompra();
}
// FIN Listar
// Bindear
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
function bindearBotonCancelarCompra() {
  let botones = document.querySelectorAll(".btnCancelarCompra");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", cancelarCompra);
  }
}
function bindearBotonEliminarProducto() {
  let botones = document.querySelectorAll(".btnEliminarProducto");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", eliminarProducto);
  }
}
function bindearPrecargaModificarProducto() {
  let botones = document.querySelectorAll(".btnModificarProducto");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", precargaModificarProducto);
  }
}
// FIN Bindear
// Agregar
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
// FIN Agregar
// Eliminar
function eliminarProducto() {
  let idProducto = this.getAttribute("data-id-producto");
  sis.eliminarProducto(idProducto);
  listarProductos();
}
// FIN Eliminar
// Editar
function precargaModificarProducto() {
  let idProducto = this.getAttribute("data-id-producto");
  let prod = sis.obtenerProductoPorId(idProducto);
  document.querySelector("#txtModificarId").value = prod.id;
  document.querySelector("#txtModificarStock").value = prod.stock;
  document.querySelector("#slcModificarEstado").value = prod.estado;
  document.querySelector("#slcModificarOferta").value = prod.oferta;
  mostrarModificarProducto();
}
function modificarProducto() {
  let idProducto = document.querySelector("#txtModificarId").value;
  let campoStock = document.querySelector("#txtModificarStock").value;
  let campoEstado = document.querySelector("#slcModificarEstado").value;
  let campoOferta = document.querySelector("#slcModificarOferta").value;
  if (txtModificarId !== "") {
    sis.modificarProducto(idProducto, campoStock, campoEstado, campoOferta);
  }
  mostrarProductos();
}
// FIN Editar
// Cancelar
function cancelarCompra() {
  let idCompra = this.getAttribute("data-id-Cancelar-Compra");
  sis.cancelarCompra(idCompra);
  listarCompra();
}
// FIN Cancelar
// Calculos
function descuentoFijo(precio, descuento) {
  return precio - (precio * descuento) / 100;
}
// FIN Calculos
