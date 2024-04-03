import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Breadcrumb } from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserwayWidget from "../components/userwayWidget/UserWayWidget";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";

const resources = {
  eng: {
    translation: translationEN,
  },
  cat: {
    translation: translationCA,
  },
  esp: {
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "eng",
  fallbackLng: "eng",
  interpolation: {
    escapeValue: false,
  },
});

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppLayout({ children, Page, Steps }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const idRole = localStorage.getItem("idRole");
  const userId = localStorage.getItem("userId");

  let data, role;

  if (user) {
    data = JSON.parse(user);
    role = JSON.parse(idRole);
  } else {
    data = "";
    role = "";
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  let navigation = [];

  switch (role) {
    case 1:
      navigation = [
        { name: t("Home"), href: "/dashboard", icon: HomeIcon, current: true },
        { name: t("Users"), href: "/users", icon: UsersIcon, current: false },
        {
          name: t("Customers"),
          href: "/customers",
          icon: UserGroupIcon,
          current: false,
        },
        {
          name: t("Products"),
          href: "/products",
          icon: CalendarIcon,
          current: false,
        },
        {
          name: t("Orders"),
          href: "/orders",
          icon: DocumentDuplicateIcon,
          current: false,
        },
        {
          name: t("Benefits"),
          href: "/benefits",
          icon: ChartPieIcon,
          current: false,
        },
        { name: t("Settings"), href: "/settings", icon: CogIcon, current: false },
      ];
      break;
    case 2:
      navigation = [
        { name: "Home", href: "/dashboard", icon: HomeIcon, current: true },
        {
          name: "Customers",
          href: "/customers",
          icon: UserGroupIcon,
          current: false,
        },
        {
          name: "Products",
          href: "/products",
          icon: CalendarIcon,
          current: false,
        },
        {
          name: "Orders",
          href: "/orders",
          icon: DocumentDuplicateIcon,
          current: false,
        },
        {
          name: "Benefits",
          href: "/benefits",
          icon: ChartPieIcon,
          current: false,
        },
      ];
      break;
    case 3:
      navigation = [
        { name: "Home", href: "/dashboard", icon: HomeIcon, current: true },
        {
          name: "Customers",
          href: "/customers",
          icon: UserGroupIcon,
          current: false,
        },
        {
          name: "Orders",
          href: "/orders",
          icon: DocumentDuplicateIcon,
          current: false,
        },
      ];
      break;
    default:
      console.log("NO tienes rol");
      break;
  }

  for (var i = 0; i < navigation.length; i++) {
    if (navigation[i].current == true) {
      navigation[i].current = false;
    }
    if (window.location.href.includes(navigation[i].href)) {
      navigation[i].current = true;
    }
  }
  //This code snippet defines a function
  //handleNavigation that makes a POST request to a logout
  //endpoint when the action parameter is 'Sign out'. It then removes the token
  //from local storage and navigates to the home page if the request is successful.
  //If there is an error during the request, it logs the error to the console.
  const handleNavigation = async (action) => {
    if (action === "Sign out") {
      const url = `${import.meta.env.VITE_API_URL}/logout`;
      await axios({
        method: "POST",
        url: url,
      })
        .then(function (response) {
          if (response.status === 200) {
            localStorage.removeItem("token");
            navigate("/");
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        })
        .finally(function () { });
    } else if (action === "My profile") {
      navigate(`/users/profile/${userId}`);
    }
  };

  const userNavigation = [
    { name: "My profile", action: "My profile" },
    { name: "Sign out", action: "Sign out" },
  ];

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const UserNavigation = (action) => {
    handleNavigation(action);
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">{t("Close sidebar")}</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-14 w-auto"
                        src="/LogoCustomAIze.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {t("Settings")}
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-14 mt-5 w-auto"
                src="/LogoCustomAIze.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                    >
                                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                        Settings
                                    </a>
                                </li> */}
              </ul>
            </nav>
          </div>
        </div>
        <div className="lg:pl-56">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">{t("Open sidebar")}</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="float-right">
                <LanguageSwitcher />
              </div>
              <div className="relative flex flex-1 my-auto">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {Page}
                </h2>
              </div>
              <div className="flex items-center gap-x-10 lg:gap-x-6">
                {/* Separator */}
                {/* <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" /> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">{t("Open user menu")}</span>
                    {/* <img
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        /> */}
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {data}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.action}
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.action === "My profile") {
                                  UserNavigation(item.action); // Pasa el ID del usuario al hacer clic en "My profile"
                                } else {
                                  handleNavigation(item.action);
                                }
                              }}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="bg-gray-100 py-5 h-screen overflow-y-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              {window.location.href.includes("/benefits") == false &&
                window.location.href.includes("/dashboard") == false && (
                  <Breadcrumb steps={Steps} />
                )}
              {children}
            </div>
          </main>

          <UserwayWidget />
        </div>
      </div>
    </>
  );
}
