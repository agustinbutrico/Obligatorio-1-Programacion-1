// ID Precargados
idUsuarioGlob = 3;
idProductoGlob = 4;
idCompraGlob = 1;
// FIN ID Precargados
let esOferta = false;

class Sistema {
  constructor() {
    this.Administradores = [new Administrador("Valentin", "123"), new Administrador("Agustin", "321"), new Administrador("Instalador", "wwzz2233")];

    this.Usuarios = [
      new Usuario(0, 3000, "Nahu515", "Panda2803", "Nahuel", "Sosa", "WWWW-XXXX-YYYY-ZZZZ", "234", 0),
      new Usuario(1, 3000, "Juan", "Juanico1", "Jose", "Jose", "WVVW-XYYX-YGGY-ZFFZ", "967", 0),
      new Usuario(2, 3000, "user", "user", "Usuario", "Test", "WVVW-XYYX-YGGY-ZFFZ", "999", 0),
    ];

    this.Productos = [
      new Producto(
        "PROD_ID_0",
        "Calzado Basket Long",
        300,
        "Calzado Basket<br>Talles: 38,39,40,41,42,43",
        "src/Img/calzado-basket-long.jpg",
        10,
        1,
        0,
        1
      ),
      new Producto(
        "PROD_ID_1",
        "Patín Artístico SANZ Profesional",
        400,
        "Bota rigida, chasis de aluminio reforzado y cuenta con rulemanes abec 7 de carbono y acero",
        "src/Img/patin-sanz.jpg",
        15,
        1,
        0,
        1
      ),
      new Producto("PROD_ID_2", "Pelota de Futbol", 25, "Una pelota de futbol de 26 pulgadas blanca y negra", "src/Img/pelota.jpg", 300, 1, 1, 1),
      new Producto(
        "PROD_ID_3",
        "Pack de deporte Familiar",
        667,
        "Un grupo de articulos deportivos para disfrutar en familia",
        "src/Img/pack-deporte.jpg",
        2,
        1,
        1,
        1
      ),
    ];
    this.Compra = [
      new Compra("PROD_ID_3", "COMPRA_ID_0", "Pack de deporte Familiar", 667, "src/Img/pack-deporte.jpg", 23, "2Cancelado", 1, 4, "Instalador"),
    ];
  }
  // Permite registrar usuarios con id auto incremental y saldo base precargado
  registrarUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC) {
    this.Usuarios.push(new Usuario(idUsuarioGlob, 3000, pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC, 0));
    idUsuarioGlob++;
  }
  // Permite saber si el nombre de usuario esta en uso por un administrador
  existeAdministrador(pNombreUsuario) {
    for (let i = 0; i < this.Administradores.length; i++) {
      if (this.Administradores[i].nombreUsuario === pNombreUsuario) {
        return true;
      }
    }
  }
  // Permite saber si el nombre de usuario esta en uso por un usuario
  existeUsuario(pNombreUsuario) {
    for (let i = 0; i < this.Usuarios.length; i++) {
      if (this.Usuarios[i].nombreUsuario === pNombreUsuario) {
        return true;
      }
    }
  }
  // Verifica que el nombre de usuario y contraseña sean correctos
  verificarCredencialesAdministrador(pNombreUsuario, pContrasenia) {
    for (let i = 0; i < this.Administradores.length; i++) {
      if (this.Administradores[i].nombreUsuario === pNombreUsuario && this.Administradores[i].contrasenia === pContrasenia) {
        return true;
      }
    }
  }
  // Verifica que el nombre de usuario y contraseña sean correctos
  verificarCredencialesUsuario(pNombreUsuario, pContrasenia) {
    for (let i = 0; i < this.Usuarios.length; i++) {
      if (this.Usuarios[i].nombreUsuario === pNombreUsuario && this.Usuarios[i].contrasenia === pContrasenia) {
        return true;
      }
    }
  }
  // Funciones productos
  // Añade un producto nuevo a Productos
  agregarProducto(pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta) {
    let idProductoTemp = `PROD_ID_${idProductoGlob}`;
    this.Productos.push(new Producto(idProductoTemp, pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta));
    idProductoGlob++;
  }
  // Elimina un producto existente de Productos
  eliminarProducto(pIdProducto) {
    for (let i = 0; i < this.Productos.length; i++) {
      if (this.Productos[i].id === pIdProducto) {
        this.Productos.splice(i, 1);
        break;
      }
    }
  }
  // Edita un producto existente en Productos
  modificarProducto(pId, campoStock, campoEstado, campoOferta) {
    let prod = this.obtenerProductoPorId(pId);
    prod.stock = campoStock;
    prod.estado = campoEstado;
    prod.oferta = campoOferta;
  }
  // Obtiene los meta datos de un producto existente en Productos
  obtenerProductoPorId(pIdProducto) {
    for (let i = 0; i < this.Productos.length; i++) {
      let prod = this.Productos[i];
      if (pIdProducto === prod.id) {
        return prod;
      }
    }
    return null;
  }
  // FIN Funciones productos
  // Funciones compra
  obtenerCompraPorId(pIdCompra) {
    for (let i = 0; i < this.Compra.length; i++) {
      let prod = this.Compra[i];
      if (pIdCompra === prod.id) {
        return prod;
      }
    }
    return null;
  }
  agregarCompra(pIdProducto, pCantUnidades, pUsuarioActivo) {
    let idCompraTemp = `COMPRA_ID_${idCompraGlob}`;
    let prod = this.obtenerProductoPorId(pIdProducto);
    let cantUnidades = pCantUnidades;
    this.Compra.push(
      new Compra(idCompraTemp, prod.id, prod.nombre, prod.precio, prod.imagen, prod.stock, `1Pendiente`, prod.oferta, cantUnidades, pUsuarioActivo)
    );
    idCompraGlob++;
  }
  cancelarCompra(pIdCompra) {
    let prod = this.obtenerCompraPorId(pIdCompra);
    prod.estado = `2Cancelado`;
  }

  // FIN Funciones compra
}
