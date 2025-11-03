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
    alert('No has escrito el numero de cuenta');
    return;
     }

  var PIN = document.getElementById('PIN').value;

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