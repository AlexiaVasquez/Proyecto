// ====== REFERENCIAS ======
const formulario   = document.getElementById('formularioPagoLuz');
const cuerpoTabla  = document.getElementById('Informacion_transaccionE');
const btnPdf       = document.getElementById('btnPdf');

// ====== ARREGLO GLOBAL ======
// HAZLO GLOBAL: disponible como window.datosEnergia
let datosEnergia = window.datosEnergia || [];
window.datosEnergia = datosEnergia;

// ====== PINTAR UNA FILA ======
function agregarFila(fecha, numeroNPE, monto) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${fecha}</td>
    <td>${numeroNPE}</td>
    <td>${monto}</td>
  `;
  cuerpoTabla.appendChild(tr);
}

// ====== RECONSTRUIR TABLA ======
function construirTabla() {
  cuerpoTabla.innerHTML = '';
  datosEnergia.forEach(it => agregarFila(it.fecha, it.numeroNPE, it.monto));
  console.log('Tabla reconstruida. Filas:', cuerpoTabla.querySelectorAll('tr').length);
}

// ====== CAPTURAR SUBMIT (NO recargar) ======
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const fecha = document.getElementById('FechaPagoLuz').value;
  const npe   = document.getElementById('NumeroNPE_Luz').value.trim();
  const monto = document.getElementById('MontoPago_Luz').value.trim();

  if (!fecha || !npe || !monto) {
    alert('Completa todos los campos.');
    return;
  }

  datosEnergia.push({ fecha, numeroNPE: npe, monto });
  console.log('Agregado:', { fecha, npe, monto }, 'Total en array:', datosEnergia.length);

  formulario.reset();
  construirTabla();
});

// ====== EXPORTAR A PDF ======
document.addEventListener('DOMContentLoaded', () => {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) console.error('jsPDF no está cargado.');

  const btn = document.getElementById('btnPdf');
  if (!btn) {
    console.warn('No existe el botón #btnPdf en el DOM.');
    return;
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    // 1) ¿La tabla existe y tiene filas?
    const tabla = document.getElementById('tablaEnergia');
    const filas = tabla ? tabla.querySelectorAll('tbody tr').length : 0;
    console.log('Tabla encontrada:', !!tabla, 'Filas:', filas);

    const doc = new jsPDF({ unit:'pt', format:'a4' });
    const MARGIN = 40;

    doc.setFont('helvetica','bold'); 
    doc.setFontSize(14);
    doc.text('Comprobante de Pagos de Energía', MARGIN, 40);

    if (tabla && filas > 0 && typeof doc.autoTable === 'function') {
      // Exportar directo desde la tabla del DOM
      doc.autoTable({
        html: '#tablaEnergia',
        startY: 60,
        theme: 'grid',
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [33,37,41], textColor: 255 },
        margin: { left: MARGIN, right: MARGIN }
      });
      doc.save('pagos-energia.pdf');
      return;
    }

    // 2) Fallback: usar el array global
    if (Array.isArray(window.datosEnergia) && window.datosEnergia.length > 0) {
      const columns = [
        { header: 'Fecha',      dataKey: 'fecha' },
        { header: 'Número NPE', dataKey: 'numeroNPE' },
        { header: 'Monto ($)',  dataKey: 'monto' }
      ];
      const rows = window.datosEnergia.map(r => ({
        fecha: r.fecha,
        numeroNPE: r.numeroNPE,
        monto: Number(r.monto).toFixed(2)
      }));
      const total = window.datosEnergia
        .reduce((acc, r) => acc + (Number(r.monto) || 0), 0);

      doc.autoTable({
        startY: 60,
        head: [ columns.map(c => c.header) ],
        body: rows.map(r => columns.map(c => r[c.dataKey])),
        theme: 'grid',
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [33,37,41], textColor: 255 },
        columnStyles: { 2: { halign: 'right', cellWidth: 90 } },
        margin: { left: MARGIN, right: MARGIN }
      });

      const endY = doc.lastAutoTable.finalY || 60;
      doc.setFont('helvetica','bold'); doc.setFontSize(12);
      doc.text(`Total: $${total.toFixed(2)}`, MARGIN, endY + 24);

      doc.save('pagos-energia.pdf');
      return;
    }

    alert('No hay datos en la tabla ni en el arreglo para exportar.');
  });
});

// ====== INICIO ======
construirTabla();
