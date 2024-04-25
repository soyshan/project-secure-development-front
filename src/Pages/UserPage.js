import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import './UserPage.css';
axios.defaults.withCredentials = true;

const URI = 'https://project-secure-development-back.onrender.com/users/users';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getUsers = useCallback(async () => {
        try {
            const res = await axios.get(`${URI}?page=${currentPage}`);
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [currentPage]);

    useEffect(() => {
        getUsers();
    }, [getUsers, currentPage]);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${URI}/${userId}`);
            getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
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

    return (
        <div className='container-user'>
            <h1>User List</h1>
            <table className='table'>
                <thead className='table-primary'>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => deleteUser(user._id)} className='btn btn-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <button onClick={prevPage} className="btn btn-primary" disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} </span>
                <button onClick={nextPage} className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default UserPage;
