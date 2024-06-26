import { Menu } from "@headlessui/react";
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, HomeIcon, UserGroupIcon, UsersIcon, CogIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Breadcrumb } from "../components/Breadcrumb";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserwayWidget from "../components/userwayWidget/UserWayWidget";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";
import { Outlet } from 'react-router-dom';
import { usePage } from "../contexts/PageContext";

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

export default function AppLayout({ children }) {
  const { page, steps } = usePage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  var dataJSON = JSON.parse(localStorage.getItem("user"));

  const user = dataJSON.user;
  const role = dataJSON.idRole;
  const userId = dataJSON.id;


  let navigation = [];

  switch (role) {
    case 1:
      navigation = [
        { name: t("Dashboard"), href: "/dashboard", icon: HomeIcon, current: true },
        { name: t("Products"), href: "/products", icon: CalendarIcon, current: false, },
        { name: t("Orders"), href: "/orders", icon: DocumentDuplicateIcon, current: false, },
        { name: t("Profit"), href: "/profit", icon: ChartPieIcon, current: false, },
        { name: t("Customers"), href: "/customers", icon: UserGroupIcon, current: false, },
        { name: t("Users"), href: "/users", icon: UsersIcon, current: false },
        { name: t("Settings"), href: "/settings", icon: CogIcon, current: false },
      ];
      break;
    case 2:
      navigation = [
        { name: t("Dashboard"), href: "/dashboard", icon: HomeIcon, current: true },
        { name: t("Products"), href: "/products", icon: CalendarIcon, current: false, },
        { name: t("Orders"), href: "/orders", icon: DocumentDuplicateIcon, current: false, },
        { name: t("Profit"), href: "/profit", icon: ChartPieIcon, current: false, },
        { name: t("Customers"), href: "/customers", icon: UserGroupIcon, current: false, },
      ];
      break;
    case 3:
      navigation = [
        { name: t("Home"), href: "/dashboard", icon: HomeIcon, current: true },
        { name: t("Orders"), href: "/orders", icon: DocumentDuplicateIcon, current: false, },
        { name: t("Customers"), href: "/customers", icon: UserGroupIcon, current: false, },
      ];
      break;
    default:
      navigate("/login");
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

  const token = localStorage.getItem('token');

  const handleNavigation = async (action) => {
    if (action === "Sign out") {
      const url = `${import.meta.env.VITE_API_URL}/logout`;
      await axios({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        method: "POST",
        url: url,
      })
        .then(function (response) {
          if (response.status === 200) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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

  const handleNavigateTo = (to) => {
    navigate(to);
  };

  const userNavigation = [
    { name: t("My profile"), action: "My profile" },
    { name: t("Sign out"), action: "Sign out" },
  ];

  const UserNavigation = (action) => {
    handleNavigation(action);
  };

  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-14 mt-5 w-auto"
                src="/LogoCustomAIze.png"
                alt="CustomAIze"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold select-none cursor-pointer"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <div style={{ marginTop: "auto", textAlign: "center" }}>
                  <LanguageSwitcher />
                </div>
              </ul>
              <div id="userway-widget-container"><UserwayWidget /></div>

            </nav>
          </div>
        </div>
        <div className="lg:pl-56">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="float-right">
              </div>
              <div className="relative flex flex-1 my-auto">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {page}
                </h2>
              </div>
              <div className="flex items-center gap-x-10 lg:gap-x-6">
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">{t("Open user menu")}</span>
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.action}
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.action === "My profile") {
                                UserNavigation(item.action);
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
                </Menu>
              </div>
            </div>
          </div>
          <main className="bg-gray-100 py-5 h-screen overflow-y-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              {window.location.href.includes("/profit") == false &&
                window.location.href.includes("/dashboard") == false && (
                  <Breadcrumb steps={steps} />
                )}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
