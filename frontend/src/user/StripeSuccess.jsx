import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function StripeSuccess() {
  const navigate = useNavigate();
  const { reload } = useCart();

  useEffect(() => {
    async function finalizeOrder() {
      try {
        const res = await api.post("user/orders/", {
          payment_method: "STRIPE",
        });

        reload();
        navigate(`/order-success/${res.data.id}`);
      } catch (err) {
        console.error(err);
        navigate("/payment-failed");
      }
    }

    finalizeOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="card p-8 max-w-md text-center shadow-2xl border border-[#2A2622]">

        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-serif text-[var(--gold)]">
          Payment Successful
        </h1>

        <p className="mt-3 text-[var(--muted-text)] tracking-wide">
          Your payment has been received successfully.<br />
          Finalizing your order...
        </p>

        <div className="mt-6 animate-pulse text-sm text-gray-400">
          Please wait, redirecting...
        </div>

      </div>
    </div>
  );
}
