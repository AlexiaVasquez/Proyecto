//----------VALIDACION FORMULARIO ENERGIA ELECTRICA-------------
/*
Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML ya están listas para usarse.
*/
document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_EnergiaElectrica").addEventListener('submit', validarFormularioEnergiaElectrica); 
  /*
  addEventListener('submit', validarFormularioCrearCuenta):se activa cada vez que alguien intenta
   enviar el formulario.
  */
});
function validarFormularioEnergiaElectrica(evento)
{
  evento.preventDefault();

  var Fecha = document.getElementById('FechaPagoLuz').value;

  if(Fecha.length == 0)
     {
    alert('No has escrito la fecha');
    return;
     }


var Numero_CuentaLuz = document.getElementById('NumeroNPE_Luz').value;
    if(Numero_CuentaLuz.length == 0)
     {
    alert('No has escrito el numero de cuenta NPE');
    return;
     }
var Monto_Luz = document.getElementById('MontoPago_Luz').value;
    if(Monto_Luz.length == 0)
     {  
    alert('No has escrito el monto');
    return;
     } 
     
     if(Monto_Luz <= 0.00)
     {  
    alert('El monto debe ser mayor a 0');
    return;
     } 

    this.submit();
    }

    /*
VALIDACION PARA CAMPO NUMERO NPE AL DIGITAR SOLO NUMEROS
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_EnergiaElectrica")
        .addEventListener("submit", validarFormularioEnergiaElectrica);

    // 2. Restricción del campo NPE: solo números 0–9
    var  NumeroNPE_EDig= document.getElementById("NumeroNPE_Luz");

    if (NumeroNPE_EDig)
         {
        NumeroNPE_EDig.addEventListener("keypress", function (e) {
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
        .getElementById("Formulario_EnergiaElectrica")
        .addEventListener("submit", validarFormularioEnergiaElectrica);

    // 2. Restricción del campo monto: solo números 0–9 y punto "."
    var  montoDigitar= document.getElementById("MontoPago_Luz");

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