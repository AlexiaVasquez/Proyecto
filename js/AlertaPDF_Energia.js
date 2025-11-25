// js/AlertaPDF_Energia.js

// Esperamos a que el DOM (todo el HTML) esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN "REALIZAR DEPÓSITO" → SweetAlert + PDF =========

  // Obtenemos el botón que generará el comprobante en PDF
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Verificamos que el botón exista en el documento
  if (btnGenerarPDF) {

    // Agregamos el evento clic al botón "Realizar Depósito"
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evitamos que el formulario se envíe o recargue la página
      e.preventDefault();

      // ========== CAPTURA DE DATOS DEL FORMULARIO ==========

      // Obtenemos la fecha del pago de luz
      const fecha = document.getElementById('FechaPagoLuz').value;
      // Obtenemos el NPE de la factura de luz y quitamos espacios extra
      const NPE = document.getElementById('NumeroNPE_Luz').value.trim();
      // Obtenemos el monto pagado y también quitamos espacios extra
      const monto = document.getElementById('MontoPago_Luz').value.trim();

      // ========== VALIDACIÓN BÁSICA DE CAMPOS OBLIGATORIOS ==========

      // Si falta la fecha, el NPE o el monto, mostramos advertencia y no seguimos
      if (!fecha || !NPE || !monto) {
        Swal.fire(
          'Campos incompletos',
          'Por favor completa todos los campos.',
          'warning'
        );
        return; // Detenemos la ejecución aquí
      }

      // ========== CONFIRMACIÓN CON SWEETALERT ANTES DE GENERAR PDF ==========

      Swal.fire({
        title: '¿Generar comprobante?',
        // Mostramos un pequeño resumen con la info que ingresó el usuario
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Numero NPE:</b> ${NPE}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Muestra botón "Cancelar"
        confirmButtonText: 'Aceptar',  // Texto botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto botón de cancelación
      }).then((result) => {

        // Si el usuario confirma (da clic en "Aceptar")
        if (result.isConfirmed) {

          // ========== GENERACIÓN DEL PDF CON jsPDF ==========

          // Obtenemos la clase jsPDF desde el objeto global window.jspdf
          const { jsPDF } = window.jspdf;
          // Creamos un nuevo documento PDF
          const doc = new jsPDF();

          // Definimos el tamaño de letra para el título
          doc.setFontSize(16);
          // Escribimos el título del comprobante en la posición (x=10, y=20)
          doc.text('Comprobante de Pago de Energía Eléctrica', 10, 20);

          // Cambiamos a un tamaño de letra más pequeño para los detalles
          doc.setFontSize(12);
          // Agregamos las líneas de detalle del comprobante
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Numero NPE: ${NPE}`, 10, 40); 
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

          // Si quisieras limpiar el formulario de pago de luz,
          // podrías hacerlo así (ejemplo):
          // const form = document.getElementById('Formulario_Luz');
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
        reverseButtons: true,                       // Invierte orden de los botones
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

}); // Fin de DOMContentLoaded
