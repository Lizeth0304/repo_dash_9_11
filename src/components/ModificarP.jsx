import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selloProveidoImage from './images/selloProveido2.png';
function ModificarP() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fecha, setFecha] = useState(new Date());

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };



  const handleUpload4 = async (processedFile) => {
    if (!processedFile) {
      alert('Selecciona un archivo PDF primero');
      return;
    }

    try {
      const pdfBytes = await agregarTextoAlPDF2(processedFile, fecha);
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
      const pdfBytes = await agregarTextoAlPDF2(selectedFile, fecha);
      descargarPDF2(pdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
    }
  };


  const calcularCoordenadas2 = (page, selloFechaWidth, selloFechaHeight, selloFolioWidth,selloProveidoWidth, selloFolioHeight, pageCount, pageIndex) => {
    const { width, height } = page.getSize();

    let selloX, selloY, fechaX, fechaY, folioX, folioY,proveidoX, proveidoY;

    // Calcular las coordenadas de los sellos y texto
    selloX = width - selloFechaWidth - 20;
    selloY = height - selloFechaHeight - 20;
    fechaX = width - selloFechaWidth + 20;
    fechaY = height - selloFechaHeight + 12;
    folioX = width - selloFolioWidth - 20;
    folioY = 20;
    proveidoX = width - selloProveidoWidth-350;
    proveidoY = 20;

    // Calcular el número de folio en orden descendente
    const folioNumero = pageCount - pageIndex;

    return { selloX, selloY, fechaX, fechaY, folioX, folioY, folioNumero, proveidoX,proveidoY };
  };

  
  const agregarTextoAlPDF2 = async (file, fecha) => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const selloProveidoWidth = 360;
    const selloProveidoHeight = 200;
    
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
        proveidoX,
        proveidoY,
      } = calcularCoordenadas2(
        page,
        selloProveidoWidth,
        selloProveidoHeight,
        pageCount,
        i
      );
    
      const selloProveidoImageBytes = await fetch(selloProveidoImage).then((res) => res.arrayBuffer());
      const selloProveidoImageXObject = await pdfDoc.embedPng(selloProveidoImageBytes);
    
      page.drawImage(selloProveidoImageXObject, {
        x: proveidoX,
        y: proveidoY,
        width: selloProveidoWidth,
        height: selloProveidoHeight,
      });
    
         return pdfDoc.save();
  };
  }

  
  const descargarPDF2 = (pdfBytes) => {
    const nombreArchivoOriginal = selectedFile.name; // Obtiene el nombre del archivo original
    const nombreArchivoFoliado = nombreArchivoOriginal.replace('.pdf', '-Proveido.pdf'); // Agrega "_foliado" al nombre
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = nombreArchivoFoliado; // Asigna el nombre modificado
    a.click();
  };

  return (
    <div>
      <div className="grid gap-6 mb-6">
      <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MODIFICAR PDF PROVEIDO</h1>
      <div className="flex items-center" >
      <label className="block mr-4 mb-25 text-sm font-medium text-gray-900 dark:text-white">Archivo: </label>
      <input className="mb-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
       type="file" accept=".pdf" onChange={handleFileChange} /></div>
       </div>
       <div className="flex items-center" >
        <label className="mr-7 block mb-20 text-sm font-medium text-gray-900 dark:text-white">Fecha: </label>
          <DatePicker
          dateFormat="dd/MM/yyyy"
          className="mb-20 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
          selected={fecha}
          onChange={(date) => setFecha(date)}
          required
          />

      </div>
      <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-20" 
        onClick={handleUpload6}>Modificar </button>
      <br></br>

      
      <div className="grid gap-6 mb-6">
      <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MODIFICAR PDF PROVEIDO CON ESCANEADOS</h1>
      <div className="flex items-center" >
      <label className="block mr-4 mb-25 text-sm font-medium text-gray-900 dark:text-white">Archivo: </label>
      <input className="mb-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
       type="file" accept=".pdf" onChange={handleFileChange} /></div>
       </div>
       <div className="flex items-center" >
        <label className="mr-7 block mb-20 text-sm font-medium text-gray-900 dark:text-white">Fecha: </label>
          <DatePicker
          dateFormat="dd/MM/yyyy"
          className="mb-20 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
          selected={fecha}
          onChange={(date) => setFecha(date)}
          required
          />

      </div>
      <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-20" 
        onClick={handleUpload5}>Modificar </button>
      <br></br>
        
      
    </div>
    
  );
}

export default ModificarP;