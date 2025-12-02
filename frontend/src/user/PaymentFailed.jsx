import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="card text-center p-8">
        <h1 className="text-red-500 text-2xl">Payment Failed ❌</h1>
        <p className="text-gray-400 mt-4">Payment was cancelled or failed.</p>
        <Link to="/dashboard" className="btn-primary mt-6 inline-block">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
