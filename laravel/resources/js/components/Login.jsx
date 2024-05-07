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
                toast.error("Usuario o contraseña incorrectos.");
            }else if (response.status === 200) {
                toast.success("Se ha registrado correctamente!");
                setTimeout(function() {
                    window.location.href = 'Inicio';
                }, 2000); // 2000 milisegundos = 2 segundos
            }
       
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
  };
  

    return (
    <>
        <Toaster richColors position="top-center"  />
            <section className="h-full bg-neutral-200">
                <div className="container h-full">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-lg">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="ml-72 p-12 -mr-72">
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
                                                    name="mail"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    label="Correo Electrónico"
                                                    style={{ color: "black" }}
                                                    className="mb-4 text-black"
                                                ></TEInput>
                                                <TEInput
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    label="Contraseña"
                                                    className="mb-4"
                                                    style={{ color: "black" }}
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

                                                    <a href="termsandconditions">Términos y condiciones</a><br></br>
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
