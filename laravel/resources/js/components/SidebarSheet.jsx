import React, { useState } from "react";
import { createRoot } from "react-dom/client";

export default function sidebarSheet() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`drawer ${isOpen ? "lg:drawer-open" : ""}`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Contenido de la página aquí */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Abrir barra lateral
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="Cerrar barra lateral"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-blue-zodiac-950 bg-opacity-85 text-bright-turquoise-500">
                    <div className="flex w-full">
                        <div className="grid h-max flex-grow place-items-start">
                            <a href="/CustomerArea">
                                <h1 className="text-2xl text-center mt-2">
                                    Customer Area
                                </h1>
                            </a>
                        </div>
                        <div className="grid h-max flex-grow place-items-end mt-3 text-lg">
                            <button onClick={toggleSidebar}>
                                {isOpen ? (
                                    <i className="fa-solid fa-angle-left"></i>
                                ) : (
                                    <i className="fa-solid fa-angle-right"></i>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="text-lg mt-9">
                        <li className="mb-3 hover:bg-gray-100 hover:bg-opacity-75 hover:text-blue-zodiac-950 hover:rounded-xl">
                            <a href="/CustomerArea">
                                <i className="fa-solid fa-circle-user"></i>
                                <span className="ms-3">
                                    My Personal Information
                                </span>
                            </a>
                        </li>
                        <li className="mb-3 hover:bg-gray-100 hover:bg-opacity-75 hover:text-blue-zodiac-950 hover:rounded-xl">
                            <a href="/MyOrders">
                                <i className="fa-solid fa-box"></i>
                                <span className="ms-3">My Orders</span>
                            </a>
                        </li>
                        <li className="hover:bg-gray-100 hover:bg-opacity-75 hover:text-blue-zodiac-950 hover:rounded-xl">
                            <a href="/MyImages">
                                <i className="fa-solid fa-inbox"></i>
                                <span className="ms-3">My Images</span>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
            {!isOpen && (
                <div className="flex justify-center mt-4">
                    <button
                        className="rounded-e-md w-8 h-16 text-lg bg-blue-zodiac-950 bg-opacity-85 text-bright-turquoise-500"
                        onClick={toggleSidebar}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}

if (document.getElementById("sidebarSheet")) {
    createRoot(document.getElementById("sidebarSheet")).render(<Sidebar />);
}
