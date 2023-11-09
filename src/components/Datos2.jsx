import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ListaTramites = () => {
  const [datos, setDatos] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [editedData, setEditedData] = useState([]); // Estado para datos editados

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/datos-guardados2')
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
        axios.delete(`http://localhost:3000/datos-guardados2/${id}`)
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
          envio: datum.tramite,
          fechaD: datum.fechaD,
          folios: datum.folios,
          documento: datum.documento,
          remitido: datum.remitido,
          asunto: datum.asunto,
          observaciones: datum.observaciones,
          cc1:datum.cc1,
          cc2:datum.cc2,
          cc3:datum.cc3,
        };
      });
  
      // Envía una solicitud al servidor para actualizar las filas editadas
      axios
        .put('http://localhost:3000/datos-guardados2', dataToUpdate)
        .then(() => {
          console.log('Datos editados actualizados en el servidor');
          // Limpia el estado de editedData después de guardar los cambios
          setEditedData([]);
        })
        .catch((error) => {
          console.error('Error al actualizar datos editados en el servidor:', error);
        });
    }
  };

  
  
  const handleCellValueChanged = (event) => {
    const updatedData = [...datos];
    const rowIndex = event.rowIndex;
    updatedData[rowIndex][event.colDef.field] = event.newValue;
  
    // Marca la fila como editada en el estado
    updatedData[rowIndex].edited = true;
  
    setDatos(updatedData);
  
    // Rastrea los cambios en un estado local
    setEditedData(updatedData);
  };
  
  

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const columnDefs = [
    { headerName: '', field: 'id', width: 30, checkboxSelection: true },
    { headerName: 'ID', field: 'id',hide:true },
    { headerName: 'Trámite', field: 'tramite', editable: true },
    { headerName: 'Fecha Derivado', field: 'fechaD', editable: true, autoHeight: true, // Esto permite que el contenido se ajuste automáticamente
    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' }, // Ajusta el espaciado entre líneas si es necesario
    cellClass: 'multiline-cell', // Aplica una clase de estilo personalizada si es necesario
    //cellEditor: 'agLargeTextCellEditor', // Usa un editor de celdas grande si es necesario
    // Definir una altura máxima para evitar que las celdas se expandan demasiado
     //maxAllowedHeight: 200, // Establece la altura máxima deseada
    width:200 },
    { headerName: 'Folios', field: 'folios', editable: true },
    { headerName: 'Documento', field: 'documento', editable: true },
    { headerName: 'Remitido', field: 'remitido', editable: true },
    { headerName: 'Asunto', field: 'asunto', editable: true },
    { headerName: 'Observaciones', field: 'observaciones', editable: true },
    {headerName: 'CC1',field:'cc1', editable:true},
    {headerName: 'CC2',field:'cc2', editable:true},
    {headerName: 'CC3',field:'cc3', editable:true}
    
] 

  return (
    <div>
      
      <button onClick={handleDeleteRows} className="text-white bg-gradient-to-br from-red-800 to-red-600 hover:bg-gradient-to-bl 
    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 
    text-center mr-2 mb-2"
>Eliminar</button>
    <button onClick={handleSaveChanges} className="text-white bg-gradient-to-br from-green-800 to-green-600 hover:bg-gradient-to-bl 
    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 
    text-center mr-2 mb-2">Guardar Cambios</button>
      <div style={{ height: 400, width: '100%' }} className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={datos}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
     
    </div>
  );
};
export default ListaTramites;