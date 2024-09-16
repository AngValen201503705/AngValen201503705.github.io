import Instruction from "../Abstract/Instruction.js";
import Symbol from "../Symbols/Symbol.js";
import Error from "../Exceptions/Error.js";

class Asignacion extends Instruction {
  constructor(linea, columna, nombre, expresion) {
    super();
    this.nombre = nombre;
    this.expresion = expresion;
    this.linea = linea;
    this.columna = columna;
  }

  execute(env) {
    console.log("Asignacion");

    let res = this.expresion.execute(env);

    if (res instanceof Error) {
      env.addError(res);
    } else {
      let val = env.buscar_variable(this.nombre);

      if (val === null) {
        let nerror = new Error(this.linea, this.columna, "Error Semantico", "Variable no declarada:" + this.nombre);
        env.addError(nerror);
      }else{
        let modificar= env.modificarvalor(this.nombre,res); 
        console.log(modificar);

      }



    }


  }

}

export default Asignacion;