import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";
import axios from 'axios';


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


/**
 * Renders the customer information page.
 *
 * @return {JSX.Element} The customer information page component.
 */
export const CustomersShow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);
  const customer = state?.customer;
  const {
    id,
    name = '-',
    surname = '-',
    address = '-',
    city = '-',
    created_at_formatted,
    customerStatus = '-',
    is_validated = '-',
    mail = '-',
    username = '-',
    phone = '-',
    postcode = '-'
  } = customer;

  const token = localStorage.getItem('token');


  const steps = [
    { name: 'Customers', href: '/customers', current: true },
    { name: `${name} ${surname}`, href: `/customers/1`, current: true },
  ]

  const onDelete = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };

    axios.delete(`${import.meta.env.VITE_API_URL}/customers/${customer.id}`, { headers })
      .then(() => {
        alert('Customer deleted successfully!');
        navigate('/customers');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error deleting the customer.');
      });
  };

  return (

    <AppLayout Steps={steps}>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-xl rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t("Confirm Deletion")}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {t("Are you sure you want to delete this customer? This action cannot be undone.")}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={hideModal}
              >
                {t("Cancel")}
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => { onDelete(); hideModal(); }}
              >
                {t("Accept")}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 mb-16 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{t("Customer Information")}</h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="button" onClick={showModal}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 mr-3"
              >
                {t("Delete Customer")}
              </button>
              <button
                type="button" onClick={() => navigate(`/customers/${id}/edit`, { state: { customer } })}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                {t("Edit Customer")}
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Full name")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name} {surname}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Username")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{username}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Email address")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{mail}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Address")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{address}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("City")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{city}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Created at")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{created_at_formatted.formatted}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Phone")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{phone == null ? '-' : phone}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Postal Code")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{postcode == null ? '-' : postcode}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Status")}</dt>
              <dd className="mt-1 uppercase text-sm font-bold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{customerStatus}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">{t("Validated")}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {is_validated
                  ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#33ff00" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF0000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                }</dd>
            </div>
          </dl>
        </div>
      </div>
    </AppLayout>

  )
}
