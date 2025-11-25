// =======================================================
//  VALIDACIÓN FORMULARIO LOGIN
// =======================================================

// Esperamos a que el HTML esté cargado para poder tomar el formulario
document.addEventListener("DOMContentLoaded", function() {
  // Cuando envíen el formulario de login, se ejecuta validarFormulario
  document
    .getElementById("Formulario_Login")
    .addEventListener('submit', validarFormulario); 
});

// Función que valida el formulario de inicio de sesión
function validarFormulario(evento) {
  // Evita que el formulario se envíe automáticamente
  evento.preventDefault();

  // Obtenemos el número de cuenta
  var NumeroCuenta = document.getElementById('NumeroCuenta').value;

  // Validamos que el número de cuenta no esté vacío
  if (NumeroCuenta.length == 0) {
    alert('No has escrito el numero de cuenta');
    return;
  }

  // Obtenemos el PIN
  var PIN = document.getElementById('PIN').value;

  // Validamos que el PIN no tenga más de 4 dígitos
  if (PIN.length > 4) {
    alert('El PIN maximo son 4 digitos');
    return;
  }

  // Validamos que el PIN no tenga menos de 4 dígitos
  if (PIN.length < 4) {
    alert('El PIN no debe tener menos de 4 digitos');
    return;
  }

  // Si pasa todas las validaciones, se envía el formulario
  this.submit();
}

/*
  VALIDACIÓN INICIO SESIÓN PARA CAMPO NUMERO CUENTA:
  Solo permitir que se escriban números (0-9)
*/ 

document.addEventListener("DOMContentLoaded", function () {

  // 1. Vinculamos nuevamente el submit al validador (esto es redundante pero funcional)
  document
    .getElementById("Formulario_Login")
    .addEventListener("submit", validarFormulario);

  // 2. Tomamos el input de Número de Cuenta
  var numeroCuenta = document.getElementById("NumeroCuenta");

  // Si el campo existe en la página
  if (numeroCuenta) {
    // Escuchamos el evento keypress (cada vez que presionan una tecla dentro del input)
    numeroCuenta.addEventListener("keypress", function (e) {
      var char = e.key; // tecla que se presionó

      // Solo permitimos números del 0 al 9.
      // Si lo que se tecleó NO es un número, bloqueamos la tecla.
      if (!/[0-9]/.test(char)) {
        e.preventDefault(); // bloquea la tecla
      }
    });
  }
});

/*
  VALIDACIÓN INICIO SESIÓN PARA CAMPO PIN:
  Solo permitir que se escriban números (0-9)
*/ 

document.addEventListener("DOMContentLoaded", function () {

  // 1. Nuevamente se vincula el submit al validador (otra vez redundante)
  document
    .getElementById("Formulario_Login")
    .addEventListener("submit", validarFormulario);

  // 2. Tomamos el input de PIN
  var PIN = document.getElementById("PIN");

  if (PIN) {
    PIN.addEventListener("keypress", function (e) {
      var char = e.key; // tecla que se presionó

      // Si la tecla NO es un número del 0 al 9, se bloquea
      if (!/[0-9]/.test(char)) {
        e.preventDefault(); // bloquea la tecla
      }
    });
  }
});


// =======================================================
//  VALIDACIÓN FORMULARIO CREAR CUENTA
// =======================================================

/*
  Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML 
  ya están listas para usarse.
*/
document.addEventListener("DOMContentLoaded", function() {
  // Conectamos el submit del formulario de "Crear Cuenta" a la función validadora
  document
    .getElementById("Formulario_CrearCuenta")
    .addEventListener('submit', validarFormularioCrearCuenta); 
  
  /*
    addEventListener('submit', validarFormularioCrearCuenta):
    se activa cada vez que alguien intenta enviar el formulario.
  */
});

// Función que valida el formulario de "Crear Cuenta"
function validarFormularioCrearCuenta(evento) {
  // Evita que el formulario se envíe automáticamente
  evento.preventDefault();

  // Validamos el campo Nombre
  var Nombre = document.getElementById('Nombre').value;
  if (Nombre.length == 0) {
    alert('No has escrito el nombre');
    return;
  }

  // Validamos el campo Apellido
  var Apellido = document.getElementById('Apellido').value;
  if (Apellido.length == 0) {
    alert('No has escrito el apellido');
    return;
  }

  // Validamos el campo DUI
  var dui = document.getElementById('dui').value;
  if (dui.length == 0) {
    alert('No has escrito el DUI');
    return;
  }

  // Validamos el PIN para la nueva cuenta
  var PIN = document.getElementById('PIN').value;

  if (PIN.length > 4) {
    alert('El PIN maximo son 4 digitos');
    return;
  }

  if (PIN.length < 4) {
    alert('El PIN no debe tener menos de 4 digitos');
    return;
  }

  // Si todo está correcto, se envía el formulario
  this.submit();
}
