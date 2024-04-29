import React, { useState, useEffect } from "react";

function OrderDetailsPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/OrderDetails/${id}`)
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
        {!isLoading && orderDetails && (
          <>
            <table className="w-full mb-8">
              <tr>
                <th className="w-1/4">Order Number</th>
                <td className="w-3/4">{orderDetails[0].idOrder}</td>
              </tr>
            </table>

            <table className="w-full mb-8 text-center">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order) => (
                  <tr key={order.id}>
                    <td className="text-left">
                      <span>{order.productName}</span>
                    </td>
                    <td>{order.quantity}</td>
                    <td>
                      <span className="text-green-500">€</span>
                      <span className="text-green-500">{order.totalPrice}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="w-full mb-8">
              <tr>
                <th>Total</th>
                <td>
                  <span className="text-green-500">
                    €{/* Agregar el total del pedido */}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Amount Paid</th>
                <td>
                  <span className="text-red-500">
                    €{/* Agregar la cantidad pagada */}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Balance Due</th>
                <td>
                  <span className="text-green-500">
                    €{/* Calcular y agregar el saldo debido */}
                  </span>
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
