import React, { useState, useEffect, useMemo } from 'react';
import AgGridTable from '../../components/table/TableSimple';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { usePage } from '../../contexts/PageContext';

const SettingPage = () => {
  const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage("Settings");
        setSteps([{ name: 'Settings', href: '/settings', current: true }]);
    }, [setPage, setSteps]);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);


  const columnDefs = [
    {
      headerName: 'Name',
      field: 'config',
    },
    { headerName: 'Value', field: 'value', },
    {
      headerName: 'Edit',
      cellRenderer: EditButton,
      editable: false,
      cellStyle: { 'fontWeight': 'bold', 'color': 'green', }
    },
    {
      headerName: 'Delete',
      cellRenderer: DeleteButton,
      editable: false,
      cellStyle: { 'fontWeight': 'bold', 'color': 'red', }

    },
  ];

  return (
    <>
      <div>
        <AgGridTable
          rowData={jsonData}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
};

export default SettingPage;
