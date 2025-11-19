import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const itemRes = await api.get(`menu/${id}/`);
        const catRes = await api.get("categories/");

        setItem(itemRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("price", item.price);
    formData.append("category", item.category);
    if (image) formData.append("image", image);

    try {
      await api.put(`menu/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/menu-items");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-4">
          Edit Menu Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Item Name */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Name
            </label>
            <input
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Description
            </label>
            <textarea
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
              rows="3"
              className="w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Price
            </label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Category
            </label>
            <select
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              className="w-full"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Update Button */}
          <div>
            <button className="btn-primary w-full">Update Item</button>
          </div>

        </form>
      </div>
    </div>
  );
}
