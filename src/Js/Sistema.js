// ID Precargados
idUsuarioGlob = 3;
idProductoGlob = 4;
idCompraGlob = 0;
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
      new Usuario(0, 3000, "Nahu51", "Panda28", "Nahuel", "Sosa", "8723874590452378", "234"),
      new Usuario(1, 3000, "Juan", "Juanico", "Jose", "Jose", "9823874597452378", "967"),
      new Usuario(2, 3000, "user", "user", "Usuario", "Test", "3279873429876723", "999"),
      new Usuario(3, 3000, "Jeremy1998", "HolaMundo", "Jeremy", "McLovin", "5192009489684942", "336"),
      new Usuario(4, 3000, "Albert1889", "Albert123", "Albert", "Einstein", "5192009489684942", "336", 0), //_deuda
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
      new Producto(
        "PROD_ID_2",
        "Pelota de Futbol",
        25,
        "Una pelota de futbol de 26 pulgadas blanca y negra",
        "src/Img/pelota.jpg",
        300,
        1,
        1,
        1
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
        1
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
        1
      ),
      new Producto(
        "PROD_ID_5",
        "Pack Ping-Pong",
        87,
        "Un juego de Ping-Pong",
        "src/Img/pingPong.jpeg",
        18,
        1,
        1,
        1
      ),
      new Producto(
        "PROD_ID_6",
        "Guantes de Boxeo",
        99,
        "Par de guantes de Boxeo",
        "src/Img/guantes.jpg",
        5,
        1,
        1,
        1
      ),
      new Producto(
        "PROD_ID_7",
        "Mountain Bike",
        800,
        "Bicicleta ideal para offroad",
        "src/Img/bici.jpeg",
        3,
        1,
        0,
        1
      ),
      new Producto(
        "PROD_ID_8",
        "Bate de Baisball",
        667,
        "Un Bate de Baisball Metalico",
        "src/Img/bate.jpg",
        2,
        1,
        0,
        1
      ),
      new Producto(
        "PROD_ID_9",
        "Traje de Futbol Americano",
        2890,
        "Traje de 3 piezas para Futbol Americano",
        "src/Img/Americano.jpg",
        1,
        1,
        0,
        1
      ),
    ];

    this.Compra = [
      new Compra(
        "COMPRA_ID_4",
        "PROD_ID_4",
        "Raqueta de Tenis con Pelota",
        12,
        "src/Img/raquetaDeTenis.jpg",
        40,
        '1Pendiente',
        0,
        3
      ),
      new Compra(
        "COMPRA_ID_2",
        "PROD_ID_2",
        "Pelota de Futbol",
        25,
        "src/Img/pelota.jpg",
        300,
        '1Pendiente',
        1,
        5
      ),
      new Compra(
        "COMPRA_ID_5",
        "PROD_ID_5",
        "Pack Ping-Pong",
        87,
        "src/Img/pingPong.jpeg",
        18,
        '1Pendiente',
        1,
        2
      ),
      new Compra(
        "COMPRA_ID_4",
        "PROD_ID_4",
        "Raqueta de Tenis con Pelota",
        12,
        "src/Img/raquetaDeTenis.jpg",
        40,
        '1Pendiente',
        0,
        1
      ),
      new Compra(
        "COMPRA_ID_0",
        "PROD_ID_0",
        "Calzado Basket Long",
        300,
        "src/Img/calzado-basket-long.jpg",
        10,
        '1Pendiente',
        0,
        1
      )
    ];
  }
  // Permite registrar usuarios con id auto incremental y saldo base precargado
  registrarUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC) {
    this.Usuarios.push(
      new Usuario(idUsuarioGlob, 3000, pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC)
    );
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
      if (
        this.Administradores[i].nombreUsuario === pNombreUsuario &&
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
  agregarProducto(pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta) {
    let idProductoTemp = `PROD_ID_${idProductoGlob}`;
    this.Productos.push(
      new Producto(idProductoTemp, pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta)
    );
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
  agregarCompra(pIdProducto) {
    let idCompraTemp = `COMPRA_ID_${idCompraGlob}`;
    let prod = this.obtenerProductoPorId(pIdProducto);
    let cantUnidades = document.querySelector(`#numCantUnidades${prod.id}`).value;
    this.Compra.push(
      new Compra(
        idCompraTemp,
        prod.id,
        prod.nombre,
        prod.precio,
        prod.imagen,
        prod.stock,
        `1Pendiente`,
        prod.oferta,
        cantUnidades
      )
    );
    idCompraGlob++;
  }
  agregarCompraOferta(pIdProducto) {
    let idCompraTemp = `COMPRA_ID_${idCompraGlob}`;
    let prod = this.obtenerProductoPorId(pIdProducto);
    let cantUnidades = document.querySelector(`#numCantUnidadesOferta${prod.id}`).value;
    this.Compra.push(
      new Compra(
        idCompraTemp,
        prod.id,
        prod.nombre,
        prod.precio,
        prod.imagen,
        prod.stock,
        `1Pendiente`,
        prod.oferta,
        cantUnidades
      )
    );
    idCompraGlob++;
  }
  cancelarCompra(pIdCompra) {
    let prod = this.obtenerCompraPorId(pIdCompra);
    prod.estado = `2Cancelado`;
  }

  // FIN Funciones compra
}
