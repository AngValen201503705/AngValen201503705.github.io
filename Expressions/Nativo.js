import Expression from "../Abstract/Expression.js";
import Type from "../Symbols/Type.js";
import Error from "../Exceptions/Error.js";


class Nativo extends Expression {
  constructor(linea, columna, valor, tipo) {
    super();
    this.linea = linea;
    this.columna = columna;
    this.valor = valor;
    this.tipo = tipo;
  }

  execute(env) {
    console.log("Nativo");

    let temp = new Nativo(this.linea, this.columna, this.valor, this.tipo);
    switch (this.tipo) {
      case Type.STRING:
        let sincomillas = temp.valor.replace(/"/g, "");
        temp.valor = sincomillas.toString();
        break;
      case Type.INT:
        temp.valor = parseInt(temp.valor, 10);
        break;
      case Type.CHAR:
        temp.valor = temp.valor.toString().charAt(1);
        break;
      case Type.FLOAT:
        temp.valor = parseFloat(temp.valor);
        break;
      case Type.BOOLEAN:
        temp.valor = (temp.valor === "true" ? true : false);
        break;
      case Type.IDENTIFIER:
        console.log("entre a identificador");
        // tiene que ir a buscar a la TS
        let symbol = env.buscar_variable(this.valor);
        if (symbol === null) {
          // agregar a la lista de errores
          console.log('error semantico. la varialbe no existe');
          let nerror = new Error(temp.linea, temp.columna, "Error Semantico", "Identificador no existe");
          env.addError(nerror);
          return nerror;
        }
        temp.valor = symbol.valor;
        temp.tipo = symbol.tipo;
        break;
    }
    return temp;


  }
}

export default Nativo;