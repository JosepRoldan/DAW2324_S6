import { useState } from 'react';

export function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, toast) => {
    e.preventDefault();
    try {
      console.log("llega al paso 1");
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch('/sign_up', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(formData)
      });
      console.log("llega al paso 2");
      if (response.status === 401) {
          toast.error("El nombre de usuario o correo electrónico ya están en uso, o los campos están incompletos. Asegúrate de que el correo electrónico proporcionado sea válido y único");
      }if (response.status === 411) {
        toast.error("La contraseña debe tener un mínimo de 8 carácteres y carácteres especiales (!,@,#,$,%).");
      } else if (response.status === 200) {
          toast.success("Se ha registrado correctamente!");
          setTimeout(function() {
              window.location.href = 'verificacion';
          }, 2000); // 2000 milisegundos = 2 segundos
      }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  };

  return { formData, handleChange, handleSubmit };
}
