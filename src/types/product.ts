// src/types/product.ts

// 💰 Prix et volumes disponibles pour chaque parfum
export interface ProductPrice {
  volume: number;
  amount: number;
}

// 🧴 Modèle principal du produit
export interface Product {
  _id: string; // ID MongoDB
  name: string;
  description: string;
  type: string;
  notes: string;
  images: string[]; // tableau d’images (ex: /uploads/img1.png)
  prices: ProductPrice[]; // liste des volumes + prix
}

// 🛒 Modèle d’un article du panier
export interface CartItem {
  _id: string;          // même ID que le produit
  name: string;
  type: string;
  notes: string;
  image: string;        // image affichée dans le panier
  selectedVolume: number; // volume choisi (ml)
  price: number;        // prix correspondant
  quantity: number;     // nombre d’articles
}
