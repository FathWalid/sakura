export interface Product {
  id: string;
  name: string;
  image: string;
  notes: string;
  type: string;
  duration: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}
