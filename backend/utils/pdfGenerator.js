import PDFDocument from 'pdfkit';

// Función para generar un PDF simple con los datos del reporte de asistencia
export const generateAsistenciaPdfStream = (reporteData) => {
  const doc = new PDFDocument({ margin: 50 });

  // --- Cabecera ---
  doc
    .fontSize(18).text('Reporte de Asistencia', { align: 'center' })
    .moveDown(0.5);
  doc
    .fontSize(12).text(reporteData.descripcion || 'Descripción no disponible', { align: 'center' })
    .moveDown(0.5);
  doc
    .fontSize(10).text(`Generado el: ${new Date(reporteData.fecha_generacion).toLocaleString('es-MX')}`, { align: 'center' })
    .text(`Periodo: ${reporteData.rango_fecha_inicio} al ${reporteData.rango_fecha_fin}`, { align: 'center' })
    .moveDown(1.5);

  // --- Datos del Reporte (del JSONB) ---
  const stats = reporteData.datos_reportados; // Asume que datos_reportados es un objeto
  if (stats) {
    doc.fontSize(14).text('Resumen de Asistencia', { underline: true }).moveDown(0.5);
    doc.fontSize(12);
    doc.text(`- Clases Impartidas en Periodo: ${stats.totalClasesImpartidas || 'N/A'}`);
    doc.text(`- Total Asistencias Esperadas: ${stats.totalAsistenciasEsperadas || 'N/A'}`);
    doc.text(`- Total Asistencias Registradas: ${stats.totalAsistenciasRegistradas || 'N/A'}`);
    doc.moveDown(0.5);
    doc.text('Detalles:', { underline: true });
    doc.text(`  - Presentes: ${stats.detalles?.presentes ?? 'N/A'}`); // Usa optional chaining
    doc.text(`  - Tardanzas: ${stats.detalles?.tardanzas ?? 'N/A'}`);
    doc.text(`  - Ausentes (Calculado): ${stats.detalles?.ausentes ?? 'N/A'}`);
    doc.moveDown(0.5);
    doc.fontSize(14).text(`Porcentaje de Asistencia: ${stats.porcentajeAsistencia || 0}%`, { align: 'right' });
    doc.moveDown(1);

    // --- Podríamos añadir más detalles si los tuviéramos ---
    // Por ejemplo, una tabla con la lista de clases o alumnos.
    // doc.text('Detalle por clase (Pendiente)...');

  } else {
    doc.fontSize(12).text('No hay datos de resumen disponibles en este reporte.');
  }

  // --- Pie de Página (Opcional) ---
  doc.fontSize(8).text('Sistema de Gestión de Laboratorios - SISLAB', 50, doc.page.height - 50, {
    align: 'center',
    lineBreak: false
  });

  // Finaliza el PDF (Importante)
  doc.end();

  return doc; // Devuelve el stream del documento PDF
};