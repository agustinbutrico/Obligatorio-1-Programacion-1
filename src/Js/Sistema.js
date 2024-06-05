class Sistema {
    constructor(){
        this.Administrador = [
            new Administrador("Valentin123", 123456),
            new Administrador("Agustin321", 654321)
        ];
        this.idUsuario = 2;
        this.Usuario = [
            new Usuario (0, 3000, "Nahuel", "Sosa", "Nahu515", "Panda2803", "WWWW-XXXX-YYYY-ZZZZ", "234"),
            new Usuario (1, 3000, "Jose", "Jose", "Juan", "Juanico", "WVVW-XYYX-YGGY-ZFFZ", "967")
        ];
    }
}