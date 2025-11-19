import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api
      .get("menu/")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`menu/${id}/`);
      load();
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleSpecial(id) {
    try {
      await api.post(`menu/${id}/toggle-special/`);
      load();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--gold)]">Menu Items</h1>
        <Link to="/add-menu-item" className="btn-primary">
          Add Item
        </Link>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((i) => (
          <div key={i.id} className="card">

            {/* Title + Category */}
            <div className="mb-3">
              <div className="text-xl font-serif">{i.name}</div>
              <div className="text-[var(--muted-text)] text-sm">{i.category_name}</div>
            </div>

            {/* Price */}
            <div className="text-[var(--gold)] font-semibold mb-3">
              Rs. {i.price}
            </div>

            {/* Image */}
            <div className="w-full h-40 bg-[#2A2622] rounded overflow-hidden flex items-center justify-center mb-4">
              {i.image ? (
                <img
                  src={`http://127.0.0.1:8000${i.image}`}
                  alt={i.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[var(--muted-text)]">No Image</span>
              )}
            </div>

            {/* Special Badge */}
            {i.is_special && (
              <div className="inline-block mb-3 px-2 py-1 bg-[var(--gold)] text-[var(--dark-bg)] text-xs rounded">
                SPECIAL ITEM
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                to={`/edit-menu-item/${i.id}`}
                className="px-3 py-1 border border-[var(--gold)] text-[var(--warm-text)] rounded hover:bg-[#2A2622]"
              >
                Edit
              </Link>

              <button
                onClick={() => toggleSpecial(i.id)}
                className="px-3 py-1 bg-[var(--gold)] text-[var(--dark-bg)] rounded"
              >
                {i.is_special ? "Unmark" : "Mark"}
              </button>

              <button
                onClick={() => handleDelete(i.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
