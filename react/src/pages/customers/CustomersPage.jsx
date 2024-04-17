import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/AppLayout';
import { CustomersTable } from '../../components/tables/CustomersTable';
import Spinner from '../../components/Spinner';
import "../../components/sectionTable/SectionTable.css";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";
import { usePage } from '../../contexts/PageContext';


const resources = {
    eng: {
        translation: translationEN,
    },
    cat: {
        translation: translationCA,
    },
    esp: {
        translation: translationES,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "eng",
    fallbackLng: "eng",
    interpolation: {
        escapeValue: false,
    },
});

const steps = [
    { name: 'Customers', href: '/customers', current: true },
]

const token = localStorage.getItem('token');
/**
 * Generates a Customers Page component that fetches customers data from the API and displays them.
 *
 * @return {JSX.Element} The rendered Customers Page component
 */
export const CustomersPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [customers, setCustomers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage("Customers");
        setSteps([{ name: 'Customers', href: '/customers', current: true }]);
    }, [setPage, setSteps]);

    useEffect(() => {
        /**
         * Function that fetches customers from the API, sets the state with the retrieved data,
         * and handles loading states and errors.
         *
         * @param None
         * @return None
         */
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
                        className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
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