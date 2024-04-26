import axios from "axios";
import { useState } from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const URI = 'https://project-secure-development-back.onrender.com/blogs/'


const CompCreateBlog = () => {
  const { user } = useAuth();
    const [title,setTitle]= useState('')
    const [ingredient, setIngredient]= useState('')
    const [content,setContent]= useState('')
    const [image, setImage] = useState(null);

    const navigate = useNavigate()


    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };

      
        const store = async (e) => {
            e.preventDefault();
          
            const formData = new FormData();
            formData.append('title', title);
            formData.append('ingredient', ingredient);
            formData.append('content', content);
            formData.append('image_url', image);
          
            try {
              await axios.post(URI, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              navigate('/');
            } catch (error) {
              console.error('Error al crear el post:', error);
            }
          };

          if (!user) {
            return <Navigate to="/login" />; // Redirige a la página de inicio de sesión si el usuario no está autenticado
        }

          
    return (
      <>
       <h3 className="mt-4">
            Crear post
              </h3>
        <div className= "container d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
            
            <form onSubmit={store}>
            <div className= 'mb-3'>
                <label className ='form-label'>Título</label>
                <input value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        type="text"
                        className='form-control'
                />
            </div>

            <div className="mb-3">
                    <label className="form-label">Ingredient</label>
                    <textarea
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                

            <div className= 'mb-3'>
                <label className ='form-label'>Contenido</label>
                <textarea value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        type="text"
                        className='form-control'
                />
                </div>
                <div className="mb-3">
                <label htmlFor="image" className="form-label">Imagen</label>
                <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
              </div>

            <button type='submit' className='btn btn-primary'>Store</button>
            </form>
        </div>
        </>
    )
   
}

export default CompCreateBlog


