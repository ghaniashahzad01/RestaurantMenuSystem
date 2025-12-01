import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="card p-8 max-w-md text-center shadow-2xl border border-[#3a1f1f]">

        <div className="text-6xl mb-4">❌</div>

        <h1 className="text-3xl font-serif text-red-500">
          Payment Failed
        </h1>

        <p className="mt-3 text-[var(--muted-text)] tracking-wide">
          Your payment could not be processed.<br />
          Please try again or choose a different method.
        </p>

        <div className="mt-6 flex gap-4 justify-center">

          <button
            onClick={() => navigate("/checkout")}
            className="bg-[var(--gold)] text-black px-5 py-2 rounded font-semibold hover:opacity-90 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/menu")}
            className="border border-[var(--gold)] text-[var(--gold)] px-5 py-2 rounded hover:bg-[var(--gold)] hover:text-black transition"
          >
            Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}
