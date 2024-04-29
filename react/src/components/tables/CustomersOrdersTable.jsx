import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


export const CustomersOrdersTable = ({ orders }) => {
    const { t } = useTranslation();
    const orderDetails = ({ data }) => {
        const navigate = useNavigate();

        return (
            <button onClick={() => navigate(`/orders/${data.id}`, { state: { customer: data } })}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg>
            </button>
        );
    };

    const colDefs = [
        { field: 'number_order', headerName: (t('Order Number')), filter: true },
        // { field: 'address', headerName: (t('Address')), filter: true },
        { field: 'totalPrice', headerName: (t('Total')), filter: true },
        { field: 'datetime', headerName: (t('Date')), filter: true },
        { field: 'orderStatus', headerName: (t('Status')), filter: true },
        // STAND-BY
        { headerName: (t('Order Details')), cellRenderer: orderDetails },
    ];
    const totalSum = orders.reduce((total, order) => total + parseFloat(order.totalPrice), 0).toFixed(2);
    return (
        <>
            {
                orders.length === 0
                    ? <div className="flex items-center mt-10 justify-center">
                        <div className="text-center">
                            <p className="text-xl text-gray-800">This client has no orders yet.</p>
                        </div>
                    </div>
                    : <div><div className="align-middle overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                        <div className="ag-theme-quartz" style={{ width: 'auto', height: '60vh' }}>
                            <AgGridReact
                                rowData={orders}
                                columnDefs={colDefs}
                                pagination={true}
                                rowSelection="multiple"
                            />
                        </div>
                    </div>
                        <h1 className="text-2xl mt-6">Total: {totalSum}€</h1>
                    </div>
            }
        </>
    )
}
