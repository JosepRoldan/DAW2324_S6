import AppLayout from '../../layout/AppLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
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

const steps = [
  { name: 'Customers', href: '/customers', current: false },
  { name: 'Edit Customer', href: '/customers/create', current: true },
]

const token = localStorage.getItem('token');

/**
 * Edit customer information and handle deletion.
 *
 * @param {object} e - The event object.
 * @return {JSX.Element} The JSX element representing the customer edit form.
 */
export const CustomersEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);


  const customer = state?.customer;

  const [formData, setFormData] = useState({
    name: customer.name || '',
    surname: customer.surname || '',
    username: customer.username || '',
    newPassword: '',
    newPasswordConfirm: '',
    mail: customer.mail || '',
    phone: customer.phone || '',
    address: customer.address || '',
    city: customer.city || '',
    postcode: customer.postcode || '',
    // country: customer,
    status: customer.customerStatus,
    is_validated: customer.is_validated,
  });

  /**
   * Updates the form data based on the input change event.
   *
   * @param {object} e - The input change event object.
   * @return {void} This function does not return a value.
   */
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }


  /**
   * Submit form data asynchronously.
   *
   * @param {Event} e - The event object
   * @return {Promise<void>} Promise that resolves after form submission
   */


  const onSubmit = async (e) => {
    e.preventDefault();
    const validationPassed = validations(); // Ejecuta las validaciones
    if (validationPassed) {
      showModal(); // Abre el modal solo si las validaciones pasan
    }
  };

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

    // if (formData.city.trim() === '') {
    //   newErrors.city = t("Please enter a city.");
    // }

    // if (formData.address.trim() === '') {
    //   newErrors.address = t("Please enter an address.");
    // }

    // const postcodeRegex = /^[0-9]+$/;
    // if (!postcodeRegex.test(formData.postcode)) {
    //   newErrors.postcode = t("Please enter a numeric Post Code.");
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      newErrors.mail = t("Please enter a valid email.");
    }

    // const phoneRegex = /^[0-9]{7,15}$/;
    // if (!phoneRegex.test(formData.phone)) {
    //   newErrors.phone = t("Please enter a valid phone number (7-15 digits).");
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };

    axios.put(`${import.meta.env.VITE_API_URL}/customers/${customer.id}`, formData, { headers })
      .then(response => {
        const { data } = response;
        alert('Customer updated successfully!');
        navigate(`/customers/${data.id}`, { state: { customer: response.data.data } });
      })
      .catch(error => console.error('Error:', error));
  };




  /**
   * Deletes a customer using axios delete request.
   *
   */
  // const onDelete = () => {
  //   axios.delete(`${import.meta.env.VITE_API_URL}/customers/${customer.id}`)
  //     .then(() => {
  //       alert('Customer deleted successfully!');
  //       navigate('/customers');
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       alert('There was an error deleting the customer.');
  //     });
  // };



  return (

    <AppLayout Page={'Edit Customer'} Steps={steps}>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-xl rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t("Confirm Deletion")}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {t("Are you sure you want to update this customer? This action cannot be undone.")}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={hideModal}
              >
                {t("Cancel")}
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => { handleUpdate(); hideModal(); }}
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
      )}

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

                    <div className="sm:col-span-2">
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


                    {/* <div className="sm:col-span-3 sm:col-start-1">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Password")}
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          id="password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-3">
                      <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Confirm Password")}
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="passwordConfirm"
                          value={formData.newPasswordConfirm}
                          onChange={handleChange}
                          id="passwordConfirm"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div> */}
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
                          checked={formData.is_validated == true}
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
                          checked={formData.is_validated == false}
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

          <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
            {/* Botón a la izquierda */}
            {/* <button type="button" onClick={showModal}
              className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

              {t("Delete Customer")}
            </button> */}

            {/* Contenedor para los botones de la derecha */}
            <div></div>
            <div className="flex justify-end">
              <button type="button" onClick={() => navigate(-1)}
                className="bg-slate-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                {t("Cancel")}
              </button>

              <button type="submit" onClick={onSubmit}
                className="ml-4 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                {t("Update")}
              </button>
            </div>
          </div>


        </form>
      </div>
    </ AppLayout >
  );

};
