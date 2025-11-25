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
  var Nombre = document.getElementById('nombre').value;

  if(Nombre.length == 0)
     {
    alert('No has escrito el nombre');
    return;
     }

  var Apellido = document.getElementById('apellido').value;

  if(Apellido.length == 0)
     {
    alert('No has escrito el apellido');
    return;
     }

     var dui= document.getElementById('dui').value;
     if(dui.length==0)
     {
      alert('No has escrito el DUI');
      return;
     }  

     var correo= document.getElementById('correo').value
     if(correo.length==0)
     {
        alert('No has escrito el correo electronico');
        return;
     }

     var PIN = document.getElementById('pin').value;

  if (PIN.length > 4 ) 
    {
    alert('El PIN maximo son 4 digitos');
    return;
    }
    if (PIN.length < 4 ) 
    {
    alert('El PIN no debe tener menos de 4 digitos');
    return;
    }
  this.submit();
}

/*
VALIDACION PARA CAMPO DUI AL DIGITAR UNA TECLA
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_CrearCuenta")
        .addEventListener("submit", validarFormularioCrearCuenta);

    // 2. Restricción del campo DUI: solo números 0–9 y guion "-"
    var duiDigitar = document.getElementById("dui");

    if (duiDigitar)
         {
        duiDigitar.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número ni guion.
            if (!/[0-9-]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});