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
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          type="number"
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
      </form>
    </div>
  );
}
