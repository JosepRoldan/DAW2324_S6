import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

export default function Carrito() {
  const [items, setItems] = useState((JSON.parse(localStorage.getItem('products')) || []));

  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const handleEliminar = (itemId, itemVariantId) => {
    const updatedCartItems = items.filter(item => item.id !== itemId || item.idVariant !== itemVariantId);
    setItems(updatedCartItems);
    localStorage.setItem('products', JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  return (
    <div className="container mx-auto mt-8 mb-10">
      <div className="bg-white p-6 shadow-xl border border-gray-300 mx-4">
        <h1 className="text-4xl font-bold mb-7 text-black">Shopping Cart</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-300 text-black">
                <th className="w-1/4 py-2 px-4 border border-gray-300">Product</th>
                <th className="w-1/4 py-2 px-4 border border-gray-300">Image</th>
                <th className="w-1/4 py-2 px-4 border border-gray-300">Price</th>
                <th className="w-1/4 py-2 px-4 border border-gray-300">Quantity</th>
                <th className="w-1/4 py-2 px-4 border border-gray-300">Total</th>
                <th className="w-1/4 py-2 px-4 border border-gray-300">Accions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border border-gray-300">
                  <td className="py-2 px-4 border border-gray-300 text-center">{item.name}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center"><img src={item.image} className="w-20 h-20 object-cover mx-auto" alt={item.image} /></td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{item.price} €</td>
                  <td className="py-2 px-4 border border-gray-300 ">
                    <div className="flex justify-center">
                      <button
                        className="bg-gray-200 px-2 py-1 mr-2"
                        onClick={() => {
                          const updatedItems = items.map((cartItem) => {
                            if (cartItem.id === item.id && cartItem.idVariant === item.idVariant) {
                              return {
                                ...cartItem,
                                quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
                              };
                            }
                            return cartItem;
                          });
                          setItems(updatedItems);
                          localStorage.setItem('products', JSON.stringify(updatedItems));
                        }}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="bg-gray-200 px-2 py-1 ml-2"
                        onClick={() => {
                          const updatedItems = items.map((cartItem) => {
                            if (cartItem.id === item.id && cartItem.idVariant === item.idVariant) {
                              return {
                                ...cartItem,
                                quantity: cartItem.quantity + 1,
                              };
                            }
                            return cartItem;
                          });
                          setItems(updatedItems);
                          localStorage.setItem('products', JSON.stringify(updatedItems));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{(parseFloat(item.price) * item.quantity).toFixed(2)} €</td>
                  <td className="py-8 px-4 flex justify-center">
                    <button className="bg-black text-white rounded-md border px-2 py-1 hover:bg-gray-800 transition duration-300" onClick={() => handleEliminar(item.id, item.idVariant)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <strong>Total: {total.toFixed(2)}€</strong>
        </div>
        <div className="flex justify-end mt-4">
          <button>
            <a href="../Cart/Shipping" className="flex items-center justify-center  border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
          </button>
        </div>
      </div>
    </div>
  );
}

if (document.getElementById('carrito')) {
  createRoot(document.getElementById('carrito')).render(<Carrito />);
}
