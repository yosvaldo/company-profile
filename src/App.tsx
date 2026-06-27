import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';

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
        <div className="flex flex-col min-h-screen bg-ocean-950">
          <Navbar />
          <main className="grow pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/blogs" element={<BlogList />} />

              <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>

              <Route element={<ProtectedLayout />}>
                <Route path="/create-blog" element={<CreateBlog />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}