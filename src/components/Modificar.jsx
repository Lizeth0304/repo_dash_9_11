import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selloFechaImage from './images/sello_fecha.png';
import selloFolioImage from './images/sello_folio.png';
function Modificar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fecha, setFecha] = useState(new Date());

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload2 = async (processedFile) => {
    if (!processedFile) {
      alert('Selecciona un archivo PDF primero');
      return;
    }

    try {
      const pdfBytes = await agregarTextoAlPDF(processedFile, fecha);
      descargarPDF(pdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('pdf_file', selectedFile);
  
      fetch('http://localhost:5000//procesar-pdf', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Llama a handleUpload2 con el archivo procesado
          handleUpload2(blob);
        })
        .catch((error) => {
          console.error('Error al procesar el PDF:', error);
        });
    }
  };
  
  const handleUpload3 = async () => {
    if (!selectedFile) {
      alert('Selecciona un archivo PDF primero');
      return;
    }

    try {
      const pdfBytes = await agregarTextoAlPDF(selectedFile, fecha);
      descargarPDF(pdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
    }
  };

  const handleUpload4 = async (processedFile) => {
    if (!processedFile) {
      alert('Selecciona un archivo PDF primero');
      return;
    }

    try {
      const pdfBytes = await agregarTextoAlPDF12(processedFile, fecha);
      descargarPDF2(pdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
    }
  };

  const handleUpload5 = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('pdf_file', selectedFile);
  
      fetch('http://localhost:5000//procesar-pdf', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Llama a handleUpload2 con el archivo procesado
          handleUpload4(blob);
        })
        .catch((error) => {
          console.error('Error al procesar el PDF:', error);
        });
    }
  };
  const handleUpload6 = async () => {
    if (!selectedFile) {
      alert('Selecciona un archivo PDF primero');
      return;
    }

    try {
      const pdfBytes = await agregarTextoAlPDF12(selectedFile, fecha);
      descargarPDF2(pdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
    }
  };

  
  const calcularCoordenadas = (page, selloFechaWidth, selloFechaHeight, selloFolioWidth, selloFolioHeight, pageCount, pageIndex) => {
    const { width, height } = page.getSize();

    let selloX, selloY, fechaX, fechaY, folioX, folioY;

    // Calcular las coordenadas de los sellos y texto
    selloX = width - selloFechaWidth - 20;
    selloY = height - selloFechaHeight - 20;
    fechaX = width - selloFechaWidth + 20;
    fechaY = height - selloFechaHeight + 12;
    folioX = width - selloFolioWidth - 20;
    folioY = 20;

    // Calcular el número de folio en orden descendente
    const folioNumero = pageCount - pageIndex;

    return { selloX, selloY, fechaX, fechaY, folioX, folioY, folioNumero };
  };



  const agregarTextoAlPDF = async (file, fecha) => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const selloFechaWidth = 119;
    const selloFechaHeight = 72;
    const selloFolioWidth = 100;
    const selloFolioHeight = 30.75;

    const formattedDate = fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const monthAbbr = formattedDate.split(' ')[1].toUpperCase().slice(0, 3);
    const formattedDateWithMonth = `${formattedDate.split(' ')[0]} ${monthAbbr}. ${formattedDate.split(' ')[2]}`;

    const pageCount = pdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
    
      const {
        selloX,
        selloY,
        fechaX,
        fechaY,
        folioX,
        folioY,
        folioNumero,
      } = calcularCoordenadas(
        page,
        selloFechaWidth,
        selloFechaHeight,
        selloFolioWidth,
        selloFolioHeight,
        pageCount,
        i
      );
    
      const selloFolioImageBytes = await fetch(selloFolioImage).then((res) => res.arrayBuffer());
      const selloFolioImageXObject = await pdfDoc.embedPng(selloFolioImageBytes);
    
      page.drawImage(selloFolioImageXObject, {
        x: folioX,
        y: folioY,
        width: selloFolioWidth,
        height: selloFolioHeight,
      });
    
      page.drawText(`${folioNumero}`, {
        x: folioX + 75,
        y: folioY + 10,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    
      // Verificar si es la primera página y agregar selloFecha y fecha
      if (i === 0) {
        const selloFechaImageBytes = await fetch(selloFechaImage).then((res) => res.arrayBuffer());
        const selloFechaImageXObject = await pdfDoc.embedPng(selloFechaImageBytes);
    
        page.drawImage(selloFechaImageXObject, {
          x: selloX,
          y: selloY,
          width: selloFechaWidth,
          height: selloFechaHeight,
        });
    
        page.drawText(`${formattedDateWithMonth}`, {
          x: fechaX,
          y: fechaY,
          size: 9,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    }

    return pdfDoc.save();
  };

  const calcularCoordenadas12 = (page, selloFechaWidth, selloFechaHeight, selloFolioWidth, selloFolioHeight, pageCount, pageIndex) => {
    const { width, height } = page.getSize();

    let selloX, selloY, fechaX, fechaY, folioX, folioY;

    // Calcular las coordenadas de los sellos y texto
    selloX = width - selloFechaWidth - 20;
    selloY = height - selloFechaHeight - 155;
    fechaX = width - selloFechaWidth + 20;
    fechaY = height - selloFechaHeight-118;
    folioX = width - selloFolioWidth - 20;
    folioY = 20;

    // Calcular el número de folio en orden descendente
    const folioNumero = pageCount - pageIndex;

    return { selloX, selloY, fechaX, fechaY, folioX, folioY, folioNumero };
  };



  const agregarTextoAlPDF12 = async (file, fecha) => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const selloFechaWidth = 119;
    const selloFechaHeight = 72;
    const selloFolioWidth = 100;
    const selloFolioHeight = 30.75;

    const formattedDate = fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const monthAbbr = formattedDate.split(' ')[1].toUpperCase().slice(0, 3);
    const formattedDateWithMonth = `${formattedDate.split(' ')[0]} ${monthAbbr}. ${formattedDate.split(' ')[2]}`;

    const pageCount = pdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
    
      const {
        selloX,
        selloY,
        fechaX,
        fechaY,
        folioX,
        folioY,
        folioNumero,
      } = calcularCoordenadas12(
        page,
        selloFechaWidth,
        selloFechaHeight,
        selloFolioWidth,
        selloFolioHeight,
        pageCount,
        i
      );
    
      const selloFolioImageBytes = await fetch(selloFolioImage).then((res) => res.arrayBuffer());
      const selloFolioImageXObject = await pdfDoc.embedPng(selloFolioImageBytes);
    
      page.drawImage(selloFolioImageXObject, {
        x: folioX,
        y: folioY,
        width: selloFolioWidth,
        height: selloFolioHeight,
      });
    
      page.drawText(`${folioNumero}`, {
        x: folioX + 75,
        y: folioY + 10,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    
      // Verificar si es la primera página y agregar selloFecha y fecha
      if (i === 0) {
        const selloFechaImageBytes = await fetch(selloFechaImage).then((res) => res.arrayBuffer());
        const selloFechaImageXObject = await pdfDoc.embedPng(selloFechaImageBytes);
    
        page.drawImage(selloFechaImageXObject, {
          x: selloX,
          y: selloY,
          width: selloFechaWidth,
          height: selloFechaHeight,
        });
    
        page.drawText(`${formattedDateWithMonth}`, {
          x: fechaX,
          y: fechaY,
          size: 9,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    }

    return pdfDoc.save();
  };

 
  const descargarPDF = (pdfBytes) => {
    const nombreArchivoOriginal = selectedFile.name; // Obtiene el nombre del archivo original
    const nombreArchivoFoliado = nombreArchivoOriginal.replace('.pdf', '-Foliado.pdf'); // Agrega "_foliado" al nombre
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = nombreArchivoFoliado; // Asigna el nombre modificado
    a.click();
  };

  const descargarPDF2 = (pdfBytes) => {
    const nombreArchivoOriginal = selectedFile.name; // Obtiene el nombre del archivo original
    const nombreArchivoFoliado = nombreArchivoOriginal.replace('.pdf', '-Foliado.pdf'); // Agrega "_foliado" al nombre
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = nombreArchivoFoliado; // Asigna el nombre modificado
    a.click();
  };
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Section 1: MODIFICAR PDF SIN ESCANEADOS * FECHA ARRIBA */}
      <div>
        <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MODIFICAR PDF SIN ESCANEADOS * FECHA ARRIBA *</h1>
        <div className="flex items-center mb-10">
          <label className="block mr-4 mb-25 text-sm font-medium text-gray-900 dark:text-white">Archivo:</label>
          <input
            className="mb-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-7 block mb-12 text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="mb-12 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            selected={fecha}
            onChange={(date) => setFecha(date)}
            required
          />
        </div>
        <button
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          onClick={handleUpload3}
        >
          Modificar
        </button>
      </div>
  
      {/* Section 2: MODIFICAR PDF CON ESCANEADOS * FECHA ARRIBA */}
      <div>
        <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MODIFICAR PDF CON ESCANEADOS * FECHA ARRIBA *</h1>
        <div className="flex items-center mb-10">
          <label className="block mr-4 mb-25 text-sm font-medium text-gray-900 dark:text-white">Archivo:</label>
          <input
            className="mb-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-7 block mb-12 text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="mb-12 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            selected={fecha}
            onChange={(date) => setFecha(date)}
            required
          />
        </div>
        <button
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-20"
          onClick={handleUpload}
        >
          Modificar
        </button>
      </div>
  
      {/* Section 3: MODIFICAR PDF SIN ESCANEADOS * FECHA ABAJO */}
      <div>
        <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MODIFICAR PDF SIN ESCANEADOS * FECHA ABAJO *</h1>
        <div className="flex items-center mb-10">
          <label className="block mr-4 mb-25 text-sm font-medium text-gray-900 dark:text-white">Archivo:</label>
          <input
            className="mb-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-7 block mb-12 text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="mb-12 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            selected={fecha}
            onChange={(date) => setFecha(date)}
            required
          />
        </div>
        <button
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-20"
          onClick={handleUpload6}
        >
          Modificar
        </button>
      </div>
  
      {/* Section 4: MODIFICAR PDF CON ESCANEADOS * FECHA ABAJO */}
      <div>
        <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MODIFICAR PDF CON ESCANEADOS * FECHA ABAJO *</h1>
        <div className="flex items-center mb-10">
          <label className="block mr-4 mb-25 text-sm font-medium text-gray-900 dark:text-white">Archivo:</label>
          <input
            className="mb-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-7 block mb-12 text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="mb-12 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
            selected={fecha}
            onChange={(date) => setFecha(date)}
            required
          />
        </div>
        <button
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-20"
          onClick={handleUpload5}
        >
          Modificar
        </button>
      </div>
    </div>
  
  
  );
}

export default Modificar;