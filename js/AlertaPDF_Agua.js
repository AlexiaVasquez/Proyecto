// js/AlertaPDF_Deposito.js

document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN "REALIZAR DEPÓSITO" → SweetAlert + PDF =========
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  if (btnGenerarPDF) {
    btnGenerarPDF.addEventListener('click', function (e)
     {
      e.preventDefault();

      // Tomamos los valores de los campos del formulario
      const fecha = document.getElementById('FechaPagoAgua').value;
      const NPE = document.getElementById('NumeroNPE_Agua').value.trim();
      const monto = document.getElementById('MontoPago_Agua').value.trim();
   

      // Validación básica (luego esto lo puedes mover a tu ValidacionTDeposito.js si quieres)
      if (!fecha || !NPE || !monto) {
        Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
        return;
      }

      // SweetAlert de confirmación
      Swal.fire({
        title: '¿Generar comprobante?',
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Servicio:</b>ANDA</p>
          <p><b>Numero NPE:</b> ${NPE}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          
          // Generamos el PDF
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();

          doc.setFontSize(16);
          doc.text('Comprobante de Pago de Agua', 10, 20);

          doc.setFontSize(12);
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Servicio: ANDA`, 10, 40);
          doc.text(`Numero NPE: ${NPE}`, 10, 50); 
          doc.text(`Monto: $${monto}`, 10, 60); 
          
          // Descarga del PDF
          doc.save('Comprobante.pdf');

          Swal.fire('Generado', 'El comprobante se ha generado correctamente.', 'success');

          // Si quieres, aquí puedes limpiar el formulario:
          // document.getElementById('Formulario_TDeposito').reset();
        }
          // ========== LIMPIAR FORMULARIO DESPUÉS DEL COMPROBANTE ==========
          const form = document.getElementById('Formulario_AguaPotable');
          if (form) {
            form.reset();
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
