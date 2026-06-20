import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Teams } from './pages/Teams';
import { BlogList } from './pages/BlogList';
import { CreateBlog } from './pages/CreateBlog';
import { Login } from './pages/Login';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => 
    `text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
      isActive(path) ? 'text-[#DFCE72] border-b-2 border-[#DFCE72] pb-1' : 'text-slate-300 hover:text-[#EEDF9D]'
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B1E36]/95 backdrop-blur-md border-b border-[#152C4A] px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold tracking-widest text-lg">
          <span className="text-[#DFCE72]">PHENEX</span> FISHING
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className={linkClass('/')}>HOME</Link>
          <Link to="/about" className={linkClass('/about')}>ABOUT</Link>
          <Link to="/products" className={linkClass('/products')}>PRODUCTS</Link>
          <Link to="/teams" className={linkClass('/teams')}>TEAMS</Link>
          <Link to="/blogs" className={linkClass('/blogs')}>BLOGS</Link>
          {user ? (
            <>
              <Link to="/create-blog" className={linkClass('/create-blog')}>+ WRITE</Link>
              <button onClick={logout} className="text-xs bg-red-950/40 text-red-400 border border-red-900/50 px-3 py-1 rounded hover:bg-red-900 hover:text-white transition-all">LOGOUT</button>
            </>
          ) : (
            <Link to="/login" className={linkClass('/login')}>LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const footerLinks = [
    { title: "Company", links: ["About Us", "Leadership Team", "Careers"] },
    { title: "Solutions", links: ["Commercial Network", "Supply Chain", "Distributor Portal"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Compliance"] }
  ];

  return (
    <footer className="bg-[#061121] border-t border-[#152C4A] text-slate-400 font-sans text-xs tracking-wide">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-white font-bold tracking-widest text-lg">
              <span className="text-[#DFCE72]">PHENEX</span> FISHING
            </h2>
            <p className="text-slate-500 font-light leading-relaxed max-w-sm">
              Professional-grade equipment and comprehensive supply chain solutions for the modern fishing industry.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-[10px] font-bold text-[#DFCE72] tracking-widest uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2 font-light">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#152C4A] text-[10px] text-slate-600">
          <p>&copy; {new Date().getFullYear()} Phenex Fishing. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#DFCE72]">LinkedIn</a>
            <a href="#" className="hover:text-[#DFCE72]">Twitter</a>
            <a href="#" className="hover:text-[#DFCE72]">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
          <Navbar />
          <main className="flex-grow">
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