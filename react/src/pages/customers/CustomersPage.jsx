import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { CustomersTable } from '../../components/tables/CustomersTable';
import Spinner from '../../components/Spinner';
import "../../components/sectionTable/SectionTable.css";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';


const token = localStorage.getItem('token');

export const CustomersPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [customers, setCustomers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage(t("Customers"));
        setSteps([{ name: t('Customers'), href: '/customers', current: true }]);
    }, [setPage, setSteps, t]);

    useEffect(() => {

        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const headers = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                };
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, { headers });
                setCustomers(response.data);
            } catch (error) {
                console.error("There was an error fetching the customers:", error);
            }
            setLoading(false);
        };
        fetchCustomers();
    }, []);

    return (<>
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                    <button
                        type="button"
                        onClick={() => navigate('/customers/create')}
                        class="inline-block bg-blue-900 hover:bg-blue-800 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                        data-twe-ripple-init>
                        {t("Add Customer")}
                    </button>

                </div>
            </div>
        </div>
        <div className="flex flex-col my-3">
            {
                isLoading
                    ? <Spinner message='Loading Customers...' />
                    :
                    <CustomersTable customers={customers} />
            }
        </div>
    </>
    )
}

export default CustomersPage;