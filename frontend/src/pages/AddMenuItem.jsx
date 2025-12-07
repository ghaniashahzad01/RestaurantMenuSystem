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
    async function loadCategories() {
      try {
        const res = await api.get("/categories/");
        setCategories(res.data);
      } catch (error) {
        console.error("Category load failed:", error);
      }
    }

    loadCategories();
  }, []);

 
  async function handleSubmit(e) {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", parseInt(category)); 
    if (image) formData.append("image", image);

    try {
      await api.post("/menu/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Menu item created successfully");
      navigate("/menu-items");
    } catch (err) {
      console.error("CREATE ERROR:", err.response?.data || err.message);
      alert("Failed to create item — check console");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-4">Add Menu Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
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

          {/* DESCRIPTION */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              rows="3"
              className="w-full"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="600"
              className="w-full"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full"
              required
            >
              <option value="">Select Category</option>

              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}

            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* BUTTON */}
          <div>
            <button type="submit" className="btn-primary w-full">
              Create Item
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
