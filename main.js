import { parse } from "./Parser/gramatica.js";
import Environment from "./Symbols/env.js";


const entrada = document.getElementById("txtEntrada");
const salida = document.getElementById("txtSalida");
const btnEjecutar = document.getElementById("btnEjecutar");
const btnLimpiar = document.getElementById("btnSalida");


btnEjecutar.addEventListener("click", Ejecutar);
btnLimpiar.addEventListener("click", Limpiar);
entrada.addEventListener("input", Vacio);

function Ejecutar() {
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

    let tabla = global.getablasim();


    tabla.forEach (function(valor, id) {
       console.log(id+"="+valor.valor);
      })

      let errores= global.getErrores();

      errores.forEach(function(valor, id) {
        console.log(id+"="+valor);
       })

   

    salida.value = global.getConsola();

}

function Vacio() {
    btnEjecutar.disabled = entrada.value.length === 0;

}


function Limpiar() {
    salida.value = "";

}
