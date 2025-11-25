//----------VALIDACION FORMULARIO AGUA POTABLE-------------
/*
  Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML 
  ya están listas para usarse, es decir, cuando ya podemos acceder a los inputs,
  formularios, etc.
*/
document.addEventListener("DOMContentLoaded", function() {

  // Al formulario con id="Formulario_AguaPotable" le agregamos un listener
  // para el evento 'submit'. Cuando el usuario intente enviarlo,
  // se ejecutará la función validarFormularioAguaPotable.
  document
    .getElementById("Formulario_AguaPotable")
    .addEventListener('submit', validarFormularioAguaPotable); 

  /*
    addEventListener('submit', validarFormularioAguaPotable):
    se activa cada vez que alguien intenta enviar el formulario.
  */
});

// Función que valida el formulario de pago de agua
function validarFormularioAguaPotable(evento) {
  // Evitamos que el formulario se envíe automáticamente
  evento.preventDefault();

  // Tomamos la fecha del pago
  var Fecha_AguaPotable = document.getElementById('FechaPagoAgua').value;

  // Validamos que la fecha no esté vacía
  if (Fecha_AguaPotable.length == 0) {
    alert('No has escrito la fecha');
    return;
  }

  // Tomamos el NPE (número de cuenta para el pago de agua)
  var Numero_CuentaAgua = document.getElementById('NumeroNPE_Agua').value;

  // Validamos que el NPE no esté vacío
  if (Numero_CuentaAgua.length == 0) {
    alert('No has escrito el numero de cuenta NPE');
    return;
  }

  // Tomamos el monto del pago
  var Monto_AguaPotable = document.getElementById('MontoPago_Agua').value;

  // Validamos que el monto no esté vacío
  if (Monto_AguaPotable.length == 0) {
    alert('No has escrito el monto');
    return;
  }

  // Validamos que el monto sea mayor que 0
  if (Monto_AguaPotable <= 0.00) {
    alert('El monto debe ser mayor a 0');
    return;
  } 

  // Si todas las validaciones pasan, enviamos el formulario
  this.submit();
}


/*
  VALIDACION PARA CAMPO NUMERO NPE AL DIGITAR SOLO NUMEROS
*/ 

document.addEventListener("DOMContentLoaded", function () {

  // 1. De nuevo, conectamos el submit del formulario a la misma función de validación
  //    (esto está repetido varias veces, funciona, pero es redundante)
  document
    .getElementById("Formulario_AguaPotable")
    .addEventListener("submit", validarFormularioAguaPotable);

  // 2. Tomamos el input del NPE
  var NumeroNPE_AguaDig = document.getElementById("NumeroNPE_Agua");

  // Si el campo existe en el DOM
  if (NumeroNPE_AguaDig) {
    // Escuchamos cada tecla que se presiona dentro de ese input
    NumeroNPE_AguaDig.addEventListener("keypress", function (e) {
      var char = e.key; // tecla que se presionó

      /*
        Solo permitimos números del 0 al 9.
        Si la tecla presionada NO coincide con el patrón [0-9],
        bloqueamos la entrada.
      */
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

  // 1. Nuevamente conectamos el submit al validador (de nuevo, redundante, pero no rompe)
  document
    .getElementById("Formulario_AguaPotable")
    .addEventListener("submit", validarFormularioAguaPotable);

  // 2. Tomamos el input del monto a pagar
  var montoDigitar = document.getElementById("MontoPago_Agua");

  // Si el campo existe
  if (montoDigitar) {
    // Escuchamos cada tecla que se presiona en el campo de monto
    montoDigitar.addEventListener("keypress", function (e) {
      var char = e.key; // tecla que se presionó

      /*
        Solo permitimos dígitos [0-9] y el punto "." para montos decimales.
        Si la tecla NO está en ese set, se bloquea.
      */
      if (!/[0-9.]/.test(char)) {
        e.preventDefault(); // bloquea la tecla
      }
    });
  }
});
