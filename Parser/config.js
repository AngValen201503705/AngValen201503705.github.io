
module.exports = {
    format: "es",
    input: "gramatica.pegjs",
    dependencies: {
        Aritmetica: "../Expressions/Aritmetica.js",
        Logica: "../Expressions/Logica.js",
        Relacional: "../Expressions/Relacional.js",
        Nativo: "../Expressions/Nativo.js",
        Type: "../Symbols/Type.js",
        Declaracion: "../Instructions/Declaracion.js",
        Asignacion:"../Instructions/Asignacion.js",
        Imprimir: "../Instructions/Imprimir.js",
        Modificador: "../Instructions/Modificador.js",
        Funcion: "../Instructions/Funcion.js",
        Symbol: "../Symbols/Symbol.js",
        Para:"../Instructions/Para.js",
        Mientras:"../Instructions/Mientras.js",
    },
};