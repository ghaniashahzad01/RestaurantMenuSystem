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
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`categories/${id}/`);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link to="/add-category" className="px-3 py-1 bg-green-600 text-white rounded">
          Add Category
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>{cat.name}</div>

            <button
              onClick={() => handleDelete(cat.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
