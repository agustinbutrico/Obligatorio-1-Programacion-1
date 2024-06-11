class Sistema {
  constructor() {
    this.Administradores = [
      new Administrador("Valentin123", 123456),
      new Administrador("Agustin321", 654321),
      new Administrador("PedroP12", 666999),
    ];

    this.idUsuario = 2;
    this.Usuarios = [
      new Usuario(0, 3000, "Nahuel", "Sosa", "Nahu515", "Panda2803", "WWWW-XXXX-YYYY-ZZZZ", "234"),
      new Usuario(1, 3000, "Jose", "Jose", "Juan", "Juanico", "WVVW-XYYX-YGGY-ZFFZ", "967"),
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

  bucarAdministrador(pNombre, pContrasenia) {
    for (let i = 0; i < this.Administradores.length; i++) {
      if (this.Administradores[i].nombreAdmin === pNombre && this.Administradores[i].passAdmin === pContrasenia) {
        return true;
      }
    }
  }
  bucarUsuario(pNombre, pContrasenia) {
    for (let i = 0; i < this.Usuarios.length; i++) {
      if (this.Usuarios[i].nombreUsuario === pNombre && this.Usuarios[i].passComprador === pContrasenia) {
        return true;
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
