import Instruction from "../Abstract/Instruction.js";



class Funcion extends Instruction {
  constructor(tipo, id, linea, columna,params, instrucciones) {
    super();
    this.tipo= tipo;
    this.id= id;
    this.params= params;
    this.instrucciones = instrucciones;
    this.linea = linea;
    this.columna = columna;
  }


  execute(env) {
    console.log("Funcion");

    let nfuncion= this;
    console.log("instancia de funcion");
    console.log(nfuncion instanceof Funcion);

    let resp= env.addfuncion(nfuncion);

    if(resp==1){
      console.log("agregue funcion");
    }else{
      let nerror = new Error(this.linea, this.columna, "Error Semantico", "Funcion ya existe");
      env.addError(nerror);

    }

    


}
}

export default Funcion;