import { CartItem, Product } from '../types/product';

const WHATSAPP_NUMBER = '212600000000';

export function createWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function createProductMessage(product: Product, quantity: number = 1): string {
  return `Bonjour! Je souhaite commander le parfum "${product.name}" (Quantité: ${quantity}). Merci!`;
}

export function createCartMessage(cart: CartItem[], customerName?: string, address?: string): string {
  let message = 'Bonjour! Je souhaite commander :\n\n';

  cart.forEach(item => {
    message += `- [${item.quantity}x] ${item.name} — ${item.price}€\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal : ${total}€\n\n`;

  if (customerName) {
    message += `Nom : ${customerName}\n`;
  } else {
    message += 'Nom : __________\n';
  }

  if (address) {
    message += `Adresse : ${address}\n`;
  } else {
    message += 'Adresse : __________\n';
  }

  return message;
}
