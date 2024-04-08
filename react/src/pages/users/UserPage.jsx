import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/AppLayout';
import { UsersTable } from '../../components/tables/UsersTable';
import Spinner from '../../components/Spinner';
//import axios from 'axios';
const token = localStorage.getItem('token');
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";

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
    { name: 'Users', href: '/users', current: true },
]
export const UserPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [userData, setUsersData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                if (data.success) {
                    setUsersData(data.data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error("There was an error fetching the users:", error);
            } finally {
                setLoading(false);
            }

        };
        fetchData();
    }, []);

    return (
        <AppLayout Page={"Users"} Steps={steps}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => navigate('/users/create')}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                        >
                            {t("Add User")}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col my-3">
                {
                    isLoading
                        ? <Spinner message='Loading Users...' />
                        :
                        <UsersTable userData={userData} />
                }
            </div>
        </AppLayout >
    )
}

export default UserPage;