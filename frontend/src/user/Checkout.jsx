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
    const res = await api.post("user/orders/", {
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
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LEFT FORM */}
        <form className="card p-6 space-y-4 shadow-lg" onSubmit={handleOrder}>
          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">
              Name
            </label>
            <input
              className="input w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">
              Email
            </label>
            <input
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">
              Phone
            </label>
            <input
              className="input w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">
              Address
            </label>
            <textarea
              className="w-full input"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              required
            />
          </div>

          <button
            className="bg-[var(--gold)] text-black py-3 rounded font-semibold tracking-wide text-lg mt-4 hover:opacity-90 transition w-full"
          >
            Place Order – Rs. {total.toFixed(2)}
          </button>

          {err && <div className="text-[var(--danger)] mt-2">{err}</div>}
        </form>

        {/* RIGHT SUMMARY */}
        <div className="card p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-xl">Order Summary</h3>

          <div className="space-y-3">
            {cart.map((ci) => (
              <div key={ci.id} className="flex justify-between border-b border-[#3a342e] pb-2">
                <span>
                  {ci.menu_item_detail.name} × {ci.quantity}
                </span>
                <span className="text-[var(--gold)]">
                  Rs. {(ci.menu_item_detail.price * ci.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg font-medium">
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
