import { parse } from "./Parser/gramatica.js";
import Environment from "./Symbols/Env.js";


const entrada = document.getElementById("txtEntrada");
const salida = document.getElementById("txtSalida");
const btnEjecutar = document.getElementById("btnEjecutar");
const btnLimpiar = document.getElementById("btnSalida");

const archivo = document.getElementById("btnArchivo");



btnEjecutar.addEventListener("click", Ejecutar);
btnLimpiar.addEventListener("click", Limpiar);


archivo.addEventListener("change", (evento)=>{
    const archivo2 = evento.target.files[0]
    nuevoarchivo(archivo2)
     .then(contenido => entrada.value = contenido)
      .catch(error => entrada.value = error)
})

function Ejecutar() {
    console.log("Entre a ejecutar");
    let textoingresado = entrada.value;
    const resultado = parse(textoingresado);

    console.log("Prueba es array:"+ Array.isArray(resultado));

    const global = new Environment(null);

    recorrerr(resultado);
    
    function recorrerr(respuesta){

        try {
            respuesta[0].execute(global);
            let aux1 = respuesta[1];
            recorrerr(aux1);
            
        } catch (error) {
            console.log("Fin");
            
        }

    }

   let textosalida="======CONSOLA======== \n";
   textosalida+=global.getConsola();
    textosalida+="\n";
    textosalida+="======TABLA DE SIMBOLOS======== \n";

    let tabla = global.getablasim();


    tabla.forEach (function(valor, id) {
       console.log(id+"="+valor.valor);
       textosalida+=id+"="+valor.valor+"\n";
      })

      let errores= global.getErrores();
      textosalida+="======TABLA DE ERRORES========\n";
      errores.forEach(function(valor, id) {
        console.log(id+"="+valor);
        textosalida+=id+"="+valor.valor+"\n";
       })

       let fun=global.getFunciones()
       textosalida+="======TABLA DE FUNCIONES========\n";
       fun.forEach(function(valor, id) {
        console.log(id);
        textosalida+=id+"\n";
       })

       

    salida.value = textosalida;

}



function Limpiar() {
    salida.value = "";

}


function nuevoarchivo(archivo2){
    return new Promise( (resolve, reject)=> {
        if(!archivo2.name.endsWith(".oak")){
            reject("Archivo no admitido")
        } else {
            const freader = new FileReader()
            freader.readAsText(archivo2)
            freader.addEventListener("load", ()=>{
                resolve(freader.result)
            }
        )
        }
    })
}
