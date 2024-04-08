import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

export default function Carrito() {
  const [items, setItems] = useState((JSON.parse(localStorage.getItem('products')) || []))

  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const handleEliminar = (itemId) => {
    const updatedCartItems = items.filter(item => item.id !== itemId);
    setItems(updatedCartItems);
    // Eliminar del localStorage también
    localStorage.setItem('products', JSON.stringify(updatedCartItems));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 shadow-xl border border-gray-300 mx-4">
        <h1 className="text-4xl font-bold mb-4 text-black">Shopping card</h1>

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
                  <td className="py-2 px-4 border border-gray-300 text-center">{item.variant}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center"><img src={item.image} className="w-20 h-20 object-cover mx-auto" alt={item.image} /></td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{item.price} €</td>
                  <td className="py-2 px-4 border border-gray-300 ">
                    <div className="flex justify-center">
                      <button
                        className="bg-gray-200 px-2 py-1 mr-2"
                        onClick={() => {
                          const updatedItems = [...items];
                          const index = updatedItems.findIndex((i) => i.id === item.id);
                          if (index !== -1 && updatedItems[index].quantity > 1) {
                            updatedItems[index].quantity -= 1;
                            setItems(updatedItems);
                          }
                        }}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="bg-gray-200 px-2 py-1 ml-2"
                        onClick={() => {
                          const updatedItems = [...items];
                          const index = updatedItems.findIndex((i) => i.id === item.id);
                          if (index !== -1) {
                            updatedItems[index].quantity += 1;
                            setItems(updatedItems);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{(parseFloat(item.price) * item.quantity).toFixed(2)} €</td>
                  <td className="py-8 px-4 flex justify-center">
                    <button className="bg-black text-white rounded-md border px-2 py-1 hover:bg-gray-800 transition duration-300" onClick={() => handleEliminar(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <strong>Total: {total.toFixed(2)}€</strong>
        </div>
        <button>
          <a href="../Cart/Shipping" className="flex items-center justify-center  border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
        </button>
      </div>
    </div>
  );
}

if (document.getElementById('carrito')) {
  createRoot(document.getElementById('carrito')).render(<Carrito />);
}
