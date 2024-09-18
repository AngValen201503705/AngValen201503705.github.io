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

    console.log("Es arreglo instrucciones: " + Array.isArray(this.instrucciones));
    console.log("tamanio del arreglo: " + this.instrucciones.length);

    console.log("Es arreglo parametros: " + Array.isArray(this.params));
    console.log("tamanio del arreglo: " + this.params.length);

    let par= this.params;

    par.forEach(element => {
        env.add_symbol(element);
    });

    let inst= this.instrucciones;

    inst.forEach(element => {
        element.execute(env);
    });




}
}

export default Funcion;