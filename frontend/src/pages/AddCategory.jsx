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
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-4">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Category Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Appetizers"
              className="w-full"
              required
            />
          </div>

          <div>
            <button className="btn-primary w-full">Create Category</button>
          </div>

          {error && (
            <div className="text-[var(--danger)] text-sm mt-2">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
