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
    const guardarImatge = async (idImg,imgUrl) => {
            toast.promise(enviarPrompt(
                "POST",
                { idImg: idImg, idUser: 1,imgUrl: imgUrl},
                token,
                "/save-img"
            ), {
                loading: 'Loading...',
                success: (data) => {
                    console.log(data)
                  return `La imagen se ha guardado correctamente.`;
                },
                error: 'Error',
                closeButton: true,
              });
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
                    onClick={() => guardarImatge(imagen.id,imagen.url)}
                    className="absolute top-0 right-0 mt-2 mr-2 hover:scale-110 "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
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
                    </div>
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
                            <li className="step step-primary">
                                Elige tu soporte
                            </li>
                            <li className="step">Crea tu imagen</li>
                            <li className="step">
                                Continua con tu compra
                            </li>
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
