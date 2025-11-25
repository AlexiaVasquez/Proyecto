// Esperamos a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN "REALIZAR DEPÓSITO" → SweetAlert + PDF =========
  // En realidad aquí es un retiro, pero usas el mismo id de botón (btnGenerarPDF)
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Verificamos que el botón exista en el DOM
  if (btnGenerarPDF) {

    // Agregamos el evento clic al botón
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evitamos que el formulario se envíe o recargue la página por defecto
      e.preventDefault();

      // ========== CAPTURA DE DATOS DEL FORMULARIO ==========

      // Obtenemos la fecha del retiro
      const fecha = document.getElementById('FechaRetiro').value;
      // Obtenemos el concepto del retiro y quitamos espacios extra
      const concepto = document.getElementById('ConceptoRetiro').value.trim();
      // Obtenemos el monto retirado y quitamos espacios extra
      const monto = document.getElementById('MontoRetiro').value.trim();

      // ========== VALIDACIÓN BÁSICA DE CAMPOS OBLIGATORIOS ==========

      // Si falta la fecha, el concepto o el monto, mostramos advertencia
      if (!fecha || !concepto || !monto) {
        Swal.fire(
          'Campos incompletos',
          'Por favor completa todos los campos.',
          'warning'
        );
        // Detenemos la ejecución para no seguir con la generación del PDF
        return;
      }

      // ========== CONFIRMACIÓN CON SWEETALERT ANTES DE GENERAR EL PDF ==========

      Swal.fire({
        title: '¿Generar comprobante?',
        // Mostramos un pequeño resumen con los datos que ingresó el usuario
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Concepto:</b> ${concepto}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Muestra botón "Cancelar"
        confirmButtonText: 'Aceptar',  // Texto del botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto del botón de cancelar
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
          doc.text('Comprobante de operación', 10, 20);

          // Definimos un tamaño de letra más pequeño para el contenido
          doc.setFontSize(12);
          // Escribimos cada dato del retiro en distintas líneas
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Concepto: ${concepto}`, 10, 40); 
          doc.text(`Monto: $${monto}`, 10, 50); 

          // ========== DESCARGA DEL PDF ==========

          // Descargamos el PDF con el nombre "Comprobante.pdf"
          doc.save('Comprobante.pdf');

          // Mostramos un mensaje de éxito
          Swal.fire(
            'Generado',
            'El comprobante se ha generado correctamente.',
            'success'
          );

          // Si quisieras limpiar el formulario de retiro, podrías hacerlo aquí:
          // const form = document.getElementById('Formulario_Retiro');
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
      // Evitamos el comportamiento por defecto (ej. envío de formulario)
      e.preventDefault();

      // Mostramos un cuadro de confirmación antes de salir
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
        // Si el usuario confirma que quiere salir
        if (result.isConfirmed) {
          // Redirigimos al menú principal
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

}); // Fin del DOMContentLoaded
