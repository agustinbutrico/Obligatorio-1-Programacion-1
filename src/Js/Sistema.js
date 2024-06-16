// ID Precargados
idUsuarioPrecargado = 3;
idProducto = 2;
// FIN ID Precargados

class Sistema {
  constructor() {
    this.Administradores = [
      new Administrador("Valentin123", "123456"),
      new Administrador("Agustin321", "654321"),
      new Administrador("Instalador", "wwzz2233"),
    ];

    this.Usuarios = [
      new Usuario(0, 3000, "Nahu515", "Panda2803", "Nahuel", "Sosa", "WWWW-XXXX-YYYY-ZZZZ", "234"),
      new Usuario(1, 3000, "Juan", "Juanico", "Jose", "Jose", "WVVW-XYYX-YGGY-ZFFZ", "967"),
      new Usuario(2, 3000, "user", "user", "Usuario", "Test", "WVVW-XYYX-YGGY-ZFFZ", "999"),
    ];

    this.Productos = [
      new Producto(
        0,
        "Calzado Basket Long",
        300,
        "Calzado Basket<br>Talles: 38,39,40,41,42,43",
        "src/Img/calzado-basket-long.jpg",
        10,
        "activo",
        false,
        1
      ),
      new Producto(
        1,
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
    this.Carrito = [];
  }
  // Permite registrar usuarios con id auto incremental y saldo base precargado
  registrarUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC) {
    this.Usuarios.push(new Usuario(idUsuarioPrecargado, 3000, pNombreUsuario, pContrasenia, pNombre, pApellido, pTarjeta, pCVC));
    idUsuarioPrecargado++;
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
  añadirProducto(pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta) {
    this.Productos.push(
      new Producto(idProducto, pNombre, pPrecio, pDescripcion, pImagen, pStock, pEstado, pOferta)
    );
    idProducto++;
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
  // Obtiene los meta datos de un producto existente en Productos
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
  // FIN Funciones productos


aniadirAlCarrito(id){
  let productoExistente = false;
  let productoInexistente = false;

  if(this.Carrito[0].id !== undefined){
    
    for(let i = 0; i < this.Carrito.length; i++){
      let idPcarrito = this.Carrito[i].id;
      if (idPcarrito = id){
        productoExistente = true;
      }
    }
  }

  
  for (let i = 0; i < this.Productos.length; i++){
    let idPproducto = this.Productos[i].id;
    if ( idPproducto === id)
      productoInexistente = true;
  }

  if(productoExistente){
    this.Carrito[id].cantUnidades++;
  }else if(productoInexistente){
    this.Carrito.push(this.Productos[i])
  }

}


eliminarDelCarrito(pIdCarrito) {
  for (let i = 0; i < this.Carrito.length; i++) {
    if (this.Carrito[i].id === pIdCarrito) {
      this.Carrito.splice(i, 1);
      break;
    }
  }
}

}
