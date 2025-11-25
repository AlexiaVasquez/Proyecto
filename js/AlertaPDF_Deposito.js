

// Esperamos a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

  // ========= BOTÓN "REALIZAR DEPÓSITO" → SweetAlert + PDF =========

  // Obtenemos el botón que usaremos para generar el comprobante de depósito en PDF
  const btnGenerarPDF = document.getElementById('btnGenerarPDF');

  // Verificamos que el botón exista en el DOM
  if (btnGenerarPDF) {

    // Agregamos un evento de clic al botón "Realizar Depósito"
    btnGenerarPDF.addEventListener('click', function (e) {
      // Evitamos que el botón ejecute la acción por defecto (por ejemplo, enviar un formulario)
      e.preventDefault();

      // ========== CAPTURA DE DATOS DEL FORMULARIO ==========

      // Obtenemos la fecha del depósito
      const fecha = document.getElementById('FechaDeposito').value;
      // Obtenemos el número de cuenta, sin espacios al inicio o final
      const numeroCuenta = document.getElementById('NumeroCuentaDeposito').value.trim();
      // Obtenemos el concepto del depósito
      const concepto = document.getElementById('ConceptoDeposito').value.trim();
      // Obtenemos el monto del depósito
      const monto = document.getElementById('MontoDeposito').value.trim();
      // Obtenemos el número de tarjeta usada para el depósito
      const numeroTarjeta = document.getElementById('NumeroTarjeta').value.trim();
      
      // ========== VALIDACIÓN BÁSICA DE CAMPOS OBLIGATORIOS ==========

      // Si cualquiera de los campos está vacío, mostramos una alerta de advertencia
      if (!fecha || !numeroCuenta || !concepto || !monto || !numeroTarjeta) {
        Swal.fire(
          'Campos incompletos',
          'Por favor completa todos los campos.',
          'warning'
        );
        // Detenemos la ejecución para no continuar con la generación del PDF
        return;
      }

      // ========== CONFIRMACIÓN CON SWEETALERT ANTES DE GENERAR EL PDF ==========

      Swal.fire({
        title: '¿Generar comprobante?',
        // Mostramos un resumen de la información que el usuario ingresó
        html: `
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Número de cuenta:</b> ${numeroCuenta}</p>
          <p><b>Concepto:</b> ${concepto}</p>
          <p><b>Número de tarjeta:</b> ${numeroTarjeta}</p>
          <p><b>Monto:</b> $${monto}</p>
        `,
        icon: 'question',
        showCancelButton: true,        // Muestra el botón "Cancelar"
        confirmButtonText: 'Aceptar',  // Texto botón de confirmación
        cancelButtonText: 'Cancelar'   // Texto botón de cancelación
      }).then((result) => {

        // Si el usuario presiona "Aceptar"
        if (result.isConfirmed) {

          // ========== GENERACIÓN DEL PDF CON jsPDF ==========

          // Obtenemos la clase jsPDF desde el objeto global window.jspdf
          const { jsPDF } = window.jspdf;
          // Creamos una nueva instancia de documento PDF
          const doc = new jsPDF();

          // Definimos el tamaño de fuente para el título
          doc.setFontSize(16);
          // Escribimos el título del comprobante en la posición (x=10, y=20)
          doc.text('Comprobante de operación', 10, 20);

          // Cambiamos el tamaño de fuente para el contenido del comprobante
          doc.setFontSize(12);
          // Agregamos los detalles de la operación, línea por línea
          doc.text(`Fecha: ${fecha}`, 10, 30); 
          doc.text(`Número de cuenta: ${numeroCuenta}`, 10, 40); 
          doc.text(`Concepto: ${concepto}`, 10, 50); 
          doc.text(`Número de tarjeta: ${numeroTarjeta}`, 10, 60); 
          doc.text(`Monto: $${monto}`, 10, 70); 

          // ========== DESCARGA DEL PDF ==========

          // Descargamos el PDF con el nombre "Comprobante.pdf"
          doc.save('Comprobante.pdf');

          // Mostramos un mensaje de éxito indicando que el comprobante se generó bien
          Swal.fire(
            'Generado',
            'El comprobante de depósito se ha generado correctamente.',
            'success'
          );

          // Si quisieras limpiar el formulario después de generar el PDF,
          // podrías descomentar este bloque:
          // const form = document.getElementById('Formulario_TDeposito');
          // if (form) form.reset();
        }
      });
    });
  }

  // ========= BOTÓN CANCELAR =========

  // Obtenemos el botón "Cancelar"
  const btnCancelar = document.getElementById('btnCancelar');

  // Validamos que el botón exista
  if (btnCancelar) {

    // Agregamos un evento clic al botón "Cancelar"
    btnCancelar.addEventListener('click', function (e) {
      // Evitamos el comportamiento por defecto (por ejemplo, envío de formulario)
      e.preventDefault();

      // Mostramos un SweetAlert para confirmar si el usuario quiere salir
      Swal.fire({
        title: '¿Desea salir al Menu Principal?',
        text: 'Perderás los cambios no guardados.',
        icon: 'warning',
        showCancelButton: true,                     // Muestra botón "No"
        confirmButtonText: 'Sí',                    // Texto botón confirmar
        cancelButtonText: 'No',                     // Texto botón cancelar
        reverseButtons: true,                       // Invierte el orden visual de los botones
        confirmButtonColor: 'rgba(50, 172, 9, 1)',  // Color del botón confirmar
        cancelButtonColor: '#f40b0bff'              // Color del botón cancelar
      }).then((result) => {

        // Si el usuario confirma que desea salir
        if (result.isConfirmed) {
          // Redirigimos al usuario al Menú Principal
          window.location.href = 'Menu_Principal.html';
        }
      });
    });
  }

}); // Fin del DOMContentLoaded
