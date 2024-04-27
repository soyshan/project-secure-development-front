import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const URI = 'http://localhost:8000/blogs';

const CompShowRecetas = () => {
    const { user } = useAuth();
    const [recetas, setRecetas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getRecetas = useCallback(async () => {
        try {
            const res = await axios.get(`${URI}?page=${currentPage}`);
            setRecetas(res.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }, [currentPage]);

    useEffect(() => {
        getRecetas();
    }, [getRecetas]);

    const deleteReceta = async (id) => {
        try {
            await axios.delete(`${URI}${id}`);
            getRecetas();
        } catch (error) {
            console.error('Error deleting receta:', error);
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (!user) {
        return <Navigate to="/login" />; // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to='/create' className='btn btn-primary mt-2 mb-2'>
                        <i className='fa-solid fa-plus'></i>
                    </Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Title</th>
                                <th>Ingredient</th>
                                <th>Content</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recetas.map((receta) => (
                                <tr key={receta._id}>
                                    <td>{receta.title}</td>
                                    <td>{receta.ingredient}</td>
                                    <td>{receta.content}</td>
                                    <td>
                                        <img src={`http://localhost:8000/${receta.image_url}`} alt="receta" style={{ maxWidth: "100px", maxHeight: "100px" }}  />
                                    </td>
                                    <td>
                                        <Link to={`/edit/${receta._id}`} className="btn btn-info">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button onClick={() => deleteReceta(receta._id)} className='btn btn-danger'>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={prevPage} className="btn btn-primary" disabled={currentPage === 1}>Anterior</button>
                        <span> Página {currentPage} </span>
                        <button onClick={nextPage} className="btn btn-primary">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompShowRecetas;


