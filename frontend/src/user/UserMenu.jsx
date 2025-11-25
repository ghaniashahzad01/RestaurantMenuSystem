import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";

export default function UserMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("menu/")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((item) => (
          <div key={item.id} className="card">

            {/* ----- TITLE + SPECIAL BADGE ----- */}
            <div className="flex justify-between items-center mb-1">
              <div className="text-xl font-serif">{item.name}</div>

              {/* ⭐ SPECIAL BADGE SHOW IF TRUE */}
              {item.is_special && (
                <span className="px-2 py-1 text-xs bg-yellow-500 text-black rounded font-semibold">
                  ⭐ Special
                </span>
              )}
            </div>

            <div className="text-[var(--muted-text)] text-sm">{item.category_name}</div>

            {/* ----- IMAGE ----- */}
            <div className="w-full h-40 bg-[#2A2622] rounded overflow-hidden flex items-center justify-center my-4">
              {item.image ? (
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `http://127.0.0.1:8000${item.image}`
                  }
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[var(--muted-text)]">No Image</span>
              )}
            </div>

            {/* ----- PRICE ----- */}
            <div className="text-[var(--gold)] font-semibold">
              Rs. {item.price}
            </div>

            {/* ----- ADD TO CART BUTTON ----- */}
            <button
              className="btn-primary mt-4"
              onClick={() => {
                console.log("Add to Cart clicked → item ID:", item.id);
                addToCart(item.id, 1);
              }}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
