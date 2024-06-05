class Sistema {
  constructor() {
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
            productoEncontrado.push(this.productos[i])
        }
    }
    return productoEncontrado;
  }
}
