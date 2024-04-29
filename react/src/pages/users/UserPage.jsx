import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { UsersTable } from '../../components/tables/UsersTable';
import Spinner from '../../components/Spinner';
const token = localStorage.getItem('token');
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';




export const UserPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [userData, setUsersData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { setPage, setSteps } = usePage();

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

    useEffect(() => {
        setPage(t("Users"));
        setSteps([{ name: t("Users"), href: '/users', current: true }]);
    }, [setPage, setSteps, navigate]);

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => navigate('/users/create')}
                            class="inline-block bg-blue-900 hover:bg-blue-800 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
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
        </>
    )
}

export default UserPage;