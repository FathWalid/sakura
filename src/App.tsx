import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// 🌸 Contexts
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

// 🌸 Composants publics
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogue } from "./pages/Catalogue";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";

// 🧑‍💼 Composants admin
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminDashboard } from "./pages/Admin/Dashboard";
import { AdminLogin } from "./pages/Admin/Login";
import { ProductDetails } from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      {/* 🌸 Fournisseurs de contexte global : Admin + Panier */}
      <AdminAuthProvider>
        <CartProvider>
          {/* 🌸 Notifications globales */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#333",
                border: "1px solid #e0e0e0",
                fontFamily: "Poppins, sans-serif",
              },
              success: {
                iconTheme: {
                  primary: "#0f766e", // vert-bleu (teal-dark)
                  secondary: "#fff",
                },
              },
            }}
          />

          <div className="min-h-screen bg-cream flex flex-col">
            <Routes>
              {/* === 🌸 PAGES PUBLIQUES === */}
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/catalogue"
                element={
                  <>
                    <Header />
                    <Catalogue />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/panier"
                element={
                  <>
                    <Header />
                    <Cart />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Header />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              <Route path="/produit/:id" element={<ProductDetails />} />

              {/* === 🧑‍💼 ADMINISTRATION === */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </CartProvider>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
