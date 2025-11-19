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
    api
      .get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
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
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-4">Add Menu Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Chicken Alfredo Pasta"
              className="w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the dish"
              rows="3"
              className="w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="600"
              type="number"
              className="w-full"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full"
              required
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Submit */}
          <div>
            <button className="btn-primary w-full">Create Item</button>
          </div>

        </form>
      </div>
    </div>
  );
}
