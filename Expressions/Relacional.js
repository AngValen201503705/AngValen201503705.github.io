import Expression from "../Abstract/Expression.js";
import Error from "../Exceptions/Error.js";
import Type from "../Symbols/Type.js";
import Nativo from "./Nativo.js";


class Relacional extends Expression {
  constructor(linea, columna, izq, der, op) {
    super();
    this.linea = linea;
    this.columna = columna;
    this.izq = izq;
    this.der = der;
    this.op = op;
  }

  execute(env) {

    console.log("Expresion relacional");
 
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
          if ((resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT) && (resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT)) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor < resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.CHAR && resultado_derecho.tipo == Type.CHAR) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor < resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          }
          break;
        case 1:
          if ((resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT) && (resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT)) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor <= resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.CHAR && resultado_derecho.tipo == Type.CHAR) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor <= resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          }
          break;
        case 2:
          if ((resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT) && (resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT)) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor > resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.CHAR && resultado_derecho.tipo == Type.CHAR) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor > resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          }
          break;
        case 3:
          if ((resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT) && (resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT)) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor >= resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.CHAR && resultado_derecho.tipo == Type.CHAR) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor >= resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          }
          break;
        case 4:
          if ((resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT) && (resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT)) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor == resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.CHAR && resultado_derecho.tipo == Type.CHAR) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor == resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.STRING && resultado_derecho.tipo == Type.STRING) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor == resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.BOOLEAN && resultado_derecho.tipo == Type.BOOLEAN) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor == resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          }
          break;
        case 5:
          if ((resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT) && (resultado_izdo.tipo == Type.INT || resultado_izdo.tipo == Type.FLOAT)) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor != resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.CHAR && resultado_derecho.tipo == Type.CHAR) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor != resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.STRING && resultado_derecho.tipo == Type.STRING) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor != resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          } else if (resultado_izdo.tipo == Type.BOOLEAN && resultado_derecho.tipo == Type.BOOLEAN) {
            let aux = new Nativo(this.linea, this.columna, resultado_izdo.valor != resultado_derecho.valor, Type.BOOLEAN);
            return aux;
          }
          break;      
      }     

    }
    let nerr= new Error(this.linea,this.columna,"Error Semantico","No es posible realizar la operacion relacional");
    return nerr;


  }
}

export default Relacional;