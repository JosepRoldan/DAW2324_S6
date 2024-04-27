import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import * as Yup from "yup";

export default function ShoppingOrder() {
    const [customer, setCustomer] = useState({
        id: "",
        name: "",
        surname: "",
        mail: "",
    });
    const [address, setAddress] = useState({
        address: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
    });
    const [productos, setProductos] = useState([]);
    const shippingPrice = 10; // Hardcode para el precio de envío
    const [validationErrors, setValidationErrors] = useState({});

    // Esquema de validación utilizando Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        mail: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        postcode: Yup.string().required("ZIP is required"),
        country: Yup.string().required("Country is required"),
    });

    // Función para manejar los cambios en los campos del cliente
    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // Función para manejar los cambios en los campos de dirección
    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validar los datos del cliente y la dirección
            await validationSchema.validate(
                { ...customer, ...address },
                { abortEarly: false },
            );

            const csrfToken = document.head.querySelector(
                'meta[name="csrf-token"]',
            ).content;

            // Calcula el total del carrito
            const totalCarrito = productos.reduce((total, producto) => {
                return total + parseFloat(producto.price) * producto.quantity;
            }, 0);

            // Calcula el total final sumando el total del carrito y el precio de envío
            const totalAmount = totalCarrito + shippingPrice;

            // Crea el objeto formData con todos los datos necesarios, incluyendo el total del carrito y el total final
            const formData = {
                customer: customer,
                address: address,
                products: productos,
                totalCarrito: totalCarrito, // Agrega el total del carrito al formData
                shippingPrice: shippingPrice, // Agrega el precio de envío al formData
                totalAmount: totalAmount, // Agrega el total final al formData
            };

            await axios.post("/Cart/Order", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            console.log("Order data saved");
            // Aquí puedes agregar lógica adicional después de que se haya guardado la orden, como redireccionar a otra página
            window.location.href = "/Cart/payments/" + totalAmount;
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
                setValidationErrors(errors);
            } else {
                console.error("Error saving order data:", error);
            }
        }
    };

    // useEffect para cargar los productos desde el almacenamiento local
    useEffect(() => {
        const productosGuardados =
            JSON.parse(localStorage.getItem("products")) || [];
        setProductos(productosGuardados);
        const usersData = JSON.parse(
            document.getElementById("data").getAttribute("data-customer"),
        );
        const addressData = JSON.parse(
            document.getElementById("data").getAttribute("data-address"),
        );
        setCustomer(usersData);
        setAddress(addressData);
    }, []);

    // Calcular el total del carrito
    const totalCarrito = productos.reduce((total, producto) => {
        return total + parseFloat(producto.price) * producto.quantity;
    }, 0);

    return (
        <div className="h-screen grid grid-cols-3">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                <form onSubmit={handleSubmit}>
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                            Customer Date
                        </h2>
                        <div className="mt-3 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                            <input
                                name="customerId"
                                value={customer.id}
                                type="hidden"
                            />
                            <div className="flex sm:w-2/4 xl:w-1/4 border-gray-200 py-3">
                                <label className="text-right px-2">Name</label>
                                <input
                                    name="name"
                                    className="focus:outline-none px-3"
                                    value={customer.name || ""}
                                    onChange={handleCustomerChange}
                                    required
                                />
                                {validationErrors.name && (
                                    <p className="text-red-500">
                                        {validationErrors.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex sm:w-2/4 xl:w-1/4 border-gray-200 py-3">
                                <label className="text-right px-2">
                                    Surname
                                </label>
                                <input
                                    name="surname"
                                    className="focus:outline-none px-3"
                                    value={customer.surname || ""}
                                    onChange={handleCustomerChange}
                                    required
                                />
                                {validationErrors.surname && (
                                    <p className="text-red-500">
                                        {validationErrors.surname}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className=" p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                            <label className="flex sm:w-2/4 xl:w-1/4 border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Email</span>
                                <input
                                    name="email"
                                    type="email"
                                    className="focus:outline-none px-3"
                                    value={customer.mail || ""}
                                    onChange={handleCustomerChange}
                                    required
                                />
                                {validationErrors.mail && (
                                    <p className="text-red-500">
                                        {validationErrors.mail}
                                    </p>
                                )}
                            </label>
                        </div>
                    </section>
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                            Shipping Information
                        </h2>
                        <fieldset className="p-4 mb-3 bg-white shadow-lg rounded text-gray-600">
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Address</span>
                                <input
                                    name="address"
                                    className="focus:outline-none px-3"
                                    value={address.address || ""}
                                    onChange={handleAddressChange}
                                    required
                                />
                                {validationErrors.address && (
                                    <p className="text-red-500">
                                        {validationErrors.address}
                                    </p>
                                )}
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">City</span>
                                <input
                                    name="city"
                                    className="focus:outline-none px-3"
                                    value={address.city || ""}
                                    onChange={handleAddressChange}
                                    required
                                />
                                {validationErrors.city && (
                                    <p className="text-red-500">
                                        {validationErrors.city}
                                    </p>
                                )}
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">State</span>
                                <input
                                    name="state"
                                    className="focus:outline-none px-3"
                                    value={address.state || ""}
                                    onChange={handleAddressChange}
                                    required
                                />
                                {validationErrors.state && (
                                    <p className="text-red-500">
                                        {validationErrors.state}
                                    </p>
                                )}
                            </label>
                            <label className="inline-flex w-2/4 border-gray-200 py-3">
                                <span className="text-right px-2">ZIP</span>
                                <input
                                    name="postcode"
                                    className="focus:outline-none px-3"
                                    value={address.postcode || ""}
                                    onChange={handleAddressChange}
                                    required
                                />
                                {validationErrors.postcode && (
                                    <p className="text-red-500">
                                        {validationErrors.postcode}
                                    </p>
                                )}
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Country</span>
                                <input
                                    name="country"
                                    className="focus:outline-none px-3"
                                    value={address.country || ""}
                                    onChange={handleAddressChange}
                                    required
                                />
                                {validationErrors.country && (
                                    <p className="text-red-500">
                                        {validationErrors.country}
                                    </p>
                                )}
                            </label>
                        </fieldset>
                    </section>
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                            Payment Information
                        </h2>
                    </section>
                    <button
                        className="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
                        type="submit"
                    >
                        Pay {(totalCarrito + shippingPrice).toFixed(2)} €
                    </button>
                </form>
            </div>
            <div className="col-span-1 bg-white lg:block hidden">
                <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
                    Order Summary
                </h1>
                <ul className="py-6 border-b space-y-6 px-8">
                    {productos.map((producto) => (
                        <li
                            className="grid grid-cols-6 gap-2 border-b-1"
                            key={producto.id}
                        >
                            <div className="col-span-1 self-center">
                                <img
                                    src={producto.image}
                                    alt={producto.name}
                                    className="rounded w-full"
                                />
                            </div>
                            <div className="flex flex-col col-span-3 pt-2">
                                <span className="text-gray-600 text-md font-semi-bold">
                                    {producto.name}
                                </span>
                                <span className="text-gray-400 text-sm inline-block pt-2">
                                    {producto.price} €
                                </span>
                            </div>
                            <div className="col-span-2 pt-3">
                                <div className="flex items-center space-x-2 text-sm justify-between">
                                    <span className="text-gray-400">
                                        {producto.quantity} x {producto.price} €
                                    </span>
                                    <span className="text-pink-400 font-semibold inline-block">
                                        {producto.quantity *
                                            parseFloat(producto.price)}{" "}
                                        €
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="px-8 border-b">
                    <div className="flex justify-between py-4 text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold text-pink-500">
                            €{totalCarrito.toFixed(2)} €
                        </span>
                    </div>
                    <div className="flex justify-between py-4 text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-pink-500">
                            {shippingPrice}
                        </span>
                    </div>
                </div>
                <div
                    className="font-semibold 
                text-xl px-8 flex justify-between py-8 text-gray-600"
                >
                    <span>Total</span>
                    <span>{(totalCarrito + shippingPrice).toFixed(2)} €</span>
                </div>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("shoppingOrder");
if (rootElement) {
    createRoot(rootElement).render(<ShoppingOrder />);
}
