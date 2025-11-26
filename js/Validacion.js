document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_Login").addEventListener('submit', validarFormulario); 
});

function validarFormulario(evento) 
{
  evento.preventDefault();
  var NumeroCuenta = document.getElementById('NumeroCuenta').value;

  if(NumeroCuenta.length == 0)
     {
   // alert('No has escrito el numero de cuenta');
    Swal.fire({
        icon: 'error',
        title: 'Campo Vacio',
        text: 'No has escrito el numero de cuenta ',
        confirmButtonText: 'OK'
   
     });
    return;
    }

  var PIN = document.getElementById('PIN').value;

  if (PIN.length.length==0  ) 
    {
    
    Swal.fire({
        icon: 'error',
        title: 'Campo Vacio',
        text: 'No has escrito el PIN',
        confirmButtonText: 'OK'
   
     });
    return;
    }

  if (PIN.length > 4 ) 
    {
    //alert('El PIN maximo son 4 digitos');
    Swal.fire({
        icon: 'error',
        title: 'PIN Incorrecto',
        text: 'El PIN maximo son 4 digitos ',
        confirmButtonText: 'OK'
   
     });
    return;
    }

    if (PIN.length < 4 ) 
    {
    //alert('El PIN no debe tener menos de 4 digitos');
    Swal.fire({
        icon: 'error',
        title: 'PIN Incorrecto',
        text: 'El PIN no debe tener menos de 4 digitos ',
        confirmButtonText: 'OK'
   
     });
    return;
    }
  this.submit();
}

/*
VALIDACION INICIO SESION PARA CAMPO NUMERO CUENTA DIGITAR SOLO NUMEROS
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_Login")
        .addEventListener("submit", validarFormulario);

    // 2. Restricción del campo NPE: solo números 0–9
    var  numeroCuenta= document.getElementById("NumeroCuenta");

    if (numeroCuenta)
         {
        numeroCuenta.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número .
            if (!/[0-9]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});

/*
VALIDACION INICIO SESION PARA CAMPO PIN DIGITAR SOLO NUMEROS
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_Login")
        .addEventListener("submit", validarFormulario);

    // 2. Restricción del campo NPE: solo números 0–9
    var  PIN= document.getElementById("PIN");

    if (PIN)
         {
        PIN.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número .
            if (!/[0-9]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});

//----------VALIDACION FORMULARIO CREAR CUENTA-------------
/*
Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML ya están listas para usarse.

*/

document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_CrearCuenta").addEventListener('submit', validarFormularioCrearCuenta); 
  /*
  addEventListener('submit', validarFormularioCrearCuenta):se activa cada vez que alguien intenta
   enviar el formulario.
  */
});
function validarFormularioCrearCuenta(evento)
{
  evento.preventDefault();
  var Nombre = document.getElementById('Nombre').value;

  if(Nombre.length == 0)
     {
   // alert('No has escrito el nombre');
   Swal.fire({
        icon: 'error',
        title: 'Campo Vacio',
        text: 'No has escrito el nombre ',
        confirmButtonText: 'OK'
   
     });
    return;
     }

  var Apellido = document.getElementById('Apellido').value;

  if(Apellido.length == 0)
     {
    //alert('No has escrito el apellido');
     Swal.fire({
        icon: 'error',
        title: 'Campo Vacio',
        text: 'No has escrito el apellido',
        confirmButtonText: 'OK'
   
     });
    return;
     }

     var dui= document.getElementById('dui').value;
     if(dui.length==0)
     {
     // alert('No has escrito el DUI');
      Swal.fire({
        icon: 'error',
        title: 'Campo Vacio',
        text: 'No has escrito el DUI',
        confirmButtonText: 'OK'
   
     });
      return;
     }  

     var PIN = document.getElementById('PIN').value;

     if (PIN.length==0) 
    {
   
    Swal.fire({
        icon: 'error',
        title: 'Digitos',
        text: 'No has escrito el PIN',
        confirmButtonText: 'OK'
   
     });
    return;
    }
  if (PIN.length > 4 ) 
    {
   // alert('El PIN maximo son 4 digitos');
   Swal.fire({
        icon: 'error',
        title: 'Digitos',
        text: 'El PIN maximo son 4 digitos',
        confirmButtonText: 'OK'
   
     });
    return;
    }
    if (PIN.length < 4 ) 
    {
   // alert('El PIN no debe tener menos de 4 digitos');
    Swal.fire({
        icon: 'error',
        title: 'Digitos',
        text: 'El PIN no debe tener menos de 4 digitos',
        confirmButtonText: 'OK'
   
     });
    return;
    }


  this.submit();
}