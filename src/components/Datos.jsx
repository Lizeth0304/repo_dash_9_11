import React, { useState, useEffect, useRef } from 'react'; // Import useRef from 'react'
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ExcelJS from 'exceljs';



const Datos2 = () => {
  const [datos, setDatos] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [editedData, setEditedData] = useState([]); // Estado para datos editados
  const unsavedChanges = useRef(false); // Ref para rastrear cambios no guardados

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener('beforeunload', confirmExit);
    return () => {
      window.removeEventListener('beforeunload', confirmExit);
    };
  }, []);


  const fetchData = () => {
    axios.get('http://localhost:3000/datos-guardados')
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos guardados:', error);
      });
  };

  const handleDeleteRows = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedIds = selectedNodes.map(node => node.data.id);
      const updatedData = datos.filter(dato => !selectedIds.includes(dato.id));
      setDatos(updatedData);

      // Envía una solicitud al servidor para eliminar las filas seleccionadas
      selectedIds.forEach(id => {
        axios.delete(`http://localhost:3000/datos-guardados/${id}`)
          .then(() => {
            console.log(`Fila con ID ${id} eliminada en el servidor`);
          })
          .catch((error) => {
            console.error(`Error al eliminar fila con ID ${id}: ${error}`);
          });
      });
    }
  };
  

  const handleSaveChanges = () => {
    if (editedData.length > 0) {
      // Filtra las filas que se han editado y obtiene sus IDs
      const updatedRows = editedData.filter((datum) => datum.edited);
  
      // Crea un arreglo de datos editados a enviar al servidor
      const dataToUpdate = updatedRows.map((datum) => {
        return {
          id: datum.id,
          expediente: datum.n_exp,
          c: datum.c,
          s: datum.s,
          remitido: datum.dependencia,
          documento: datum.documentoR,
          mes: datum.mes,
          fechaR: datum.fechaR,
          asunto: datum.asunto,
          fecha:datum.fechaD,
          plazos:datum.plazos,
          folios:datum.dr,
          observaciones:datum.obs,
          derivadoa:datum.derivadoa,
          cc1:datum.cc1,
          envio:datum.documentoD,
          respuesta:datum.respuesta,
          cc2:datum.cc2,
          documento2:datum.documento2,
          respuesta3:datum.respuesta3,
          cc3:datum.cc3,
          documento3:datum.documento3,
          respuesta4:datum.respuesta4,
          documentoF:datum.documentoF,
        };
      });
  
      // Envía una solicitud al servidor para actualizar las filas editadas
      axios
        .put('http://localhost:3000/datos-guardados', dataToUpdate)
        .then(() => {
          console.log('Datos editados actualizados en el servidor');
          // Limpia el estado de editedData después de guardar los cambios
          setEditedData([]);
        })
        .catch((error) => {
          console.error('Error al actualizar datos editados en el servidor:', error);
        });
    }
    // After successfully saving the changes
unsavedChanges.current = false;

  };
  
  const handleCellValueChanged = (event) => {
    const updatedData = [...datos];
    const rowIndex = event.rowIndex;
    updatedData[rowIndex][event.colDef.field] = event.newValue;

    updatedData[rowIndex].edited = true;
    setDatos(updatedData);
    setEditedData(updatedData);

    // Indica que hay cambios sin guardar
    
    unsavedChanges.current = true;

  };



  
 /* const handleCellDoubleClick = (params) => {
    if (params.colDef.cellEditor === 'agLargeTextCellEditor' && params.node) {
      params.node.setEditing(true);

      // Ajustar el tamaño del editor
      if (params.node.editingCell) {
        params.node.editingCell.style.height = 'auto'; // Ajusta la altura automáticamente
        params.node.editingCell.style.width = '20px'; // Ajusta el ancho a un valor adecuado
      }
    }
  };*/



  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const columnDefs = [
    { headerName: '', field: 'id', width: 30, checkboxSelection: true },
    { headerName: 'ID', field: 'id', hide:true},
    { headerName: 'N_exp', field: 'n_exp', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2'}, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'multiLineTextEditor', // Usar un editor personalizado
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:100 },
    { headerName: 'C', field: 'c', editable: true },
    { headerName: 'S', field: 's', editable: true },
    { headerName: 'Dependencia', field: 'dependencia', editable: true,  autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
        // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Documento Recibido', field: 'documentoR', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Mes', field: 'mes', editable: true },
    { headerName: 'Fecha Recepción', field: 'fechaR', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agDatepicker',
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Asunto', field: 'asunto', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200
  },
    { headerName: 'Fecha Derivado', field: 'fechaD', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Plazos', field: 'plazos', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:80 },
    { headerName: 'D-R', field: 'dr', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:80 },
    { headerName: 'Observaciones', field: 'obs', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Derivado A', field: 'derivadoa', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    {headerName: 'CC1',field:'cc1', editable:true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200},
    { headerName: 'Documento Derivado H.E.', field: 'documentoD', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Respuesta', field: 'respuesta', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    {headerName: 'CC2',field:'cc2', editable:true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200},
    { headerName: 'Documento 2', field: 'documento2', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Respuesta 3', field: 'respuesta3', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    {headerName: 'CC3',field:'cc3', editable:true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200},
    { headerName: 'Documento 3', field: 'documento3', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Respuesta 4', field: 'respuesta4', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Documento Final', field: 'documentoF', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
   // cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200},


 ] 
   // Función para mostrar una advertencia antes de salir
   const confirmExit = (e) => {
    if (unsavedChanges.current) {
      e.preventDefault();
      e.returnValue = 'gUARDE LOS CAMBIOS'; // Mensaje opcional que mostrará el navegador
    }
  };

  const exportToExcel = () => {
    if (gridApi) {
      const columnApi = gridApi.columnApi;
      const rowData = gridApi.rowData;
  
      if (columnApi && rowData) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos2');
  
        // Obtén las definiciones de columnas de Ag-Grid
        const columnDefs = columnApi.getAllDisplayedColumns().map(col => ({
          header: col.getColDef().headerName,
          key: col.getColId(),
        }));
  
        // Agrega las columnas a la hoja de cálculo
        worksheet.columns = columnDefs;
  
        // Mapea los datos de la cuadrícula en el formato necesario para Excel
        const data = rowData.map(row => {
          const rowData = {};
          columnDefs.forEach(colDef => {
            rowData[colDef.header] = row[colDef.key];
          });
          return rowData;
        });
  
        // Agrega los datos
        worksheet.addRows(data);
  
        // Crea un archivo blob para descargar el archivo Excel
        workbook.xlsx.writeBuffer().then(blobData => {
          const blob = new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'datos.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        });
      } else {
        console.error('columnApi or rowData is not available.');
      }
    } else {
      console.error('gridApi is not initialized.');
    }
  };
  
  
  

 return (
  <div>
    
    <button onClick={handleDeleteRows} className="text-white bg-gradient-to-br from-red-800 to-red-600 hover:bg-gradient-to-bl 
    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 
    text-center mr-2 mb-2"
>Eliminar</button>
    <button onClick={handleSaveChanges} className="text-white bg-gradient-to-br from-green-800 to-green-600 hover:bg-gradient-to-bl 
    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 
    text-center mr-2 mb-2">Guardar Cambios</button>
    

    <div style={{ width: '100%' }} className="ag-theme-alpine">
      
    <AgGridReact
  columnDefs={columnDefs}
  rowData={datos}
  onGridReady={onGridReady}
  rowSelection="multiple"
  onCellValueChanged={handleCellValueChanged}
 // onCellDoubleClicked={handleCellDoubleClick} // Manejar la edición en doble clic
  domLayout="autoHeight" // Esto permitirá que la cuadrícula se ajuste automáticamente a la altura del contenido.
  />

    </div>

  </div>
);
};

export default Datos2;