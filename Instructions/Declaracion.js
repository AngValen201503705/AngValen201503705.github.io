import Instruction from "../Abstract/Instruction.js";
import Symbol from "../Symbols/Symbol.js";
import Error from "../Exceptions/Error.js";

class Declaracion extends Instruction {
  constructor(linea, columna, nombre, tipo, expresion) {
    super();
    this.nombre = nombre;
    this.tipo = tipo;
    this.expresion = expresion;
    this.linea = linea;
    this.columna = columna;
  }

  execute(env) {
    console.log("Declaracion de variable");


    if (this.tipo == null) {
      let result = this.expresion.execute(env);

      if (result instanceof Error) {
        env.addError(result);

      } else {
        let nsimbolo = new Symbol(this.nombre, result.valor, result.tipo);
        let aux = env.add_symbol(nsimbolo);

        if (aux == 0) {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
          env.addError(nerr);
        }

      }

    } else if (this.expresion == null) {
      console.log("entre a expresion null");


      if (this.tipo == "INT") {
        let nuevosim = new Symbol(this.nombre, 0, this.tipo);
        let aux = env.add_symbol(nuevosim);
        if (aux == 0) {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
          env.addError(nerr);
        }

      } else if (this.tipo == "FLOAT") {
        let nuevosim = new Symbol(this.nombre, 0.0, this.tipo);
        let aux = env.add_symbol(nuevosim);
        if (aux == 0) {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
          env.addError(nerr);
        }
      } else if (this.tipo == "STRING") {
        let nuevosim = new Symbol(this.nombre, "", this.tipo);
        let aux = env.add_symbol(nuevosim);
        if (aux == 0) {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
          env.addError(nerr);
        }

      } else if (this.tipo == "BOOLEAN") {
        let nuevosim = new Symbol(this.nombre, true, this.tipo);
        let aux = env.add_symbol(nuevosim);
        if (aux == 0) {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
          env.addError(nerr);
        }

      } else if (this.tipo == "CHAR") {
        let nuevosim = new Symbol(this.nombre, '', this.tipo);
        let aux = env.add_symbol(nuevosim);
        if (aux == 0) {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
          env.addError(nerr);
        }

      }

    } else {

      let result = this.expresion.execute(env);

      if (result instanceof Error) {
        env.addError(result);

      } else {
        if (result.tipo == this.tipo) {
          let nsimbolo = new Symbol(this.nombre, result.valor, result.tipo);
          let aux = env.add_symbol(nsimbolo);
          if(aux==0){
            let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
            env.addError(nerr);
           }


        } else if (result.tipo == "INT" && this.tipo == "FLOAT") {

          let nsimbolo = new Symbol(this.nombre, parseFloat(result.valor), this.tipo);
          let aux= env.add_symbol(nsimbolo);
          if(aux==0){
            let nerr = new Error(this.linea, this.columna, "Error Semantico", "Variable ya fue declarada");
            env.addError(nerr);
           }

        }

        else {
          let nerr = new Error(this.linea, this.columna, "Error Semantico", "Asignacion tipo no coincide");
          env.addError(nerr);

        }

      }

    }

  }
}

export default Declaracion;