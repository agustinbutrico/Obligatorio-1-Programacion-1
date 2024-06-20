document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", mostrarRegistro);

document.querySelector("#aIrACompras").addEventListener("click", mostrarCompra);
document.querySelector("#aListarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aListarProductosOferta").addEventListener("click", mostrarProductosOferta);
document.querySelector("#aSalirDelSistema").addEventListener("click", mostrarIngreso);

document.querySelector("#aIrAComprasAdmin").addEventListener("click", mostrarCompra);
document.querySelector("#aListarProductosAdmin").addEventListener("click", mostrarProductos);
document.querySelector("#aCrearAdmin").addEventListener("click", mostrarAdministrarProductos);
document.querySelector("#aSalirDelSistemaAdmin").addEventListener("click", mostrarIngreso);

document.querySelector("#btnCancelarModificar").addEventListener("click", mostrarProductos);
document.querySelector("#btnConfirmarModificar").addEventListener("click", modificarProducto);

listarFiltrosCompra();
document.querySelector("#slcFiltroCompra").addEventListener("change", listarCompra);
document.querySelector("#txtFiltroUsuarioCompra").addEventListener("change", listarCompra);

let sis = new Sistema();
let esAdministrador = false;
let usuarioActivo = "";
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
  console.log("Oultando todo");
}
function mostrarNavegacion() {
  mostrar("secNavegacion", "block");
  if (esAdministrador) {
    ocultar("navUsuario");
    mostrar("navAdministrador", "flex");
    console.log("Mostrando navegación administrador");
  } else {
    mostrar("navUsuario", "flex");
    ocultar("navAdministrador");
    console.log("Mostrando navegación usuario");
  }
}
function mostrarIngreso() {
  ocultarTodo();
  mostrar("secIngreso", "block");
  document.querySelector("#pErrorIngreso").innerHTML = "";
  console.log("Mostrando pantalla de ingreso");
}
function mostrarRegistro() {
  ocultarTodo();
  mostrar("secRegistro", "block");
  document.querySelector("#pErrorRegistro").innerHTML = "";
  console.log("Mostrando registro");
}
function mostrarProductos() {
  ocultarTodo();
  mostrarNavegacion();
  listarProductos();
  mostrar("secProductos", "block");
  console.log("Mostrando productos");
}
function mostrarProductosOferta() {
  ocultarTodo();
  mostrarNavegacion();
  listarProductos();
  mostrar("secProductosOferta", "block");
  console.log("Mostrando productos en oferta");
}
function mostrarCompra() {
  ocultarTodo();
  listarCompra();
  mostrarNavegacion();
  mostrar("secCompra", "block");
  console.log("Mostrando compra");
}
function mostrarModificarProducto() {
  ocultarTodo();
  mostrar("secModificar", "block");
  console.log("Mostrando modificar producto");
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
    usuarioActivo = usuario;
    administrarFiltros();
    ocultarTodo();
    mostrarProductos();
  } else if (sis.verificarCredencialesUsuario(usuario, contrasenia)) {
    esAdministrador = false;
    usuarioActivo = usuario;
    administrarFiltros();
    ocultarTodo();
    mostrarProductos();
  } else {
    document.querySelector("#pErrorIngreso").innerHTML = "Usario y/o contraseña incorrectos";
  }
  console.log(`esAdministrador = ${esAdministrador}`)
  console.log(`usuarioActivo = ${usuarioActivo}`)
}
// FIN Ingreso
// Listar
// Productos
function tituloTablaProductos() {
  tituloTabla = `
    <th style="width: 5%;">Producto</th>
    <th style="width: 10%;">Nombre</th>
    <th style="width: 50%;">Descripcion</th>
    <th style="width: 30px;">Cantidad</th>`;
  if (esAdministrador) {
    tituloTabla += `
        <th style="width: 5%;">Oferta</th>
        <th style="width: 5%;">Precio</th>
        <th style="width: 5%;">Stock</th>
        <th style="width: 5%;">Estado</th>`;
  } else if (!esAdministrador) {
    tituloTabla += `
        <th style="width: 5%;">Oferta</th>
        <th style="width: 5%;">Precio</th>`;
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
    if (prod.stock > 0 && prod.estado !== 0) {
      // Lista Productos
      existenProductos = true;
      cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><input type="number" id="numCantUnidades${prod.id}" value=1 min=1 style="display: inline-block;"></td>
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
        cuerpoTabla += `<td><input class="btnAgregarCompra" type="button" value="Comprar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
      }

      // Lista Productos Oferta
      if (prod.oferta === 1) {
        existenProductosOferta = true;
        let precioConDescuento = descuentoFijo(prod.precio, 20);
        cuerpoTablaOferta += `<tr>
          <td><img src="${prod.imagen}"></td>
          <td>${prod.nombre}</td>
          <td>${prod.descripcion}</td>
          <td><input type="number" id="numCantUnidadesOferta${prod.id}" value=1 min=1 style="display: inline-block;"></td>
          <td>20% OFF</td>
          <td>${precioConDescuento.toFixed(0)} <small>US$</small></td>`;
        // Separa los botones de administrador y usuario
        if (esAdministrador) {
          // Concatena un boton
          cuerpoTablaOferta += `<td>${prod.stock}</td>
                                <td>${prod.estado}</td>
                                <td><input class="btnModificarProducto" type="button" value="Modificar" data-id-producto="${prod.id}" style="display: inline-block;">
                                <input class="btnEliminarProducto" type="button" value="Eliminar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        } else if (!esAdministrador) {
          // Concatena un boton
          cuerpoTablaOferta += `<td><input class="btnAgregarCompraOferta" type="button" value="Comprar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        }
      }
    }
  }
  if (existenProductos) {
    tituloTabla = tituloTablaProductos();
  }
  if (existenProductosOferta) {
    tituloTablaOferta = tituloTablaProductos();
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
// Filtros
function listarFiltrosCompra() {
  let filtros = `
    <label for="slcFiltroCompra">Filtrar por:</label>
    <select id="slcFiltroCompra">
      <option value="0">Todo</option>
      <option value="1">Pendientes</option>
      <option value="2">Canceladas</option>
      <option value="3">Realizadas</option>
    </select>
    <label for="txtFiltroUsuarioCompra" id="lFiltroUsuarioCompra">Filtrar Usuario:</label>
    <input type="text" id="txtFiltroUsuarioCompra">`;
  document.querySelector("#secCompra").innerHTML = filtros + document.querySelector("#secCompra").innerHTML;
}
function administrarFiltros() {
  if (esAdministrador) {
    document.querySelector("#lFiltroUsuarioCompra").style.display = "block";
    document.querySelector("#txtFiltroUsuarioCompra").style.display = "inline-block";
  } else if (!esAdministrador) {
    document.querySelector("#lFiltroUsuarioCompra").style.display = "none";
    document.querySelector("#txtFiltroUsuarioCompra").style.display = "none";
  }
}
// FIN Filtros
// Compra
function dineroEnCuenta(pUsuario) {
  return `Saldo disponible: ${pUsuario.saldo}<small>US$</small><br>Deuda acumulada: ${pUsuario.deuda}<small>US$</small>`;
}
function tituloTablaCompra() {
  let tituloTabla = "";
  tituloTabla = `
    <th>Estado</th>
    <th>Producto</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Cantidad</th>`;
  if (esAdministrador) {
    tituloTabla += `
      <th>Usuario</th>`;
  }
  tituloTabla += `<th>Acción</th>`;
  return tituloTabla;
}
function cuerpoTablaCompra(pProd, pFiltroUsuario) {
  let cuerpoTabla = "";
  let precioConDescuento = descuentoFijo(pProd.precio, 20);
  if (pProd.usuarioComprador.toLowerCase().indexOf(pFiltroUsuario.toLowerCase()) !== -1) {
    cuerpoTabla += `
    <tr><td>${pProd.estado.slice(1)}</td>
    <td><img src="${pProd.imagen}"></td>
    <td>${pProd.nombre}</td>`;
    if (pProd.oferta === 1) {
      cuerpoTabla += `<td>${precioConDescuento.toFixed(0) * pProd.cantUnidades} <small>US$</small></td>`;
    } else {
      cuerpoTabla += `<td>${pProd.precio * pProd.cantUnidades} <small>US$</small></td>`;
    }
    cuerpoTabla += `<td>${pProd.cantUnidades}</td>`;
    // Separa los botones de adnimistrador y usuario
    if (esAdministrador) {
      // Concatena un boton
      cuerpoTabla += `<td>${pProd.usuarioComprador}</td>`;
      cuerpoTabla += `<td></td>`;
    } else {
      // Muestra el boton cuando el producto no está cancelado
      if (pProd.estado === "1Pendiente") {
        // Concatena un boton
        cuerpoTabla += `<td><input type="button" value="Cancelar Compra" class="btnCancelarCompra" data-id-Cancelar-Compra="${pProd.id}" style="display: inline-block;"></td></tr>`;
      } else {
        cuerpoTabla += `<td></td></tr>`;
      }
    }
  }
  return cuerpoTabla;
}
function listarCompra() {
  let filtro = document.querySelector("#slcFiltroCompra").value;
  let filtroUsuario = document.querySelector("#txtFiltroUsuarioCompra").value;
  let tituloTabla = "";
  let cuerpoTabla = "";
  if (sis.Compra.length > 0) {
    // Recorre la lista Compra
    for (i = 0; i < sis.Compra.length; i++) {
      let prod = sis.Compra[i];
      // Recorre los filtros
      if (filtro === "0") {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
      } else if (filtro === "1" && filtro === prod.estado.charAt(0)) {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
      } else if (filtro === "2" && filtro === prod.estado.charAt(0)) {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
      } else if (filtro === "3" && filtro === prod.estado.charAt(0)) {
        tituloTabla = tituloTablaCompra();
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
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
  let cantUnidades = document.querySelector(`#numCantUnidades${idProducto}`).value
  sis.agregarCompra(idProducto, cantUnidades, usuarioActivo);
  listarCompra();
}
function agregarCompraOferta() {
  let idProducto = this.getAttribute("data-id-producto");
  let cantUnidades = document.querySelector(`#numCantUnidadesOferta${idProducto}`).value
  sis.agregarCompra(idProducto, cantUnidades, usuarioActivo);
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
