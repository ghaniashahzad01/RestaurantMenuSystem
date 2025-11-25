import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`user/orders/${id}/`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!order)
    return (
      <div className="text-center text-[var(--danger)] mt-10">
        Order not found.
      </div>
    );

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-md text-center">
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-3">
          Order Confirmed!
        </h2>

        <p className="text-[var(--muted-text)]">
          Order #{order.id} was placed on{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>

        <Link to="/menu" className="btn-primary mt-4 inline-block">
          Back to Menu
        </Link>
      </div>
    </div>
  );
}
