import { SITE } from '../data/site';
import { formatINR } from './format';

const API_BASE = import.meta.env.VITE_API_BASE || '';
const LAST_ORDER_KEY = 'oe_last_order';

export function createOrderId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `OE-${t}-${r}`;
}

/**
 * Sends the order to the secure server endpoint.
 * Returns { sync: 'recorded' | 'not_configured' | 'failed' }. Never claims success it did not verify.
 */
export async function submitOrder(order) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
      signal: controller.signal,
    });
    if (res.status === 501) return { sync: 'not_configured' };
    if (!res.ok) return { sync: 'failed' };
    const data = await res.json();
    return { sync: data.recorded ? 'recorded' : 'failed' };
  } catch {
    return { sync: 'failed' };
  } finally {
    clearTimeout(timer);
  }
}

export function saveLastOrder(order) {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadLastOrder() {
  try {
    return JSON.parse(sessionStorage.getItem(LAST_ORDER_KEY));
  } catch {
    return null;
  }
}

/** Builds the wa.me link with the full order pre-filled, so the customer only has to press Send. */
export function buildWhatsAppUrl(order) {
  const lines = order.items.map((i) => `• ${i.name} × ${i.qty} — ${formatINR(i.price * i.qty)}`).join('\n');
  const c = order.customer;
  const message =
    `Hello Odour Elixirs, I'd like to confirm my order.\n\nOrder ID: ${order.orderId}\n${lines}\nTotal: ${formatINR(order.total)}\n\n` +
    `Name: ${c.name}\nPhone: ${c.phone}\nAddress: ${c.address}, ${c.city}, ${c.state} ${c.pincode}\nPayment: ${order.paymentMethod}`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
