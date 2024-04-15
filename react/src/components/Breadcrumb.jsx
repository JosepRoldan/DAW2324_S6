import React from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export const Breadcrumb = ({ steps = [] }) => {
  const navigate = useNavigate();  // Obtén la función navigate del hook useNavigate

  // Función para manejar clics que realizará la navegación
  const handleNavigation = (path) => {
    navigate(path);  // Navega a la ruta especificada
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            {/* Utiliza onClick en lugar de href para manejar la navegación */}
            <button onClick={() => handleNavigation('/dashboard')} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </li>
        {steps.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {/* Cambia <a> por otro <button> o un elemento clicable para la navegación */}
              <button
                onClick={() => handleNavigation(page.href)}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
