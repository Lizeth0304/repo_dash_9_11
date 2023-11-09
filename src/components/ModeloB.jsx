import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf/dist/jspdf.umd.min.js";
import VisualizadorPDF from "./VisualizadorPDF";
import firma2 from "./firma_rectora.png";
import { PDFDocument } from "pdf-lib";
import axios from 'axios';

const ModeloB = () => {
  const initialFormValues2 = {
    envio2: "",
    fecha2: "",
    folios2: "",
    documento2: "",
    remitido2: "",
    asunto2: "",
    observaciones2: "",
    cc: "",
    cc2: "",
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: "",
    c:"",
    s:"",
    mes:"",
    fechaR:"",
    plazos:"",
    derivadoa:"",
    respuesta1:"",
    documento22:"",
    respuesta3:"",
    documento3:"",
    respuesta4:"",
    documentoF:"",
    expediente:"",
    derivadoA:"",
    fechaR2:"",
    // Agrega aquí todos los inputs que necesites
  };
  const [formValues, setFormValues] = useState({
    envio2: "",
    fecha2: "",
    folios2: "",
    documento2: "",
    remitido2: "",
    asunto2: "",
    observaciones2: "",
    cc: "",
    cc2: "",
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: "",
    c:"",
    s:"",
    mes:"",
    fechaR:"",
    plazos:"",
    derivadoa:"",
    respuesta1:"",
    documento22:"",
    respuesta3:"",
    documento3:"",
    respuesta4:"",
    documentoF:"",
    expediente:"",
    derivadoA:"",
    fechaR2:"",
    // Agrega aquí todos los inputs que necesites
  });
  const [tableData, setTableData] = useState(null);

  const [showCustomFacultad, setShowCustomFacultad] = useState(false);

  const [outputUrl, setOutputUrl] = useState("");

  const [pdfFiles, setPdfFiles] = useState([]); // Cambia a un array para manejar múltiples archivos PDF

  const [generatedPdf, setGeneratedPdf] = useState(null); // Nuevo estado para el PDF generado
  const [fileNames, setFileNames] = useState(["", "", ""]); // Inicializa los nombres de los archivos
  
   // Estado para la firma personalizada y predeterminada
const [firmaPersonalizada2, setFirmaPersonalizada2] = useState(null);

// Supongamos que tienes una URL de imagen para la firma predeterminada
const firmaPredeterminadaUrl2 = firma2; // Reemplaza con la URL real

// Inicializa la firma predeterminada con la URL
const [firmaPredeterminada2, setFirmaPredeterminada2] = useState(firmaPredeterminadaUrl2);

const handleFirmaChange = (event) => {
  const file = event.target.files[0]; // Obtén el archivo seleccionado
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl2 = e.target.result;
      // Almacena la nueva firma personalizada en el almacenamiento local
      localStorage.setItem("firmaPersonalizada2", imageDataUrl2);
      // Actualiza la firma personalizada en el estado
      setFirmaPersonalizada2(imageDataUrl2);
      generatePDF(); // Actualiza el PDF con la nueva firma personalizada
    };
    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  }
};

  //****** Función para manejar la carga de archivos
  const handleFileChange = (event, index) => {
    const files = event.target.files;
    const newPdfFiles = [];
  
    for (let i = 0; i < files.length; i++) {
      newPdfFiles.push(files[i]);
    }
  
    setPdfFiles((prevPdfFiles) => [...prevPdfFiles, ...newPdfFiles]);
  
     // Actualiza el nombre del archivo en el arreglo de nombres
  if (files.length > 0) {
    const newFileNames = [...fileNames];
    newFileNames[index] = files[0].name; // Actualiza el nombre del archivo en la posición correspondiente
    setFileNames(newFileNames);
  } else {
    // Si no se selecciona un archivo, borra el nombre del archivo en la posición correspondiente
    const newFileNames = [...fileNames];
    newFileNames[index] = "";
    setFileNames(newFileNames);
  }
  };



  const generatePDF = () => {
    const doc = new jsPDF();

    // Crear instancia de jsPDF

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
      `N°: ${formValues.envio2}-2023-R-UNE`,
      doc.internal.pageSize.getWidth() / 2,
      110,
      { align: "center" }
    );
    
    if (formValues.fecha2) {
    const formattedFecha = new Date(formValues.fecha2 + 'T00:00:00Z').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      timeZone: 'UTC',
    });

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`FECHA: ${formattedFecha}`, 20, 120);
  }else{
    doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text("FECHA: ", 20, 120);
  }

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: ${formValues.folios2}`, 130, 120);

    const maxDocumentoWidth = 140;

    // Dividir el contenido del campo "Documento" en líneas
    const documentoLines = doc.splitTextToSize(formValues.documento2, maxDocumentoWidth);
    
    // Calculate the height needed for the REMITIDO POR field
    const documentoHeight = documentoLines.length * 5; // Multiplying by 5 for line spacing
    
    // Initial Y-coordinate for the REMITIDO POR field
    let documentoY = 130;
    
    // Add the REMITIDO POR field in the PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO: `, 20, documentoY);
    let documentoTextY = documentoY;
    // Contar la cantidad de líneas en el campo "OBSERVACIONES"
    const numLinesDoc = documentoLines.length;
    
    // Dibujar cada línea del campo "OBSERVACIONES" y justificar el texto por palabra
    for (let i = 0; i < numLinesDoc; i++) {
    const line = documentoLines[i];
    const words = line.split(' '); // Dividir la línea en palabras
    
    // Si es la última línea, no justificar, dejar alineación izquierda
    if (i === numLinesDoc - 1) {
     let xPos = 52;
     for (let word of words) {
       doc.text(word, xPos, documentoTextY);
       xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
     }
    } else {
     const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
     const spaceWidth = (140 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
     let xPos = 52;
    
     for (let j = 0; j < words.length; j++) {
       doc.text(words[j], xPos, documentoTextY);
       if (j < words.length - 1) {
         xPos += doc.getTextWidth(words[j]) + spaceWidth;
       } else {
         xPos += doc.getTextWidth(words[j]);
       }
     }
    
    }
    documentoTextY += 5; // Increase Y-coordinate for the next line
    }
    
    // Calculate the new Y-coordinate for the ASUNTO field, taking into account the height of REMITIDO POR
  const remitidoY = documentoY+documentoHeight+5; // Adjust spacing as needed

// Define the maximum width for REMITIDO POR field
const maxRemitidoWidth = 140;

// Dividir el contenido del campo "Documento" en líneas
const remitidoLines = doc.splitTextToSize(formValues.remitido2, maxRemitidoWidth);

// Calculate the height needed for the REMITIDO POR field
const remitidoHeight = remitidoLines.length * 5; // Multiplying by 5 for line spacing

// Initial Y-coordinate for the REMITIDO POR field
//let remitidoY = documentoY+10;

// Add the REMITIDO POR field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`REMITIDO POR: `, 20, remitidoY);
let remitidoTextY = remitidoY;
// Contar la cantidad de líneas en el campo "OBSERVACIONES"
const numLinesRem = remitidoLines.length;

// Dibujar cada línea del campo "OBSERVACIONES" y justificar el texto por palabra
for (let i = 0; i < numLinesRem; i++) {
  const line = remitidoLines[i];
  const words = line.split(' '); // Dividir la línea en palabras

  // Si es la última línea, no justificar, dejar alineación izquierda
  if (i === numLinesRem - 1) {
    let xPos = 52;
    for (let word of words) {
      doc.text(word, xPos, remitidoTextY);
      xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
    }
  } else {
    const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
    const spaceWidth = (140 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
    let xPos = 52;

    for (let j = 0; j < words.length; j++) {
      doc.text(words[j], xPos, remitidoTextY);
      if (j < words.length - 1) {
        xPos += doc.getTextWidth(words[j]) + spaceWidth;
      } else {
        xPos += doc.getTextWidth(words[j]);
      }
    }

  }
  remitidoTextY += 5; // Increase Y-coordinate for the next line
}

// Calculate the new Y-coordinate for the ASUNTO field, taking into account the height of REMITIDO POR
const asuntoY = remitidoY+remitidoHeight+5; // Adjust spacing as needed

// Define the maximum width for the ASUNTO field
const maxAsuntoWidth = 140;


// Split the content of the ASUNTO field into lines
const asuntoLines = doc.splitTextToSize(formValues.asunto2, maxAsuntoWidth);

// Add the ASUNTO field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`ASUNTO: `, 20, asuntoY);

// Initialize Y-coordinate for the ASUNTO field
let asuntoTextY = asuntoY;

// Contar la cantidad de líneas en el campo "ASUNTO"
const numLinesAsun = asuntoLines.length;

// Dibujar cada línea del campo "ASUNTO" y justificar el texto por palabra
for (let i = 0; i < numLinesAsun; i++) {
  const line = asuntoLines[i];
  const words = line.split(' '); // Dividir la línea en palabras

  // Si es la última línea, no justificar, dejar alineación izquierda
  if (i === numLinesAsun - 1) {
    let xPos = 52;
    for (let word of words) {
      doc.text(word, xPos, asuntoTextY);
      xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
    }
  } else {
    const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
    const spaceWidth = (140 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
    let xPos = 52;

    for (let j = 0; j < words.length; j++) {
      doc.text(words[j], xPos, asuntoTextY);
      if (j < words.length - 1) {
        xPos += doc.getTextWidth(words[j]) + spaceWidth;
      } else {
        xPos += doc.getTextWidth(words[j]);
      }
    }

  }
  asuntoTextY += 5; // Increase Y-coordinate for the next line
}

const asuntoHeight = asuntoLines.length * 5; // Multiplying by 5 for line spacing
const paseY = asuntoY+asuntoHeight+5;
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, paseY);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 20, paseY+5);
    
// Split the observaciones text into lines
const maxObservacionesWidth = 173; // Maximum width for observaciones text
const observacionesLines = doc.splitTextToSize(formValues.observaciones2, maxObservacionesWidth);

// Calculate the total height of observaciones text
const observacionesHeight = observacionesLines.length * 5; // Assuming a font size of 12 and 1 unit spacing between lines

// Draw each line of observaciones with a line separator
doc.setFontSize(12);
doc.setFont("times", "normal");

// Initial Y-coordinate for the observaciones text
let observacionesY = paseY + 12;

// Contar la cantidad de líneas en el campo "ASUNTO"
const numLinesObs = observacionesLines.length;

// Dibujar cada línea del campo "ASUNTO" y justificar el texto por palabra
for (let i = 0; i < numLinesObs; i++) {
  const line = observacionesLines[i];
  const words = line.split(' '); // Dividir la línea en palabras

  // Si es la última línea, no justificar, dejar alineación izquierda
  if (i === numLinesObs- 1) {
    let xPos = 20;
    for (let word of words) {
      doc.text(word, xPos, observacionesY);
      xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
    }
  } else {
    const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
    const spaceWidth = (173 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
    let xPos = 20;

    for (let j = 0; j < words.length; j++) {
      doc.text(words[j], xPos, observacionesY);
      if (j < words.length - 1) {
        xPos += doc.getTextWidth(words[j]) + spaceWidth;
      } else {
        xPos += doc.getTextWidth(words[j]);
      }
    }
  }
  observacionesY += 5; // Increase Y-coordinate for the next line
}
// Calculate the new Y-coordinate for the firma image
const firmaY = observacionesY+5; // Adjust the spacing as needed

doc.setFontSize(6);
doc.setFont("times", "normal");

let yPosition = 270; // Posición vertical inicial
let hasCC = false; // Variable para verificar si hay al menos un campo cc
doc.text("cc.", 15, 268);
// Verificar y agregar campos cc
if (formValues.cc2) {
doc.text(`- ${formValues.cc2}`, 15, yPosition);
yPosition += 2; // Añadir un espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc3) {
doc.text(`- ${formValues.cc3}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc4) {
doc.text(`- ${formValues.cc4}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

// Agregar un guion solo si no hay campos cc
if (!hasCC) {
doc.text("- ", 15, yPosition);
yPosition += 2; // Añadir un espacio adicional
}

doc.text("- Archivo", 15, yPosition);
doc.text("LVAT/nmgf", 15, yPosition + 2); // Agregar espacio después de "Archivo"

// Usa la imagen de firma personalizada si está disponible, de lo contrario, usa la predeterminada
const imgeData2 = firmaPersonalizada2 || firmaPredeterminada2;

doc.addImage(imgeData2, "PNG", 70, observacionesY, 55.06, 34, { align: "center" });
// Llama a generatePDF para actualizar el PDF con las firmas actuales
setGeneratedPdf(doc);
    // Guardar el PDF
    // doc.save("ModeloB.pdf");

    // Actualizar el estado con la URL del PDF
    const pdfUrl = doc.output("bloburl");
    setOutputUrl(pdfUrl);
    return doc;
  };

 
  const handleGeneratePDF = async () => {
    const generatedPDF = generatePDF();
    const doc = new jsPDF();
    
    // Crear instancia de jsPDF

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
      `N°: ${formValues.envio2}-2023-R-UNE`,
      doc.internal.pageSize.getWidth() / 2,
      110,
      { align: "center" }
    );
    
    if (formValues.fecha2) {
    const formattedFecha = new Date(formValues.fecha2 + 'T00:00:00Z').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      timeZone: 'UTC',
    });

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`FECHA: ${formattedFecha}`, 20, 120);
  }else{
    doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text("FECHA: ", 20, 120);
  }

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: ${formValues.folios2}`, 130, 120);

    const maxDocumentoWidth = 140;

    // Dividir el contenido del campo "Documento" en líneas
    const documentoLines = doc.splitTextToSize(formValues.documento2, maxDocumentoWidth);
    
    // Calculate the height needed for the REMITIDO POR field
    const documentoHeight = documentoLines.length * 5; // Multiplying by 5 for line spacing
    
    // Initial Y-coordinate for the REMITIDO POR field
    let documentoY = 130;
    
    // Add the REMITIDO POR field in the PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO: `, 20, documentoY);
    let documentoTextY = documentoY;
    // Contar la cantidad de líneas en el campo "OBSERVACIONES"
    const numLinesDoc = documentoLines.length;
    
    // Dibujar cada línea del campo "OBSERVACIONES" y justificar el texto por palabra
    for (let i = 0; i < numLinesDoc; i++) {
    const line = documentoLines[i];
    const words = line.split(' '); // Dividir la línea en palabras
    
    // Si es la última línea, no justificar, dejar alineación izquierda
    if (i === numLinesDoc - 1) {
     let xPos = 52;
     for (let word of words) {
       doc.text(word, xPos, documentoTextY);
       xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
     }
    } else {
     const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
     const spaceWidth = (140 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
     let xPos = 52;
    
     for (let j = 0; j < words.length; j++) {
       doc.text(words[j], xPos, documentoTextY);
       if (j < words.length - 1) {
         xPos += doc.getTextWidth(words[j]) + spaceWidth;
       } else {
         xPos += doc.getTextWidth(words[j]);
       }
     }
    
    }
    documentoTextY += 5; // Increase Y-coordinate for the next line
    }
    
    // Calculate the new Y-coordinate for the ASUNTO field, taking into account the height of REMITIDO POR
  const remitidoY = documentoY+documentoHeight+5; // Adjust spacing as needed

// Define the maximum width for REMITIDO POR field
const maxRemitidoWidth = 140;

// Dividir el contenido del campo "Documento" en líneas
const remitidoLines = doc.splitTextToSize(formValues.remitido2, maxRemitidoWidth);

// Calculate the height needed for the REMITIDO POR field
const remitidoHeight = remitidoLines.length * 5; // Multiplying by 5 for line spacing

// Initial Y-coordinate for the REMITIDO POR field
//let remitidoY = documentoY+10;

// Add the REMITIDO POR field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`REMITIDO POR: `, 20, remitidoY);
let remitidoTextY = remitidoY;
// Contar la cantidad de líneas en el campo "OBSERVACIONES"
const numLinesRem = remitidoLines.length;

// Dibujar cada línea del campo "OBSERVACIONES" y justificar el texto por palabra
for (let i = 0; i < numLinesRem; i++) {
  const line = remitidoLines[i];
  const words = line.split(' '); // Dividir la línea en palabras

  // Si es la última línea, no justificar, dejar alineación izquierda
  if (i === numLinesRem - 1) {
    let xPos = 52;
    for (let word of words) {
      doc.text(word, xPos, remitidoTextY);
      xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
    }
  } else {
    const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
    const spaceWidth = (140 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
    let xPos = 52;

    for (let j = 0; j < words.length; j++) {
      doc.text(words[j], xPos, remitidoTextY);
      if (j < words.length - 1) {
        xPos += doc.getTextWidth(words[j]) + spaceWidth;
      } else {
        xPos += doc.getTextWidth(words[j]);
      }
    }

  }
  remitidoTextY += 5; // Increase Y-coordinate for the next line
}

// Calculate the new Y-coordinate for the ASUNTO field, taking into account the height of REMITIDO POR
const asuntoY = remitidoY+remitidoHeight+5; // Adjust spacing as needed

// Define the maximum width for the ASUNTO field
const maxAsuntoWidth = 140;


// Split the content of the ASUNTO field into lines
const asuntoLines = doc.splitTextToSize(formValues.asunto2, maxAsuntoWidth);

// Add the ASUNTO field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`ASUNTO: `, 20, asuntoY);

// Initialize Y-coordinate for the ASUNTO field
let asuntoTextY = asuntoY;

// Contar la cantidad de líneas en el campo "ASUNTO"
const numLinesAsun = asuntoLines.length;

// Dibujar cada línea del campo "ASUNTO" y justificar el texto por palabra
for (let i = 0; i < numLinesAsun; i++) {
  const line = asuntoLines[i];
  const words = line.split(' '); // Dividir la línea en palabras

  // Si es la última línea, no justificar, dejar alineación izquierda
  if (i === numLinesAsun - 1) {
    let xPos = 52;
    for (let word of words) {
      doc.text(word, xPos, asuntoTextY);
      xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
    }
  } else {
    const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
    const spaceWidth = (140 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
    let xPos = 52;

    for (let j = 0; j < words.length; j++) {
      doc.text(words[j], xPos, asuntoTextY);
      if (j < words.length - 1) {
        xPos += doc.getTextWidth(words[j]) + spaceWidth;
      } else {
        xPos += doc.getTextWidth(words[j]);
      }
    }

  }
  asuntoTextY += 5; // Increase Y-coordinate for the next line
}

const asuntoHeight = asuntoLines.length * 5; // Multiplying by 5 for line spacing
const paseY = asuntoY+asuntoHeight+5;
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, paseY);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 20, paseY+5);
    
// Split the observaciones text into lines
const maxObservacionesWidth = 173; // Maximum width for observaciones text
const observacionesLines = doc.splitTextToSize(formValues.observaciones2, maxObservacionesWidth);

// Calculate the total height of observaciones text
const observacionesHeight = observacionesLines.length * 5; // Assuming a font size of 12 and 1 unit spacing between lines

// Draw each line of observaciones with a line separator
doc.setFontSize(12);
doc.setFont("times", "normal");

// Initial Y-coordinate for the observaciones text
let observacionesY = paseY + 12;

// Contar la cantidad de líneas en el campo "ASUNTO"
const numLinesObs = observacionesLines.length;

// Dibujar cada línea del campo "ASUNTO" y justificar el texto por palabra
for (let i = 0; i < numLinesObs; i++) {
  const line = observacionesLines[i];
  const words = line.split(' '); // Dividir la línea en palabras

  // Si es la última línea, no justificar, dejar alineación izquierda
  if (i === numLinesObs- 1) {
    let xPos = 20;
    for (let word of words) {
      doc.text(word, xPos, observacionesY);
      xPos += doc.getTextWidth(word) + 2; // Agregar un espacio fijo entre palabras
    }
  } else {
    const totalWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
    const spaceWidth = (173 - totalWidth) / (words.length - 1); // Espacios para justificar (140 es el ancho máximo)
    let xPos = 20;

    for (let j = 0; j < words.length; j++) {
      doc.text(words[j], xPos, observacionesY);
      if (j < words.length - 1) {
        xPos += doc.getTextWidth(words[j]) + spaceWidth;
      } else {
        xPos += doc.getTextWidth(words[j]);
      }
    }
  }
  observacionesY += 5; // Increase Y-coordinate for the next line
}
// Calculate the new Y-coordinate for the firma image
const firmaY = observacionesY+5; // Adjust the spacing as needed

doc.setFontSize(6);
doc.setFont("times", "normal");

let yPosition = 270; // Posición vertical inicial
let hasCC = false; // Variable para verificar si hay al menos un campo cc
doc.text("cc.", 15, 268);
// Verificar y agregar campos cc
if (formValues.cc2) {
doc.text(`- ${formValues.cc2}`, 15, yPosition);
yPosition += 2; // Añadir un espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc3) {
doc.text(`- ${formValues.cc3}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc4) {
doc.text(`- ${formValues.cc4}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

// Agregar un guion solo si no hay campos cc
if (!hasCC) {
doc.text("- ", 15, yPosition);
yPosition += 2; // Añadir un espacio adicional
}

doc.text("- Archivo", 15, yPosition);
doc.text("LVAT/nmgf", 15, yPosition + 2); // Agregar espacio después de "Archivo"

// Usa la imagen de firma personalizada si está disponible, de lo contrario, usa la predeterminada
const imgeData2 = firmaPersonalizada2 || firmaPredeterminada2;

doc.addImage(imgeData2, "PNG", 70, observacionesY, 55.06, 34, { align: "center" });
// Llama a generatePDF para actualizar el PDF con las firmas actuales
//generatePDF();
// Llama a generatePDF para actualizar el PDF con las firmas actuales
//generatePDF();
// Filtra los valores para eliminar aquellos que están en blanco (vacíos)
    const formData = Object.entries(formValues).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await axios.post('http://localhost:3000/guardar-datos3', formData);

      if (response.status === 200) {
        console.log('Datos guardados con éxito');
        // Puedes realizar otras acciones aquí, como redirigir al usuario.
      }
    } catch (error) {
      console.error('Error al guardar datos:', error);
      // Maneja el error de acuerdo a tus necesidades.
    }
// Crea una lista de promesas para cargar y combinar archivos PDF adjuntos
const loadAndCombinePromises = [];

// Genera el PDF base y agrégalo a la lista de promesas
loadAndCombinePromises.push(
  new Promise(async (resolve) => {
    const generatedPdfBlob = await generatedPDF.output("blob");
    const generatedPdfDoc = await PDFDocument.load(
      await generatedPdfBlob.arrayBuffer()
    );
    resolve(generatedPdfDoc);
  })
);

// Carga y combina Archivo Adjunto 1 y agrégalo a la lista de promesas
if (pdfFiles.length > 0) {
  loadAndCombinePromises.push(
    new Promise(async (resolve) => {
      const pdfFile = pdfFiles[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob = new Blob([e.target.result], {
          type: "application/pdf",
        });
        const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
        resolve(pdfDoc);
      };
      reader.readAsArrayBuffer(pdfFile);
    })
  );
}

// Carga y combina Archivo Adjunto 2 y agrégalo a la lista de promesas
if (pdfFiles.length > 1) {
  loadAndCombinePromises.push(
    new Promise(async (resolve) => {
      const pdfFile = pdfFiles[1];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob = new Blob([e.target.result], {
          type: "application/pdf",
        });
        const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
        resolve(pdfDoc);
      };
      reader.readAsArrayBuffer(pdfFile);
    })
  );
}

// Carga y combina Archivo Adjunto 3 y agrégalo a la lista de promesas
if (pdfFiles.length > 2) {
  loadAndCombinePromises.push(
    new Promise(async (resolve) => {
      const pdfFile = pdfFiles[2];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob = new Blob([e.target.result], {
          type: "application/pdf",
        });
        const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
        resolve(pdfDoc);
      };
      reader.readAsArrayBuffer(pdfFile);
    })
  );
}

// Espera a que todas las promesas se completen
const loadedPdfDocs = await Promise.all(loadAndCombinePromises);

// Combina todos los archivos PDF en el orden deseado
const mergedPdfDoc = await PDFDocument.create();
for (const pdfDoc of loadedPdfDocs) {
  const copiedPages = await mergedPdfDoc.copyPages(
    pdfDoc,
    pdfDoc.getPageIndices()
  );
  copiedPages.forEach((page) => {
    mergedPdfDoc.addPage(page);
  });
}
// Guarda los datos en el estado tableData
setTableData(formValues);
// Descarga el PDF resultante
const mergedPdfBlob = await mergedPdfDoc.save();
const downloadLink = document.createElement("a");
downloadLink.href = URL.createObjectURL(
  new Blob([mergedPdfBlob], { type: "application/pdf" })
);
downloadLink.download = `H.T. N ${formValues.envio2}-2023-R-UNE.pdf`;
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);

// Actualiza los nombres de archivo a vacío
setFileNames(["", "", ""]);

resetFormValues();

};
         
    
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const resetFormValues = () => {
    console.log("Resetting form values");
    setFormValues(initialFormValues2);
    setPdfFiles([]);
    setFileNames(["", "", ""]);
    
  };
  


  useEffect(() => {
   // generatePDF();
           // Intenta obtener la firma personalizada desde el almacenamiento local
  const storedFirmaPersonalizada2 = localStorage.getItem("firmaPersonalizada2");
  if (storedFirmaPersonalizada2) {
    // Si se encuentra una firma personalizada almacenada, configúrala en el estado
    setFirmaPersonalizada2(storedFirmaPersonalizada2);
  }
  }, [formValues]); // Ejecutar generatePDF cada vez que formValues cambie

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los valores del formulario
  };

  const generatePreviewPDF = () => {
    generatePDF();
  };
  const handleRemoveFile = (index) => {
    const newPdfFiles = [...pdfFiles];
    newPdfFiles.splice(index, 1); // Elimina el archivo en la posición especificada
    setPdfFiles(newPdfFiles);
  
    const newFileNames = [...fileNames];
    newFileNames[index] = ""; // Establece el nombre del archivo en blanco
    setFileNames(newFileNames);
  
    // Restablecer el valor del input file
    const fileInput = document.getElementById(`fileAdjunto${index + 1}`);
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div className="w-full">
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label
                for="Hoja de Envío N°"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Envío N°
              </label>
              <input
                type="number"
                id="envio2"
                name="envio2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hoja Envio"
                value={formValues.envio2}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                for="Fecha"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha
              </label>
              <input
                type="date"
                id="fecha2"
                name="fecha2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Fecha"
                value={formValues.fecha2}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                for="N° Folios"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Folios
              </label>
              <input
                type="number"
                id="folios2"
                name="folios2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N° Folios"
                value={formValues.folios2}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Documento
            </label>
            <input
              type="text"
              id="documento2"
              name="documento2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tipo de Documento"
              value={formValues.documento2}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="remitido"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Remitido por
            </label>
            <input
              type="text"
              id="remitido2"
              name="remitido2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre del Área"
              value={formValues.remitido2}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="asunto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Asunto
            </label>
            <input
              type="text"
              id="asunto2"
              name="asunto2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="asunto"
              value={formValues.asunto2}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OBSERVACIONES
            </label>
            <input
              type="text"
              id="observaciones2"
              name="observaciones2"
              value={formValues.observaciones2}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Colocar alguna Observación"
              required
            />
          </div>
          <div>
          <label htmlFor="firma2">Firma personalizada:</label>
        <input
          type="file"
          id="firma2"
          name="firma2"
          accept=".png, .jpg, .jpeg" // Acepta archivos PNG, JPG y JPEG
          onChange={handleFirmaChange} // Maneja el cambio de la imagen de firma
        />
      </div>
      <img
  src={firmaPersonalizada2 || firmaPredeterminada2}
  alt="Firma personalizada2"
  onLoad={generatePDF}
  style={{
    maxWidth: "200px", // Establece el ancho máximo deseado
    maxHeight: "200px", // Establece el ancho máximo deseado
    height: "auto", // Permite que la altura se ajuste automáticamente
    marginTop: "10px" // Espaciado superior opcional
  }}
/>
          <div className="mb-6">
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CON COPIA A 1:
            </label>
            <input
              type="text"
              id="cc2"
              name="cc2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc1"
              value={formValues.cc2}
              onChange={handleInputChange}
            />
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CON COPIA A 2:
            </label>
            <input
              type="text"
              id="cc3"
              name="cc3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc2"
              value={formValues.cc3}
              onChange={handleInputChange}
            />
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CON COPIA A 3:
            </label>
            <input
              type="text"
              id="cc4"
              name="cc4"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc3"
              value={formValues.cc4}
              onChange={handleInputChange}
            />
            <br></br>
<button
  type="button"
  onClick={generatePreviewPDF}
  className="text-white bg-gradient-to-br from-gray-800 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
>
  Mostrar Cambios
</button>
          </div>
        </form>
        <div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Archivo Adjunto 1:
  </label>
  <div className="flex items-center">
    <input
      type="file"
      id="fileAdjunto1"
      name="fileAdjunto1"
      className="hidden" // Oculta el input de tipo "file"
      onChange={(e) => handleFileChange(e, 0)}
    />
    <label
      htmlFor="fileAdjunto1"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
    >
      Adjuntar Archivo
    </label>
    {fileNames[0] && (
      <div className="text-gray-900 dark:text-white mr-2">{fileNames[0]}</div>
    )}
    {fileNames[0] && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={() => handleRemoveFile(0)}
      >
        Eliminar
      </button>
    )}
  </div>
</div>
<div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Archivo Adjunto 2:
  </label>
  <div className="flex items-center">
    <input
      type="file"
      id="fileAdjunto2"
      name="fileAdjunto2"
      className="hidden" // Oculta el input de tipo "file"
      onChange={(e) => handleFileChange(e, 1)}
    />
    <label
      htmlFor="fileAdjunto2"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
    >
      Adjuntar Archivo
    </label>
    {fileNames[1] && (
      <div className="text-gray-900 dark:text-white mr-2">{fileNames[1]}</div>
    )}
    {fileNames[1] && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={() => handleRemoveFile(1)}
      >
        Eliminar
      </button>
    )}
  </div>
</div>
<div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Archivo Adjunto 3:
  </label>
  <div className="flex items-center">
    <input
      type="file"
      id="fileAdjunto3"
      name="fileAdjunto3"
      className="hidden" // Oculta el input de tipo "file"
      onChange={(e) => handleFileChange(e, 2)}
    />
    <label
      htmlFor="fileAdjunto3"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
    >
      Adjuntar Archivo
    </label>
    {fileNames[2] && (
      <div className="text-gray-900 dark:text-white mr-2">{fileNames[2]}</div>
    )}
    {fileNames[2] && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={() => handleRemoveFile(2)}
      >
        Eliminar
      </button>
    )}
  </div>
</div>
<br></br>
        <button
          type="button"
          onClick={handleGeneratePDF}
          className="text-white bg-gradient-to-br from-gray-800 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Generar Hoja de Trámite
        </button>
      </div>

      <VisualizadorPDF url={outputUrl} />
    </div>
  );
};

export default ModeloB;
