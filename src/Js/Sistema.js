// ID Precargados
idUsuarioGlob = 5;
idProductoGlob = 10;
idCompraGlob = 5;
// FIN ID Precargados
let esOferta = false;

class Sistema {
  constructor() {
    this.Administradores = [
      new Administrador("Valentin123", "123456"),
      new Administrador("Agustin", "321"),
      new Administrador("Instalador", "wwzz2233"),
      new Administrador("asd", "asd"),
      new Administrador("hola", "hola"),
    ];
    this.Usuarios = [
      new Usuario(0, 3000, "Nahu51", "Panda28", "Nahuel", "Sosa", "8723874590452378", "234", 0),
      new Usuario(1, 3000, "Juan", "Juanico", "Jose", "Jose", "9823874597452378", "967", 0),
      new Usuario(2, 3000, "user", "user", "Usuario", "Test", "3279873429876723", "999", 0),
      new Usuario(3, 3000, "Jeremy1998", "HolaMundo", "Jeremy", "McLovin", "5192009489684942", "336", 0),
      new Usuario(4, 3000, "Albert1889", "Albert123", "Albert", "Einstein", "9589230289684048", "875", 0),
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
        1,
        5
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
        1,
        6
      ),
      new Producto(
        "PROD_ID_2",
        "Pelota de Futbol",
        25,
        "Una pelota de futbol de 26 pulgadas blanca y negra",
        "src/Img/pelota.jpg",
        300,
        1,
        1,
        1,
        150
      ),
      new Producto(
        "PROD_ID_3",
        "Pack de deporte Familiar",
        667,
        "Un grupo de articulos deportivos para disfrutar en familia",
        "src/Img/pack-deporte.jpg",
        2,
        1,
        1,
        1,
        3
      ),
      new Producto(
        "PROD_ID_4",
        "Raqueta de Tenis con Pelota",
        12,
        "Una Raqueta de tenis con una pelota",
        "src/Img/raquetaDeTenis.jpg",
        40,
        1,
        0,
        1,
        34
      ),
      new Producto("PROD_ID_5", "Pack Ping-Pong", 87, "Un juego de Ping-Pong", "src/Img/pingPong.jpeg", 18, 1, 1, 1, 12),
      new Producto("PROD_ID_6", "Guantes de Boxeo", 99, "Par de guantes de Boxeo", "src/Img/guantes.jpg", 5, 1, 1, 1, 9),
      new Producto("PROD_ID_7", "Mountain Bike", 800, "Bicicleta ideal para offroad", "src/Img/bici.jpeg", 3, 1, 0, 1, 16),
      new Producto("PROD_ID_8", "Bate de Baisball", 667, "Un Bate de Baisball Metalico", "src/Img/bate.jpg", 2, 1, 0, 1, 11),
      new Producto(
        "PROD_ID_9",
        "Traje de Futbol Americano",
        2890,
        "Traje de 3 piezas para Futbol Americano",
        "src/Img/Americano.jpg",
        1,
        1,
        0,
        1,
        20
      ),
    ];
    this.Compra = [
      new Compra("COMPRA_ID_0", "PROD_ID_4", "Raqueta de Tenis con Pelota", 12, "src/Img/raquetaDeTenis.jpg", "2Cancelada", 0, 3, "Jeremy1998"),
      new Compra("COMPRA_ID_1", "PROD_ID_2", "Pelota de Futbol", 25, "src/Img/pelota.jpg", "1Pendiente", 1, 5, "Juan"),
      new Compra("COMPRA_ID_2", "PROD_ID_5", "Pack Ping-Pong", 87, "src/Img/pingPong.jpeg", "1Pendiente", 1, 2, "Juan"),
      new Compra("COMPRA_ID_3", "PROD_ID_4", "Raqueta de Tenis con Pelota", 12, "src/Img/raquetaDeTenis.jpg", "1Pendiente", 0, 1, "user"),
      new Compra("COMPRA_ID_4", "PROD_ID_0", "Calzado Basket Long", 300, "src/Img/calzado-basket-long.jpg", "1Pendiente", 0, 1, "Juan"),
    ];
    this.Imagenes = [
      "src/Img/calzado-basket-long.jpg",
      "src/Img/patin-sanz.jpg",
      "src/Img/pelota.jpg",
      "src/Img/pack-deporte.jpg",
      "src/Img/raquetaDeTenis.jpg",
      "src/Img/pingPong.jpeg",
      "src/Img/guantes.jpg",
      "src/Img/bici.jpeg",
      "src/Img/bate.jpg",
      "src/Img/Americano.jpg",
    ]
  }
  // Permite registrar usuarios con id auto incremental y saldo base precargado
  registrarUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC) {
    this.Usuarios.push(new Usuario(idUsuarioGlob, 3000, pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC, 0));
    idUsuarioGlob++;
  }
  // Permite saber si el nombre de usuario esta en uso por un administrador
  existeAdministrador(pNombreUsuario) {
    for (let i = 0; i < this.Administradores.length; i++) {
      if (this.Administradores[i].nombreUsuario.toLowerCase() === pNombreUsuario.toLowerCase()) {
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
      if (
        this.Administradores[i].nombreUsuario.toLowerCase() === pNombreUsuario.toLowerCase() &&
        this.Administradores[i].contrasenia === pContrasenia
      ) {
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
  crearProducto(pNombre, pPrecio, pDescripcion, pImagen, pStock) {
    let idProductoTemp = `PROD_ID_${idProductoGlob}`;
    this.Productos.push(new Producto(idProductoTemp, pNombre, pPrecio, pDescripcion, pImagen, pStock, 1, 0, 1, 0));
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
    if (campoStock <= 0) {
      campoStock = 0;
      campoEstado = 0;
    }
    prod.stock = Number(campoStock);
    prod.estado = Number(campoEstado);
    prod.oferta = Number(campoOferta);
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
  obtenerUsuarioPorUsuario(pUsuario) {
    for (let i = 0; i < this.Usuarios.length; i++) {
      let usua = this.Usuarios[i];
      if (pUsuario === usua.nombreUsuario) {
        return usua;
      }
    }
    return null;
  }
  agregarCompra(pIdProducto, pCantUnidades, pUsuarioActivo) {
    let idCompraTemp = `COMPRA_ID_${idCompraGlob}`;
    let prod = this.obtenerProductoPorId(pIdProducto);
    let cantUnidades = pCantUnidades;
    this.Compra.push(
      new Compra(idCompraTemp, prod.id, prod.nombre, prod.precio, prod.imagen, `1Pendiente`, prod.oferta, cantUnidades, pUsuarioActivo)
    );
    idCompraGlob++;
  }
  cancelarCompra(pIdCompra) {
    let prod = this.obtenerCompraPorId(pIdCompra);
    prod.estado = `2Cancelado`;
  }
  aprobarCompra(pIdCompra) {
    let comp = this.obtenerCompraPorId(pIdCompra);
    let prod = this.obtenerProductoPorId(comp.idProducto);
    let usua = this.obtenerUsuarioPorUsuario(comp.usuarioComprador);
    if (comp.cantUnidades <= prod.stock && comp.precio <= prod.precio && prod.estado === 1) {
      comp.estado = `3Aprobada`;
      prod.stock -= comp.cantUnidades;
      usua.saldo -= comp.precio;
      usua.deuda += comp.precio;
      prod.unidadesVendidas += comp.cantUnidades;
      if (prod.stock === 0) {
        prod.estado = 0;
      }
    } else {
      comp.estado = `2Cancelada`;
    }
  }

  // FIN Funciones compra
}
