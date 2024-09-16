{
  const ARITHMETIC_OP = {
    MAS: 0,
    MENOS: 1,
    MULTIPLICAR: 2,
    DIVIDIR: 3,
    MODULO: 4,
  };

  const MODIFICADOR_P ={
    PARSEINT: 5,
    PARSEFLOAT: 6,
  };

  const RELATIONAL_OP = {
    MENOR_QUE: 0,
    MENOR_IGUAL: 1,
    MAYOR_QUE: 2,
    MAYOR_IGUAL: 3,
    IGUAL: 4,
    NO_IGUAL: 5,
  };

  const LOGICAL_OP = {
    AND: 0,
    OR: 1,
    NOT: 2,
  };
}



S
  = instrucciones

instrucciones
  = inst:instruccion list:instruccionesp

instruccionesp
  = list:instrucciones
  / epsilon

instruccion
  = inst:declaracion
  / inst:asignacion
  / inst:funcion
  / inst:imprimir


imprimibles
= inst:imprimible list:imprimiblep

imprimiblep
= list:imprimibles ","
/ ''

imprimible
= expresion

//imprimir

imprimir
=_ tokenImpr "(" expre: expresion ");" _ {
   const loc = location()?.start;
  return new Imprimir(loc?.line, loc?.column, expre);
}

// declaracion -> tipo id = expresion;
declaracion
  = _ type:tipo _ id:ID _ "=" expr:expresion ";"_ {
    const loc = location()?.start;
    return new Declaracion(loc?.line, loc?.column, id, type, expr);
  }
  /_ tokenVar _ id:ID _ "=" expr:expresion ";"_ {
    const loc = location()?.start;
    return new Declaracion(loc?.line, loc?.column, id, null, expr);
  }
  /_ type:tipo _ id:ID _ ";" _{
  const loc = location()?.start;
  return new Declaracion(loc?.line, loc?.column, id, type, null);
}



//asignacion
asignacion
  =_ id:ID _ "=" expr:expresion ";"{
  const loc = location()?.start;
  return new Asignacion(loc?.line, loc?.column, id, expr);
}


funcion
  = type:tipo id:ID params:f_params "{" _ inst:instruccionesf _ "}"


f_params
  = "(" l_params ")"

l_params
  = p:param list:l_paramsp  

l_paramsp
  = "," list:l_params
  / epsilon

param
  = type:tipo id:ID   


instruccionesf 
  = inst:instruccionf list:instruccionesfp

instruccionesfp
  = instruccionesf instruccionesfp
  / epsilon

instruccionf
  = declaracion
  / asignacion
  / inst_if


inst_if
  = "if" "(" expr:expresion ")" "{" inst:instruccionesf "}" r_if

r_if
  = b_else
  / epsilon

b_else
  = "else" else_if

else_if
  = "{" inst:instruccionesf "}" 
  / inst_if 

expresion
  = e:expresion_logica {return e;}

expresion_logica
  = e:expresion_relacional op:(_("&&"/"||")_ expresion_relacional)* {
    console.log("expresion logica");
    return op.reduce(function(result, element){
      const loc = location()?.start;
      if(element[1] === "&&") return new Logica(loc?.line, loc?.column, result, element[3], LOGICAL_OP.AND);
      else if(element[1] === "||") return new Logica(loc?.line, loc?.column, result, element[3], LOGICAL_OP.OR);
    }, e);
  }
  / tokenNot e:expresion_relacional {
    const loc = location()?.start;
    return new Logica(loc?.line, loc?.column, null, e, LOGICAL_OP.NOT);
  }
  / e:expresion_relacional {
    return e;
  }

expresion_relacional
  = e:expresion_numerica op:(_(">="/"<="/">"/"<"/"=="/"!=")_ expresion_numerica)* {
    
    return op.reduce(function(result, element){
      const loc = location()?.start;
      if(element[1] === ">") return new Relacional(loc?.line,loc?.column, result, element[3], RELATIONAL_OP.MAYOR_QUE);
      else if(element[1] === "<") return new Relacional(loc?.line,loc?.column, result, element[3], RELATIONAL_OP.MENOR_QUE);
      else if(element[1] === ">=") return new Relacional(loc?.line,loc?.column, result, element[3], RELATIONAL_OP.MAYOR_IGUAL);
      else if(element[1] === "<=") return new Relacional(loc?.line,loc?.column, result, element[3], RELATIONAL_OP.MENOR_IGUAL);
      else if(element[1] === "==") return new Relacional(loc?.line,loc?.column, result, element[3], RELATIONAL_OP.IGUAL);
      else if(element[1] === "!=") return new Relacional(loc?.line,loc?.column, result, element[3], RELATIONAL_OP.NO_IGUAL);
    }, e);
  }
  / e:expresion_numerica

expresion_numerica
  = head:Term tail:(_("+"/"-")_ Term)* {
    console.log("expresion numerica");
    return tail.reduce(function(result, element) {
      const loc = location()?.start;
        if (element[1] === "+") { return new Aritmetica(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MAS);  }
        if (element[1] === "-") { return new Aritmetica(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MENOS); }
    }, head);
  }

Term
  = head:Factor tail:(_("*"/"/"/"%")_ Factor)*
  {
    return tail.reduce(function(result, element) {
        const loc = location()?.start;
        if (element[1] === "*") { return new Aritmetica(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MULTIPLICAR); }
        if (element[1] === "/") { return new Aritmetica(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.DIVIDIR); }
        if (element[1] === "%") { return new Aritmetica(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MODULO); }
      }, head);
  }
// boolean resultado = 2 + 3 > 4 && (1+1 < 3 || 2 + 2 > 1);

Factor
  = _ "(" _ expr:expresion_numerica ")" { return expr;}
  
  / _ tokenParseInt "(" _ exp:expresion _ ")"
  {
    const loc = location()?.start;
    return new Modificador(loc?.line,loc?.column,"ParseInt",exp);
  }
   / _ tokenParseFloat "(" _ exp:expresion _ ")"
  {
    const loc = location()?.start;
    return new Modificador(loc?.line,loc?.column,"ParseFloat",exp);
  }
  / _ tokenToString "(" _ exp:expresion _ ")"
  {
    const loc = location()?.start;
    return new Modificador(loc?.line,loc?.column,"toString",exp);
  }
    / _ tokenToLower "(" _ exp:expresion _ ")"
  {
    const loc = location()?.start;
    return new Modificador(loc?.line,loc?.column,"toLower",exp);
  }
    / _ tokenToUpper "(" _ exp:expresion _ ")"
  {
    const loc = location()?.start;
    return new Modificador(loc?.line,loc?.column,"toUpper",exp);
  }
  / _ tokenTypeOf  _ exp:terminal _ 
  {
    const loc = location()?.start;
    return new Modificador(loc?.line,loc?.column,"typeOf",exp);
  }
  / terminal
  /_ "-" expr:expresion_numerica {
    const loc = location()?.start;
    return new Aritmetica(loc?.line, loc?.column, null, expr, ARITHMETIC_OP.MENOS);
  }

terminal
  =valor:FLOAT {
    const loc = location()?.start;
    return new Nativo(loc?.line, loc?.column, valor, Type.FLOAT);
  }
  /valor:INTEGER {
    const loc = location()?.start;
    return new Nativo(loc?.line, loc?.column, valor, Type.INT);
  } 
  / valor:CHAR {
    const loc = location()?.start;
    return new Nativo(loc?.line, loc?.column, valor, Type.CHAR);
  }
 / valor:BOOLEAN {
    const loc = location()?.start;
    return new Nativo(loc?.line, loc?.column, valor, Type.BOOLEAN);
  }
  / valor:STRING {
    const loc = location()?.start;
    return new Nativo(loc?.line, loc?.column, valor, Type.STRING);
  }
   / valor:ID {
    const loc = location()?.start;
    return new Nativo(loc?.line, loc?.column, valor, Type.IDENTIFIER);
  }


tipo
  = type:(_("int"/"float"/"string"/"boolean"/"char"/id:ID)_){
    if(type[1] === "int") return Type.INT;
    else if(type[1] === "float") return Type.FLOAT;
    else if(type[1] === "string") return Type.STRING;
    else if(type[1] === "boolean") return Type.BOOLEAN;
    else if(type[1] === "char") return Type.CHAR;
    else if(type[1] === "void") return Type.VOID;
  }


// expresiones regulares literal,terminal,primitivo

tokenNot
=_ "!"

tokenParseInt
=_ "parseInt"

tokenParseFloat
=_ "parsefloat"

tokenToString
=_ "toString"

tokenToLower
=_ "toLowerCase"

tokenToUpper
=_ "toUpperCase"

tokenTypeOf
=_ "typeof"

tokenVar
= _ "var"

STRING "string"
  = _"\"" chars:[^\"]* "\"" _ 
  {
    return text();
  }

CHAR "char"
 =  _"'"[^"'"]"'" _  { return text(); }

ID "identificador"
  = _[a-zA-Z]([a-zA-Z]/[0-9]/"_")*  { return text(); }

BOOLEAN "boolean"
  = _ tokenT _ { return text(); }
  / _ tokenF _ { return text(); }

INTEGER "integer"
  = _ [0-9]+ { return parseInt(text(), 10);}

FLOAT "float"
  = _ INTEGER "." INTEGER { return parseFloat(text());}

SimpleComment
  = "//" (!EndComment .)* EndComment

EndComment
  = "\r" / "\n" / "\r\n"

tokenT= _ "true"
tokenF= _ "false"

tokenImpr= _"System.out.println"

_ "Whitespace"
  = [ \t\n\r]*

epsilon = !.