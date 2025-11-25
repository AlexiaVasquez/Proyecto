// Esperamos a que todo el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN REALIZAR PAGO" → SweetAlert + PDF =========

  // Obtenemos el botón que generará el comprobante en PDF
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Verificamos que el botón exista en el DOM
  if (btnGenerarPDF) {

    // Agregamos un evento de clic al botón
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evitamos que el formulario se envíe o recargue la página por defecto
      e.preventDefault();

      // ========== CAPTURA DE DATOS DEL FORMULARIO ==========

      // Obtenemos la fecha del pago de Internet
      const fecha = document.getElementById('Fecha').value;
      // Obtenemos el NPE, eliminando espacios al inicio y al final
      const NPE = document.getElementById('NumeroNPE').value.trim();
      // Obtenemos el monto pagado, también sin espacios sobrantes
      const monto = document.getElementById('Monto').value.trim();

      // ========== VALIDACIÓN BÁSICA DE CAMPOS OBLIGATORIOS ==========

      // Si falta la fecha, el NPE o el monto, mostramos una alerta y detenemos el proceso
      if (!fecha || !NPE || !monto) {
        Swal.fire(
          'Campos incompletos',
          'Por favor completa todos los campos.',
          'warning'
        );
        return; // No seguimos a la parte del PDF
      }

      // ========== CONFIRMACIÓN CON SWEETALERT ANTES DE GENERAR EL PDF ==========

      Swal.fire({
        title: '¿Generar comprobante?',
        // Mostramos un pequeño resumen con los datos que el usuario ingresó
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Numero NPE:</b> ${NPE}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Muestra botón "Cancelar"
        confirmButtonText: 'Aceptar',  // Texto botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto botón de cancelar
      }).then((result) => {

        // Si el usuario confirma que quiere generar el comprobante
        if (result.isConfirmed) {

          // ========== GENERACIÓN DEL PDF CON jsPDF ==========

          // Obtenemos la clase jsPDF desde el objeto global window.jspdf
          const { jsPDF } = window.jspdf;
          // Creamos un nuevo documento PDF
          const doc = new jsPDF();

          // Definimos el tamaño de letra para el título
          doc.setFontSize(16);
          // Escribimos el título del comprobante en la posición (x=10, y=20)
          doc.text('Comprobante de Pago de Internet', 10, 20);

          // Definimos un tamaño de letra más pequeño para los detalles
          doc.setFontSize(12);
          // Escribimos los datos del comprobante en distintas líneas
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Numero NPE: ${NPE}`, 10, 40); 
          doc.text(`Monto: $${monto}`, 10, 50); 
          
          // ========== DESCARGA DEL PDF ==========

          // Descargamos el PDF generado con el nombre "Comprobante.pdf"
          doc.save('Comprobante.pdf');

          // Mostramos una alerta de éxito
          Swal.fire(
            'Generado',
            'El comprobante se ha generado correctamente.',
            'success'
          );

          // Si quisieras limpiar el formulario después de generar el PDF,
          // podrías hacerlo así:
          // const form = document.getElementById('Formulario_Internet');
          // if (form) form.reset();
        }
      });
    });
  }

  // ========= BOTÓN CANCELAR =========

  // Obtenemos el botón "Cancelar"
  const btnCancelar = document.getElementById('btnCancelar');

  // Verificamos que el botón exista
  if (btnCancelar) {

    // Agregamos el evento clic al botón "Cancelar"
    btnCancelar.addEventListener('click', function (e) {
      // Evitamos el comportamiento por defecto (ej. enviar formulario)
      e.preventDefault();

      // Mostramos una alerta de confirmación antes de salir
      Swal.fire({
        title: '¿Desea salir al Menu Principal?',
        text: 'Perderás los cambios no guardados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,                       // Invierte el orden de los botones
        confirmButtonColor: 'rgba(50, 172, 9, 1)',  // Color botón "Sí"
        cancelButtonColor: '#f40b0bff'              // Color botón "No"
      }).then((result) => {
        // Si el usuario confirma que desea salir
        if (result.isConfirmed) {
          // Redirigimos al Menú Principal
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

}); // Fin del DOMContentLoaded
