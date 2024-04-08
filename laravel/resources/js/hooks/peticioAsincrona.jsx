import { useState } from "react";

function usePeticionAsincrona() {
  const [errorFetch, setErrorFetch] = useState(null);
  const links = ["imatge1", "imatge2", "imatge3"];

  const enviarPrompt = async (tipoPeticion, dataObject, token, rute) => {
    try {
      const response = await fetch(rute, {
        method: tipoPeticion,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token
        },
        body: JSON.stringify(dataObject)
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jsonData = await response.json();
        console.log("Datos recibidos enviarPrompt:", jsonData);
        return jsonData;
      } else {
        return response
      }
    } catch (error) {
      setErrorFetch(error);
      throw error; // Asegurémonos de propagar el error para que pueda ser capturado externamente si es necesario
    }
  };

  return {
    enviarPrompt,
    errorFetch
  };
}

export default usePeticionAsincrona;
