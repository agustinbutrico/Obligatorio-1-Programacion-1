document.querySelector("#btnIngresar").addEventListener("click", ingreso);
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", mostrarRegistro);

document.querySelector("#aIrACompras").addEventListener("click", mostrarCompra);
document.querySelector("#aListarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aListarProductosOferta").addEventListener("click", mostrarProductosOferta);
document.querySelector("#aSalirDelSistema").addEventListener("click", mostrarIngreso);

document.querySelector("#aAdministrarCompras").addEventListener("click", mostrarCompra);
document.querySelector("#aAdministrarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aAdministrarsOferta").addEventListener("click", mostrarOfertas);
document.querySelector("#aCrearProductos").addEventListener("click", mostrarCrearProductos);
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
  console.log("Mostrando compra");
}
function mostrarModificarProducto() {
  ocultarTodo();
  mostrar("secModificar", "block");
  console.log("Mostrando modificar producto");
}
function mostrarCrearProductos() {
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
// FIN Validaciones
// Registro
function registro() {
  let usuario = document.querySelector("#txtUsuarioRegistro").value;
  let contrasenia = document.querySelector("#txtPassRegistro").value;
  let nombre = document.querySelector("#txtNombreRegistro").value;
  let apellido = document.querySelector("#txtApellidoRegistro").value;
  let tarjeta = limpiarTarjeta(document.querySelector("#numTarjetaRegistro").value);
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
  console.log(`esAdministrador = ${esAdministrador}`);
  console.log(`usuarioActivo = ${usuarioActivo}`);
}
// FIN Ingreso
// Productos
function listarProductos() {
  let tituloTabla = "";
  let tituloTablaOferta = "";
  let cuerpoTabla = "";
  let cuerpoTablaOferta = "";
  let existenProducto = false;
  let existenProductoOferta = false;

  for (i = 0; i < sis.Productos.length; i++) {
    let prod = sis.Productos[i];
    let productoPausado = false;

    // Permite mostrar el producto aunque el stock y su estado sea 0 al administrador
    if (!esAdministrador) {
      if (prod.stock <= 0 || prod.estado === 0) {
        productoPausado = true;
      }
    }
    if (!productoPausado) {
      // Lista Productos
      existenProducto = true;
      cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><input type="number" id="numCantUnidades${prod.id}" value=1 min=1 style="display: inline-block;"></td>  
        <td>${prod.precio} <small>US$</small></td>`;
      // Separa los botones de administrador y usuario
      if (esAdministrador) {
        cuerpoTabla += `
          <td>${prod.oferta}</td>
          <td>${prod.estado}</td>
          <td>${prod.stock}</td>`
        // Concatena dos botones
        cuerpoTabla += `
          <td><input type="button" value="Modificar" class="btnModificarProducto" data-id-producto="${prod.id}" style="display: inline-block;">
          <input type="button" value="Eliminar" class="btnEliminarProducto" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
      } else if (!esAdministrador) {
        // Concatena un boton
        cuerpoTabla += `<td><input class="btnAgregarCompra" type="button" value="Comprar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
      }

      // Lista Productos Oferta
      if (prod.oferta === 1) {
        existenProductoOferta = true;
        let precioConDescuento = descuentoFijo(prod.precio, 20);
        cuerpoTablaOferta += `<tr>
          <td><img src="${prod.imagen}"></td>
          <td>${prod.nombre}</td>
          <td>${prod.descripcion}</td>
          <td><input type="number" id="numCantUnidadesOferta${prod.id}" value=1 min=1 style="display: inline-block;"></td>
          <td>${precioConDescuento.toFixed(0)} <small>US$</small></td>`;
        // Separa los botones de administrador y usuario
        if (esAdministrador) {
          cuerpoTablaOferta += `
            <td>${prod.oferta}</td>
            <td>${prod.estado}</td>
            <td>${prod.stock}</td>`
          // Concatena dos botones
          cuerpoTablaOferta += `
            <td><input class="btnModificarProducto" type="button" value="Modificar" data-id-producto="${prod.id}" style="display: inline-block;">
            <input class="btnEliminarProducto" type="button" value="Eliminar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        } else if (!esAdministrador) {
          cuerpoTablaOferta += `<td>20% OFF</td>`
          // Concatena un boton
          cuerpoTablaOferta += `<td><input class="btnAgregarCompraOferta" type="button" value="Comprar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        }
      }
    }
  }
  if (existenProducto) {
    tituloTabla = tituloTablaProductos();
  }
  if (existenProductoOferta) {
    tituloTablaOferta = tituloTablaProductos(existenProductoOferta);
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
function tituloTablaProductos(pEsOferta) {
  tituloTabla = `
    <th style="width: 5%;">Producto</th>
    <th style="width: 10%;">Nombre</th>
    <th style="width: 50%;">Descripcion</th>
    <th style="width: 30px;">Cantidad</th>`;
  if (esAdministrador) {
    tituloTabla += `
      <th style="width: 5%;">Precio</th>
      <th style="width: 5%;">Oferta</th>
      <th style="width: 5%;">Estado</th>
      <th style="width: 5%;">Stock</th>`;
  } else if (!esAdministrador) {
    tituloTabla += `
      <th style="width: 10%;">Precio</th>`;
    if (pEsOferta) {
      tituloTabla += `
        <th style="width: 5%;">Oferta</th>`;
    }
  }
  tituloTabla += `
    <th style="width: 10%;">Acción</th>`;
  return tituloTabla;
}
// FIN Productos
// Compra
function listarCompra() {
  let filtro = document.querySelector("#slcFiltroCompra").value;
  let filtroUsuario = document.querySelector("#txtFiltroUsuarioCompra").value;
  let tituloTabla = "";
  let cuerpoTabla = "";
  let lista1 = "";
  let lista2 = "";
  let lista3 = "";
  if (sis.Compra.length > 0) {
    // Recorre la lista Compra
    for (i = 0; i < sis.Compra.length; i++) {
      let prod = sis.Compra[i];
      // Recorre los filtros
      if (filtro === "0") {
        if (esAdministrador) {
          if (prod.estado.charAt(0) === "1") {
            lista1 += cuerpoTablaCompra(prod, filtroUsuario);
          }
          if (prod.estado.charAt(0) === "2") {
            lista2 += cuerpoTablaCompra(prod, filtroUsuario);
          }
          if (prod.estado.charAt(0) === "3") {
            lista3 += cuerpoTablaCompra(prod, filtroUsuario);
          }
        } else if (!esAdministrador) {
          cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
        }
      } else if (filtro === "1" && filtro === prod.estado.charAt(0)) {
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
      } else if (filtro === "2" && filtro === prod.estado.charAt(0)) {
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
      } else if (filtro === "3" && filtro === prod.estado.charAt(0)) {
        cuerpoTabla += cuerpoTablaCompra(prod, filtroUsuario);
      }
    }
    cuerpoTabla += lista1 + lista2 + lista3;
    if (cuerpoTabla.length > 0) {
      tituloTabla = tituloTablaCompra();
    }
  }
  if (!esAdministrador) {
    let usua = sis.obtenerUsuarioPorUsuario(usuarioActivo);
    cuerpoTabla = cuerpoTabla.slice(0, -5) + dineroEnCuenta(usua);
  }
  document.querySelector("#tituloCompra").innerHTML = tituloTabla;
  document.querySelector("#cuerpoCompra").innerHTML = cuerpoTabla;
  bindearBotonCancelarCompra();
  bindearBotonAprobarCompra();
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
  if (pProd.usuarioComprador === usuarioActivo || esAdministrador) {
    if (pProd.usuarioComprador.toLowerCase().indexOf(pFiltroUsuario.toLowerCase()) !== -1) {
      cuerpoTabla += `
      <tr><td>${pProd.estado.slice(1)}</td>
      <td><img src="${pProd.imagen}"></td>
      <td>${pProd.nombre}</td>`;
      if (pProd.oferta === 1) {
        cuerpoTabla += `<td>${precioConDescuento.toFixed(0) * pProd.cantUnidades} <small>US$</small></td>`;
      } else if (pProd.oferta === 0) {
        cuerpoTabla += `<td>${pProd.precio * pProd.cantUnidades} <small>US$</small></td>`;
      }
      cuerpoTabla += `<td>${pProd.cantUnidades}</td>`;
      // Separa los botones de adnimistrador y usuario
      if (esAdministrador) {
        // Concatena un boton
        cuerpoTabla += `<td>${pProd.usuarioComprador}</td>`;
        // Muestra el boton cuando el producto no está Aprobado
        if (pProd.estado === "1Pendiente") {
          // Concatena un boton
          cuerpoTabla += `<td><input class="btnAprobarCompra" type="button" value="Aprobar Compra" data-id-Aprobar-Compra="${pProd.id}" style="display: inline-block;"></td></tr>`;
        } else {
          cuerpoTabla += `<td></td></tr>`;
        }
      } else if (!esAdministrador) {
        // Muestra el boton cuando el producto no está cancelado
        if (pProd.estado === "1Pendiente") {
          // Concatena un boton
          cuerpoTabla += `<td><input class="btnCancelarCompra" type="button" value="Cancelar Compra" data-id-Cancelar-Compra="${pProd.id}" style="display: inline-block;"></td></tr>`;
        } else {
          cuerpoTabla += `<td></td></tr>`;
        }
      }
    }
  }
  return cuerpoTabla;
}
function dineroEnCuenta(pUsua) {
  return `
    <tr><td colspan="6">Saldo disponible: ${pUsua.saldo} <small>US$</small></td></tr>
    </tr><td colspan="6">Resumen de cuenta: ${pUsua.deuda} <small>US$</small></td></tr>`;
}
// FIN Compra

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
function bindearBotonAprobarCompra() {
  let botones = document.querySelectorAll(".btnAprobarCompra");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", aprobarCompra);
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
  let cantUnidades = Number(document.querySelector(`#numCantUnidades${idProducto}`).value);
  sis.agregarCompra(idProducto, cantUnidades, usuarioActivo);
  listarCompra();
}
function agregarCompraOferta() {
  let idProducto = this.getAttribute("data-id-producto");
  let cantUnidades = Number(document.querySelector(`#numCantUnidadesOferta${idProducto}`).value);
  sis.agregarCompra(idProducto, cantUnidades, usuarioActivo);
  listarCompra();
}
// FIN Agregar
// Modificar
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
  let campoStock = Number(document.querySelector("#txtModificarStock").value);
  let campoEstado = Number(document.querySelector("#slcModificarEstado").value);
  let campoOferta = Number(document.querySelector("#slcModificarOferta").value);
  if (txtModificarId !== "") {
    sis.modificarProducto(idProducto, campoStock, campoEstado, campoOferta);
  }
  mostrarProductos();
}
// FIN Modificar
// Cancelar
function cancelarCompra() {
  let idCompra = this.getAttribute("data-id-Cancelar-Compra");
  sis.cancelarCompra(idCompra);
  listarCompra();
}
// FIN Cancelar
// Aprobar
function aprobarCompra() {
  let idCompra = this.getAttribute("data-id-Aprobar-Compra");
  sis.aprobarCompra(idCompra);
  listarCompra();
}
// FIN Aprobar
// Eliminar
function eliminarProducto() {
  let idProducto = this.getAttribute("data-id-producto");
  sis.eliminarProducto(idProducto);
  listarProductos();
}
// FIN Eliminar

// Calculos
function descuentoFijo(precio, descuento) {
  return precio - (precio * descuento) / 100;
}
// FIN Calculos
