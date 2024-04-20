import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

export default function ShoppingOrder() {
    const [productos, setProductos] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [address, setAddress] = useState({});
    const shippingPrice = 10; // Hardcode para el precio de envío


    useEffect(() => {
        // Recuperar los productos del almacenamiento local
        const productosGuardados = (JSON.parse(localStorage.getItem('products')) || []);
        // Actualizar el estado con los productos recuperados
        setProductos(productosGuardados);
    }, []); 


    useEffect(() => {
        // Obtener datos de usuarios y productos desde los atributos data de la vista
        const usersData = JSON.parse(document.getElementById('data').getAttribute('data-customer'));
        console.log(usersData)
        const addressData = JSON.parse(document.getElementById('data').getAttribute('data-address'));
        // Actualizar el estado con los datos obtenidos
        setCustomer(usersData);
        setAddress(addressData);
    }, []);

       // Calcular el total del carrito
    const totalCarrito = productos.reduce((total, producto) => {
        return total + (parseFloat(producto.price) * producto.quantity);
    }, 0);
console.log(customer)
    return (
    <div className="h-screen grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
            <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                    <div className="text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium ml-3">Checkout</div>
                </div>
                <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>
                <section>
                    <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Customer Date</h2>
                    <div className="mt-3 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div className="flex sm:w-2/4 xl:w-1/4 border-gray-200 py-3">
                            <label className="text-right px-2">Name</label>
                            <input
                              name="name"
                              className="focus:outline-none px-3"
                              value={customer.name}  
                              required=""                      
                            />                        
                        </div>
                        <div className="flex sm:w-2/4 xl:w-1/4 border-gray-200 py-3">
                            <label className="text-right px-2">Surname</label>
                            <input
                              name="surname"
                              className="focus:outline-none px-3"
                              value={customer.surname}
                              required=""
                            />                        
                        </div>
                    </div>
                    <div className=" p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <label className="flex sm:w-2/4 xl:w-1/4 border-b border-gray-200 h-12 py-3 items-center">
                            <span className="text-right px-2">Email</span>
                            <input
                              name="mail"
                              type="email"
                              className="focus:outline-none px-3"
                              value={customer.mail}
                              required=""
                            />                        
                        </label>
                    </div>
                </section>            
            <div className="rounded-md ">
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping Information</h2>
                        <fieldset className="p-4 mb-3 bg-white shadow-lg rounded text-gray-600">
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Address</span>
                                <input
                                    name="address"
                                    className="focus:outline-none px-3"
                                    value={address.address}
                                />                            
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">City</span>
                                <input
                                    name="city"
                                    className="focus:outline-none px-3"
                                    value={address.city}
                                />                            
                            </label>
                            <label  className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2 xl:px-1 xl:text-none">ZIP</span>
                                <input
                                  name="postal_code"
                                  className="focus:outline-none px-3"
                                  value={address.postal_code}
                                />                            
                            </label>
                            <label className="inline-flex w-2/4 border-gray-200 py-3">
                                <span className="text-right px-2">State</span>
                                <input
                                  name="state"
                                  className="focus:outline-none px-3"
                                  value={address.state}
                                />                            
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2 xl:px-1 xl:text-none">Country</span>
                                <input
                                  name="country"
                                  className="focus:outline-none px-3"
                                  placeholder={address.country}
                                />
                            </label>
                        </fieldset>
                    </section>
            </div>
            <div className="rounded-md">
                <section>
                    <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                            <span className="text-right px-2">Card</span>
                            <input name="card" className="focus:outline-none px-3 w-full" placeholder="Card number MM/YY CVC" required=""/>
                        </label>
                    </fieldset>
                </section>
            </div>
            <button className="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                Pay {(totalCarrito + shippingPrice).toFixed(2) } €
            </button>
        </div>


        <div className="col-span-1 bg-white lg:block hidden">
            <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
            <ul className="py-6 border-b space-y-6 px-8">
            {productos.map(producto => (
                <li className="grid grid-cols-6 gap-2 border-b-1" key={producto.id}>
                    <div className="col-span-1 self-center">
                        <img src={producto.image} alt={producto.name} className="rounded w-full"/>
                    </div>
                    <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold">{producto.name}</span>
                        <span className="text-gray-400 text-sm inline-block pt-2">{producto.price} €</span>
                    </div>
                    <div className="col-span-2 pt-3">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                            <span className="text-gray-400">{producto.quantity} x {producto.price} €</span>
                            <span className="text-pink-400 font-semibold inline-block">{producto.quantity * parseFloat(producto.price)} €</span>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
            <div className="px-8 border-b">
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-pink-500">€{totalCarrito.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-pink-500">Free</span>
                </div>
            </div>
            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                <span>Total</span>
                <span>{(totalCarrito + shippingPrice).toFixed(2) } €</span>
            </div>
        </div>
    </div>
    );
}

const rootElement = document.getElementById("shoppingOrder");
if (rootElement) {
    createRoot(rootElement).render(<ShoppingOrder />);
}