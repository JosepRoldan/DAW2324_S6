import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { createRoot } from "react-dom/client";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import MiniCarrito from "./MiniCarrito";
import React, { useEffect } from "react";
import LanguageSelector from "./LanguageSelector";

const navigation = [
    { name: "Home", href: "Inicio", current: false },
    { name: "Products", href: "../products", current: false },
    { name: "Generate Image", href: "../daisy", current: false },
    {
        name: "Generate Guided Image",
        href: "../guidedGeneratedImage",
        current: false,
    },
    { name: "FAQ", href: "../faq", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Verificar si hay una sesión activa al cargar el componente
        const token = document.getElementById("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleCartClick = () => {
        setIsCartOpen((prevState) => !prevState);
    };

    return (
        <Disclosure as="nav" className="bg-blue-zodiac-950">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-18 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-12 w-12"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <img
                                            src="/img/logoicono.png"
                                            alt="Descripción de la imagen"
                                            className="block h-12 w-12"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-4 sm:block">
                                    <div className="flex space-x-4 my-2">
                                        {navigation.map((menu) => (
                                            <a
                                                key={menu.name}
                                                href={menu.href}
                                                className={classNames(
                                                    menu.current
                                                        ? "bg-gray-900 text-white"
                                                        : "text-white hover:bg-gray-600 hover:text-white",
                                                    "rounded-md px-1 py-1 text-sm font-medium mt-2"
                                                )}
                                                aria-current={
                                                    menu.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {menu.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end"></div>
                            <div>
                                <LanguageSelector></LanguageSelector>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    id="cartButton"
                                    type="button"
                                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none"
                                    onClick={handleCartClick}
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View cart</span>
                                    <ShoppingCartIcon
                                        className="h-8 w-8"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <img
                                                className="h-8 w-8 rounded-full ml-3"
                                                src="/img/fotoPerfil.jpeg"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/profile"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={
                                                            isLoggedIn
                                                                ? "logout"
                                                                : "login"
                                                        }
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        {isLoggedIn
                                                            ? "Sign out"
                                                            : "Sign in"}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((menu) => (
                                <Disclosure.Button
                                    key={menu.name}
                                    as="a"
                                    href={menu.href}
                                    className={classNames(
                                        menu.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                    aria-current={
                                        menu.current ? "page" : undefined
                                    }
                                >
                                    {menu.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                    {isCartOpen && <MiniCarrito />}
                </>
            )}
        </Disclosure>
    );
}

if (document.getElementById("header")) {
    createRoot(document.getElementById("header")).render(<Header />);
}
