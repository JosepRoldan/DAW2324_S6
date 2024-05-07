import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function OrderDetailsPage() {
  const { t } = useTranslation();

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/OrderDetails/4`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrderDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <body className="bg-gray-100 font-sans">
      <header className="container mx-auto py-4">
        <h1 className="text-3xl font-bold text-center bg-black rounded-md text-white mb-4">
          {t("Order Details")}
        </h1>
        <address className="float-left font-sm font-bold text-4xl mr-4">
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
        {!isLoading && orderDetails && (
          <>
            <table className="w-full mb-8 text-lg bg-black text-white rounded-md">
              <tr>
                <th className="w-1/4">{t("Order Number")}</th>
                <td className="w-3/4">{orderDetails[0].idOrder}</td>
              </tr>
            </table>

            <table className="w-full mb-8 text-center">
              <thead>
                <tr className="bg-primaryColor text-white border-2 border-black">
                  <th>{t("Item")}</th>
                  <th>{t("Quantity")}</th>
                  <th>{t("Price")}</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order) => (
                  <tr key={order.id} className="border-2 border-black">
                    <td className="text-left border-2 border-black">
                      <span>{order.productName}</span>
                    </td>
                    <td className="border-2 border-black">{order.quantity}</td>
                    <td>
                      <span className="text-green-500 ">€</span>
                      <span className="text-green-500">{order.totalPrice}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="w-full mb-8">
              <tr className="">
                <td></td>
                <th className="border-2 border-black text-right">
                  <span className="mr-4">Total</span>
                </th>
                <td className="text-center border-2 border-black">
                  <span className="text-green-500 ">€ 281,55</span>
                </td>
              </tr>
            </table>
          </>
        )}
      </article>
    </body>
  );
}

export default OrderDetailsPage;
