import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import useOrdersData from "../../hooks/useOrders";

const steps = [
  { name: "Orders", href: "/orders", current: false },
  { name: "Order Details", href: "/", current: true },
];

// Define the functional component for the OrderDetailsPage
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

const OrderDetailsPage = () => {
  // Extract the idOrder from the URL parameters using the useParams hook
  const { t } = useTranslation();
  const { idOrder } = useParams();

  // Use the custom hook useOrdersData to fetch order details based on the idOrder
  const {
    rowData: ordersDetails, // Extract rowData from the custom hook response
  } = useOrdersData(`${import.meta.env.VITE_API_URL}/OrderDetails/${idOrder}`);
  const {
    rowData: orders, // Extract rowData from the custom hook response
  } = useOrdersData(`${import.meta.env.VITE_API_URL}/orders`);

  // // Render loading state if data is still loading
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // Render error message if there's an error during data fetching
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // Render the UI for the OrderDetailsPage
  return (
    <>
      <body className="bg-gray-100 font-sans">
        <header className="container mx-auto py-4">
          <h1 className="text-3xl font-bold text-center bg-black rounded-md text-white mb-4">
            Order Details
          </h1>
          <address className="float-left font-sm font-bold text-lg mr-4">
            <p>CustomAIze</p>
          </address>
          <span className="block float-right w-40 h-auto mr-24">
            <img
              alt="CustomAIze"
              src="/LogoCustomAIze.png"
              className="rounded w-full h-auto"
            />
          </span>
          <div className="clearfix"></div>
        </header>
        <article className="container mx-auto py-4">
          <address className="float-left font-lg font-bold">
            <p>Infosys LTD</p>
          </address>

          <table className="w-full mb-8">
            <tr>
              <th className="w-1/4">Order Number</th>
              <td className="w-3/4">{orders.idOrderPicanova}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>Amount Due</th>
              <td>
                <span className="text-green-500">$</span>
                <span className="text-green-500">600.00</span>
              </td>
            </tr>
          </table>

          <table className="w-full mb-8">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a className="cut">-</a>
                  <span>Front End Consultation</span>
                </td>
                <td>Experience Review</td>
                <td>
                  <span className="text-green-500">$</span>
                  <span className="text-green-500">150.00</span>
                </td>
                <td>4</td>
                <td>
                  <span className="text-green-500">$</span>
                  <span className="text-green-500">600.00</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mb-8">
            <tr>
              <th>Total</th>
              <td>
                <span className="text-green-500">$</span>
                <span className="text-green-500">600.00</span>
              </td>
            </tr>
            <tr>
              <th>Amount Paid</th>
              <td>
                <span className="text-red-500">$</span>
                <span className="text-red-500">0.00</span>
              </td>
            </tr>
            <tr>
              <th>Balance Due</th>
              <td>
                <span className="text-green-500">$</span>
                <span className="text-green-500">600.00</span>
              </td>
            </tr>
          </table>
        </article>

        <aside className="container mx-auto py-4">
          <h1 className="text-2xl font-bold mb-4">Additional Notes</h1>
          <div>
            <p className="text-lg">
              A finance charge of 1.5% will be made on unpaid balances after 30
              days.
            </p>
          </div>
        </aside>
      </body>
    </>
  );
};

// Export the OrderDetailsPage component as the default export
export default OrderDetailsPage;
