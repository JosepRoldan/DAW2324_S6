// src/components/TailwindComponent.jsx
import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import usePeticionAsincrona from "../hooks/peticioAsincrona.jsx";
import BotonRedireccion from "./BotonRedireccion";
import useURLParams from "../hooks/useURLParams";

function MostrarImagen() {
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
        user: "Miquel",
    };
    const dataEditar = {
        url: inputImg,
        user: "Miquel",
        idImg: inputId,
        prompt: inputValue,
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

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

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

    const handleButtonClick2 = async () => {
        try {
            setDivsContent([]);
            const urls = await enviarPrompt(
                "POST",
                dataEditar,
                token,
                "/modi-prompt"
            );
            generarDivs(urls);
            setInputId("");
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    //recuperar imagen de producto en concreto. Perguntar a jordi por método
    const recuperarImatge = async () => {
        try {
            setDivsContent([]);
            const urls = await enviarPrompt(
                "POST",
                dataEditar,
                token,
                "/db-image"
            );
            generarDivs(urls);
            setInputId("");
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    //Muestra la array de imagenes que le pasemos.
    const mostrarImagenes = (imagen) => {
        return (
            <div
                id="imatgeGenerada"
                className="size-60 relative rounded-md p-2 grid place-content-center "
            >
                <button
                    onClick={() => guardarImatge(imagen.id, imagen.url)}
                    className="absolute -top-0.5 right-0 mr-2 hover:scale-110 "
                >
                    <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 1024 1024"
                        class="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke="#CCCCCC"
                            stroke-width="61.44"
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
            <Toaster />

            <div
                id="generació_imatge"
                className={mostrarDiv == 1 ? "" : "hidden"}
            >
                <div className="grid grid-cols-1 place-items-center">
                    <a href="daisy">
                        <button className="btn btn-ghost">
                            Generar otro prompt
                        </button>
                    </a>
                    <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 24.00 24.00"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                        stroke-width="0.00024000000000000003"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.78799 3H14.212C15.0305 2.99999 15.7061 2.99998 16.2561 3.04565C16.8274 3.0931 17.3523 3.19496 17.8439 3.45035C18.5745 3.82985 19.1702 4.42553 19.5497 5.1561C19.805 5.64774 19.9069 6.17258 19.9544 6.74393C20 7.29393 20 7.96946 20 8.78798V17.6227C20 18.5855 20 19.3755 19.9473 19.9759C19.8975 20.5418 19.7878 21.2088 19.348 21.6916C18.8075 22.2847 18.0153 22.5824 17.218 22.4919C16.5691 22.4182 16.0473 21.9884 15.6372 21.5953C15.2022 21.1783 14.6819 20.5837 14.0479 19.8591L13.6707 19.428C13.2362 18.9314 12.9521 18.6081 12.7167 18.3821C12.4887 18.1631 12.3806 18.1107 12.3262 18.0919C12.1148 18.019 11.8852 18.019 11.6738 18.0919C11.6194 18.1107 11.5113 18.1631 11.2833 18.3821C11.0479 18.6081 10.7638 18.9314 10.3293 19.428L9.95209 19.8591C9.31809 20.5837 8.79784 21.1782 8.36276 21.5953C7.95272 21.9884 7.43089 22.4182 6.78196 22.4919C5.9847 22.5824 5.19246 22.2847 4.65205 21.6916C4.21218 21.2088 4.10248 20.5418 4.05275 19.9759C3.99997 19.3755 3.99998 18.5855 4 17.6227V8.78799C3.99999 7.96947 3.99998 7.29393 4.04565 6.74393C4.0931 6.17258 4.19496 5.64774 4.45035 5.1561C4.82985 4.42553 5.42553 3.82985 6.1561 3.45035C6.64774 3.19496 7.17258 3.0931 7.74393 3.04565C8.29393 2.99998 8.96947 2.99999 9.78799 3ZM7.90945 5.03879C7.46401 5.07578 7.23663 5.1428 7.07805 5.22517C6.71277 5.41493 6.41493 5.71277 6.22517 6.07805C6.1428 6.23663 6.07578 6.46401 6.03879 6.90945C6.0008 7.36686 6 7.95898 6 8.83V17.5726C6 18.5978 6.00094 19.2988 6.04506 19.8008C6.08138 20.2139 6.13928 20.3436 6.14447 20.3594C6.2472 20.4633 6.39033 20.5171 6.53606 20.5065C6.55034 20.4981 6.67936 20.4386 6.97871 20.1516C7.34245 19.8029 7.80478 19.2759 8.4799 18.5044L8.85192 18.0792C9.25094 17.6232 9.59229 17.233 9.89819 16.9393C10.2186 16.6317 10.5732 16.3559 11.0214 16.2013C11.6555 15.9825 12.3445 15.9825 12.9786 16.2013C13.4268 16.3559 13.7814 16.6317 14.1018 16.9393C14.4077 17.233 14.7491 17.6232 15.1481 18.0792L15.5201 18.5044C16.1952 19.2759 16.6576 19.8029 17.0213 20.1516C17.3206 20.4386 17.4497 20.4981 17.4639 20.5065C17.6097 20.5171 17.7528 20.4633 17.8555 20.3594C17.8607 20.3436 17.9186 20.2139 17.9549 19.8008C17.9991 19.2988 18 18.5978 18 17.5726V8.83C18 7.95898 17.9992 7.36686 17.9612 6.90945C17.9242 6.46401 17.8572 6.23663 17.7748 6.07805C17.5851 5.71277 17.2872 5.41493 16.9219 5.22517C16.7634 5.1428 16.536 5.07578 16.0905 5.03879C15.6331 5.0008 15.041 5 14.17 5H9.83C8.95898 5 8.36686 5.0008 7.90945 5.03879Z"
                                fill="#0F1729"
                            ></path>{" "}
                        </g>
                    </svg>
                </div>
                <div className="grid grid-cols-1 place-items-center">
                    <ul className="steps">
                        <li className="step step-primary">Elige tu soporte</li>
                        <li className="step step-primary">Crea tu imagen</li>
                        <li className="step">Continua con tu compra</li>
                    </ul>
                </div>

                {divsContent.length > 0 && divsContent ? (
                    <div
                        id="real"
                        className="grid grid-cols-3 place-items-center mx-32"
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

                <div className="flex justify-center my-3 gap-4">
                    {/* <form className="flex gap-2"> */}
                    <input
                        type="text"
                        placeholder="Modifica la imagen seleccionada"
                        className="input input-bordered w-full max-w-xl"
                        // value={inputValue}
                        // onChange={handleInputChange}
                    />
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
                    {params.idVariant ? (
                        <a>{params.idVariant}</a>
                    ) : (
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png"
                            className="w-20 h-auto"
                        ></img>
                    )}
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
        <MostrarImagen />
    );
}
