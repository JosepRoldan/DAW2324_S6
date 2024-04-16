import AppLayout from '../../layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";
import { usePage } from '../../contexts/PageContext';

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

const token = localStorage.getItem('token');


/**
 * Create a new customer with the provided information.
 *
 * @param {object} e - The event object.
 * @return {void} Nothing is returned from this function.
 */
export const CustomersCreate = () => {

  const { setPage, setSteps } = usePage();

  useEffect(() => {
    setPage("Customers");
    setSteps([{ name: 'Customers', href: '/customers', current: true },
    { name: 'Create Customer', href: '/customers/create', current: true }
    ]);
  }, [setPage, setSteps]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    passwordConfirm: '',
    mail: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    // country: '',
    status: '',
    is_validated: false
  });

  const [errors, setErrors] = useState({});

  /**
   * Updates the form data with the new value of the input field.
   *
   * @param {Event} e - The event object representing the input change.
   * @return {void} This function does not return anything.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }


  const renderErrorForField = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <p key={fieldName} className="text-red-500 text-sm mt-1">
          {errors[fieldName]}
        </p>
      );
    }
    return null;
  };
  // Aquí comienza el código de validación
  const validations = () => {
    const newErrors = {};

    if (formData.name.trim() === '') {
      newErrors.name = t("Please enter a name.");
    }

    if (formData.surname.trim() === '') {
      newErrors.surname = t("Please enter a surname.");
    }

    if (formData.username.trim() === '') {
      newErrors.username = t("Please enter a username.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      newErrors.mail = t("Please enter a valid email.");
    }

    if (formData.newPassword.trim() !== '' && formData.newPassword.length < 6) {
      newErrors.password = t("Password must be at least 6 characters long.");
    }

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.newPasswordConfirm) {
      newErrors.passwordConfirm = t("Passwords must match");

    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  /**
   * A function that handles form submission asynchronously.
   *
   * @param {Event} e - the event object
   * @return {Promise} a Promise that resolves when submission is complete
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    const validationPassed = validations(); // Ejecuta las validaciones
    if (validationPassed) {
      const url = `${import.meta.env.VITE_API_URL}/customers/create`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };

      try {
        const response = await axios.post(url, formData, { headers });
        navigate('/customers');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        // Manejar el error aquí
      }
    }

  };



  return (

    <>
      <div className="pb-16 space-y-10 divide-y divide-gray-900/10">
        <form>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{t("Personal Information")}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{t("Provide customers personal information.")}</p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("First name")}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {renderErrorForField('name')}

                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Last name")}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="surname"
                        id="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {renderErrorForField('surname')}

                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="mail" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Email")}
                    </label>
                    <div className="mt-2">
                      <input
                        id="mail"
                        name="mail"
                        type="email"
                        value={formData.mail}
                        onChange={handleChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {renderErrorForField('mail')}

                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Phone")}
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="text"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Street address")}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("City")}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="postcode" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("ZIP / Postal code")}
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="postcode"
                        id="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{t("Account information")}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {t("Set the customer's account information.")}
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="max-w-2xl space-y-10">
                  <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Username")}
                      </label>
                      <div className="mt-2">
                        <input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {renderErrorForField('username')}

                    </div>


                    <div className="sm:col-span-3 sm:col-start-1">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Password")}
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          id="password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {renderErrorForField('password')}

                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Confirm Password")}
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="passwordConfirm"
                          value={formData.passwordConfirm}
                          onChange={handleChange}
                          id="passwordConfirm"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {renderErrorForField('passwordConfirm')}

                    </div>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">{t("Status")}</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {t("These is the customer's account status.")}
                    </p>
                    <div className="mt-2 flex gap-x-12">
                      <div className="flex items-center">
                        <input
                          name="status"
                          type="radio"
                          value="Active"
                          onChange={handleChange}
                          checked={formData.status === 'Active'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-everything" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                          {t("Active")}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          name="status"
                          type="radio"
                          value="Inactive"
                          onChange={handleChange}
                          checked={formData.status === 'Inactive'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-email" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                          {t("Inactive")}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          name="status"
                          type="radio"
                          value="Banned"
                          onChange={handleChange}
                          checked={formData.status === 'Banned'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-nothing" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                          {t("Banned")}
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          name="status"
                          type="radio"
                          value="Deleted"
                          onChange={handleChange}
                          checked={formData.status === 'Deleted'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-nothing" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                          {t("Deleted")}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">{t("Validated")}</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {t("These is the customer's account validation.")}
                    </p>
                    <div className="mt-2 flex gap-x-3">
                      <div className="flex items-center">
                        <input
                          name="is_validated"
                          value="1"
                          onChange={handleChange}
                          checked={formData.is_validated === '1'}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-everything" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                          {t("Yes")}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          name="is_validated"
                          value="0"
                          onChange={handleChange}
                          checked={formData.is_validated === '0'}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-email" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                          {t("No")}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 text-right sm:px-6">
            <button type="button" onClick={() => navigate('/customers')}
              className="bg-slate-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              {t("Cancel")}
            </button>

            <button type="submit" onClick={onSubmit}
              className="ml-4 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300">
              {t("Create")}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

