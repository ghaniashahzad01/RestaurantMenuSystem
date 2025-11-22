import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";

export default function UserMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    api.get("menu/")
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
            <div className="text-xl font-serif mb-1">{item.name}</div>
            <div className="text-[var(--muted-text)] text-sm">{item.category_name}</div>

            <div className="text-[var(--gold)] font-semibold mt-3">
              Rs. {item.price}
            </div>

            <button
              className="btn-primary mt-4"
              onClick={() => addToCart(item.id, 1)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
