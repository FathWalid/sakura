import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-cream">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
