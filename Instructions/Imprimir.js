import Instruction from "../Abstract/Instruction.js";
import Error from "../Exceptions/Error.js";


class Imprimir extends Instruction {
  constructor(linea, columna, expresion) {
    super();
    this.expresion = expresion;
    this.linea = linea;
    this.columna = columna;
  }


  execute(env) {

    console.log("Imprimir");

   
    let aux = this.expresion.execute(env); 
    console.log("valor a impirmir"+ aux.valor);

    if (aux instanceof Error) { 
        console.log("Error imprimir");
        env.addError(aux);
    } else { 
        console.log("Actualiza consola " + aux.valor);
      env.addtoconsola(aux.valor);
    }


}
}

export default Imprimir;