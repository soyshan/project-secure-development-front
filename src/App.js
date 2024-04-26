// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CompShowBlogs from './components/blog/ShowBlog';
import CompCreateBlog from './components/blog/CreateBlog';
import CompEditBlog from './components/blog/EditBlog';
import CompShowBlogsAsCards from './components/RecipesCard/CompShowBlogAsCards';
import BlogDetailPage from './components/BlogUnico/BlogDetailPage';
import ContactForm from './components/ContactForm/ContactForm';
import Home from './components/Home/Home';
import Footer from './components/footer/footer';
import LoginForm from './Pages/LoginForm';
import RegisterForm from './Pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProfilePage from './Pages/Profile';
import UserPage from './Pages/UserPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {user !== null ? (
              <>
                <PrivateRoute path="/showblogs" element={<CompShowBlogs />} />
                <PrivateRoute path="/create" element={<CompCreateBlog />} />
                <PrivateRoute path="/edit/:id" element={<CompEditBlog />} />
                <PrivateRoute path="/profile" element={<ProfilePage />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
            <Route path="/recipes" element={<CompShowBlogsAsCards />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/users" element={<UserPage />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
