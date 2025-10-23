import { CartItem } from "../types/product";

const WHATSAPP_NUMBER = "34742083046"; // ✅ Ton numéro WhatsApp sans + ni espaces

export function createWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function createCartMessage(
  cart: CartItem[],
  name?: string,
  phone?: string,
  email?: string
): string {
  let message = `🌸 *Nouvelle commande Sakura Essence*\n\n`;

  cart.forEach((item) => {
    message += `- ${item.name} (${item.selectedVolume}ml) x${item.quantity} → ${item.price * item.quantity} MAD\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\n*Total :* ${total} MAD\n\n`;

  message += `👤 *Nom :* ${name || "—"}\n📧 *Email :* ${email || "—"}\n📱 *Téléphone :* ${phone || "—"}\n`;

  message += `\n💖 Merci !`;
  return message;
}
