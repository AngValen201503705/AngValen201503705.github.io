import Instruction from "../Abstract/Instruction.js";
import Type from "../Symbols/Type.js";


class Si extends Instruction {
    constructor(linea, columna, validacion, instrucciones) {
        super();
        this.linea = linea;
        this.columna = columna;
        this.validacion = validacion;
        this.instrucciones = instrucciones;
    }


    execute(env) {

        console.log("Si");

        let nval = this.validacion.execute(env);
      

        if (nval.tipo == Type.BOOLEAN) {

         
        
              if(this.validacion.execute(env).valor==true){
                console.log("Entre if Si");
                console.log(Array.isArray(this.instrucciones));
                this.instrucciones.forEach(element => {
                    element.execute(env);
                });

              }

        } else {
            let nerror = new Error(this.linea, this.columna, "Error Semantico", "Expresion IF no es de tipo Boolean:");
            env.addError(nerror);

        }


    }
}

export default Si;