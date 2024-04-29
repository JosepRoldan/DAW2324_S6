import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { CustomersOrdersTable } from '../../components/tables/CustomersOrdersTable';
import Spinner from '../../components/Spinner';
import "../../components/sectionTable/SectionTable.css";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';


const token = localStorage.getItem('token');

export const CustomersOrders = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { state } = useLocation();
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const customer = state?.customer;


    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage(t("Customers"));
        setSteps([{ name: t('Customers'), href: '/customers', current: true }]);
    }, [setPage, setSteps, t]);

    useEffect(() => {

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const headers = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                };
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers/${customer.id}/orders`, { headers });
                setOrders(response.data);
            } catch (error) {
                console.error("There was an error fetching the orders:", error);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    return (<>

        <div className="flex flex-col my-3">
            {
                isLoading
                    ? <Spinner message='Loading Orders...' />
                    :
                    <CustomersOrdersTable orders={orders.orders} />
            }
        </div>
    </>
    )
}

export default CustomersOrders;