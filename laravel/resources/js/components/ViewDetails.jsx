import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const ViewDetails = () => {
    const navigation = [
        {
            href: "/myOrders",
            name: "My Orders",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
            ),
        },
        {
            href: "myImages",
            name: "My Images",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>
            ),
        },
    ];

    const navsFooter = [
        {
            href: "javascript:void(0)",
            name: "Help",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                </svg>
            ),
        },
        {
            href: "javascript:void(0)",
            name: "Settings",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
        },
    ];

    const profileRef = useRef();

    const [isProfileActive, setIsProfileActive] = useState(false);

    const [details, setDetails] = useState([]);

    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setIsProfileActive(false);
        };

        document.addEventListener("click", handleProfile);

        axios
            .get("/viewDetailsOrder")
            .then((response) => {
                setDetails(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    return (
        <>
            <nav className="fixed top-30 left-0 w-full h-full border-r border-b bg-blue-zodiac-900 space-y-0 sm:w-80 ">
                <div className="flex flex-col h-full px-12">
                    <div className="h-20 flex items-center pl-2">
                        <div className="w-full flex items-center gap-x-5">
                            <img
                                src="/img/fotoPerfil.jpeg"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <span className="block text-white text-sm font-semibold">
                                    Perfil
                                </span>
                                <span className="block mt-px text-white text-xs text-decoration-line: underline">
                                    <a href="../profile">View Profile</a>
                                </span>
                            </div>
                            <div className="relative flex-1 text-right">
                                <button
                                    ref={profileRef}
                                    className="p-1.5 rounded-md text-white hover:bg-gray-600 active:bg-gray-100"
                                    onClick={() =>
                                        setIsProfileActive(!isProfileActive)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isProfileActive ? (
                                    <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                        <div className="p-2 text-left">
                                            <span className="block text-gray-500 p-2">
                                                perfil@gmail.com
                                            </span>
                                            <a
                                                href="javascript:void(0)"
                                                className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
                                            >
                                                Add another account
                                            </a>
                                            <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-900 duration-150">
                                                Logout
                                            </button>
                                            <div className="relative">
                                                <select className="w-full cursor-pointer appearance-none bg-transparent p-1 outline-none">
                                                    <option disabled selected>
                                                        Theme
                                                    </option>
                                                    <option>Dark</option>
                                                    <option>Light</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-autopt-2 mt-2 border-t">
                        <ul className="text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-gray-600 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-gray-500">
                                            {item.icon}
                                        </div>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </nav>
            <div className="ml-80 h-50 bg-white">
                <div className="h-screen bg-white pt-10 mx-10">
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className=" md:w-2/3">
                            <div>
                                <div className="mb-6 bg-white p-6 shadow-md sm:flex sm:justify-start flex-col">
                                    <div className="flex items-center justify-between my-2">
                                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                            <div className="mt-5 sm:mt-0">
                                                <h2 className="text-lg font-bold text-gray-900">
                                                    Generated Image:
                                                </h2>
                                                <p className="mt-1 text-xs text-gray-700">
                                                    {details.prompt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between my-1">
                                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                            <div className="mt-5 sm:mt-0">
                                                <h2 className="text-lg font-bold text-gray-900">
                                                    {details.productName}
                                                </h2>
                                                <p className="mt-1 text-xs text-gray-700">
                                                    {details.variant}
                                                </p>
                                            </div>
                                            <div className="">
                                                <p className="text-sm">
                                                    {details.priceEach}€
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 h-full border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-1 flex justify-between">
                                <div className="text-gray-900 order-first">
                                    <p className="mb-4 font-bold">
                                        Num. Order:
                                    </p>
                                    <p className="mb-4 font-bold">Variant:</p>
                                    <p className="mb-4 font-bold">Date:</p>
                                    <p className="mb-4 font-bold">Status:</p>
                                    <p className="mb-4 font-bold">Customer:</p>
                                </div>
                                <div className="text-gray-900 order-last">
                                    <p className="mb-4">1</p>
                                    <p className="mb-4">{details.variant}</p>
                                    <p className="mb-4">{details.datetime}</p>
                                    <p className="mb-4">
                                        {details.orderStatus}
                                    </p>
                                    <p className="mb-4">
                                        {details.name} {details.surname}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">
                                    Product price:
                                </p>
                                <p className="text-sm text-gray-700">
                                    {details.priceEach}€
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">
                                    Shipping price:
                                </p>
                                <p className="text-sm text-gray-700">
                                    {details.shippingPrice}€
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">
                                    Total price:
                                </p>
                                <div className="">
                                    <p className="flex justify-end mb-1 text-lg font-bold">
                                        {details.totalPrice}€
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        including IVA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewDetails;

if (document.getElementById("viewDetails")) {
    const root = createRoot(document.getElementById("viewDetails")).render(
        <ViewDetails />,
    );
}
