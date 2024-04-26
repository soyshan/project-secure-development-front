import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const URI = 'https://project-secure-development-back.onrender.com/blogs/';

const CompEditBlog = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Verifica si el usuario está autenticado antes de cargar los datos del blog
        if (!user) {
            // Si el usuario no está autenticado, redirige a la página de inicio de sesión
            navigate('/login');
        } else {
            const getBlogById = async () => {
                try {
                    const res = await axios.get(`${URI}/${id}`);
                    setTitle(res.data.title);
                    setIngredient(res.data.ingredient);
                    setContent(res.data.content);
                    setImage(res.data.image_url);
                } catch (error) {
                    console.error('Error al obtener el blog:', error);
                }
            };
    
            getBlogById(); 
        }
    }, [id, user, navigate]);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    };


    const update = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredient', ingredient);
        formData.append('content', content);
        formData.append('image_url', image);
    
        console.log('Datos a enviar:', formData); // 
    
        try {
            await axios.put(`${URI}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el post:', error);
        }
    };
    

  
    return (
        <>
        <h3 className= "mt-4">Editar receta </h3>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
           
            <form onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ingredientes</label>
                    <textarea
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Pasos a seguir</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
        </>
    );
};

export default CompEditBlog;
