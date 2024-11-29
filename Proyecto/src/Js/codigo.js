let sis = new Sistema();
let esAdministrador = false;
let usuarioActivo = "";
mostrarIngreso();
cargarImagenes();
cargarFiltrosCompra();

// eventos de ingreso
document.querySelector("#btnIngresar").addEventListener("click", ingreso);
// eventos de registro
document.querySelector("#btnRegistrar").addEventListener("click", registro);
document.querySelector("#aCrearCuenta").addEventListener("click", mostrarRegistro);

// eventos de navegación usuario
document.querySelector("#aIrACompras").addEventListener("click", mostrarCompra);
document.querySelector("#aListarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aListarProductosOferta").addEventListener("click", mostrarOfertas);
document.querySelector("#aSalirDelSistema").addEventListener("click", mostrarIngreso);

// eventos de navegación administrador
document.querySelector("#aAdministrarCompras").addEventListener("click", mostrarCompra);
document.querySelector("#aAdministrarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#aAdministrarsOferta").addEventListener("click", mostrarOfertas);
document.querySelector("#aCrearProductos").addEventListener("click", mostrarCrearProductos);
document.querySelector("#aSalirDelSistemaAdmin").addEventListener("click", mostrarIngreso);

// eventos de modificar productos administrador
document.querySelector("#btnCancelarModificar").addEventListener("click", mostrarProductos);
document.querySelector("#btnConfirmarModificar").addEventListener("click", modificarProducto);

// eventos de crear productos administrador
document.querySelector("#btnCancelarCrear").addEventListener("click", mostrarProductos);
document.querySelector("#btnConfirmarCrear").addEventListener("click", crearProducto);

// eventos de filtro tabla compra
document.querySelector("#slcFiltroCompra").addEventListener("change", listarCompra);
document.querySelector("#txtFiltroUsuarioCompra").addEventListener("change", listarCompra);

// Mostrar / Ocultar
// Mostrar contenido por id
function mostrar(pId, estilo) {
  document.querySelector("#" + pId).style.display = estilo;
}
// Ocultar contenido por id
function ocultar(pId) {
  document.querySelector("#" + pId).style.display = "none";
}
// Ocultar todo el contenido
function ocultarTodo() {
  ocultar("secNavegacion");
  ocultar("secIngreso");
  ocultar("secRegistro");
  ocultar("secProductos");
  ocultar("secCompra");
  ocultar("secProductosOferta");
  ocultar("secModificar");
  ocultar("secCrearProducto");
  console.log("Ocultando todo");
}
// Muestra la navegacion del tipo de usuario activo
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
// Muestra el ingreso
function mostrarIngreso() {
  ocultarTodo();
  mostrar("secIngreso", "block");
  document.querySelector("#pErrorIngreso").innerHTML = "";
  console.log("Mostrando pantalla de ingreso");
}
// Muestra el registro
function mostrarRegistro() {
  ocultarTodo();
  mostrar("secRegistro", "block");
  document.querySelector("#pErrorRegistro").innerHTML = "";
  console.log("Mostrando registro");
}
// Muestra los productos
function mostrarProductos() {
  ocultarTodo();
  mostrarNavegacion();
  listarProductos();
  mostrar("secProductos", "block");
  console.log("Mostrando productos");
}
// Muestra las ofertas
function mostrarOfertas() {
  ocultarTodo();
  mostrarNavegacion();
  listarProductos();
  mostrar("secProductosOferta", "block");
  console.log("Mostrando ofertas");
}
// Muestra las compras
function mostrarCompra() {
  ocultarTodo();
  listarCompra();
  mostrarNavegacion();
  mostrar("secCompra", "block");
  console.log("Mostrando compra");
}
// Muestra el menu de modificación de producto
function mostrarModificarProducto() {
  ocultarTodo();
  mostrarNavegacion();
  mostrar("secModificar", "block");
  console.log("Mostrando modificar producto");
}
// Muestra el menu de creación de producto
function mostrarCrearProductos() {
  ocultarTodo();
  mostrarNavegacion();
  mostrar("secCrearProducto", "block");
  console.log("Mostrando creación de productos");
}
// FIN Mostrar / Ocultar
// Validaciones
// Retorna true cuando el campo es vacío
function campoVacio(campo) {
  return campo === "";
}
// Retorna un array que valida [0] existen mayusculas en campo, [1] existen minusculas en campo y [2] existen numeros en campo
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
// Le aplica el algoritmo de Luhn a la tarjeta y devuelve true cuando el resto de suma es 0
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
// Toma los datos del registro, los valida, añade el usuario validado y muestra el ingreso
function registro() {
  // Toma de datos
  let usuario = document.querySelector("#txtUsuarioRegistro").value;
  let contrasenia = document.querySelector("#txtPassRegistro").value;
  let nombre = document.querySelector("#txtNombreRegistro").value;
  let apellido = document.querySelector("#txtApellidoRegistro").value;
  let tarjeta = limpiarTarjeta(document.querySelector("#numTarjetaRegistro").value);
  let cvc = Number(document.querySelector("#txtCVCRegistro").value);
  document.querySelector("#pErrorRegistro").innerHTML = "";

  // Validaciones
  if (campoVacio(usuario) || campoVacio(contrasenia) || campoVacio(nombre) || campoVacio(apellido) || campoVacio(tarjeta) || campoVacio(cvc)) {
    document.querySelector("#pErrorRegistro").innerHTML = "No pueden haber campos vacios";
  } else if (contrasenia.length <= 5) {
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
  } else if (isNaN(cvc) || cvc.length === 3) {
    document.querySelector("#pErrorRegistro").innerHTML = "El código cvc debe tener 3 números";
  } else {
    // Añade el usuario
    sis.registrarUsuario(usuario, contrasenia, nombre, apellido, tarjeta, cvc);
    // Muestra el ingreso
    mostrarIngreso();
  }
}
// elimina todo lo que no sean números de la tarjeta
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
// Toma los datos del ingreso, valida que los campos no sean vacios y entra al sistema con el tipo de usuario correspondiente
function ingreso() {
  // Toma de datos
  usuario = document.querySelector("#txtUsuarioIngreso").value;
  contrasenia = document.querySelector("#passContraseniaIngreso").value;

  // Validación campo vacio
  if (campoVacio(usuario) || campoVacio(contrasenia)) {
    document.querySelector("#pErrorIngreso").innerHTML = "No pueden haber campos vacios";
  } else if (sis.verificarCredencialesAdministrador(usuario, contrasenia)) {
    // Si usuario y contraseña en sis.Administrador entonces ingresa como administrador
    esAdministrador = true;
    // Guarda el usuario de la sesion activa
    usuarioActivo = usuario;
    // activa los filtros de administrador
    administrarFiltros();
    ocultarTodo();
    mostrarProductos();
  } else if (sis.verificarCredencialesUsuario(usuario, contrasenia)) {
    // Si usuario y contraseña en sis.Usuarios entonces ingresa como usuario
    esAdministrador = false;
    // Guarda el usuario de la sesion activa
    usuarioActivo = usuario;
    // activa los filtros de usuario
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
// Lista los productos creando botones de forma dinamica
function listarProductos() {
  // Contenido de la tabla
  let tituloTabla = "";
  let tituloTablaOferta = "";
  let cuerpoTabla = "";
  let cuerpoTablaOferta = "";
  // Registra si existe producto del tipo
  let existenProducto = false;
  let existenProductoOferta = false;

  // Recorre sis.Productos
  for (i = 0; i < sis.Productos.length; i++) {
    let prod = sis.Productos[i];
    let productoPausado = false;

    // Permite ocultar los productos pausados a los usuarios
    if (!esAdministrador) {
      if (prod.stock <= 0 || prod.estado === 0) {
        productoPausado = true;
      }
    }
    if (!productoPausado) {
      existenProducto = true;
      // Lista el cuerpo de la tabla productos
      cuerpoTabla += `<tr>
        <td><img src="${prod.imagen}"></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td><input type="number" id="numCantUnidades${prod.id}" value=1 min=1 style="display: inline-block;"></td>  
        <td>${calcularPrecio(prod.oferta, prod.precio, prod.cantUnidades, 20)} <small>US$</small></td>`;
      // Datos variables entre administrador y usuario
      if (esAdministrador) {
        cuerpoTabla += `
          <td>${prod.oferta}</td>
          <td>${prod.estado}</td>
          <td>${prod.stock}</td>
          <td>${prod.unidadesVendidas}</td>`;
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
        // Genera el cuerpo de la tabla productos
        cuerpoTablaOferta += `<tr>
          <td><img src="${prod.imagen}"></td>
          <td>${prod.nombre}</td>
          <td>${prod.descripcion}</td>
          <td><input type="number" id="numCantUnidadesOferta${prod.id}" value=1 min=1 style="display: inline-block;"></td>
          <td>${calcularPrecio(prod.oferta, prod.precio, prod.cantUnidades, 20)} <small>US$</small></td>`;
        // Datos variables entre administrador y usuario
        if (esAdministrador) {
          cuerpoTablaOferta += `
            <td>${prod.oferta}</td>
            <td>${prod.estado}</td>
            <td>${prod.stock}</td>
            <td>${prod.unidadesVendidas}</td>`;
          // Concatena dos botones
          cuerpoTablaOferta += `
            <td><input class="btnModificarProducto" type="button" value="Modificar" data-id-producto="${prod.id}" style="display: inline-block;">
            <input class="btnEliminarProducto" type="button" value="Eliminar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        } else if (!esAdministrador) {
          cuerpoTablaOferta += `<td>20% OFF</td>`;
          // Concatena un boton
          cuerpoTablaOferta += `<td><input class="btnAgregarCompraOferta" type="button" value="Comprar" data-id-producto="${prod.id}" style="display: inline-block;"></td></tr>`;
        }
      }
    }
  }
  // Lista el cabezal de la tabla productos si hay productos
  if (existenProducto) {
    tituloTabla = tituloTablaProductos();
  }
  // Lista el cabezal de la tabla ofertas si hay productos
  if (existenProductoOferta) {
    tituloTablaOferta = tituloTablaProductos(existenProductoOferta);
  }
  // Añade el dinero ganado por productos en estado 3Realizado
  if (esAdministrador) {
    cuerpoTabla = dineroGanancia(cuerpoTabla);
  }
  // Carga la tabla al html
  document.querySelector("#tituloProductos").innerHTML = tituloTabla;
  document.querySelector("#tituloProductosOferta").innerHTML = tituloTablaOferta;
  document.querySelector("#curpoProductos").innerHTML = cuerpoTabla;
  document.querySelector("#curpoProductosOferta").innerHTML = cuerpoTablaOferta;
  // bindea los botones creados
  bindearBotonComprar();
  bindearBotonComprarOferta();
  bindearBotonEliminarProducto();
  bindearPrecargaModificarProducto();
}
// Lista el cabezal de la tabla productos
function tituloTablaProductos(pEsOferta) {
  tituloTabla = `
    <th style="width: 5%;">Producto</th>
    <th style="width: 10%;">Nombre</th>
    <th style="width: 50%;">Descripcion</th>
    <th style="width: 30px;">Cantidad</th>`;
  if (esAdministrador) {
    tituloTabla += `
      <th style="width: 10%;">Precio</th>
      <th style="width: 5%;">Oferta</th>
      <th style="width: 5%;">Estado</th>
      <th style="width: 5%;">Stock</th>
      <th style="width: 5%;">Vendidas</th>`;
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
// Lista las compras creando botones de forma dinamica
function listarCompra() {
  // Toma los filtros
  let filtro = document.querySelector("#slcFiltroCompra").value;
  let filtroUsuario = document.querySelector("#txtFiltroUsuarioCompra").value;
  // Contenido de la tabla
  let tituloTabla = "";
  let cuerpoTabla = "";
  let lista1 = "";
  let lista2 = "";
  let lista3 = "";

  // Lista la compra si existen compras
  if (sis.Compra.length > 0) {
    // Recorre sis.Compra
    for (i = 0; i < sis.Compra.length; i++) {
      let prod = sis.Compra[i];

      // Recorre los filtros
      if (filtro === "0") {
        // Para administrador ordena las compras por 1Pendiente, 2Cancelada, 3Realizada y permite filtrar independientemente por cada uno de los estados
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
    // Permite ordena las compras por 1Pendiente, 2Cancelada, 3Realizada
    cuerpoTabla += lista1 + lista2 + lista3;
    // Lista el cabezal de la tabla compras si hay productos
    if (cuerpoTabla.length > 0) {
      tituloTabla = tituloTablaCompra();
    }
  }
  // Añade el dinero en cuenta y el resumen de cuenta de la suma de los productos en estado 3Realizado
  if (!esAdministrador) {
    let usua = sis.obtenerUsuarioPorUsuario(usuarioActivo);
    cuerpoTabla = cuerpoTabla.slice(0, -5) + dineroEnCuenta(usua);
  }
  // Carga la tabla al html
  document.querySelector("#tituloCompra").innerHTML = tituloTabla;
  document.querySelector("#cuerpoCompra").innerHTML = cuerpoTabla;
  // bindea los botones creados
  bindearBotonCancelarCompra();
  bindearBotonAprobarCompra();
}
// Lista el cabezal de la tabla compras
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
// Lista el cuerpo de la tabla compras
function cuerpoTablaCompra(pProd, pFiltroUsuario) {
  let cuerpoTabla = "";

  // Permite que el usuario vea sus compras y el administrador vea todos las compras
  if (pProd.usuarioComprador === usuarioActivo || esAdministrador) {
    // Lista la compra si en el filtro buscar usuario existe una sub-cadena case-insensitive de el nombre del usuario
    if (pProd.usuarioComprador.toLowerCase().indexOf(pFiltroUsuario.toLowerCase()) !== -1) {
      // Lista el cuerpo de la tabla compras
      cuerpoTabla += `
        <tr><td>${pProd.estado.slice(1)}</td>
        <td><img src="${pProd.imagen}"></td>
        <td>${pProd.nombre}</td>
        <td>${calcularPrecio(pProd.oferta, pProd.precio, pProd.cantUnidades, 20)} <small>US$</small></td>
        <td>${pProd.cantUnidades}</td>`;
      // Datos variables entre administrador y usuario
      if (esAdministrador) {
        // Indica el usuario al que pertenece la compra
        cuerpoTabla += `<td>${pProd.usuarioComprador}</td>`;
        // Muestra el boton cuando el producto no está Aprobado sino deja el espacio vacío
        if (pProd.estado === "1Pendiente") {
          cuerpoTabla += `<td><input class="btnAprobarCompra" type="button" value="Aprobar Compra" data-id-Aprobar-Compra="${pProd.id}" style="display: inline-block;"></td></tr>`;
        } else {
          cuerpoTabla += `<td></td></tr>`;
        }
      } else if (!esAdministrador) {
        // Muestra el boton cuando el producto no está cancelado sino deja el espacio vacío
        if (pProd.estado === "1Pendiente") {
          cuerpoTabla += `<td><input class="btnCancelarCompra" type="button" value="Cancelar Compra" data-id-Cancelar-Compra="${pProd.id}" style="display: inline-block;"></td></tr>`;
        } else {
          cuerpoTabla += `<td></td></tr>`;
        }
      }
    }
  }
  return cuerpoTabla;
}
// Añade el dinero en cuenta y el resumen de cuenta de la suma de los productos en estado 3Realizado
function dineroEnCuenta(pUsua) {
  return `
    <tr><td colspan="6">Saldo disponible: ${pUsua.saldo} <small>US$</small></td></tr>
    </tr><td colspan="6">Resumen de cuenta: ${pUsua.deuda} <small>US$</small></td></tr>`;
}
// Añade el dinero ganado por productos en estado 3Realizado
function dineroGanancia(pCuerpoTabla) {
  let ganancias = 0;
  // Recorre sis.Compra
  for (let i = 0; i < sis.Compra.length; i++) {
    let comp = sis.Compra[i];
    // Suma el precio de la compra si su estado es 3Realizada
    if (comp.estado.charAt(0) === "3") {
      ganancias += calcularPrecio(comp.oferta, comp.precio, comp.cantUnidades, 20);
    }
  }
  // Elimina el </tr> de pCuerpoTabla y le concatena las ganancias
  return pCuerpoTabla.slice(0, -5) + `<tr><td colspan="10">Ganancias: ${ganancias} <small>US$</small></td></tr>`;
}
// FIN Compra

// Filtros
// Muestra y oculta los filtros dependiendo el tipo de usuario
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
// Diferencia los botones comprar creados en la tabla productos
function bindearBotonComprar() {
  let botones = document.querySelectorAll(".btnAgregarCompra");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", agregarCompra);
  }
}
// Diferencia los botones comprar oferta creados en la tabla productos
function bindearBotonComprarOferta() {
  let botones = document.querySelectorAll(".btnAgregarCompraOferta");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", agregarCompraOferta);
  }
}
// Diferencia los botones eliminar producto creados en la tabla productos
function bindearBotonEliminarProducto() {
  let botones = document.querySelectorAll(".btnEliminarProducto");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", eliminarProducto);
  }
}
// Diferencia los botones modificar producto creados en la tabla productos
function bindearPrecargaModificarProducto() {
  let botones = document.querySelectorAll(".btnModificarProducto");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", precargaModificarProducto);
  }
}
// Diferencia los botones cancelar compra creados en la tabla compras
function bindearBotonCancelarCompra() {
  let botones = document.querySelectorAll(".btnCancelarCompra");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", cancelarCompra);
  }
}
// Diferencia los botones aprobar compra creados en la tabla compras
function bindearBotonAprobarCompra() {
  let botones = document.querySelectorAll(".btnAprobarCompra");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", aprobarCompra);
  }
}
// FIN Bindear

// Agregar
// Llama a la función agregarCompra en sistema y actualiza la tabla compra
function agregarCompra() {
  let idProducto = this.getAttribute("data-id-producto");
  let cantUnidades = Number(document.querySelector(`#numCantUnidades${idProducto}`).value);
  sis.agregarCompra(idProducto, cantUnidades, usuarioActivo);
  listarCompra();
}
// Llama a la función agregarCompra en sistema y actualiza la tabla compra
function agregarCompraOferta() {
  let idProducto = this.getAttribute("data-id-producto");
  let cantUnidades = Number(document.querySelector(`#numCantUnidadesOferta${idProducto}`).value);
  sis.agregarCompra(idProducto, cantUnidades, usuarioActivo);
  listarCompra();
}
// Toma los datos de secCompra, los valida, crea un nuevo producto y muestra la tabla productos
function crearProducto() {
  // Toma de datos
  let nombre = document.querySelector("#txtCrearNombre").value;
  let precio = Number(document.querySelector("#txtCrearPrecio").value);
  let descripcion = document.querySelector("#txtCrearDescripcion").value;
  let imagen = document.querySelector("#slcCrearImagen").value;
  let stock = Number(document.querySelector("#txtCrearStock").value);
  document.querySelector("#pErrorCrear").innerHTML = "";

  // Validación campos vacíos
  if (campoVacio(nombre) || campoVacio(precio) || campoVacio(descripcion) || imagen === "-1" || campoVacio(stock)) {
    document.querySelector("#pErrorCrear").innerHTML = "No pueden haber campos vacios";
  } else if (isNaN(precio)) {
    document.querySelector("#pErrorCrear").innerHTML = "El precio debe ser numérico";
  } else if (precio <= 0) {
    document.querySelector("#pErrorCrear").innerHTML = "El precio debe ser mayor que 0";
  } else if (isNaN(stock)) {
    document.querySelector("#pErrorCrear").innerHTML = "El stock debe ser numérico";
  } else if (stock <= 0) {
    document.querySelector("#pErrorCrear").innerHTML = "El stock debe ser mayor que 0";
  } else {
    // Creación del nuevo producto
    sis.crearProducto(nombre, precio, descripcion, imagen, stock);
    // Muestra la tabla productos
    mostrarProductos();
  }
}
// FIN Agregar
// Modificar
// Inyecta los datos del producto en secModificar y muestra el menú secModificar
function precargaModificarProducto() {
  let idProducto = this.getAttribute("data-id-producto");
  let prod = sis.obtenerProductoPorId(idProducto);
  // Inyección de datos
  document.querySelector("#txtModificarId").value = prod.id;
  document.querySelector("#txtModificarStock").value = prod.stock;
  document.querySelector("#slcModificarEstado").value = prod.estado;
  document.querySelector("#slcModificarOferta").value = prod.oferta;
  document.querySelector("#pErrorModificar").innerHTML = "";
  // Muestra el menú secModificar
  mostrarModificarProducto();
}
// Toma los datos de secModificar, valida los campos, modifica el producto y muestra la tabla productos
function modificarProducto() {
  // Toma de datos
  let idProducto = document.querySelector("#txtModificarId").value;
  let campoStock = document.querySelector("#txtModificarStock").value;
  let campoEstado = document.querySelector("#slcModificarEstado").value;
  let campoOferta = document.querySelector("#slcModificarOferta").value;
  document.querySelector("#pErrorModificar").innerHTML = "";

  // Validación campos vacíos
  if (campoVacio(idProducto) || campoVacio(campoStock) || campoVacio(campoEstado) || campoVacio(campoOferta)) {
    document.querySelector("#pErrorModificar").innerHTML = "No pueden haber campos vacios";
  } else if (isNaN(Number(campoStock))) {
    document.querySelector("#pErrorModificar").innerHTML = "El stock debe ser numérico";
  } else if (campoStock < 0) {
    document.querySelector("#pErrorModificar").innerHTML = "El stock debe ser positivo";
  } else {
    campoStock = Number(campoStock);
    // Modifica el producto
    sis.modificarProducto(idProducto, campoStock, campoEstado, campoOferta);
    // Muestra la tabla productos
    mostrarProductos();
  }
}
// FIN Modificar
// Cancelar
function cancelarCompra() {
  let idCompra = this.getAttribute("data-id-Cancelar-Compra");
  // Cambia el estado de la compra a 2Cancelado
  sis.cancelarCompra(idCompra);
  // Actualiza la tabla productos
  listarCompra();
}
// FIN Cancelar
// Aprobar
function aprobarCompra() {
  let idCompra = this.getAttribute("data-id-Aprobar-Compra");
  // Cambia el estado de la compra a 3Realizada
  sis.aprobarCompra(idCompra);
  // Actualiza la tabla productos
  listarCompra();
}
// FIN Aprobar
// Eliminar
function eliminarProducto() {
  let idProducto = this.getAttribute("data-id-producto");
  // Elimina el producto de la tabla productos
  sis.eliminarProducto(idProducto);
  // Actualiza la tabla productos
  listarProductos();
}
// FIN Eliminar

// Calculos
function calcularPrecio(pOferta, pPrecio, pCantUnidades, pDescuento) {
  let valor = 0;
  if (Number(pOferta) === 1) {
    // Calcula el precio base de descuento
    valor = Number(pPrecio) - (Number(pPrecio) * Number(pDescuento)) / 100;
    valor = valor.toFixed(0);
  } else if (Number(pOferta) === 0) {
    // Establece el precio base si el producto no está en oferta
    valor = Number(pPrecio);
  }
  return valor * pCantUnidades;
}
// FIN Calculos

// Cargar datos
function cargarFiltrosCompra() {
  // Inyecta los filtros de la tabla compra
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
function cargarImagenes() {
  // Inyecta las opciones a slcCrearImagen
  let combo = '<option value="-1">Seleccione...</option>';
  // Recorre sis.Imagenes
  for (let i = 0; i < sis.Imagenes.length; i++) {
    let img = sis.Imagenes[i];
    let nombreImg = img.substring(img.lastIndexOf("/") + 1);
    combo += `<option value="${img}">${nombreImg}</option>`;
  }
  document.querySelector("#slcCrearImagen").innerHTML = combo;
}
// FIN Cargar datos
