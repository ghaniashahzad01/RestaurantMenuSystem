import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddMenuItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("categories/").then(res => setCategories(res.data)).catch(err => console.error(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await api.post("menu/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/menu-items");
    } catch (err) {
      console.error(err);
      alert("Failed to create item");
    }
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full border px-3 py-2 rounded" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full border px-3 py-2 rounded" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="w-full border px-3 py-2 rounded" required />
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded" required>
          <option value="">Select category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Create</button>
        </div>
      </form>
    </div>
  );
}
