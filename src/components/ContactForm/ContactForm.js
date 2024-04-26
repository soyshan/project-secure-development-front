import React, { useState } from 'react';
import './ContactFormStyle.css';
import axios from 'axios'; // Importa Axios para realizar la solicitud HTTP
import DOMPurify from 'dompurify';
 // Importar DOMPurify para sanitizar los datos del formulario

 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    campoOculto1: '',
    campoOculto2: ''
  });

  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitiza los campos del formulario antes de enviarlos al servidor
    const sanitizedFormData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      message: DOMPurify.sanitize(formData.message),
      campoOculto1: formData.campoOculto1,
      campoOculto2: formData.campoOculto2
    };

    // Validación de campos
    if (!sanitizedFormData.name.match(/^[a-zA-Z\s]+$/)) {
      setError('Por favor, introduce un nombre válido sin caracteres especiales.');
      return;
    }

    if (!sanitizedFormData.email.match(/^\S+@\S+\.\S+$/)) {
      setError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    }

    if (sanitizedFormData.message.length > 400) {
      setError('El mensaje no puede superar los 400 caracteres.');
      return;
    }

    if (sanitizedFormData.campoOculto1 || sanitizedFormData.campoOculto2) {
      setError('Error: Eres un bot 😒');
      setSubmitted(false); 
    } else {

    try {
      const response = await axios.post('https://project-secure-development-back.onrender.com/contact', sanitizedFormData); // Realiza la solicitud POST al backend
      console.log(response.data); // Puedes manejar la respuesta del servidor aquí
      setSubmitted(true);
      toast.success('¡Formulario enviado con éxito!');
    } catch (error) {
      setError('Hubo un error al enviar el formulario.'); // Manejo de errores
      setSubmitted(false);
    }
  }
  };

  return (
    <div className='confirmation'>
    <ToastContainer />
      {submitted && !error ? (
        <div>
          <h2>¡Gracias por tu mensaje!</h2>
          <p>Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <form className="container-form" onSubmit={handleSubmit}>
          <input  type="text" name="campoOculto1"  defaultValue={formData.campoOculto1} style={{ display: 'none' }} />
          <input  type="text" name="campoOculto2"  defaultValue={formData.campoOculto2} style={{ display: 'none' }} />
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength="100"
            />
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              maxLength="400"
            ></textarea>
          </div>
          <div>
            {error && <p className="error-message">{error}</p>}
            <button className="button-form" type="submit">Enviar</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
