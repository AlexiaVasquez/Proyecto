

// Esperamos a que todo el contenido HTML esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN "REALIZAR DEPÓSITO" → SweetAlert + PDF =========

  // Obtenemos el botón que generará el comprobante en PDF
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Validamos que el botón exista en el HTML antes de usarlo
  if (btnGenerarPDF) {

    // Agregamos un evento de clic al botón "Realizar Depósito"
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evita que el formulario se envíe o recargue la página por defecto
      e.preventDefault();

      // ========== CAPTURA DE DATOS DEL FORMULARIO ==========

      // Obtenemos la fecha del pago de agua
      const fecha = document.getElementById('FechaPagoAgua').value;
      // Obtenemos el NPE y le quitamos espacios al inicio y al final
      const NPE = document.getElementById('NumeroNPE_Agua').value.trim();
      // Obtenemos el monto pagado y también le quitamos espacios
      const monto = document.getElementById('MontoPago_Agua').value.trim();

      // ========== VALIDACIÓN BÁSICA DE CAMPOS OBLIGATORIOS ==========

      // Si algún campo está vacío, mostramos una alerta de advertencia
      if (!fecha || !NPE || !monto) {
        Swal.fire(
          'Campos incompletos',
          'Por favor completa todos los campos.',
          'warning'
        );
        // Detenemos el flujo para que no continúe a la generación del PDF
        return;
      }

      // ========== CONFIRMACIÓN ANTES DE GENERAR EL PDF ==========

      Swal.fire({
        title: '¿Generar comprobante?',
        // Mostramos un resumen de los datos ingresados para que el usuario los confirme
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Servicio:</b>ANDA</p>
          <p><b>Numero NPE:</b> ${NPE}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Muestra botón de cancelar
        confirmButtonText: 'Aceptar',  // Texto del botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto del botón de cancelar
      }).then((result) => {

        // Si el usuario confirma que los datos están correctos
        if (result.isConfirmed) {

          // ========== GENERACIÓN DEL PDF CON jsPDF ==========

          // Obtenemos la clase jsPDF desde el objeto global window.jspdf
          const { jsPDF } = window.jspdf;
          // Creamos un nuevo documento PDF
          const doc = new jsPDF();

          // Configuramos el tamaño de la fuente para el título
          doc.setFontSize(16);
          // Escribimos el título del comprobante en la posición (x=10, y=20)
          doc.text('Comprobante de Pago de Agua', 10, 20);

          // Configuramos un tamaño de letra más pequeño para el detalle
          doc.setFontSize(12);
          // Agregamos cada línea de información del comprobante
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Servicio: ANDA`, 10, 40);
          doc.text(`Numero NPE: ${NPE}`, 10, 50); 
          doc.text(`Monto: $${monto}`, 10, 60); 
          
          // Descargamos el PDF con el nombre "Comprobante.pdf"
          doc.save('Comprobante.pdf');

          // Mostramos un mensaje de éxito indicando que ya se generó el comprobante
          Swal.fire(
            'Generado',
            'El comprobante se ha generado correctamente.',
            'success'
          );

          // Si quisieras limpiar otro formulario después de generar el PDF,
          // podrías hacerlo aquí (ejemplo comentado):
          // document.getElementById('Formulario_TDeposito').reset();
        }

        // ========== LIMPIAR FORMULARIO DESPUÉS DEL COMPROBANTE ==========

        // Buscamos el formulario principal de Agua Potable
        const form = document.getElementById('Formulario_AguaPotables');
        // Si el formulario existe, lo reseteamos (limpiamos todos los campos)
        if (form) {
          form.reset();
        }

      }); // Fin del then de SweetAlert
    });   // Fin del addEventListener de btnGenerarPDF
  }

  // ========= BOTÓN "CANCELAR" → VOLVER AL MENÚ PRINCIPAL =========

  // Obtenemos el botón cancelar
  const btnCancelar = document.getElementById('btnCancelar');

  // Validamos que el botón exista
  if (btnCancelar) {

    // Agregamos el evento clic al botón "Cancelar"
    btnCancelar.addEventListener('click', function (e) {
      // Evita que el botón haga el comportamiento por defecto del formulario
      e.preventDefault();

      // Mostramos una alerta para confirmar si se desea salir
      Swal.fire({
        title: '¿Desea salir al Menu Principal?',
        text: 'Perderás los cambios no guardados.',
        icon: 'warning',
        showCancelButton: true,              // Botón de cancelar
        confirmButtonText: 'Sí',             // Texto confirmar
        cancelButtonText: 'No',              // Texto cancelar
        reverseButtons: true,                // Invierte el orden de los botones
        confirmButtonColor: 'rgba(50, 172, 9, 1)', // Color del botón de confirmar
        cancelButtonColor: '#f40b0bff'       // Color del botón de cancelar
      }).then((result) => {

        // Si el usuario confirma que desea salir
        if (result.isConfirmed) {
          // Redirigimos al usuario a la página del Menú Principal
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

}); // Fin del DOMContentLoaded
