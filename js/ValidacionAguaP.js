//----------VALIDACION FORMULARIO AGUA POTABLE-------------
/*
Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML ya están listas para usarse.
*/
document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_AguaPotable").addEventListener('submit', validarFormularioAguaPotable); 
  /*
  addEventListener('submit', validarFormularioCrearCuenta):se activa cada vez que alguien intenta
   enviar el formulario.
  */
});
function validarFormularioAguaPotable(evento)
{
  evento.preventDefault();

  var Fecha_AguaPotable = document.getElementById('FechaPagoAgua').value;

  if(Fecha_AguaPotable.length == 0)
     {
    alert('No has escrito la fecha');
    return;
     }

    var Numero_CuentaAgua = document.getElementById('NumeroNPE_Agua').value;

    if(Numero_CuentaAgua.length == 0)
     {
    alert('No has escrito el numero de cuenta NPE');
    return;
     }

    var Monto_AguaPotable = document.getElementById('MontoPago_Agua').value;

    if(Monto_AguaPotable.length == 0)
     {
    alert('No has escrito el monto');
    return;
     }

     if(Monto_AguaPotable <= 0.00)
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
        .getElementById("Formulario_AguaPotable")
        .addEventListener("submit", validarFormularioAguaPotable);

    // 2. Restricción del campo NPE: solo números 0–9
    var  NumeroNPE_AguaDig= document.getElementById("NumeroNPE_Agua");

    if (NumeroNPE_AguaDig)
         {
        NumeroNPE_AguaDig.addEventListener("keypress", function (e) {
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
        .getElementById("Formulario_AguaPotable")
        .addEventListener("submit", validarFormularioAguaPotable);

    // 2. Restricción del campo monto: solo números 0–9 y punto "."
    var  montoDigitar= document.getElementById("MontoPago_Agua");

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