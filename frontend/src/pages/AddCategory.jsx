import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("categories/", { name });
      navigate("/categories");
    } catch (err) {
      setError("Failed to create category");
    }
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Category name" className="w-full border px-3 py-2 rounded" required />
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Create</button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
