import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import firma from "../../components/firma_rectora.png";
const Pruebas = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.addFont("times", "normal", "WinAnsiEncoding");
    // Definir el estilo de fuente
    doc.setFont("times", "bold");

    // Añadir titulo parte arriba
    doc.setFontSize(15);
    doc.text(
      `UNIVERSIDAD NACIONAL DE EDUCACIÓN`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.text(
      "Enrique Guzmán y Valle",
      doc.internal.pageSize.getWidth() / 2,
      25,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.setFont("times", "bolditalic");
    doc.text(
      `"Alma Máter del Magisterio Nacional"`,
      doc.internal.pageSize.getWidth() / 2,
      30,
      { align: "center" }
    );

    //Añadir imagen
    let imgData =
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Escudo_UNE.png";
    doc.addImage(imgData, "PNG", 102, 35, 8, 12, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("RECTORADO", doc.internal.pageSize.getWidth() / 2, 55, {
      align: "center",
    });

    //Añadir linea
    doc.setLineWidth(0.5);
    doc.line(50, 60, 155, 60);

    doc.setFontSize(14);
    doc.text("HOJA DE TRÁMITE", doc.internal.pageSize.getWidth() / 2, 90, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text(
      "CONSEJO UNIVERSITARIO",
      doc.internal.pageSize.getWidth() / 2,
      95,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `N°: -2023-R-UNE`,
      doc.internal.pageSize.getWidth() / 2,
      110,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`FECHA: `, 20, 120);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: `, 130, 120);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO: `, 20, 130);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`REMITIDO POR: `, 20, 140);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`ASUNTO: `, 20, 150);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, 160);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 20, 170);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(``, 20, 175);

    doc.setLineWidth(0.5);
    doc.line(20, 176, 190, 176);

    doc.setFontSize(6);
    doc.setFont("times", "normal");
    doc.text("cc.", 15, 270);
    doc.text(`-Archivo`, 15, 272);
    doc.text("LVAT/nmgf", 15, 274);

    const imgeData = firma;

    doc.addImage(imgeData, "PNG", 100, 200, 60, 30, { align: "center" });
    const pdfBlob1 = doc.output('blob');

    if (pdfFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob2 = new Blob([e.target.result], { type: 'application/pdf' });

        const pdfDoc1 = await PDFDocument.load(await pdfBlob1.arrayBuffer());
        const pdfDoc2 = await PDFDocument.load(await pdfBlob2.arrayBuffer());

        const copiedPages = await pdfDoc1.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
        copiedPages.forEach((page) => {
          pdfDoc1.addPage(page);
        });

        const mergedPdfBlob = await pdfDoc1.save();

        // Descarga directa del archivo PDF combinado
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([mergedPdfBlob], { type: 'application/pdf' }));
        downloadLink.download = 'merged_pdf.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      reader.readAsArrayBuffer(pdfFile);
    }
  };

  return (
    <div>
      <h2>Merge PDFs</h2>
      <button onClick={generatePDF}>Generate and Merge PDFs</button>
      <input
        type="file"
        onChange={(e) => setPdfFile(e.target.files[0])}
      />
    </div>
  );
};

export default Pruebas;
