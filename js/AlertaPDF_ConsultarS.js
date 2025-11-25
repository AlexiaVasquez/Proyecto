// Esperamos a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // ========= Función para obtener la fecha actual en texto =========
  // Esta función devuelve la fecha actual en formato de texto
  // usando la configuración regional de El Salvador ('es-SV')
  function obtenerFechaTexto() {
    return new Date().toLocaleDateString('es-SV'); // formato según región
  }

  // ========= BOTÓN "IMPRIMIR / GENERAR COMPROBANTE" =========

  // Obtenemos el botón que usaremos para generar el comprobante en PDF
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Verificamos que el botón exista en el DOM antes de usarlo
  if (btnGenerarPDF) {

    // Agregamos un evento de clic al botón
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evitamos que el botón haga el comportamiento por defecto
      // (por ejemplo, enviar un formulario o recargar la página)
      e.preventDefault();

      // ========== OBTENER FECHA Y SALDO ==========

      // Obtenemos la fecha actual desde el sistema utilizando nuestra función
      const fecha = obtenerFechaTexto();

      // Buscamos el elemento donde se muestra el saldo disponible
      const saldoSpan = document.getElementById('saldoDisponible');
      // Si existe, obtenemos su texto y quitamos espacios con trim()
      // Si no existe, dejamos el saldo como cadena vacía
      const saldoDisponible = saldoSpan ? saldoSpan.textContent.trim() : "";

      // ========== VALIDACIÓN BÁSICA ==========

      // Si no hay saldo para mostrar (cadena vacía),
      // mostramos una alerta de advertencia y no generamos el PDF
      if (!saldoDisponible) {
        Swal.fire(
          'Campos incompletos',
          'No hay saldo disponible para mostrar en el comprobante.',
          'warning'
        );
        return; // detenemos la ejecución aquí
      }

      // ========== CONFIRMACIÓN CON SWEETALERT ==========
      // Mostramos una alerta para que el usuario confirme que quiere generar el comprobante
      Swal.fire({
        title: '¿Generar comprobante?',
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Saldo Disponible:</b> $${saldoDisponible}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Muestra botón de "Cancelar"
        confirmButtonText: 'Aceptar',  // Texto del botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto del botón de cancelar
      }).then((result) => {

        // Si el usuario presiona "Aceptar"
        if (result.isConfirmed) {

          // ========= GENERAR PDF (AQUÍ ESTABA EL ERROR) =========
          // Obtenemos la clase jsPDF desde el objeto global window.jspdf
          // (Asegúrate de haber incluido la librería jsPDF en el HTML)
          const { jsPDF } = window.jspdf;
          // Creamos un nuevo documento PDF
          const doc = new jsPDF();

          // Definimos el tamaño de fuente para el título
          doc.setFontSize(16);
          // Escribimos el título del comprobante en la posición (x=10, y=20)
          doc.text('Comprobante de Saldo Disponible', 10, 20);

          // Definimos un tamaño de fuente más pequeño para los detalles
          doc.setFontSize(12);
          // Agregamos la fecha en la posición (10, 30)
          doc.text(`Fecha: ${fecha}`, 10, 30);
          // Agregamos el saldo disponible en la posición (10, 40)
          doc.text(`Saldo Disponible: $${saldoDisponible}`, 10, 40);

          // Descargamos el PDF con el nombre "ComprobanteSaldo.pdf"
          doc.save('ComprobanteSaldo.pdf');

          // Mostramos un mensaje de éxito indicando que el comprobante se generó
          Swal.fire(
            'Generado',
            'El comprobante se ha generado correctamente.',
            'success'
          );

          // Si tuvieras un formulario que quisieras limpiar después de generar el PDF,
          // podrías hacerlo aquí. Ejemplo:
          // const form = document.getElementById('Formulario_AguaPotable');
          // if (form) form.reset();
        }
      });
    });
  }

  // ========= BOTÓN CANCELAR =========

  // Obtenemos el botón que permitirá cancelar y regresar al menú principal
  const btnCancelar = document.getElementById('btnCancelar');

  // Verificamos que el botón exista
  if (btnCancelar) {

    // Agregamos el evento clic al botón "Cancelar"
    btnCancelar.addEventListener('click', function (e) {
      // Evitamos el comportamiento por defecto del botón (ej: envío de formulario)
      e.preventDefault();

      // Mostramos una alerta para confirmar si realmente quiere salir
      Swal.fire({
        title: '¿Desea salir al Menu Principal?',
        text: 'Perderás los cambios no guardados.',
        icon: 'warning',
        showCancelButton: true,                     // Botón "No"
        confirmButtonText: 'Sí',                    // Texto botón confirmar
        cancelButtonText: 'No',                     // Texto botón cancelar
        reverseButtons: true,                       // Invierte el orden de los botones
        confirmButtonColor: 'rgba(50, 172, 9, 1)',  // Color del botón de confirmación
        cancelButtonColor: '#f40b0bff'              // Color del botón de cancelar
      }).then((result) => {

        // Si el usuario confirma que desea salir
        if (result.isConfirmed) {
          // Redirigimos a la página del menú principal
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

}); // Fin del DOMContentLoaded
