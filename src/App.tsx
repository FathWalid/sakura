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
import { ProductDetails } from "./pages/ProductDetail";

// 🧑‍💼 Composants admin
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLogin } from "./pages/Admin/Login";
import { AdminDashboard } from "./pages/Admin/Dashboard"; // Produits
import { AdminOrders } from "./pages/Admin/AdminOrders"; // Commandes
import { AdminHome } from "./pages/Admin/AdminHome"; // Dashboard global

function App() {
  return (
    <Router>
      {/* 🌸 Fournisseurs de contexte global : Admin + Panier */}
      <AdminAuthProvider>
        <CartProvider>
          {/* 🌸 Notifications globales */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#ffffff",
                color: "#0f766e",
                border: "1px solid #e5e7eb",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
              success: {
                iconTheme: {
                  primary: "#0f766e",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#b91c1c",
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

              {/* Tableau de bord global (stats) */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />

              {/* Produits */}
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Commandes */}
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
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
