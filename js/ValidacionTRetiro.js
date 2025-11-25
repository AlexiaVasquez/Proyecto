//----------VALIDACION FORMULARIO TRANSACCION RETIRO-------------
/*
Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML ya están listas para usarse.
*/
document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_TR").addEventListener('submit', validarFormularioTR); 
  /*
  addEventListener('submit', validarFormularioCrearCuenta):se activa cada vez que alguien intenta
   enviar el formulario.
  */
});

function validarFormularioTR(evento)
{
  evento.preventDefault();
 
  var FechaRetiro= document.getElementById('FechaRetiro').value;

  if(FechaRetiro.length === 0)
  {
    alert('No has escrito una fecha de retiro');
    return;
  }

  var ConceptoRetiro= document.getElementById('ConceptoRetiro').value;

  if(ConceptoRetiro.length ==0)
  {
    alert('No has escrito un concepto de retiro');
    return;
  }

  var MontoRetiro=document.getElementById('MontoRetiro');

  if(MontoRetiro.length ==0)
  {
    alert('No has escrito un monto');
    return;
  }
  if(MontoRetiro <= 0.00)
     {  
    alert('El monto debe ser mayor a 0');
    return;
     } 

  this.submit();
}

/*
VALIDACION PARA CAMPO MONTO  SOLO DIGITAR NUMERO
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_TR")
        .addEventListener("submit", validarFormularioTR);

    // 2. Restricción del campo monto: solo números 0–9 y punto "."
    var  montoDigitar= document.getElementById("MontoRetiro");

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