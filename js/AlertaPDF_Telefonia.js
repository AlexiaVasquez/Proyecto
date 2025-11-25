
// Esperamos a que todo el documento HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN "REALIZAR DEPÓSITO" → SweetAlert + PDF =========

  // Obtenemos el botón que se usará para generar el comprobante en PDF
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Verificamos que el botón exista en el DOM
  if (btnGenerarPDF) {

    // Agregamos un escuchador de evento clic al botón
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evitamos que el formulario se envíe o que la página se recargue por defecto
      e.preventDefault();

      // ========== CAPTURA DE DATOS DEL FORMULARIO ==========

      // Obtenemos la fecha del pago de telefonía
      const fecha = document.getElementById('Fecha').value;
      // Obtenemos el NPE y eliminamos espacios en blanco al inicio y al final
      const NPE = document.getElementById('NumeroNPE').value.trim();
      // Obtenemos el monto pagado y también eliminamos espacios extra
      const monto = document.getElementById('Monto').value.trim();

      // ========== VALIDACIÓN BÁSICA DE CAMPOS OBLIGATORIOS ==========

      // Si falta la fecha, el NPE o el monto, mostramos una alerta y detenemos el proceso
      if (!fecha || !NPE || !monto) {
        Swal.fire(
          'Campos incompletos',
          'Por favor completa todos los campos.',
          'warning'
        );
        return; // Detenemos aquí para no seguir con la generación del comprobante
      }

      // ========== CONFIRMACIÓN CON SWEETALERT ANTES DE GENERAR PDF ==========

      Swal.fire({
        title: '¿Generar comprobante?',
        // Mostramos un resumen de la información ingresada por el usuario
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Numero NPE:</b> ${NPE}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Mostrar botón "Cancelar"
        confirmButtonText: 'Aceptar',  // Texto del botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto del botón de cancelar
      }).then((result) => {

        // Si el usuario confirma que quiere generar el comprobante
        if (result.isConfirmed) {

          // ========== GENERACIÓN DEL PDF CON jsPDF ==========

          // Obtenemos la clase jsPDF desde el objeto global window.jspdf
          const { jsPDF } = window.jspdf;
          // Creamos una nueva instancia de documento PDF
          const doc = new jsPDF();

          // Definimos el tamaño de fuente para el título
          doc.setFontSize(16);
          // Agregamos el título del comprobante en la posición (x=10, y=20)
          doc.text('Comprobante de Pago de Telefonía', 10, 20);

          // Definimos un tamaño de fuente menor para el detalle del comprobante
          doc.setFontSize(12);
          // Escribimos cada dato (fecha, NPE, monto) en líneas separadas
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Numero NPE: ${NPE}`, 10, 40); 
          doc.text(`Monto: $${monto}`, 10, 50); 
          
          // ========== DESCARGA DEL PDF ==========

          // Descargamos el documento generado con el nombre "Comprobante.pdf"
          doc.save('Comprobante.pdf');

          // Mostramos una alerta indicando que el comprobante se generó correctamente
          Swal.fire(
            'Generado',
            'El comprobante se ha generado correctamente.',
            'success'
          );

          // Si quisieras limpiar el formulario después de generar el comprobante,
          // podrías hacerlo así:
          // const form = document.getElementById('Formulario_Telefonia');
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

    // Agregamos un evento clic al botón "Cancelar"
    btnCancelar.addEventListener('click', function (e) {
      // Evitamos el comportamiento por defecto (ej. envío de formulario)
      e.preventDefault();

      // Mostramos una alerta de confirmación antes de salir
      Swal.fire({
        title: '¿Desea salir al Menu Principal?',
        text: 'Perderás los cambios no guardados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,                       // Invierte el orden visual de los botones
        confirmButtonColor: 'rgba(50, 172, 9, 1)',  // Color del botón "Sí"
        cancelButtonColor: '#f40b0bff'              // Color del botón "No"
      }).then((result) => {
        // Si el usuario confirma que desea salir
        if (result.isConfirmed) {
          // Redirigimos al usuario a la página del menú principal
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

}); // Fin del DOMContentLoaded
