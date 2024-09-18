import Instruction from "../Abstract/Instruction.js";
import Type from "../Symbols/Type.js";


class Mientras extends Instruction {
    constructor(linea, columna, validacion, instrucciones) {
        super();
        this.linea = linea;
        this.columna = columna;
        this.validacion = validacion;
        this.instrucciones = instrucciones;
    }


    execute(env) {

        console.log("While");

        let nval = this.validacion.execute(env);

        if (nval.tipo == Type.BOOLEAN) {
        

              while(this.validacion.execute(env).valor==true){
                  
                  this.instrucciones.forEach(element => {
                      element.execute(env);
                  });
      
              }
          

        } else {
            let nerror = new Error(this.linea, this.columna, "Error Semantico", "Expresion while no es de tipo Boolean:");
            env.addError(nerror);

        }


    }
}

export default Mientras;