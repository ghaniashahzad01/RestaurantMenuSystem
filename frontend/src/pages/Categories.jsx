import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("categories/")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`categories/${id}/`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--gold)]">Categories</h1>

        <Link to="/add-category" className="btn-primary">
          Add Category
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="card flex justify-between items-center"
          >
            {/* Category Name */}
            <span className="text-lg">{cat.name}</span>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(cat.id)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
