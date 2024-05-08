import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

// import { usePeticionAsincrona } from "../hooks/peticioAsincrona";

const MyImages = () => {
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

    const profileRef = useRef();

    const [isProfileActive, setIsProfileActive] = useState(false);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setIsProfileActive(false);
        };

        document.addEventListener("click", handleProfile);

        axios
            .get("/getImages")
            .then((response) => {
                setImages(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las imágenes:", error);
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
                <br></br>
                <br></br>
                <div className="flex flex-col md:grid md:grid-cols-4 gap-4 mx-10">
                    <div className="relative rounded overflow-hidden group">
                        <img
                            src={`img/cangrejoenllamas.png`}
                            className="w-full"
                        ></img>
                        <p className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium opacity-0 group-hover:opacity-100 transition">
                            Add to product
                        </p>
                        <a
                            href="../products"
                            className="absolute inset-0 z-10"
                        ></a>
                    </div>
                </div>
                <br></br>
            </div>
        </>
    );
};

export default MyImages;

if (document.getElementById("myImages")) {
    const root = createRoot(document.getElementById("myImages")).render(
        <MyImages />,
    );
}
