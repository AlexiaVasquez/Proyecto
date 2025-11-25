// Login con credenciales quemadas (hardcodeadas)

// Esperamos a que todo el DOM (HTML) se haya cargado
document.addEventListener('DOMContentLoaded', () => {

  // Obtenemos el botón de login por su id
  const btnLogin = document.getElementById('btnLogin');

  // Si no existe el botón, mostramos error en consola y detenemos el script
  if (!btnLogin) {
    console.error('No se encontró el botón con id="btnLogin"');
    return;
  }

  // Agregamos el evento de clic al botón "Iniciar sesión"
  btnLogin.addEventListener('click', () => {

    // Leemos el número de cuenta que el usuario escribió
    const numeroCuenta = document.getElementById('NumeroCuenta').value.trim();
    // Leemos el PIN que el usuario escribió
    const pin = document.getElementById('PIN').value;

    // 🔥 Credenciales quemadas (hardcodeadas)
    // Estas son las credenciales válidas que has dejado fijas en el código
    const numeroCuentaQ = '0987654321';
    const pinQ = '1234';

    // Comparamos lo que el usuario escribió con las credenciales permitidas
    if (numeroCuenta == numeroCuentaQ && pin == pinQ) {

      // Si coinciden, mostramos un SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Acceso permitido',
        text: 'Bienvenido a Pokemon Bank',
        confirmButtonText: 'Entrar'
      }).then(() => {

        // Cuando el usuario presiona "Entrar", lo redirigimos al menú principal
        window.location.href = 'Menu_Principal.html';

      });

    } else {

      // Si el número de cuenta o el PIN no coinciden, mostramos error
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Numero de cuenta o PIN incorrectos ',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  });

});
