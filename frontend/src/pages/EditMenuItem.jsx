import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get(`menu/${id}/`).then(res => setItem(res.data)).catch(err => console.error(err));
    api.get("categories/").then(res => setCategories(res.data)).catch(err => console.error(err));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description || "");
    formData.append("price", item.price);
    formData.append("category", item.category);
    if (image) formData.append("image", image);

    try {
      await api.put(`menu/${id}/`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      navigate("/menu-items");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  if (!item) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} className="w-full border px-3 py-2 rounded" required />
        <textarea value={item.description} onChange={e => setItem({ ...item, description: e.target.value })} className="w-full border px-3 py-2 rounded" />
        <input value={item.price} onChange={e => setItem({ ...item, price: e.target.value })} type="number" className="w-full border px-3 py-2 rounded" required />
        <select value={item.category} onChange={e => setItem({ ...item, category: e.target.value })} className="w-full border px-3 py-2 rounded">
          <option value="">Select category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  );
}
