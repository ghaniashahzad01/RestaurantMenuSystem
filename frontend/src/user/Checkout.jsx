import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, reload } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [err, setErr] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.menu_item_detail.price) * item.quantity,
    0
  );

  async function handleOrder(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("orders/", {
        name,
        email,
        phone,
        address,
      });

      reload();
      navigate(`/order-success/${res.data.id}`);
    } catch (error) {
      setErr("Failed to place order");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <form className="card" onSubmit={handleOrder}>
          <label className="text-[var(--muted-text)] text-sm">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label className="text-[var(--muted-text)] text-sm">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="text-[var(--muted-text)] text-sm">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label className="text-[var(--muted-text)] text-sm">Address</label>
          <textarea
            className="w-full"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="btn-primary w-full mt-4">
            Place Order – Rs. {total.toFixed(2)}
          </button>

          {err && <div className="text-[var(--danger)] mt-2">{err}</div>}
        </form>

        <div className="card">
          <h3 className="font-medium mb-3">Order Summary</h3>

          {cart.map((ci) => (
            <div key={ci.id} className="flex justify-between mb-2">
              <div>
                {ci.menu_item_detail.name} × {ci.quantity}
              </div>
              <div>
                Rs.{" "}
                {(
                  parseFloat(ci.menu_item_detail.price) * ci.quantity
                ).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4 text-lg">
            <span>Total</span>
            <span className="text-[var(--gold)]">
              Rs. {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
