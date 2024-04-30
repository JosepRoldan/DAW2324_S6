// src/components/TailwindComponent.jsx
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import usePeticionAsincrona from "../hooks/peticioAsincrona.jsx";
import BotonRedireccion from "./BotonRedireccion";
import useURLParams from "../hooks/useURLParams";
import DotLoader from "react-spinners/DotLoader";

function MostrarImagen() {
    function getToken() {
        const tokenElement = document.getElementById("token");
        return tokenElement ? tokenElement.value : null;
    }
    const [loginStatus, setLoginStatus] = useState(null);
    useEffect(() => {
        // Función asincrónica dentro de useEffect
        const fetchData = async () => {
            console.log(getToken());
            try {
                const validated = await enviarPrompt(
                    "POST",
                    { token: getToken() },
                    token,
                    "/check-token",
                );
                setLoginStatus(validated.status);
                consultarStatus(validated.status);
            } catch (error) {
                console.error("Error en la petición:", error);
            }
        };

        fetchData();
    }, []);

    const [mostrarInfo, setMostrarInfo] = useState(false);
    const [mostrarDiv, setMostrarDiv] = useState(0);
    const [divsContent, setDivsContent] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputImg, setInputImg] = useState("");
    const [inputId, setInputId] = useState("");
    const token = document
        .querySelector('meta[name="token"]')
        .getAttribute("content");
    const { enviarPrompt, data, errorFetch } = usePeticionAsincrona();
    const params = useURLParams();
    const dataCrear = {
        prompt: inputValue,
        user: getToken(),
    };
    const dataEditar = {
        url: inputImg,
        user: getToken(),
        idImg: inputId,
        prompt: inputValue,
    };

    const consultarStatus = (status) => {
        console.log(status);
        switch (status) {
            case 2:
                toast.info(
                    "Valida tu cuenta aquí para poder generar imágenes.",
                    {
                        action: {
                            label: "Hazlo aquí",
                            onClick: () => (window.location.href = "daisy"),
                        },
                        position: "top-center",
                    },
                );
                break;
            case 3:
                toast.info(
                    "Registrate en la página aquí para poder generar imágenes.",
                    {
                        action: {
                            label: "Hazlo aquí",
                            onClick: () => (window.location.href = "sign_up"),
                        },
                        position: "top-center",
                    },
                );
                break;
        }
    };

    //Modificará la imagenseleccionada enviandola a la api
    const seleccionarImg = (url, id) => {
        setInputImg(url);
        setInputId(id);
        console.log(id + " seleccionada");
        console.log(params);
    };

    //Guarda la imagen a laa bd. Muestra una noti
    const guardarImatge = async (idImg, imgUrl) => {
        console.log(idImg, imgUrl);
        toast.promise(
            enviarPrompt(
                "POST",
                { idImg: idImg, user: getToken(), imgUrl: imgUrl },
                token,
                "/save-img",
            ),
            {
                loading: "Loading...",
                success: (data) => {
                    console.log(data);
                    return `La imagen se ha guardado correctamente.`;
                },
                error: "Error",
                closeButton: true,
            },
        );
    };

    const generarDivs = (datos) => {
        if (datos.length > 1) {
            let divsGenerados = [
                <div
                    id="real"
                    className="grid grid-cols-3 place-items-center mx-32"
                >
                    {datos.map((imagen) => (
                        <div key={imagen.id}>{mostrarImagenes(imagen)}</div>
                    ))}
                </div>,
            ];
            setDivsContent(divsGenerados);
        } else {
            const divsGenerados = [
                <div
                    id="real"
                    className="grid grid-cols-1 place-items-center mx-32"
                >
                    <img
                        className="rounded-md border-2 size-64"
                        src="/img/oops.webp"
                    ></img>
                </div>,
            ];
            setDivsContent(divsGenerados);
            toast.error(
                "Ha habido un error al generar la imagen. Prueba generando otra",
                {
                    position: "top-center",
                },
            );
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const urls = await enviarPrompt(
                "POST",
                dataCrear,
                token,
                "/enviar-prompt",
            );
            generarDivs(urls);
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    const handleButtonClick2 = async () => {
        try {
            setDivsContent([]);
            const urls = await enviarPrompt(
                "POST",
                dataEditar,
                token,
                "/modi-prompt",
            );
            generarDivs(urls);
            setInputId("");
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    // const ayudaGuardar = () => {
    //     toast.info()
    // }

    //Muestra la array de imagenes que le pasemos.
    const mostrarImagenes = (imagen) => {
        return (
            <div
                id="imatgeGenerada"
                className="size-60 relative rounded-md p-2 grid place-content-center"
            >
                <button
                    onClick={() => guardarImatge(imagen.id, imagen.url)}
                    className="absolute -top-0.5 right-0 mr-2 hover:scale-110 "
                >
                    <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 1024 1024"
                        className="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke="#CCCCCC"
                            strokeWidth="61.44"
                        >
                            <path
                                d="M789.333333 917.333333l-277.333333-128-277.333333 128V192c0-46.933333 38.4-85.333333 85.333333-85.333333h384c46.933333 0 85.333333 38.4 85.333333 85.333333v725.333333z"
                                fill="#e7fc00"
                            ></path>
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M789.333333 917.333333l-277.333333-128-277.333333 128V192c0-46.933333 38.4-85.333333 85.333333-85.333333h384c46.933333 0 85.333333 38.4 85.333333 85.333333v725.333333z"
                                fill="#e7fc00"
                            ></path>
                        </g>
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

    return (
        <div className="w-screen">
            <Toaster richColors />

            <div
                id="generació_imatge"
                className={mostrarDiv == 1 ? "" : "hidden"}
            >
                <div className="flex justify-center my-3 gap-4">
                    <a href="daisy">
                        <button className="btn my-2">
                            Generar otro prompt
                        </button>
                    </a>
                    {divsContent.length > 0 ? (
                        <button
                            onClick={() =>
                                toast.info(
                                    "Guarda tus imagenes con el simbolo de guardadp",
                                    {
                                        icon: (
                                            <div className="p-2">
                                                <svg
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 1024 1024"
                                                    className="icon"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#000000"
                                                >
                                                    <g
                                                        id="SVGRepo_bgCarrier"
                                                        strokeWidth="0"
                                                    ></g>
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        stroke="#CCCCCC"
                                                        strokeWidth="61.44"
                                                    >
                                                        <path
                                                            d="M789.333333 917.333333l-277.333333-128-277.333333 128V192c0-46.933333 38.4-85.333333 85.333333-85.333333h384c46.933333 0 85.333333 38.4 85.333333 85.333333v725.333333z"
                                                            fill="#e7fc00"
                                                        ></path>
                                                    </g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M789.333333 917.333333l-277.333333-128-277.333333 128V192c0-46.933333 38.4-85.333333 85.333333-85.333333h384c46.933333 0 85.333333 38.4 85.333333 85.333333v725.333333z"
                                                            fill="#e7fc00"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        ),
                                    },
                                )
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                />
                            </svg>
                        </button>
                    ) : (
                        ""
                    )}
                </div>
                <div className="grid grid-cols-1 place-items-center">
                    <ul className="steps">
                        <li className="step step-primary">Elige tu soporte</li>
                        <li className="step step-primary">Crea tu imagen</li>
                        <li className="step">Continua con tu compra</li>
                    </ul>
                </div>

                {divsContent.length > 0 && divsContent ? (
                    divsContent.map((content, index) => (
                        <div key={index}>{content}</div>
                    ))
                ) : (
                    <div className="grid grid-cols-1 place-items-center my-6">
                        <DotLoader color="#1d4ed8" loading />
                    </div>
                )}

                <div className="flex justify-center my-3 gap-4">
                    {/* <form className="flex gap-2"> */}
                    <button
                        className="btn"
                        disabled={inputId ? "" : "disabled"}
                        onClick={() => {
                            handleButtonClick2();
                        }}
                    >
                        Modificar imagen seleccionada
                    </button>
                    <input
                        type="hidden"
                        name="_token"
                        value="{{ csrf_token() }}"
                    />
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

                    {/* </form> */}
                </div>
                <div className="w-full border-solid border-red rounded-md "></div>
            </div>

            <div className={mostrarDiv == 0 ? "" : "hidden"}>
                <div className="flex justify-center">
                    <ul className="steps">
                        <li className="step step-primary">Elige tu soporte</li>
                        <li className="step">Crea tu imagen</li>
                        <li className="step">Continua con tu compra</li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    {params.idVariant ? <a>{params.idVariant}</a> : ""}
                </div>
                <div className="flex justify-center my-3 gap-4">
                    {/* <form className="flex gap-2"> */}

                    <input
                        type="text"
                        placeholder="Un perro tocando la trompeta encima de una bicicleta."
                        className="input input-bordered w-full max-w-xl"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn"
                        disabled={
                            (loginStatus == 2) | (loginStatus == 3)
                                ? "disabled"
                                : ""
                        }
                        onClick={() => {
                            setMostrarDiv(1);
                            handleButtonClick();
                        }}
                    >
                        CREAR UNA IMAGEN!
                    </button>
                    <input
                        type="hidden"
                        name="_token"
                        value="{{ csrf_token() }}"
                    />
                </div>
            </div>
            <div className={mostrarDiv == 2 ? "" : "hidden"}>
                <div className="flex flex-col items-center">
                    <h1 className="my-2 text-3xl text-center font-bold text-blue-500">
                        ¡Esta es la imagen que has seleccionado!
                    </h1>
                    <div className="border border-black">
                        <img
                            className="w-50 h-auto rounded-md"
                            src={inputImg}
                            alt="Imagen seleccionada"
                        />
                    </div>
                    <div>
                        <button className="btn my-4">
                            Añadir tu imagen a un producto
                        </button>
                        <button className="btn my-4">
                            Añadir tu producto al carro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
if (document.getElementById("MostrarImagen")) {
    createRoot(document.getElementById("MostrarImagen")).render(
        <MostrarImagen />,
    );
}
