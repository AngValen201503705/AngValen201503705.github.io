import Instruction from "../Abstract/Instruction.js";
import Error from "../Exceptions/Error.js";
import Type from "../Symbols/Type.js";


class Modificador extends Instruction {
    constructor(linea, columna, tipo, expresion) {
        super();
        this.tipo = tipo;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    execute(env) {
        console.log("Modificador");

        let res = this.expresion.execute(env);


        if (res instanceof Error) {
            env.addError(res);
        } else {
            if (this.tipo == "ParseInt") {
                if (res.tipo == Type.STRING) {
                    let sincomillas = res.valor.replace(/"/g, "");
                    let valormodificado = parseInt(sincomillas, 10);
                    console.log("valor mod: " + valormodificado);

                    if (isNaN(valormodificado)) {
                        let nerror = new Error(this.linea, this.columna, "Error Semantico", "Cadena no es posible Parsearse a INT");
                        env.addError(nerror);
                    } else {
                        res.tipo = Type.INT;
                        res.valor = valormodificado;
                        return res;
                    }

                } else {
                    let nerror = new Error(this.linea, this.columna, "Error Semantico", "Tipo no aplica Parsearse a INT");
                    env.addError(nerror);
                }

            } else if (this.tipo == "ParseFloat") {
                if (res.tipo == Type.STRING) {
                    let sincomillas = res.valor.replace(/"/g, "");
                    let valormodificado = parseFloat(sincomillas);
                    console.log("valor mod: " + valormodificado);

                    if (isNaN(valormodificado)) {
                        let nerror = new Error(this.linea, this.columna, "Error Semantico", "Cadena no es posible Parsearse a Float");
                        env.addError(nerror);
                    } else {
                        res.tipo = Type.FLOAT;
                        res.valor = valormodificado;
                        return res;
                    }

                } else {
                    let nerror = new Error(this.linea, this.columna, "Error Semantico", "Tipo no aplica Parsearse a Float");
                    env.addError(nerror);
                }

            } else if (this.tipo == "toString") {

                console.log("Entre a modificar to string");
                let valormodificado;
                if (res.tipo == Type.STRING) {
                    let sincomillas = res.valor.replace(/"/g, "");
                     valormodificado = String(sincomillas);
                } else {
                     valormodificado = String(res.valor);

                }
                console.log("valor mod: " + valormodificado);
                res.tipo = Type.STRING;
                res.valor = valormodificado;
                return res;

            }else if (this.tipo == "toLower") {
                if (res.tipo == Type.STRING) {
                    let sincomillas = res.valor.replace(/"/g, "");
                    let valormodificado = sincomillas.toLowerCase();
                    console.log("valor mod: " + valormodificado);

                   
                        res.tipo = Type.FLOAT;
                        res.valor = valormodificado;
                        return res;
                    }else {
                    let nerror = new Error(this.linea, this.columna, "Error Semantico", "Tipo no aplica ToLower");
                    env.addError(nerror);
                }

            }else if (this.tipo == "toUpper") {
                if (res.tipo == Type.STRING) {
                    let sincomillas = res.valor.replace(/"/g, "");
                    let valormodificado = sincomillas.toUpperCase();
                    console.log("valor mod: " + valormodificado);

                   
                        res.tipo = Type.FLOAT;
                        res.valor = valormodificado;
                        return res;
                    }else {
                    let nerror = new Error(this.linea, this.columna, "Error Semantico", "Tipo no aplica ToLower");
                    env.addError(nerror);
                }

            }else if (this.tipo == "typeOf") {
                res.valor = res.tipo;
                res.tipo = Type.STRING;
                
                return res;

            }



        }


    }

}

export default Modificador;