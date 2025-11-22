import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("orders/list/")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">
        Order History
      </h1>

      {orders.length === 0 && (
        <div className="text-[var(--muted-text)]">
          You have not placed any orders yet.
        </div>
      )}

      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-serif mb-1">
                  Order #{order.id}
                </div>
                <div className="text-[var(--muted-text)] text-sm">
                  {new Date(order.created_at).toLocaleString()}
                </div>
              </div>

              <div>
                <span
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    background: "var(--gold)",
                    color: "var(--dark-bg)",
                  }}
                >
                  COMPLETED
                </span>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{order.items.length}</span>
              </div>

              <div className="flex justify-between mt-1">
                <span>Total Amount:</span>
                <span className="text-[var(--gold)]">
                  Rs.{" "}
                  {order.items
                    .reduce(
                      (sum, i) =>
                        sum +
                        parseFloat(i.menu_item_detail.price) * i.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
