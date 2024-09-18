import Instruction from "../Abstract/Instruction.js";
import Type from "../Symbols/Type.js";


class Para extends Instruction {
  constructor(linea, columna, inicio, fin, paso, instrucciones) {
    super();
    this.linea= linea;
    this.columna= columna;
    this.inicio= inicio;
    this.fin= fin;
    this.paso= paso;
    this.instrucciones= instrucciones;
  }


  execute(env) {

    console.log("For");
    
    this.inicio.execute(env);

    let nfin= this.fin.execute(env);

    if(nfin.tipo== Type.BOOLEAN){
        console.log("entre if for");

        while(this.fin.execute(env).valor==true){
            console.log("entre while for");

            this.instrucciones.forEach(element => {
                element.execute(env);
            });

            this.paso.execute(env);
        }


    }else{
        let nerror = new Error(this.linea, this.columna, "Error Semantico", "Expresion fin no es de tipo Boolean:");
        env.addError(nerror);

    }

   
}
}

export default Para;