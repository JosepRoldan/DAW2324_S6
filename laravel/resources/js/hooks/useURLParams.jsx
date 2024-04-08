import { useEffect, useState } from 'react';

function useURLParams() {
  const [params, setParams] = useState({});

  useEffect(() => {
    // Función para obtener los parámetros de la URL
    const getURLParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paramsObject = {};
      // Iterar sobre los parámetros de la URL y construir un objeto
      for (const [key, value] of urlParams.entries()) {
        paramsObject[key] = value;
      }
      return paramsObject;
    };

    // Obtener los parámetros de la URL al montar el componente
    const urlParams = getURLParams();
    setParams(urlParams);

    // Función para actualizar los parámetros cuando la URL cambie
    const handleURLChange = () => {
      const updatedURLParams = getURLParams();
      setParams(updatedURLParams);
    };

    // Escuchar los cambios en la URL
    window.addEventListener('popstate', handleURLChange);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('popstate', handleURLChange);
    };
  }, []);

  return params;
}

export default useURLParams;
