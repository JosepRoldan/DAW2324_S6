import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';

const token = localStorage.getItem('token');


export const UsersCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setPage, setSteps } = usePage();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    user: '',
    email: '',
    password: '',
    idRole: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    surname: '',
    user: '',
    email: '',
    password: '',
    idRole: ''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field and set the appropriate error message.
    const errorMessage = validateField(name, value);
    setErrorMessages({ ...errorMessages, [name]: errorMessage });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Field validation required
    if (!formData.name || !formData.surname || !formData.user || !formData.email || !formData.password) {
      setErrorMessages({
        name: !formData.name ? t('The name is mandatory') : '',
        surname: !formData.surname ? t('The surname is mandatory') : '',
        user: !formData.user ? t('Username is mandatory') : '',
        email: !formData.email ? t('Email is mandatory') : '',
        password: !formData.password ? t('Password is mandatory') : ''
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessages({ ...errorMessages, email: t('Invalid e-mail format.') });
      return;
    }

    // Validation of minimum password length
    if (formData.password.length < 6) {
      setErrorMessages({ ...errorMessages, password: t('The password must be at least 6 characters long.') });
      return;
    }

    // Validation to avoid malicious scripts or SQL injections
    const isSafeInput = (input) => {
      const regex = /[<>;'"&]/;
      return !regex.test(input);
    }

    if (!isSafeInput(formData.name) || !isSafeInput(formData.surname) || !isSafeInput(formData.user) || !isSafeInput(formData.email) || !isSafeInput(formData.password)) {
      setErrorMessages({ ...errorMessages, general: t('Fields contain characters that are not allowed.')});
      return;
    }


    const url = `${import.meta.env.VITE_API_URL}/createUser`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/users');
      } else {
        console.error('Error al registrar');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }

  }

  useEffect(() => {
    setPage(t("Users"));
    setSteps([{ name: t('Users'), href: '/users' }, { name: t("Create User"), href: '/users/create', current: true }]);

  }, [setPage, setSteps, navigate]);

  return (

    <>
      <div className="pb-16 space-y-10 divide-y divide-gray-900/10">
        <form>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{t("Personal Information")}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{t("Provide users personal information.")}</p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Name")}
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
                      {errorMessages.name && <div className="text-red-600 text-sm mt-1">{errorMessages.name}</div>}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Surname")}
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
                      {errorMessages.surname && <div className="text-red-600 text-sm mt-1">{errorMessages.surname}</div>}

                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Email")}
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errorMessages.email && <div className="text-red-600 text-sm mt-1">{errorMessages.email}</div>}

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
                {t("Set the user's account information.")}
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="max-w-2xl space-y-10">
                  <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  <div className="sm:col-span-4">
                      <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("Role")}
                      </label>
                      <div className="mt-2">
                        <select                          id="idRole"
                          name="idRole"
                          value={formData.idRole}
                          onChange={handleChange}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">Selecciona un rol</option>
                          <option value="1">Administrador</option>
                          <option value="2">Manager Account</option>
                          <option value="3">Customer Support</option>
                        </select>
                        {errorMessages.idRole && <div className="text-red-600 text-sm mt-1">{errorMessages.idRole}</div>}

                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Username")}
                      </label>
                      <div className="mt-2">
                        <input
                          id="user"
                          name="user"
                          value={formData.user}
                          onChange={handleChange}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errorMessages.user && <div className="text-red-600 text-sm mt-1">{errorMessages.user}</div>}

                      </div>
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
                        {errorMessages.password && <div className="text-red-600 text-sm mt-1">{errorMessages.password}</div>}

                      </div>
                    </div>


                  </div>


                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 text-right sm:px-6">
            <button type="button" onClick={() => navigate('/users')}
              class="inline-block bg-gray-700 hover:bg-gray-900 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
            >
              {t("Cancel")}
            </button>

            <button type="submit" onClick={onSubmit}
              class="inline-block bg-blue-900 hover:bg-blue-800 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
            >
              {t("Create")}
            </button>
          </div>
        </form>
      </div>
    </ >
  )
}

export default UsersCreate;