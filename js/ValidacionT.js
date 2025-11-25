//----------VALIDACION FORMULARIO TELEFONIA-------------
/*
Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML ya están listas para usarse.
*/
document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_Telefonia").addEventListener('submit', validarFormularioTelefonia); 
  /*
  addEventListener('submit', validarFormularioCrearCuenta):se activa cada vez que alguien intenta
   enviar el formulario.
  */
});
function validarFormularioTelefonia(evento)
{
  evento.preventDefault();

  var Fecha = document.getElementById('Fecha').value;

  if(Fecha.length == 0)
     {
    alert('No has escrito la fecha');
    return;
     }

var Numero_CuentaInternet = document.getElementById('NumeroNPE').value; 
    if(Numero_CuentaInternet.length == 0)
     {
    alert('No has escrito el numero de cuenta NPE');
    return;
     }      

var Monto_Internet = document.getElementById('Monto').value;
    if(Monto_Internet.length == 0)
     {  
    alert('No has escrito el monto');
    return;
     } 
     
     if(Monto_Internet <= 0.00)
     {  
    alert('El monto debe ser mayor a 0');
    return;
     } 

     this.SUBMIT();
    }

     /*
VALIDACION PARA CAMPO NUMERO NPE AL DIGITAR SOLO NUMEROS
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_Telefonia")
        .addEventListener("submit", validarFormularioTelefonia);

    // 2. Restricción del campo NPE: solo números 0–9
    var  NumeroNPE_TDig= document.getElementById("NumeroNPE");

    if (NumeroNPE_TDig)
         {
        NumeroNPE_TDig.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número ni guion.
            if (!/[0-9]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});

/*
VALIDACION PARA CAMPO MONTO SOLO DIGITAR NUMERO Y PUNTO "."
*/ 
document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_Telefonia")
        .addEventListener("submit", validarFormularioTelefonia);

    // 2. Restricción del campo monto: solo números 0–9 y punto "."
    var  montoDigitar= document.getElementById("Monto");

    if (montoDigitar)
         {
        montoDigitar.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número ni guion.
            if (!/[0-9.]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});
