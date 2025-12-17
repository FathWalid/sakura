import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";

// 🌸 Contexts
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { AdminAuthContext } from "./context/AdminAuthContext";

// 🌸 Composants publics
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogue } from "./pages/Catalogue";
import { CatalogueSakura } from "./pages/CatalogueSakura";
import { CatalogueZara } from "./pages/CatalogueZara";
import { CatalogueRituals } from "./pages/CatalogueRituals";
import { CatalogueDecants } from "./pages/CatalogueDecants"; // 💧 nouvelle catégorie
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";
import { ProductDetails } from "./pages/ProductDetail";

// 🧑‍💼 Composants admin
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLogin } from "./pages/Admin/Login";
import { AdminDashboard } from "./pages/Admin/Dashboard";
import { AdminOrders } from "./pages/Admin/AdminOrders";
import { AdminHome } from "./pages/Admin/AdminHome";
import { AdminZara } from "./pages/Admin/AdminZara";
import { AdminRituals } from "./pages/Admin/AdminRituals";
import { AdminBanner } from "./pages/Admin/AdminBanner";
import { AdminDecants } from "./pages/Admin/AdminDecants"; // 💧 nouvelle page admin

// ✅ Redirection automatique admin
function AdminRoot() {
  const { token } = useContext(AdminAuthContext);
  return token ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <CartProvider>
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
              success: { iconTheme: { primary: "#0f766e", secondary: "#fff" } },
              error: { iconTheme: { primary: "#b91c1c", secondary: "#fff" } },
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
                path="/catalogue-sakura"
                element={
                  <>
                    <Header />
                    <CatalogueSakura />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/catalogue-zara"
                element={
                  <>
                    <Header />
                    <CatalogueZara />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/catalogue-rituals"
                element={
                  <>
                    <Header />
                    <CatalogueRituals />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/catalogue-decants"
                element={
                  <>
                    <Header />
                    <CatalogueDecants />
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

              {/* 🔹 Détails produit pour chaque catégorie */}
              <Route path="/produit/:id" element={<ProductDetails />} />
              <Route path="/zara-produits/:id" element={<ProductDetails />} />
              <Route path="/rituals-produits/:id" element={<ProductDetails />} />
              <Route path="/decants-produits/:id" element={<ProductDetails />} />

              {/* === 🧑‍💼 ADMIN === */}
              <Route path="/admin" element={<AdminRoot />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/zara"
                element={
                  <ProtectedRoute>
                    <AdminZara />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/rituals"
                element={
                  <ProtectedRoute>
                    <AdminRituals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/decants"
                element={
                  <ProtectedRoute>
                    <AdminDecants />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/banners"
                element={
                  <ProtectedRoute>
                    <AdminBanner />
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
