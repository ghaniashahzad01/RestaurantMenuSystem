import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get("orders/list/").then((res) => {
      const found = res.data.find((o) => o.id === parseInt(id));
      setOrder(found);
    });
  }, [id]);

  if (!order) return <LoadingSpinner />;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-md text-center">
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-3">
          Order Confirmed!
        </h2>

        <p className="text-[var(--muted-text)]">
          Order #{order.id} placed on{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>

        <Link to="/menu" className="btn-primary mt-4 inline-block">
          Back to Menu
        </Link>
      </div>
    </div>
  );
}
