import Expression from "../Abstract/Expression.js";
import Nativo from "./Nativo.js";
import Type from "../Symbols/Type.js";
import Error from "../Exceptions/Error.js";

class Aritmetica extends Expression {

  constructor(linea, columna, izq, der, op) {
    super();
    this.linea = linea;
    this.columna = columna;
    this.izq = izq;
    this.der = der;
    this.op = op;

  }

  execute(env) {

    if (this.op == 0) {
      let resultado_izdo = this.izq.execute(env);
      let resultado_derecho = this.der.execute(env);
      console.log("Expresion Suma");

      if (resultado_izdo.tipo == Type.INT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor + resultado_derecho.valor, Type.INT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor + resultado_derecho.valor, Type.FLOAT);
        }

      } else if (resultado_izdo.tipo == Type.FLOAT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor + resultado_derecho.valor, Type.FLOAT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor + resultado_derecho.valor, Type.FLOAT);
        }

      } else if (resultado_izdo.tipo == Type.STRING) {
        if (resultado_derecho.tipo == Type.STRING) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor + resultado_derecho.valor, Type.STRING);
        }

      }

    } else if (this.op == 1) {

      if (this.izq == null) {
        let resultado_derecho = this.der.execute(env);
        console.log("Expresion unaria");

        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, -resultado_derecho.valor, Type.INT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, -resultado_derecho.valor, Type.FLOAT);
        }

      } else {

        let resultado_izdo = this.izq.execute(env);
        let resultado_derecho = this.der.execute(env);
        console.log("Expresion Resta");
        if (resultado_izdo.tipo == Type.INT) {
          if (resultado_derecho.tipo == Type.INT) {
            return new Nativo(this.linea, this.columna, resultado_izdo.valor - resultado_derecho.valor, Type.INT);
          } else if (resultado_derecho.tipo == Type.FLOAT) {
            return new Nativo(this.linea, this.columna, resultado_izdo.valor - resultado_derecho.valor, Type.FLOAT);
          }

        } else if (resultado_izdo.tipo == Type.FLOAT) {
          if (resultado_derecho.tipo == Type.INT) {
            return new Nativo(this.linea, this.columna, resultado_izdo.valor - resultado_derecho.valor, Type.FLOAT);
          } else if (resultado_derecho.tipo == Type.FLOAT) {
            return new Nativo(this.linea, this.columna, resultado_izdo.valor - resultado_derecho.valor, Type.FLOAT);
          }

        }

      }

    } else if (this.op == 2) {
      let resultado_izdo = this.izq.execute(env);
      let resultado_derecho = this.der.execute(env);
      console.log("Expresion Multiplicacion");
      if (resultado_izdo.tipo == Type.INT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor * resultado_derecho.valor, Type.INT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor * resultado_derecho.valor, Type.FLOAT);
        }

      } else if (resultado_izdo.tipo == Type.FLOAT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor * resultado_derecho.valor, Type.FLOAT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor * resultado_derecho.valor, Type.FLOAT);
        }

      }
    } else if (this.op == 3) {
      let resultado_izdo = this.izq.execute(env);
      let resultado_derecho = this.der.execute(env);
      console.log("Expresion Division");
      if (resultado_izdo.tipo == Type.INT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor / resultado_derecho.valor, Type.INT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor / resultado_derecho.valor, Type.FLOAT);
        }

      } else if (resultado_izdo.tipo == Type.FLOAT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor / resultado_derecho.valor, Type.FLOAT);
        } else if (resultado_derecho.tipo == Type.FLOAT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor / resultado_derecho.valor, Type.FLOAT);
        }

      }
    }
    else if (this.op == 4) {
      let resultado_izdo = this.izq.execute(env);
      let resultado_derecho = this.der.execute(env);
      console.log("Expresion Modulo");
      if (resultado_izdo.tipo == Type.INT) {
        if (resultado_derecho.tipo == Type.INT) {
          return new Nativo(this.linea, this.columna, resultado_izdo.valor % resultado_derecho.valor, Type.INT);
        }
      }
    }
    let nuevoerror = new Error(this.linea, this.columna, "Error Semantico", "Operacion no permitida");
    return nuevoerror;

  }



}

export default Aritmetica;