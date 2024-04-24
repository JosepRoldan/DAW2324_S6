import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
const token = localStorage.getItem('token');
import { useTranslation } from "react-i18next";
import { usePage } from '../../contexts/PageContext';




export const UsersEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useLocation();
  //const showModal = () => setIsModalOpen(true);
  //const hideModal = () => setIsModalOpen(false);
  const { setPage, setSteps } = usePage();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isErrorModalOpen , setIsErrorModalOpen] = useState(false);
  const users = state?.users;

  const userId = users.id;

  const mapRoleIdToString = (roleId) => {
    switch (roleId) {
      case 1:
        return "Admin";
      case 2:
        return "Account Manager";
      case 3:
        return "Customer Support";
      default:
        throw new Error("Número de rol no válido");
    }
  };

  const [formData, setFormData] = useState({
    name: users.name || '',
    surname: users.surname || '',
    user: users.user || '',
    //newPasswordConfirm: '',
    email: users.email || '',
    idRole: users.idRole || ''
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    surname: '',
    user: '',
    email: '',
    password: '',
    general: ''
  });


  const validateForm = () => {
    const errors = {};
  
    if (!formData.name) {
      errors.name = t('Name is required');
    }
    if (!formData.surname) {
      errors.surname = t('Last name is required');
    }
    if (!formData.user) {
      errors.user = t('Username is mandatory');
    }
    if (!formData.email) {
      errors.email = t('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t('Invalid email format');
      }
    }
    /*if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
  */
    return errors;
  };

  const showModal = (modalType) => {
    if (modalType === 'delete') {
      setIsDeleteModalOpen(true);
    } else if (modalType === 'update') {
      setIsUpdateModalOpen(true);
    } else if (modalType === 'error') {
      setIsErrorModalOpen(true);

    }
  };

  const hideModal = (modalType) => {
    if (modalType === 'delete') {
      setIsDeleteModalOpen(false);
    } else if (modalType === 'update') {
      setIsUpdateModalOpen(false);
    } else if (modalType === 'error') {
      setIsErrorModalOpen(false);

    }
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate the field and set the appropriate error message.
    const errorMessage = validateField(name, value);
    setErrorMessages({ ...errorMessages, [name]: errorMessage });

  }

  const validateField = (name, value) => {
    const specialCharactersRegex = /[<>;'"&]/;
    if (specialCharactersRegex.test(value)) {
      return t('No special characters are allowed in this field.');
    }
    return '';
  };

  const onSubmit = async (userId) => {
    //e.preventDefault();

    const fieldErrors = validateForm();

    // Check if there are any field errors
  if (Object.keys(fieldErrors).length > 0) {
    setErrorMessages({ ...fieldErrors });
    return;
  }

  // Check for special characters in each field
  const isSafeInput = (input) => {
    const regex = /[<>;'"&]/;
    return !regex.test(input);
  };
  
  if (!isSafeInput(formData.name) || !isSafeInput(formData.surname) || !isSafeInput(formData.user) || !isSafeInput(formData.email) || !isSafeInput(formData.password)) {
    setErrorMessages({ general: 'Los campos contienen caracteres no permitidos.' });
    return;
  }

    try {
      console.log("entro al try")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) { 
        navigate('/users');
      } else {
        // Manejo de errores en caso de que la respuesta no sea exitosa
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      // Manejo de errores en caso de que ocurra un error durante la solicitud
      console.error('Error:', error);
    }
  }


  const onDelete = async (userId) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      });

      if (response.ok) {
        navigate('/users');
      } else {
        console.error('There was an error deleting the user:', error);
      }
    } catch (error) {
      console.error('There was an error deleting the user:', error);
    }
  };

  useEffect(() => {
    setPage(t("Users"));
    setSteps([{ name: t('Users'), href: '/users' }, { name: t("Edit User"), href: '/users/create', current: true }]);
}, [setPage, setSteps, navigate]);

  return (

    <>
    {isErrorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-xl rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t("Ups, you have a mistake in the form")}
            </h3>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={() => hideModal('error')}              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-xl rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t("Confirm Deletion")}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {t("Are you sure you want to delete this user? This action cannot be undone.")}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={() => hideModal('delete')}              >
                {t("Cancel")}
              </button>
              <button
                type="button"
                className="inAppLayout Page={'Edit User'} Steps={steps}line-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={() => { onDelete(userId); }}
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-xl rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t("Confirm Update")}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
              {t("Are you sure you want to update this user?")} 
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={() => hideModal('update')}              >
                {t("Cancel")}
              </button>
              <button
                type="button"
                className="inAppLayout Page={'Edit User'} Steps={steps}line-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => { onSubmit(userId); }}
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
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                          errorMessages.name ? 'border-red-500' : ''
                        }`}                      />
                      {errorMessages.name && (<span className="text-sm text-red-500">{errorMessages.name}</span>)}                      
                    </div>
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
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                          errorMessages.surname ? 'border-red-500' : ''
                        }`}
                      />
                      {errorMessages.surname && (
                        <span className="text-sm text-red-500">{errorMessages.surname}</span>
                      )}
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
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                          errorMessages.email ? 'border-red-500' : ''
                        }`}
                      />
                      {errorMessages.email && (
                        <span className="text-sm text-red-500">{errorMessages.email}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{t("User's information")}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {t("Set the user's account information.")}
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-grayPeluche-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="max-w-2xl space-y-10">
                  <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    
                  <div className="sm:col-span-4">
                      <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("Role")}
                      </label>
                      <div className="mt-2">
                        <select
                          id="idRole"
                          name="idRole"
                          value={formData.idRole}
                          onChange={handleChange}
                          type="text"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
    errorMessages.user ? 'border-red-500' : ''
  }`}
>  
                          <option value="">Selecciona un rol</option>
                          <option value="1">Admin</option>
                          <option value="2">Account</option>
                          <option value="3">Customer</option>
                          </select>
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
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
    errorMessages.user ? 'border-red-500' : ''
  }`}
/>
{errorMessages.user && (
  <span className="text-sm text-red-500">{t(errorMessages.user)}</span>
)}
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
                          value={formData.newPassword}
                          onChange={handleChange}
                          id="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
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
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
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
            <button type="button" onClick={() => showModal('delete')}
              className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

              {t("Delete User")}
            </button>

            {/* Contenedor para los botones de la derecha */}
            <div className="flex justify-end">
              <button type="button" onClick={() => navigate(-1)}
                className="inline-flex justify-center rounded-md bg-indigo-400 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                {t("Cancel")}
              </button>
    
              <button type="button" onClick={() => {
                    const fieldErrors = validateForm();
                    if (Object.keys(fieldErrors).length === 0) {
                      showModal('update');
                    } else {
                      // Mostrar modal de error
                      showModal('error');
                    }
                  }}
                  className="inline-flex justify-center rounded-md ml-2 bg-teal-400 px-3 py-2 text-md font-semibold text-blue-900 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
              {t("Update")}
              </button>
              
            </div>
          </div>


        </form>
      </div>
    </>
  )
}

export default UsersEdit;
