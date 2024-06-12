class Sistema {
  constructor() {
    this.Administradores = [new Administrador("Valentin123", 123456), new Administrador("Agustin321", 654321), new Administrador("PedroP12", 666999)];

    this.idUser = 2;
    this.Usuarios = [
      new Usuario(0, 3000, "Nahu515", "Panda2803", "Nahuel", "Sosa", "WWWW-XXXX-YYYY-ZZZZ", "234"),
      new Usuario(1, 3000, "Juan", "Juanico", "Jose", "Jose", "WVVW-XYYX-YGGY-ZFFZ", "967"),
      new Usuario(1, 3000, "user", "user", "user", "user", "WVVW-XYYX-YGGY-ZFFZ", "999"),
    ];

    this.idProducto = 2;
    this.Productos = [
      new Producto(
        "Calzado Basket Long",
        300,
        "Calzado Basket<br>Talles: 38,39,40,41,42,43",
        "src/Img/calzado-basket-long.jpg",
        10,
        "activo",
        false,
        0
      ),
      new Producto(
        "Patín Artístico SANZ Profesional",
        400,
        "Bota rigida, chasis de aluminio reforzado y cuenta con rulemanes abec 7 de carbono y acero",
        "src/Img/patin-sanz.jpg",
        15,
        "activo",
        false,
        1
      ),
    ];
  }

  registrarUsuario(pUser, pPass, pNombre, pApellido, pTarjeta, pCVC) {
    this.Usuarios.push(new Usuario(this.idUser, 3000, pUser, pPass, pNombre, pApellido, pTarjeta, pCVC));
    this.idUser++;
  }
  // Permite saber si existen usuarios y administradores especificos
  existeAdministrador(pUser) {
    for (let i = 0; i < this.Administradores.length; i++) {
      if (this.Administradores[i].user === pUser) {
        return true;
      }
    }
  }
  existeUsuario(pUser) {
    for (let i = 0; i < this.Usuarios.length; i++) {
      if (this.Usuarios[i].user === pUser) {
        return true;
      }
    }
  }
  // Permite encontrar usuarios y administradores
  buscarAdministrador(pUser, pPass) {
    for (let i = 0; i < this.Administradores.length; i++) {
      if (this.Administradores[i].user === pUser && this.Administradores[i].pass === pPass) {
        return true;
      }
    }
  }
  buscarUsuario(pUser, pPass) {
    for (let i = 0; i < this.Usuarios.length; i++) {
      if (this.Usuarios[i].user === pUser && this.Usuarios[i].pass === pPass) {
        return true;
      }
    }
  }

  // Funciones productos
  añadirProducto(pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta) {
    this.Productos.push(new Producto(this.idProducto, pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta));
    this.idProducto++;
  }
  eliminarProducto(pIdProducto) {
    for (let i = 0; i < this.Productos.length; i++) {
      if (this.Productos[i].id === pIdProducto) {
        this.Productos.splice(i, 1);
        break;
      }
    }
  }
  editarProducto(pNombre, pPrecio, pDescripcion, pImagen, pId) {
    for (let i = 0; i < this.Productos.length; i++) {
      if (this.Productos[i].id === pId) {
        this.Productos[i] = pNombre;
        this.Productos[i] = pPrecio;
        this.Productos[i] = pDescripcion;
        this.Productos[i] = pImagen;
        break;
      }
    }
  }
  obtenerProductoPorId(pIdProducto) {
    let productoEncontrado = [];
    // recorre productos y los identifica por su id
    for (let i = 0; this.Productos.length; i++) {
      if (pIdProducto === this.Productos[i].id) {
        productoEncontrado.push(this.Productos[i]);
      }
    }
    return productoEncontrado;
  }
}
