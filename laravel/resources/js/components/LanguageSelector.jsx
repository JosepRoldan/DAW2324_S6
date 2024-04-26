import React, { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import axios from "axios";


const LanguageSelector = () => {
    const languages = [
        { code: "en", name: "English", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/320px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" },
        { code: "es", name: "Español", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/320px-Bandera_de_Espa%C3%B1a.svg.png"},
        { code: "cat", name: "Català", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/320px-Flag_of_Catalonia.svg.png"},
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    useEffect(() => {
        const fetchCurrentLanguage = async () => {
            try {
                const response = await axios.get("/current-language");
                setSelectedLanguage(languages.find(language => language.code === response.data.currentLanguage));
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching current language:", error);
            }
        };

        fetchCurrentLanguage();
    }, []);

    const changeLanguage = async (newLanguage) => {
        try {
            // Realizamos una solicitud POST al endpoint de cambio de idioma
            const response = await axios.post("/change-language", { language: newLanguage });
            if(response){
                setSelectedLanguage(languages.find(language => language.code === response.data.currentLanguage));
                console.log(languages.find(language => language.code === response.data.currentLanguage));
                window.location.reload();
            }else{
                console.log("Error al cargar el idioma " + {newLanguage})
            }
        } catch (error) {
            console.error("Error changing language:", error);
        }
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <Menu as="div" className="relative ml-3">
            <Menu.Button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none">
            {selectedLanguage ?  (<img className ="size-4" src={selectedLanguage.flag} alt={selectedLanguage.name} />): <img className ="size-px" alt=""/>}
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languages.map((language) => (
                    <Menu.Item key={language.code}>
                        {({ active }) => (
                            <a
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => changeLanguage(language.code)}
                            >
                                {language.name}
                            </a>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default LanguageSelector;
