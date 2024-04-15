import { useState } from 'react';

export function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, toast) => {
    e.preventDefault();
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      
      const response = await fetch('/sign_up', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(formData)
      });
      if (response.status === 401) {
          toast.error("El nombre de usuario o correo electrónico ya están en uso o hay campos sin rellenar.");
      } else if (response.status === 200) {
          toast.success("Se ha registrado correctamente!");
          setTimeout(function() {
              window.location.href = 'Inicio';
          }, 2000); // 2000 milisegundos = 2 segundos
      }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  };

  return { formData, handleChange, handleSubmit };
}
