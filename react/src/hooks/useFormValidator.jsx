import { useState } from 'react';

const useFormValidator = () => {
  const [errorMessages, setErrorMessages] = useState({});

  const validateForm = (formData) => {
    const newErrorMessages = {};

    // Field validation
    if (!formData.name || !formData.surname || !formData.user || !formData.email || !formData.password) {
      newErrorMessages.name = !formData.name ? 'The name is mandatory' : '';
      newErrorMessages.surname = !formData.surname ? 'The surname is mandatory' : '';
      newErrorMessages.user = !formData.user ? 'Username is mandatory' : '';
      newErrorMessages.email = !formData.email ? 'Email is mandatory' : '';
      newErrorMessages.password = !formData.password ? 'Password is mandatory' : '';
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrorMessages.email = 'Invalid e-mail format.';
    }

    // Validation of minimum password length
    if (formData.password && formData.password.length < 6) {
      newErrorMessages.password = 'The password must be at least 6 characters long.';
    }

    // Validation to avoid malicious scripts or SQL injections
    const isSafeInput = (input) => {
      const regex = /[<>;'"&@]/;
      return !regex.test(input);
    }

    if (!isSafeInput(formData.name) || !isSafeInput(formData.surname) || !isSafeInput(formData.user) || !isSafeInput(formData.email) || !isSafeInput(formData.password)) {
      newErrorMessages.general = 'Fields contain characters that are not allowed.';
    }

     // Determine if the form is valid
     const isValid = Object.values(newErrorMessages).every(message => message === '');


    setErrorMessages(newErrorMessages);

    // Return true if there are no errors, false otherwise
    return { errorMessages: newErrorMessages, isValid };  };

  return { errorMessages, validateForm };
};

export default useFormValidator;
