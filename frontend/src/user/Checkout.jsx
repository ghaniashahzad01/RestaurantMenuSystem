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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [err, setErr] = useState("");

  // ✅ TOTAL CALCULATION
  const total = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.menu_item_detail.price) * item.quantity,
    0
  );

  async function handleOrder(e) {
    e.preventDefault();
    setErr("");

    if (!paymentMethod) {
      setErr("Please select a payment method.");
      return;
    }

    if (!cart.length) {
      setErr("Cart is empty.");
      return;
    }

    try {
      // ======================
      // ✅ STRIPE PAYMENT FLOW
      // ======================
      if (paymentMethod === "STRIPE") {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/create-checkout-session/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!data.url) {
          setErr("Stripe session failed.");
          return;
        }

        // ✅ REDIRECT TO STRIPE
        window.location.href = data.url;
        return;
      }

      // ======================
      // ✅ CASH ON DELIVERY FLOW
      // ======================
      const res = await api.post("user/orders/", {
        name,
        email,
        phone,
        address,
        payment_method: "COD",
      });

      reload();
      navigate(`/order-success/${res.data.id}`);
    } catch (error) {
      console.error(error);
      setErr("Failed to place order.");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT FORM */}
        <form className="card p-6 space-y-4 shadow-lg" onSubmit={handleOrder}>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">Name</label>
            <input
              className="input w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">Email</label>
            <input
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">Phone</label>
            <input
              className="input w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm block mb-1">Address</label>
            <textarea
              className="input w-full"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* ✅ PAYMENT METHOD */}
          <div>
            <h3 className="text-lg font-medium">Payment Method</h3>

            <label className="flex gap-2 mt-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="flex gap-2 mt-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="STRIPE"
                checked={paymentMethod === "STRIPE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay with Card (Stripe)
            </label>
          </div>

          <button className="bg-[var(--gold)] text-black py-3 rounded font-semibold text-lg w-full mt-4">
            Place Order – Rs. {total.toFixed(2)}
          </button>

          {err && <div className="text-[var(--danger)] mt-2">{err}</div>}

        </form>

        {/* RIGHT SUMMARY */}
        <div className="card p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-xl">Order Summary</h3>

          {cart.map((ci) => (
            <div key={ci.id} className="flex justify-between border-b pb-2">
              <span>{ci.menu_item_detail.name} × {ci.quantity}</span>
              <span className="text-[var(--gold)]">
                Rs. {(ci.menu_item_detail.price * ci.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="flex justify-between mt-4 font-bold">
            <span>Total</span>
            <span className="text-[var(--gold)]">Rs. {total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
