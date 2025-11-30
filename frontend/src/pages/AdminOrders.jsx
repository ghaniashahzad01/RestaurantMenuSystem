import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await api.get("user/admin/orders/");
      console.log("Orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
      setError("Failed to load orders");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif text-[var(--gold)]">All Orders</h1>

      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div key={order.id} className="card space-y-2">

          <p className="font-semibold">Order #{order.id}</p>
          <p>User: {order.name}</p>
          <p>Email: {order.email}</p>
          <p>Phone: {order.phone}</p>
          <p>Address: {order.address}</p>
          <p>Total: Rs {order.total}</p>
          <p>Date: {new Date(order.created_at).toLocaleString()}</p>

          <div className="mt-3">
            <p className="font-semibold text-[var(--gold)]">Items</p>

            {order.items && order.items.length > 0 ? (
              order.items.map((item, i) => (
                <div key={i} className="ml-4 text-sm">
                  ✔ {item.quantity} × {item.name} — Rs {item.unit_price}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 ml-4">No items</p>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
