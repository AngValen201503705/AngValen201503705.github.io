import Error from "../Exceptions/Error.js";

class Environment {
  #tabla_simbolos;
  #tabla_funciones;
  #Errores;
  consola;
  constructor(parent) {
    this.parent = parent;
    this.#tabla_simbolos = new Map();
    this.#tabla_funciones = new Map();
    this.#Errores= new Map();
    this.consola="";
  }
  
addfuncion(funcion){
  if(this.find_fun(funcion.id) === null) {
    this.#tabla_funciones.set(funcion.id, funcion);
    return 1;
  } else{
    return 0;

  }

}

find_fun(id){
  for(const iterator of this.#tabla_funciones) {
    if(iterator[0] === id) {
      console.log(iterator[1]);
      return iterator[1];
    }
  }

  return null;

}



addtoconsola(cadena){
  this.consola+=cadena+"\n";
}

 

  // podriamos quitar symbol 
  add_symbol(symbol) {
    if(this.#find_symbol(symbol.id) === null) {
      this.#tabla_simbolos.set(symbol.id, symbol);
      return 1;
    } else{
      return 0;

    }

  }

  modificarvalor(nombre, expresion){
    return this.mod_val(this,nombre,expresion);


  }

  mod_val(root, id, expr){
    if(root===null || root === undefined){
      return null;

    } 

    for(const element of root.#tabla_simbolos){
      if(element[0]=== id){
          if(element[1].tipo== expr.tipo){
            element[1].valor= expr.valor;
            return "Se cambio valor";
          }else if(element[1].tipo== "FLOAT"){}
          if(expr.tipo=="INT"){
            element[1].valor= expr.valor;
            return "Se cambio valor";
          }
          else{
            let nerror= new Error(expr.linea, expr.columna, "Error semantico", "Tipo de variable no coincide");
            this.addError(nerror);
          }

      }

    }


  }

  #find_symbol(id) {
    for(const iterator of this.#tabla_simbolos) {
      if(iterator[0] === id) {
        console.log(iterator[1]);
        return iterator[1];
      }
    }

    return null;
  }

  buscar_variable(id) {
    return this.#find_variable(id, this);
  }

  #find_variable(id, root) {
    if(root === null || root === undefined) {
      return null;
    }

    let current = root.#tabla_simbolos;
    for(const element of current) {
      if(element[0] === id) {
        return element[1];
      }
    }

    return this.#find_variable(id, root.parent);
  }

  buscar_funcion(id){
    return this.find_funcion(id, this);

  }

  find_funcion(id,root){
    if(root === null || root === undefined) {
      return null;
    }

    let current = root.#tabla_funciones;
    for(const element of current) {
      if(element[0] === id) {
        return element[1];
      }
    }

    return this.find_funcion(id, root.parent);

  }

  getablasim(){
    return this.#tabla_simbolos;

  }

  getErrores(){
    return this.#Errores;

  }

  getConsola(){
    return this.consola;

  }

  getFunciones(){
    return this.#tabla_funciones;
  }



  addError(Error){
    this.#Errores.set("Tipo: "+Error.tipo+" Linea: "+Error.linea+" Columna: "+Error.columna, Error.descripcion);
  }

}


export default Environment;