/* alerts.js
   Requiere que SweetAlert2 (Swal) se cargue antes de este archivo
   para que Swal esté disponible en window.
*/


  // Confirmar salida (ejemplo específico)
  function confirmExit(opts = {}) {
    return confirmDialog(Object.assign({
      title: '¿Salir de la página?',
      text: 'Perderás los cambios no guardados.',
      confirmButtonText: 'Sí, salir'
    }, opts));
  }


