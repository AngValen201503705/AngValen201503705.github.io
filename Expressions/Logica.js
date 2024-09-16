import Expression from "../Abstract/Expression.js";
import Type from "../Symbols/Type.js";
import Nativo from "./Nativo.js";

class Logica extends Expression {
  constructor(linea, columna, izq, der, op) {
    super();
    this.linea = linea;
    this.columna = columna;
    this.izq = izq;
    this.der = der;
    this.op = op;
  }

  execute(env) {

    console.log("Expresion logica2");

    if (this.izq == null) {
      let resultado_derecho = this.der.execute(env);
      if (resultado_derecho instanceof Error) {
        env.addError(resultado_derecho);
        return null;
      } else {
        if (resultado_derecho.tipo == Type.BOOLEAN) {
          let aux = new Nativo(this.linea, this.columna, !resultado_derecho.valor, Type.BOOLEAN);
          return aux;

        }
      }
    }

    else {
      let resultado_izdo = this.izq.execute(env);
      let resultado_derecho = this.der.execute(env);

      if (resultado_izdo instanceof Error) {
        env.addError(resultado_izdo);
        return null;
      } else if (resultado_derecho instanceof Error) {
        env.addError(resultado_derecho);
        return null;
      } else {
        switch (this.op) {

          case 0:
            if (resultado_izdo.tipo == Type.BOOLEAN && resultado_derecho.tipo == Type.BOOLEAN) {
              console.log("resultado izuiqerdo: " + resultado_izdo.valor);
              console.log("resultado derec: " + resultado_derecho.valor);

              let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor && resultado_derecho.valor, Type.BOOLEAN);
              return aux;
            }
            break;
          case 1:
            if (resultado_izdo.tipo == Type.BOOLEAN || resultado_derecho.tipo == Type.BOOLEAN) {
              let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor || resultado_derecho.valor, Type.BOOLEAN);
              return aux;
            }
            break;

        }

      }

    }

    let nerr = new Error(this.linea, this.columna, "Error Semantico", "No es posible realizar la operacion logica");
    return nerr;

  }
}

export default Logica;