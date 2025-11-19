import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function MenuItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    api.get("menu/").then(res => setItems(res.data)).catch(err => console.error(err));
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`menu/${id}/`);
      load();
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleSpecial(id) {
    try {
      await api.post(`menu/${id}/toggle-special/`);
      load();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Link to="/add-menu-item" className="px-3 py-1 bg-green-600 text-white rounded">Add Item</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(i => (
          <div key={i.id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-bold">{i.name}</div>
                <div className="text-sm text-gray-600">{i.category_name}</div>
                <div className="text-sm">Rs. {i.price}</div>
              </div>
              <div className="text-right">
                {i.image && <img src={`http://127.0.0.1:8000${i.image}`} alt={i.name} className="w-20 h-20 object-cover rounded" />}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Link to={`/edit-menu-item/${i.id}`} className="px-2 py-1 border rounded">Edit</Link>
              <button onClick={() => toggleSpecial(i.id)} className="px-2 py-1 bg-yellow-500 text-white rounded">
                {i.is_special ? "Unmark Special" : "Mark Special"}
              </button>
              <button onClick={() => handleDelete(i.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
