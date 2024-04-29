import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';


export const UsersShow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { setPage, setSteps } = usePage();

  const users = state?.users;
  const {
    id,
    name = '-',
    surname = '-',
    email = '-',
    user = '-'
  } = users;



  useEffect(() => {
    setPage(t("Users"));
    setSteps([{ name: t('Users'), href: '/users' }, { name: t("Show User"), href: '/users/1', current: true }]);
  }, [setPage, setSteps, navigate]);

  return (
    <>
      <div className="mt-6 mb-16 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{t("User Information")}</h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="button" onClick={() => navigate(`/users/${id}/edit`, { state: { users } })}
                class="inline-block bg-blue-900 hover:bg-blue-800 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
              >
                {t("Edit User")}
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">{t("Full name")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name} {surname}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">{t("Username")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">{t("Email address")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
            </div>
          </dl>
        </div>
      </div >
    </>
  )
}

export default UsersShow;
