import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


export const CustomersOrdersTable = ({ orders }) => {
    const { t } = useTranslation();

    const colDefs = [
        { field: 'number_order', headerName: (t('Order Number')), filter: true },
        { field: 'address', headerName: (t('Address')), filter: true },
        { field: 'totalPrice', headerName: (t('Total Price')), filter: true },
        { field: 'datetime', headerName: (t('Date')), filter: true },
        { field: 'orderStatus', headerName: (t('Status')), filter: true },
    ];

    return (
        <>
            {
                orders.length === 0
                    ? <div className="flex items-center mt-10 justify-center">
                        <div className="text-center">
                            <p className="text-xl text-gray-800">This client has no orders yet.</p>
                        </div>
                    </div>
                    : <div className="align-middle overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                        <div className="ag-theme-quartz" style={{ width: 'auto', height: '70vh' }}>
                            <AgGridReact
                                rowData={orders}
                                columnDefs={colDefs}
                                pagination={true}
                                rowSelection="multiple"
                            />
                        </div>
                    </div>
            }
        </>
    )
}
