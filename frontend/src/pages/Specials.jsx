import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Specials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("menu/")
      .then((res) => {
        setItems(res.data.filter((i) => i.is_special));
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
      {/* Page Heading */}
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">
        Today's Specials
      </h1>

      {/* Specials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((i) => (
          <div key={i.id} className="card">

            {/* Name & Category */}
            <div className="mb-3">
              <div className="text-xl font-serif">{i.name}</div>
              <div className="text-[var(--muted-text)] text-sm">
                {i.category_name}
              </div>
            </div>

            {/* Price */}
            <div className="text-[var(--gold)] font-semibold mb-3">
              Rs. {i.price}
            </div>

            {/* Special Badge */}
            <div className="inline-block px-2 py-1 bg-[var(--gold)] text-[var(--dark-bg)] text-xs rounded">
              SPECIAL ITEM
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
