// import logo from './logo.svg';
import './App.css';
// App.js
// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CompShowBlogs from './components/blog/ShowBlog';
import CompCreateBlog from './components/blog/CreateBlog';
import CompEditBlog from './components/blog/EditBlog';
import CompShowBlogsAsCards from './components/RecipesCard/CompShowBlogAsCards';
import BlogDetailPage from './components/BlogUnico/BlogDetailPage';
import ContactForm from './components/ContactForm/ContactForm';
import Home from './components/Home/Home';
import Footer from './components/footer/footer';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showblogs" element={<CompShowBlogs />} />
          <Route path="/create" element={<CompCreateBlog />} />
          <Route path="/edit/:id" element={<CompEditBlog />} />
          <Route path="/recipes" element={<CompShowBlogsAsCards />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
