document.addEventListener('DOMContentLoaded', () => {

  // ========= Función para obtener la fecha actual en texto =========
  function obtenerFechaTexto() {
    return new Date().toLocaleDateString('es-SV'); // formato según región
  }

  // ========= BOTÓN "IMPRIMIR / GENERAR COMPROBANTE" =========
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  if (btnGenerarPDF) {
    btnGenerarPDF.addEventListener('click', function (e) {
      e.preventDefault();

      // Fecha desde el sistema
      const fecha = obtenerFechaTexto();

      // Saldo desde el span
      const saldoSpan = document.getElementById('saldoDisponible');
      const saldoDisponible = saldoSpan ? saldoSpan.textContent.trim() : "";

      // Validación básica
      if (!saldoDisponible) {
        Swal.fire(
          'Campos incompletos',
          'No hay saldo disponible para mostrar en el comprobante.',
          'warning'
        );
        return;
      }

      // SweetAlert de confirmación
      Swal.fire({
        title: '¿Generar comprobante?',
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Saldo Disponible:</b> $${saldoDisponible}</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          // ========= GENERAR PDF (AQUÍ ESTABA EL ERROR) =========
          const { jsPDF } = window.jspdf;   // Asegúrate que la librería está cargada
          const doc = new jsPDF();          // ✅ ESTA es la forma correcta

          doc.setFontSize(16);
          doc.text('Comprobante de Saldo Disponible', 10, 20);

          doc.setFontSize(12);
          doc.text(`Fecha: ${fecha}`, 10, 30);
          doc.text(`Saldo Disponible: $${saldoDisponible}`, 10, 40);

          // Descargar PDF
          doc.save('ComprobanteSaldo.pdf');

          Swal.fire(
            'Generado',
            'El comprobante se ha generado correctamente.',
            'success'
          );

          // Si quisieras limpiar un formulario, sería algo así:
          // const form = document.getElementById('Formulario_AguaPotable');
          // if (form) form.reset();
        }
      });
    });
  }

  // ========= BOTÓN CANCELAR =========
  const btnCancelar = document.getElementById('btnCancelar');

  if (btnCancelar) {
    btnCancelar.addEventListener('click', function (e) {
      e.preventDefault();

      Swal.fire({
        title: '¿Desea salir al Menu Principal?',
        text: 'Perderás los cambios no guardados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
        confirmButtonColor: 'rgba(50, 172, 9, 1)',
        cancelButtonColor: '#f40b0bff'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

});
