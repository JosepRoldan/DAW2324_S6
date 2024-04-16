import { useState, useEffect } from 'react';
import AgGridTable from '../../components/table/TableSimple';
import EditButton from './EditButton';
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';

const SettingPage = () => {
  const { t } = useTranslation();
  const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage(t("Settings"));
        setSteps([{ name: t('Settings'), href: '/settings', current: true }]);
    }, [setPage, setSteps, t]);
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
    { headerName: t('Name'), field: t('config')},
    { headerName: t('Value'), field: t('value'), },
    { cellRenderer: EditButton, editable: false, cellStyle: { 'fontWeight': 'bold', 'color': 'green' }}
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
