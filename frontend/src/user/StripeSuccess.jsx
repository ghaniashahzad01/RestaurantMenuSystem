import { useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function StripeSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    async function confirmStripeOrder() {
      const session_id = new URLSearchParams(window.location.search).get("session_id");

      if (!session_id) {
        console.error("Missing session_id");
        navigate("/orders");
        return;
      }

      try {
        const res = await api.post("user/stripe-confirm/", { session_id });
        navigate(`/order-success/${res.data.id}`);
      } catch (error) {
        console.error("Stripe confirm failed:", error);
        navigate("/orders");
      }
    }

    confirmStripeOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="card text-center p-8">
        <h1 className="text-3xl font-serif text-[var(--gold)]">Payment Success ✅</h1>
        <p className="text-gray-400 mt-4">
          Confirming your order... Please wait.
        </p>
      </div>
    </div>
  );
}
