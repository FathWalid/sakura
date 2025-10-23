// 💰 Prix d’un produit
export interface ProductPrice {
  volume?: number;  // pour Sakura / Zara
  size?: string;    // pour Rituals
  amount: number;   // prix (MAD)
}

// 🧴 Modèle principal du produit
export interface Product {
  _id: string;
  name: string;
  description?: string;
  type?: string;
  notes?: string;
  images?: string[];
  prices?: ProductPrice[];
  image?: string;   // image principale formatée
  price?: number;   // prix affiché simplifié
}

// 🛒 Article du panier
export interface CartItem {
  _id: string;
  name: string;
  type?: string;
  notes?: string;
  image: string;
  selectedOption?: string | number; // volume (ml) ou taille (S/M/L)
  price: number;
  quantity: number;
}
