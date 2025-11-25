//----------VALIDACION FORMULARIO CREAR CUENTA-------------
/*
  Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML 
  ya están listas para usarse. Es el momento ideal para enganchar eventos
  a formularios, inputs, botones, etc.
*/
document.addEventListener("DOMContentLoaded", function() {

  // Al formulario con id="Formulario_CrearCuenta" le agregamos un listener
  // para el evento 'submit'. Cuando el usuario intente enviarlo,
  // se ejecutará la función validarFormularioCrearCuenta.
  document
    .getElementById("Formulario_CrearCuenta")
    .addEventListener('submit', validarFormularioCrearCuenta); 

  /*
    addEventListener('submit', validarFormularioCrearCuenta):
    se activa cada vez que alguien intenta enviar el formulario.
  */
});

// Función principal que valida el formulario de creación de cuenta
function validarFormularioCrearCuenta(evento) {
  // Evita que el formulario se envíe automáticamente
  evento.preventDefault();

  // ================== VALIDAR NOMBRE ==================
  var Nombre = document.getElementById('nombre').value;

  if (Nombre.length == 0) {
    alert('No has escrito el nombre');
    return; // Se detiene la función si el nombre está vacío
  }

  // ================== VALIDAR APELLIDO ==================
  var Apellido = document.getElementById('apellido').value;

  if (Apellido.length == 0) {
    alert('No has escrito el apellido');
    return;
  }

  // ================== VALIDAR DUI ==================
  var dui = document.getElementById('dui').value;

  if (dui.length == 0) {
    alert('No has escrito el DUI');
    return;
  }  

  // ================== VALIDAR CORREO ==================
  var correo = document.getElementById('correo').value;

  if (correo.length == 0) {
    alert('No has escrito el correo electronico');
    return;
  }

  // Aquí podrías agregar una validación de formato de correo con regex si quisieras,
  // pero por ahora solo se valida que no esté vacío.

  // ================== VALIDAR PIN ==================
  var PIN = document.getElementById('pin').value;

  // Máximo 4 dígitos
  if (PIN.length > 4) {
    alert('El PIN maximo son 4 digitos');
    return;
  }

  // Mínimo 4 dígitos (o sea, exactamente 4)
  if (PIN.length < 4) {
    alert('El PIN no debe tener menos de 4 digitos');
    return;
  }

  // Si todas las validaciones pasan, enviamos el formulario
  this.submit();
}


/*
  VALIDACION PARA CAMPO DUI AL DIGITAR UNA TECLA
  Objetivo: que el usuario solo pueda teclear números y guion "-" en el campo DUI.
*/ 

document.addEventListener("DOMContentLoaded", function () {

  // Otra vez se engancha el submit al validador (es redundante, pero funciona)
  document
    .getElementById("Formulario_CrearCuenta")
    .addEventListener("submit", validarFormularioCrearCuenta);

  // Tomamos el input del DUI
  var duiDigitar = document.getElementById("dui");

  if (duiDigitar) {
    // Escuchamos cada tecla que el usuario presiona mientras escribe el DUI
    duiDigitar.addEventListener("keypress", function (e) {
      var char = e.key; // tecla que se presionó

      /*
        Solo permitimos:
        - Dígitos del 0 al 9
        - Guion "-" (típico en formato de DUI: 00000000-0)

        Si la tecla NO coincide con el patrón [0-9-],
        bloqueamos la entrada.
      */
      if (!/[0-9-]/.test(char)) {
        e.preventDefault(); // bloquea la tecla
      }
    });
  }
});
