class Sistema {
  constructor() {
    this.Administrador = [new Administrador("Valentin123", 123456), new Administrador("Agustin321", 654321)];

    this.idUsuario = 2;
    this.Usuario = [
      new Usuario(0, 3000, "Nahuel", "Sosa", "Nahu515", "Panda2803", "WWWW-XXXX-YYYY-ZZZZ", "234"),
      new Usuario(1, 3000, "Jose", "Jose", "Juan", "Juanico", "WVVW-XYYX-YGGY-ZFFZ", "967"),
    ];

    this.idProducto = 2;
    this.productos = [
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

  obtenerProductoPorId(pIdProducto) {
    let productoEncontrado = [];
    // recorre productos y los identifica por su id
    for (let i = 0; this.productos.length; i++) {
      if (pIdProducto === this.productos[i].id) {
        productoEncontrado.push(this.productos[i]);
      }
    }
    return productoEncontrado;
  }
}
