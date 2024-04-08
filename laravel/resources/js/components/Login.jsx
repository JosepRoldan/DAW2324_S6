import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { TEInput, TERipple } from "tw-elements-react";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Toaster, toast } from 'sonner';


export default function Login() {
    const handleRedirect = () => {
        window.location.href = '/sign_up';
      };
  
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-TOKEN': csrfToken
              },
              body: JSON.stringify(formData)
          });
            if (response.status === 401) {
                toast.error("El correo electrónico o la contraseña son incorrectos.");
            }else if (response.status === 200) {
                toast.success("¡Inicio de sesión exitoso!");
                setTimeout(function() {
                    window.location.href = 'Inicio';
                }, 2000); // 2000 milisegundos = 2 segundos
            }else if (response.status === 404) {
                toast.error("¡Introduce los datos de inicio!");
            }
       
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
  };
  

    return (
    <>
        <Toaster richColors position="top-center"  />
            <section className="h-full bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-10">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-48"
                                                    src="/img/logocompleto.png"
                                                    alt="CustomAIze_Logo"
                                                />
                                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                    We are CustomAIze
                                                </h4>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                <p className="mb-4">Por favor, inicia sesión</p>
                                                <TEInput
                                                    type="email"
                                                    name="mail"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    label="Correo Electrónico"
                                                    className="mb-4 text-black"
                                                ></TEInput>
                                                <TEInput
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    label="Contraseña"
                                                    className="mb-4"
                                                ></TEInput>

                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <TERipple className="w-full">
                                                        <button
                                                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                            type="submit"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                            }}
                                                        >
                                                            Iniciar sesión
                                                        </button>
                                                    </TERipple>

                                                    <a href="#!">Términos y condiciones</a><br></br>
                                                    <a href="forgot">Recuperar contraseña</a>
                                                </div>

                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">¿No tienes una cuenta?</p>
                                                    <TERipple rippleColor="light">
                                                        <button
                                                            onClick={handleRedirect}
                                                            type="button"
                                                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                        >
                                                            Registrate
                                                        </button>
                                                    </TERipple>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                        style={{
                                            background:
                                                "linear-gradient(to right, #512a8b, #7646b7, #9f6fc4, #c49ee3, #add8e6)",
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
    );
}

if (document.getElementById('login')) {
    createRoot(document.getElementById('login')).render(<Login />)
}
