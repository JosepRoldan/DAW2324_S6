// src/components/TailwindComponent.jsx
import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Demo from "./ColorWheel.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import usePeticionAsincrona from "../hooks/peticioAsincrona.jsx";
import BotonRedireccion from "./BotonRedireccion";
import useURLParams from "../hooks/useURLParams";
import { hsvaToHex } from "@uiw/color-convert";
import DotLoader from "react-spinners/DotLoader";


function GenerateGuidedImage() {
    const imageStyle = [
        "Acuarela",
        "Pintura al óleo",
        "Psicodélico",
        "Medieval",
        "Expresionista",
        "Mosaico",
        "3D",
    ];

    const imageFeel = [
        "Alegría",
        "Tristeza",
        "Asombro",
        "Emoción",
        "Calma",
        "Aventura",
        "Inspiración",
        "Misterio",
        "Romance",
        "Inquietud",
        "Diversión",
        "Ensueño",
        "Nostalgia",
    ];

    const imageElement = [
        "Bosque",
        "Pizza",
        "Cafetería",
        "Astronauta",
        "Montaña",
        "Libro",
        "Atardecer",
        "Pastel",
        "Escenas urbana",
    ];
    const params = useURLParams();
    const [divsContent, setDivsContent] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputImg, setInputImg] = useState("");
    const [inputId, setInputId] = useState("");
    const { enviarPrompt, data, errorFetch } = usePeticionAsincrona();
    const numeroDeDivs = 5;
    const [divMostrat, setDivMostrat] = useState(1);
    const [color, setColor] = useState("#ffffff");
    const [style, setStyle] = useState("");
    const [feel, setFeel] = useState("");
    const [element, setElement] = useState("");
    const [step, setStep] = useState({
        1: { set: false },
        2: { set: false },
        3: { set: false },
        4: { set: false },
        5: { set: true },
    });
    const token = document
        .querySelector('meta[name="token"]')
        .getAttribute("content");
    const dataCrear = {
        prompt:
            "Creame una imagen en estilo " +
            style +
            " que transmita " +
            feel +
            " como color principal quiero el " +
            color +
            " y con un " +
            element +
            " como elemento principal.",
        user: "Miquel",
    };
    function generarOpciones(opciones, selected, setSelected) {
        return (
            <>
                <div className="grid grid-cols-4 gap-5 place-items-stretch my-2 ">
                    {opciones.map((estilos) => (
                        <button
                            onClick={() => {
                                setSelected(estilos);
                                cambiarSet();
                            }}
                            className="block mb-4"
                        >
                            <div
                                className={`max-w-md mx-auto rounded-lg overflow-hidden shadow-md ${
                                    selected != estilos
                                        ? "transition duration-300 ease-in-out hover:bg-gray-300  bg-white"
                                        : "-translate-y-1 scale-105 bg-gray-300"
                                }`}
                            >
                                <div className="w-full h-32">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://www.diariodesevilla.es/2024/03/14/consumo/mejores-piensos-perro-OCU_1884422746_206408349_667x375.jpg"
                                        alt="Descripción de la imagen"
                                    />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2 text-black">
                                        {estilos}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </>
        );
    }

    const handleButtonClick = async () => {
        try {
            const urls = await enviarPrompt(
                "POST",
                dataCrear,
                token,
                "/enviar-prompt"
            );
            generarDivs(urls);
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    const guardarImatge = async (idImg, imgUrl) => {
        toast.promise(
            enviarPrompt(
                "POST",
                { idImg: idImg, idUser: 1, imgUrl: imgUrl },
                token,
                "/save-img"
            ),
            {
                loading: "Loading...",
                success: (data) => {
                    console.log(data);
                    return `La imagen se ha guardado correctamente.`;
                },
                error: "Error",
                closeButton: true,
            }
        );
    };

    const generarDivs = (datos) => {
        // Aquí generas los divs utilizando los datos recibidos
        const divsGenerados = datos.map((imagen) => (
            <div key={imagen.id}>{mostrarImagenes(imagen)}</div>
        ));
        // Actualizas el estado de divsContent con los divs generados
        setDivsContent(divsGenerados);
    };

    const mostrarImagenes = (imagen) => {
        return (
            <div
                id="imatgeGenerada"
                className="size-60 relative rounded-md p-2 grid place-content-center "
            >
                <button
                    onClick={() => guardarImatge(imagen.id, imagen.url)}
                    className="absolute top-0 right-0 mt-2 mr-2 hover:scale-110 "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 fill-blue-400 hover:fill-blue-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                        />
                    </svg>
                </button>

                <button
                    onClick={() => seleccionarImg(imagen.url, imagen.id)}
                    className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <img className="rounded-md border-2" src={imagen.url}></img>
                </button>
            </div>
        );
    };

    const seleccionarImg = (url, id) => {
        setInputImg(url);
        setInputId(id);
        console.log(id + " seleccionada");
        console.log(params);
    };

    function handleDataFromChild(data) {
        setColor(hsvaToHex(data));
        setStep((prevState) => ({
            ...prevState,
            [divMostrat]: { ...prevState[divMostrat], set: true },
        }));
    }

    function adelantarPágina() {
        var paginaActual = divMostrat;
        if (paginaActual < numeroDeDivs) paginaActual++;
        setDivMostrat(paginaActual);
    }

    function atrasarPagina() {
        var paginaActual = divMostrat;
        if (paginaActual > 1) paginaActual--;
        setDivMostrat(paginaActual);
    }
    const cambiarSet = () => {
        setStep((prevState) => ({
            ...prevState,
            [divMostrat]: { ...prevState[divMostrat], set: true },
        }));
    };

    return (
        <div className="w-screen min-h-screen my-8 flex justify-center items-center">
            <Toaster />
            
            <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-1 place-items-center">
                        <ul className="steps">
                            <li className="step step-primary">
                                Elige tu soporte
                            </li>
                            <li className="step step-primary">
                                Crea tu imagen
                            </li>
                            <li className="step">
                                Continua con tu compra
                            </li>
                        </ul>
                    </div>
                <div className="grid grid-cols-2 my-2">
                    {divMostrat == 5 ? "": (<div><div className="grid justify-items-start">
                        {divMostrat == 1 ? "" : (<div
                            onClick={() => atrasarPagina()}
                            className="fixed top-1/2 left-4 transform -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-2xl"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        </div>)}
                    </div>
                    <div className="grid justify-items-end">
                        <div
                            onClick={() => {
                                adelantarPágina();
                            }}
                            className={`fixed top-1/2 right-4 transform -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center rounded-full font-bold cursor-pointer ${
                                step[divMostrat].set === false
                                    ? "btn-disabled bg-gray-300 text-gray-400"
                                    : "bg-blue-500 hover:bg-blue-700 text-white"
                            }`}
                            // className="btn btn-disabled"
                        >
                            <FontAwesomeIcon icon={faChevronRight} size="lg" />
                        </div>
                    </div></div>)}
                    
                </div>
                {/* Div que muestra los estilos de la imagen */}
                <div className={divMostrat == 1 ? "" : "hidden"}>
                    {generarOpciones(imageStyle, style, setStyle)}
                </div>
                {/* Div que muestra el color principal de la imagen */}
                <div className={divMostrat == 2 ? "" : "hidden"}>
                    {generarOpciones(imageFeel, feel, setFeel)}
                </div>
                <div className={divMostrat == 3 ? "" : "hidden"}>
                    {generarOpciones(imageElement, element, setElement)}
                </div>
                {/* Div que muestra la eleccion de color de la imagen */}
                <div className={divMostrat == 4 ? "" : "hidden"}>
                    <div className="flex my-5 justify-center h-full">
                        <div dir="ltr">
                            <div className="rounded-s-xl artboard artboard-horizontal phone-1 bg-gray-100 w-1/2 grid place-content-center">
                                <Demo
                                    sendDataToParent={handleDataFromChild}
                                    className="grid place-content-center"
                                />
                            </div>
                        </div>
                        <div dir="rtl">
                            <div
                                className="rounded-s-xl artboard artboard-horizontal phone-1 w-1/2 overflow-x-auto grid place-items-center	"
                                style={{ background: color }}
                            >
                                <p className="text-7xl text-center font-black">
                                    Selecciona el color principal de tu creación{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={divMostrat == 5 ? "" : "hidden"}>
                    <div className="flex flex-col justify-center ">
                        <button
                            className="btn"
                            onClick={() => {
                                handleButtonClick();
                            }}
                        >
                            Genera ya tu imagen!!
                        </button>
                        {divsContent.length > 0 && divsContent ? (
                            <div
                                id="real"
                                className="grid grid-cols-3 place-items-center mx-32 my-5"
                            >
                                {divsContent.map((content, index) => (
                                    <div key={index}>{content}</div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 place-items-center">
                                <span className="loading loading-infinity loading-lg"></span>
                            </div>
                        )}
                        <div className="flex h-9 justify-center items-center my-4">
                            <div className="flex justify-center items-center gap-2">
                                <button className="btn" onClick={() => setDivMostrat(1)}>Estilo: {style}</button>
                                <button className="btn" onClick={() => setDivMostrat(2)}>Sentimiento: {feel}</button>
                                <button className="btn" onClick={() => setDivMostrat(3)}>Elemento: {element}</button>
                                <div className="flex items-center">
                                    <button className="mr-4 btn" onClick={() => setDivMostrat(4)}>Color:</button>
                                    <div
                                        className="w-9 h-4 flex justify-center"
                                        style={{background:  color }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        {inputId ? (
                            <BotonRedireccion
                                ruta="/redirect-from-image"
                                parametros={{
                                    ...params,
                                    idImage: inputId,
                                    idUser: 1,
                                }}
                                texto="Elegir Imagen"
                            />
                        ) : (
                            <BotonRedireccion
                                disabled="disabled"
                                ruta="/test"
                                parametros={{ idImage: inputId }}
                                texto="Elegir Imagen"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
if (document.getElementById("GenerateGuidedImage")) {
    createRoot(document.getElementById("GenerateGuidedImage")).render(
        <GenerateGuidedImage />
    );
}
