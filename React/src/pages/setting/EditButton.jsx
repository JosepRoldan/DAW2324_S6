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

const EditButton = (props) => {
  const { t } = useTranslation();
  const id = props.data.id;

  const handleSaveClick = async () => {
    // Aquí debes obtener los datos que deseas enviar a la API
    const dataToSend = {
      config: props.data.config,
      value: props.data.value,
    };

    // Mostrar una ventana de confirmación
    const userConfirmed = window.confirm('¿Estás seguro de que deseas guardar los cambios?');

    if (!userConfirmed) {
      return; // No guardar si el usuario no confirmó
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/settings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Datos guardados correctamente');
        window.location.reload();
      } else {
        alert('Error al guardar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud');
    }
  };

  return (
    <span >
      <button onClick={handleSaveClick}>
        {t("Save")}
      </button>
    </span>
  );
};

export default EditButton;
