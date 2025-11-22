import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.menu_item_detail.price) * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">Your Cart</h1>

      {cart.length === 0 && (
        <div className="text-[var(--muted-text)]">Your cart is empty.</div>
      )}

      <div className="grid gap-4">
        {cart.map((ci) => (
          <div key={ci.id} className="card flex justify-between items-center">
            <div>
              <div className="font-medium">{ci.menu_item_detail.name}</div>
              <div className="text-[var(--muted-text)] text-sm">
                Rs. {ci.menu_item_detail.price}
              </div>
              <div className="text-sm">Qty: {ci.quantity}</div>
            </div>

            <button
              className="btn-danger"
              onClick={() => removeFromCart(ci.menu_item)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="card mt-6">
          <div className="flex justify-between">
            <span className="text-lg">Total</span>
            <span className="text-xl text-[var(--gold)]">{total.toFixed(2)}</span>
          </div>

          <button
            className="btn-primary w-full mt-4"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
