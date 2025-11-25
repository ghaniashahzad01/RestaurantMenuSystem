import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
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

            {/* LEFT SIDE */}
            <div>
              <div className="font-medium">{ci.menu_item_detail.name}</div>
              <div className="text-[var(--muted-text)] text-sm">
                Rs. {ci.menu_item_detail.price}
              </div>

              {/* ⭐ QUANTITY WITH BUTTONS */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  className="bg-[#444] text-white px-3 py-1 rounded"
                  onClick={() => updateQuantity(ci.menu_item, ci.quantity - 1)}
                >
                  -
                </button>

                <span className="text-lg">{ci.quantity}</span>

                <button
                  className="bg-[var(--gold)] text-black px-3 py-1 rounded"
                  onClick={() => updateQuantity(ci.menu_item, ci.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* RIGHT SIDE — REMOVE BUTTON */}
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

          {/* TOTAL */}
          <div className="flex justify-between">
            <span className="text-lg">Total</span>
            <span className="text-xl text-[var(--gold)]">
              {total.toFixed(2)}
            </span>
          </div>

          {/* ⭐ SMALL BEAUTIFUL CHECKOUT BUTTON */}
          <button
            className="bg-[var(--gold)] text-black py-2 px-4 rounded font-semibold text-sm w-fit mx-auto mt-4"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
