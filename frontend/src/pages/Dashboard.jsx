import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({ categories: 0, items: 0, specials: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        // categories count
        const catRes = await api.get("categories/");
        const menuRes = await api.get("menu/");
        const specials = menuRes.data.filter(i => i.is_special).length;
        setStats({
          categories: catRes.data.length,
          items: menuRes.data.length,
          specials,
        });
      } catch (err) {
        console.error(err);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Categories</div>
          <div className="text-2xl font-bold">{stats.categories}</div>
          <Link to="/categories" className="text-sm text-blue-600 mt-2 inline-block">Manage</Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Menu Items</div>
          <div className="text-2xl font-bold">{stats.items}</div>
          <Link to="/menu-items" className="text-sm text-blue-600 mt-2 inline-block">Manage</Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Specials</div>
          <div className="text-2xl font-bold">{stats.specials}</div>
          <Link to="/specials" className="text-sm text-blue-600 mt-2 inline-block">View Specials</Link>
        </div>
      </div>
    </div>
  );
}
