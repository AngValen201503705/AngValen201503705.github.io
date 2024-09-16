class Error {
    constructor(linea, columna, tipo, descripcion) {
     // super();
      this.linea= linea;
      this.columna= columna;
      this.tipo = tipo;
      this.descripcion = descripcion;
    }
  }
  
  export default Error;