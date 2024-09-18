import Instruction from "../Abstract/Instruction.js";



class EjecFun extends Instruction {
  constructor( id, linea, columna,params) {
    super();
    this.id= id;
    this.params= params;
    this.linea = linea;
    this.columna = columna;
  }


  execute(env) {
    console.log("Ejecutar funcion");

    let fun = env.buscar_funcion(this.id);

    if(fun==null){
      let nerror = new Error(this.linea, this.columna, "Error Semantico", "Funcion no existe");
        env.addError(nerror);

    }else{
      console.log("Es arreglo instrucciones: " + Array.isArray(fun.instrucciones));
      console.log("tamanio del arreglo: " + fun.instrucciones.length);
  
      console.log("Es arreglo parametros: " + Array.isArray(fun.params));
      console.log("tamanio del arreglo: " + fun.params.length);

      let par= fun.params;

      par.forEach(element => {
          env.add_symbol(element);
      });
  
      let inst= fun.instrucciones;
  
      inst.forEach(element => {
          element.execute(env);
      });
  

    }

}
}

export default EjecFun;