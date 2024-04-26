import React from 'react';

function EnlaceConParametros({ ruta, parametros, texto , disabled}) {
  const generarURL = () => {
    // Convierte los parámetros en una cadena de consulta
    const queryParams = new URLSearchParams(parametros).toString();
    // Combina la ruta base con la cadena de consulta
    const url = `${ruta}${queryParams ? `?${queryParams}` : ''}`;
    return url;
  };

  const handleButtonClick = () => {
    const url = generarURL();
    // Redirige a la URL cuando se hace clic en el botón
    window.location.href = url;

};


  return (
    <button className={`btn ${disabled == "disabled" ? 'btn-disabled' : ''}`} onClick={handleButtonClick}>{texto}</button>
  );
}

export default EnlaceConParametros;
