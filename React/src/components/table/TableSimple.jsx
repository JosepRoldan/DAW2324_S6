import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import ButtonToggle from '../ButtonToggle';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridTable = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);

  const fetchData = async () => {
    try {
      // Lógica para obtener los nuevos datos de la API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tu-ruta-de-api`);
      const newData = await response.json();

      // Actualizar el estado de los datos de la tabla
      setTableData(newData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };


  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleToggleEdit = () => {
    setIsEditingEnabled(!isEditingEnabled);
  };

  const defaultColDef = {
    filter: true,
    editable: isEditingEnabled,
    flex: 1,
    minWidth: 150,
    paginationPageSize: 15,
    paginationPageSizeSelector: [15, 25, 50, 100],
    rowStyle: { background: 'white', textAlign: 'center' },
  };

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-end">
        <ButtonToggle onToggle={handleToggleEdit} />
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          defaultColDef={defaultColDef}
          pagination={true}
          rowStyle={defaultColDef.rowStyle}
          paginationPageSize={defaultColDef.paginationPageSize}
          editType="fullRow"
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default AgGridTable;
