import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const SettingForm = () => {
  const { t } = useTranslation();
  const [serverErrors, setServerErrors] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  // Función para manejar la autenticación y almacenar el token
  const navigate = useNavigate();

  // Efecto para cargar el token automáticamente al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Submitting form with values:', values);
    try {
      const response = await axios.post('http://localhost:8000/api/settings', values, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.message) {
        console.log('Form submitted successfully');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setServerErrors(error.response.data.errors);
      } else {
        console.error('Error submitting the form:', error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-12 min-h-screen">
      <div className="w-full max-w-[700px]">
        <Formik
          initialValues={{
            config: '',
            value: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white p-8 rounded-md shadow-md">
            <h1 className="text-4xl font-bold mb-5">{t("Settings Add")}</h1>

            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                {t("Settings Name")}
              </label>
              <Field
                type="text"
                name="config"
                placeholder="Setting name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] focus:outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <ErrorMessage name="config" component="div" className="text-red-500" />
            </div>

            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
                {t("Value")}
              </label>
              <Field
                as="textarea"
                rows="4"
                name="value"
                placeholder="Setting value"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] focus:outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <ErrorMessage name="value" component="div" className="text-red-500" />
            </div>

            <div>
            <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-400 px-3 py-2 text-md font-semibold text-white shadow-sm
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-gray-900 mr-2"            >
                {t("Submit")}
            </button>
            <button type="button" onClick={() => navigate('/settings')}
              className="inline-flex justify-center rounded-md bg-indigo-400 px-3 py-2 text-md font-semibold text-white shadow-sm
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-gray-900"
            >
              {t("Cancel")}
            </button>
            </div>

            {serverErrors && (
              <div className="mt-5 text-red-500">
                {Object.values(serverErrors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SettingForm;

  

