import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StripeSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/orders");
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="card text-center p-8">
        <h1 className="text-3xl font-serif text-[var(--gold)]">Payment Success ✅</h1>
        <p className="text-gray-400 mt-4">
          Your payment was successful.<br />
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}
