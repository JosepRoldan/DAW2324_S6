import React from 'react';
import { useState } from 'react';

function ButtonFetchProductsAPI() {
    const [token, setToken] = useState('');

    const obtenerToken = async () => {
        const detallesUsuario = {
            username: 'alumne',
            password: '2b8af5289aa93fc62eae989b4dcc9725'
        };

        const formBody = Object.keys(detallesUsuario)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(detallesUsuario[key]))
            .join('&');

        try {
            const response = await fetch('http://localhost:8003/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });
            const data = await response.json();
            setToken(data.access_token); // Guardar el token para su uso posterior
            return data.access_token;
        } catch (error) {
            console.error('Error al obtener token:', error);
        }
    };

    const llamarAPIConToken = async () => {
        const token = await obtenerToken(); // Asegúrate de obtener el token primero
        if (!token) {
            console.error('No se pudo obtener el token');
            return;
        }

        fetch('http://localhost:8003/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error al llamar API:', error));
    };

    return (
        <div>
            <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={llamarAPIConToken}>
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span>Download</span>
            </button>
        </div>
    );
}

export default ButtonFetchProductsAPI;
