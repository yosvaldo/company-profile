import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Teams } from './pages/Teams';
import { BlogList } from './pages/BlogList';
import { CreateBlog } from './pages/CreateBlog';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#061121]">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/create-blog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}