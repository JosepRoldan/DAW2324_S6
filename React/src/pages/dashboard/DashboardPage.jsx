import AppLayout from "../../layout/AppLayout";
import React, { useEffect, useState } from "react";
import "../../components/sectionTable/SectionTable.css";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
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

export const DashboardPage = () => {
  const { t } = useTranslation();
  const [benefits, setBenefits] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    getBenefits();
    getProducts();
    getOrders();
    getCustomers();
  }, []);

  /**
   * Asynchronous function to fetch benefits from the API and update state accordingly.
   */
  const getBenefits = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL}/getBenefits`;
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setBenefits(response.data);
      }
    } catch (error) {
      console.error("Error fetching benefits:", error);
    }
  };

  /**
   * Asynchronous function to fetch customers from the API and update the state with the response data.
   *
   * @param None
   * @return None
   */
  const getCustomers = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/customers`;
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches products from the API and sets the products state if the response is successful, otherwise logs an error.
   *
   * @return {void}
   */
  const getProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/products`;
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  /**
   * Asynchronous function to retrieve orders from the API and handle the response or error.
   *
   * @return {void}
   */
  const getOrders = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/orders`;
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <AppLayout Page={"Home"}>
      <div className="flex flex-col h-[100vh] divContainer">
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {/* SECTION BENEFITS / CUSTOMERS */}
        <div className="flex">
          <div className="relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {"Benefits"}
              </h4>
              <div
                className="buttonCreate"
                style={{
                  padding: "0px",
                  paddingLeft: "5px",
                  width: "90px",
                  marginLeft: "220px",
                }}
              >
                <Link to="/benefits">{t("◉ See more")}</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Month")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Income")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Expenses")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Profit")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {benefits.map((benefit, i) => (
                    <tr key={benefit.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {benefit.month}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {benefit.income} €
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        -{benefit.expense} €
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {benefit.profit}€
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative flex max-w-[620px] h-[350px] w-full flex-col ml-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {"Customers"}
              </h4>
              <div
                className="buttonCreate"
                style={{
                  padding: "0px",
                  paddingLeft: "5px",
                  width: "90px",
                  marginLeft: "190px",
                }}
              >
                <Link to="/customers">{t("◉ See more")}</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[620px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Name")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs w-60 font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Email")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Username")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("PostalCode")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {customers.map((customer, i) => (
                    <tr key={customer.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.mail}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.surname}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.postcode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* SECTION PRODUCTS / ORDERS */}
        <div className="flex mt-10 mb-10">
          <div className="relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {"Products"}
              </h4>
              <div
                className="buttonCreate"
                style={{
                  padding: "0px",
                  paddingLeft: "5px",
                  width: "90px",
                  marginLeft: "210px",
                }}
              >
                <Link to="/products">{t("◉ See more")}</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Name")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("SKU")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("DPI")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Type")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.sku}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.dpi}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.dpi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative flex max-w-[620px] h-[350px] w-full flex-col ml-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {"Orders"}
              </h4>
              <div
                className="buttonCreate"
                style={{
                  padding: "0px",
                  paddingLeft: "5px",
                  width: "90px",
                  marginLeft: "280px",
                }}
              >
                <Link to="/orders">{t("◉ See more")}</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[620px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Orderd ID")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Customer ID")}
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {t("Status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {orders.map((orders, i) => (
                    <tr key={orders.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {orders.idOrderPicanova}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {orders.idCustomer}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {orders.orderStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
