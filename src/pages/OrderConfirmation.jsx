import { Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';
import { formatINR } from '../lib/format';
import { buildWhatsAppUrl, loadLastOrder } from '../lib/orders';

const UPI_ID = import.meta.env.VITE_UPI_ID || '';

export default function OrderConfirmation() {
  useSEO('Order received');
  const order = loadLastOrder();
  if (!order) return <Navigate to="/" replace />;

  const waUrl = buildWhatsAppUrl(order);
  const upiUrl = UPI_ID ? `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Odour Elixirs')}&am=${order.total}&cu=INR&tn=${encodeURIComponent(order.orderId)}` : '';

  return (
    <div className="mx-auto max-w-xl px-5 py-20 text-center md:py-28">
      <CheckCircle2 className="mx-auto" size={36} aria-hidden="true" />
      <h1 className="mt-5 text-4xl">Thank you.</h1>
      <p className="mt-2 text-sm text-muted">Order ID <strong className="font-medium text-ink">{order.orderId}</strong> · Status: {order.status}</p>
      <p className="mt-4 text-sm text-muted">Payment has not been taken on this website. Total due: {formatINR(order.total)}.</p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Button href={waUrl}>Send order on WhatsApp</Button>
        {upiUrl && order.paymentMethod.startsWith('UPI') && (
          <>
            <Button href={upiUrl} variant="outline">Pay {formatINR(order.total)} by UPI</Button>
            <p className="text-xs text-muted">UPI ID: {UPI_ID}</p>
          </>
        )}
        <Button to="/shop" variant="outline">Continue shopping</Button>
      </div>
    </div>
  );
}
