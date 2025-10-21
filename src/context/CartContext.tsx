import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "../types/product";

// Définition du type du contexte
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, volume?: number) => void;
  updateQuantity: (productId: string, volume: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "sakura_cart_v1";

// 🧺 Provider principal
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // 🧠 Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // ➕ Ajouter au panier
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // On compare par ID ET volume
      const existing = prev.find(
        (p) => p._id === item._id && p.selectedVolume === item.selectedVolume
      );

      if (existing) {
        return prev.map((p) =>
          p._id === item._id && p.selectedVolume === item.selectedVolume
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      }

      // sinon on ajoute un nouveau produit
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  // ❌ Supprimer un produit
  const removeFromCart = (productId: string, volume?: number) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(p._id === productId && (volume ? p.selectedVolume === volume : true))
      )
    );
  };

  // 🔄 Modifier la quantité
  const updateQuantity = (productId: string, volume: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, volume);
      return;
    }
    setCart((prev) =>
      prev.map((p) =>
        p._id === productId && p.selectedVolume === volume
          ? { ...p, quantity }
          : p
      )
    );
  };

  // 🧹 Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // 🔢 Totaux
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ Hook personnalisé
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
