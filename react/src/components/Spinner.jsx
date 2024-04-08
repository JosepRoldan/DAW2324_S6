import React from 'react';

export const Spinner = ({ message = 'Loading...'}) => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center"> {/* Asegura el centrado del spinner y el texto */}
      <div
        className="inline-block h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        ></span>
      </div>
      <p className="mt-4 text-xl">{ message }</p> {/* Añade texto debajo del spinner */}
    </div>
  );
}

export default Spinner;
