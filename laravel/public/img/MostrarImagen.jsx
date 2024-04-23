// src/components/TailwindComponent.jsx
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

function MostrarImagen() {
    const [mostrarDiv, setMostrarDiv] = useState(false);
    // const [data, setData] = useState([]);
    // const [currentDiv, setCurrentDiv] = useState(0);
    const [divsContent, setDivsContent] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputImg, setInputImg] = useState('');

    const enviarPrompt = async () => {
        try {
            const requestOptions = {
                method: 'POST', // o 'GET', 'PUT', 'DELETE', etc., según lo que necesites
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'my_api_key'
                },
                body: JSON.stringify({
                    prompt: inputValue// Aquí puedes especificar el cuerpo de tu solicitud en formato JSON
                    // Puedes personalizar el cuerpo según tus necesidades
                })
            };
            const response = await fetch('http://localhost:8003/generateImagesFake', requestOptions);

            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const jsonData = await response.json();
            // setData(jsonData);
            generarDivs(jsonData);
            console.log('Datos recibidos enviarPrompt:', jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //Pasaremos el nombre de usuariio para crear la imagen
    const modificarImg = async () => {
        try {
            const requestOptions = {
                method: 'POST', // o 'GET', 'PUT', 'DELETE', etc., según lo que necesites
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'my_api_key'
                },
                body: JSON.stringify({
                    prompt: inputImg,// Falta añadir campos de entrada
                    nombre_usuari : "Pere"
                })
            };
            const response = await fetch('http://localhost:8003/generateImagesFake', requestOptions);

            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const jsonData = await response.json();
            // setData(jsonData);
            generarDivs(jsonData);
            console.log('Datos recibidos modificarImg:', jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //Modificará la imagenseleccionada enviandola a la api
    const seleccionarImg = (img) => {
        setInputImg(img);
    
    };

    //Guarda la imagen a laa bd. Muestra una noti
    const guardarImatge = (pic) => {
        toast.success("La imatge " + pic + " ha sigut guardada");
    };

    const generarDivs = (datos) => {
        // Aquí generas los divs utilizando los datos recibidos
        const divsGenerados = datos.map((imagen, index) => (
                <div key={index} >{mostrarImagenes(imagen)}</div>
        ));
        // Actualizas el estado de divsContent con los divs generados
        setDivsContent(divsGenerados);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
    const handleButtonClick = () => {
        enviarPrompt();
    };

    //Muestra la array de imagenes que le pasemos.
    const mostrarImagenes = (imagen) => {
        return (
            <div
                id="imatgeGenerada"
                className="size-60 relative rounded-md p-2 grid place-content-center "
            >
                <button
                    onClick={() => guardarImatge(imagen)}
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
                    onClick={() => seleccionarImg(imagen)}
                    className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <img src={imagen}></img>
                </button>
            </div>
        );
    };
   
    // const divsContent = [
        
    //     <div className="inline-grid grid-cols-3 gap-4">{mostrarImagenes(imagenes1)}</div>,
    //     <div className="inline-grid grid-cols-3 gap-4">{mostrarImagenes(imagenes2)}</div>,
    //     <div className="inline-grid grid-cols-3 gap-4">{mostrarImagenes(imagenes3)}</div>,
    // ];


    // //Pasa de un div al siguiente
    // const showNextDiv = () => {
    //     setCurrentDiv((prevDiv) =>
    //         prevDiv < divsContent.length - 1 ? prevDiv + 1 : prevDiv
    //     );
    // };
    // //Pasa de un div al anterior
    // const showPreviousDiv = () => {
    //     setCurrentDiv((prevDiv) => (prevDiv > 0 ? prevDiv - 1 : prevDiv));
    // };


    return (
        <>
            <Toaster />
            <div
                id="generació_imatge"
                className={mostrarDiv ? "animate-fadeIn" : "hidden"}
            >
                <div className="flex justify-center">
                <a href="daisy"><button className="btn btn-ghost">Generar otro prompt</button></a>
                </div>
                {/* <div className="flex justify-between p-4">
                    <button
                        id="backwardbtn"
                        className="btn"
                        onClick={showPreviousDiv}
                        disabled={currentDiv === 0}
                    >
                        Atrás
                    </button>
                    <button
                        id="forwardbtn"
                        className="btn"
                        onClick={showNextDiv}
                        disabled={currentDiv === divsContent.length - 1}
                    >
                        Adelante
                    </button>
                </div> */}
               
                {divsContent.length > 0 && divsContent ? (
                    <div id="real" className="inline-grid grid-cols-3 gap-4">
                        {divsContent.map((content, index) => (
                            <div key={index}>
                                {content}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        No hay contenido para mostrar.
                    </div>
                )}

                {/* <div className="join join-vertical lg:join-horizontal my-3 flex justify-center gap-2">
                    <button className="btn join-item tooltip" data-tip="hello">
                        Triar imatge
                    </button>
                    <button className="btn join-item tooltip" data-tip="hello">
                        Editar imatge
                    </button>
                </div> */}

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
                        onClick={() => {modificarImg(inputImg);}}
                    >
                        Modificar imagen seleccionada
                    </button>
                    {/* </form> */}
                </div>
                <div className="w-full border-solid border-red rounded-md ">
                </div>
            </div>
            <div className={mostrarDiv ? "hidden" : "animate-fadeIn"}>
                <div className="flex justify-center my-3 gap-4">
                    {/* <form className="flex gap-2"> */}
                    <input
                        type="text"
                        placeholder="Añadir prompt"
                        className="input input-bordered w-full max-w-xl"
                        value={inputValue}
                        onChange={handleInputChange} 
                    />
                    <button
                        className="btn"
                        onClick={() => {
                            enviarPrompt();
                            setMostrarDiv(!mostrarDiv);
                            handleButtonClick();
                            
                        }}
                    >Introducir prompt
                    </button>
            
                </div>
            </div>
        </>
    );
}

export default MostrarImagen;

