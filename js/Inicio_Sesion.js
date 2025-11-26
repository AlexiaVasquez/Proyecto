// Login con credenciales quemadas (hardcodeadas)

document.addEventListener('DOMContentLoaded', () => {

   const NombreCliente='Ash Ketchum';
   const spanNombre = document.getElementById("nombreCliente");
  if (spanNombre) {
    spanNombre.textContent = NombreCliente;
  }
const numeroCuenta = '0987654321';
  const spanCuenta = document.getElementById("cuenta");
  if (spanCuenta) {
    spanCuenta.textContent = numeroCuenta;
  }
  const btnLogin = document.getElementById('btnLogin');

  if (!btnLogin) {
    console.error('No se encontró el botón con id="btnLogin"');
    return;
  }

  btnLogin.addEventListener('click', () => {
    const numeroCuenta = document.getElementById('NumeroCuenta').value.trim();
    const pin = document.getElementById('PIN').value;

   
    const numeroCuentaQ = '0987654321';
    const pinQ = '1234';
   

    

    if (numeroCuenta == numeroCuentaQ && pin == pinQ) {
     Swal.fire({
        icon: 'success',
        title: 'Acceso permitido',
        text: 'Bienvenido a Pokemon Bank',
        confirmButtonText: 'Entrar'
      }).then(() => {

        //  Redirección al menú principal
        window.location.href = 'Menu_Principal.html';

      });

    } 
    else 
        {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Numero de cuenta o PIN incorrectos ',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  });

});
