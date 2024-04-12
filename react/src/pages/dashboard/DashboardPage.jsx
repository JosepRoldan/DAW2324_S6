import AppLayout from "../../layout/AppLayout";
import React, { useEffect, useState } from "react";
import "../../components/sectionTable/SectionTable.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";
import { Link } from "react-router-dom";



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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProfit, setTotalProfit] = useState(0);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  

  useEffect(() => {
    getBenefits();
    getOrders();
  }, []);

  /**
   * Asynchronous function to fetch benefits from the API and update state accordingly.
   */
  const getBenefits = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL}/getBenefits`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        setBenefits(response.data.benefits);
        setTotalProfit(response.data.total);
      }
    } catch (error) {
      console.error("Error fetching benefits:", error.message);
    } finally {
      setLoading(false);
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
    }finally{
      setLoading(false);
    }
  };

  return  (
    <AppLayout Page={"Home"}>
      <div className="flex flex-col h-[100vh] divContainer">
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

    <div className="container mx-w-6xl mx-auto py-4">
        <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                    <div className="flex flex-col space-y-6 md:h-full md:justify-between">
                        <div className="flex justify-between">
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                Admin Account
                            </span>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                Available Funds
                            </span>
                        </div>
                        <div className="flex gap-2 md:gap-4 justify-between items-center">
                            <div className="flex flex-col space-y-4">
                            </div>
                            <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                                <span className="md:text-xl">€</span>
                                {totalProfit}
                            </h2>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            <Link to="/benefits"  className="buttonDash">
                                See more
                            </Link>
                            <Link to={"/orders"}
                            className="bg-purple-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-purple-600 text-xs tracking-wider font-semibold hover:bg-purple-600 hover:text-white">
                                  Check latest orders
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-800 flex flex-col justify-between">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-white font-bold text-lg">Overview of your account</h2>
                        <p className="text-gray-100 text-sm md:text-base leading-tight max-w-sm">
                           This dashboard provides a quick and easy way to see what's going on in your account. It also includes specialized areas with more detailed information.
                        </p>
                    </div>
                    <div className="flex justify-between items-end">
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                    <h2 className="text-xs md:text-sm text-gray-700 font-bold tracking-wide md:tracking-wider">
                        General Overview of company profit</h2>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Daily Profit</p>
                            <h3 className="mt-1 text-lg text-purple-500 font-bold">€ {Math.round(totalProfit/365)}</h3>
                        </div>
                        <div className="bg-purple-500 p-2 md:p-1 xl:p-2 rounded-md">
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Weekly Profit</p>
                            <h3 className="mt-1 text-lg text-green-500 font-bold">€ {Math.round(totalProfit/52)}</h3>
                        </div>
                        <div className="bg-green-500 p-2 md:p-1 xl:p-2 rounded-md">
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Monthly Profit</p>
                            <h3 className="mt-1 text-lg text-yellow-500 font-bold">€ {Math.round(totalProfit/12)}</h3>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Yearly Profit</p>
                            <h3 className="mt-1 text-lg text-indigo-500 font-bold">€ {totalProfit}</h3>
                        </div>
                        <div className="bg-indigo-500 p-2 md:p-1 xl:p-2 rounded-md">
                        </div>
                    </div>
                </div>
            </div>
            {orders && (
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">Latest Orders</h2>
                        <Link to={"/orders"} className="px-4 py-2 text-xs bg-purple-100 text-purple-500 rounded uppercase tracking-wider font-semibold hover:bg-purple-300">More</Link>
                    </div>
                    <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                      {orders.map((order) => (
                              <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                              <p className="px-4 font-semibold">{order.idOrderPicanova}</p>
                              <p className="px-4 text-gray-600">{order.datetime}</p>
                              <p className="px-4 tracking-wider">{order.orderStatus}</p>
                              <p className="md:text-base text-gray-800 flex items-center gap-2">
                                  16.90
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                      stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7" />
                                  </svg>
                              </p>
                          </li>
                      ))}
                  
                    </ul>
                </div>
            </div>
            )}
        </div>
    </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
