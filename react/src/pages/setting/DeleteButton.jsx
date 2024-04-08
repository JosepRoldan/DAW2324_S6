import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";

const resources = {
  eng: {
    translation: translationEN,
  },
  cat: {
    translation: translationCA,
  },
  esp: {
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "eng",
  fallbackLng: "eng",
  interpolation: {
    escapeValue: false,
  },
});

const DeleteButton = (props) => {
  const { t } = useTranslation();

  const id = props.data.id;

  const handleDeleteClick = async () => {
    // Mostrar una ventana de confirmación con el mensaje personalizado
    const userConfirmed = window.confirm(`¿Estás seguro de que deseas borrar "${props.data.config}"?`);

    if (!userConfirmed) {
      return; // No borrar si el usuario no confirmó
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/settings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Datos eliminados correctamente');
        window.location.reload();
      } else {
        alert('Error al eliminar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud');
    }
  };

  return (
    <span >
      <button onClick={handleDeleteClick}>
        {t("Delete")}
      </button>
    </span>
  );
};

export default DeleteButton;
