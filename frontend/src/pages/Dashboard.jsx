import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

export default function Dashboard() {
  const [stats, setStats] = useState({ categories:0, items:0, specials:0 });
  const navigate = useNavigate();   // ✅ ADD THIS

  useEffect(() => {
    async function load() {
      const cat = await api.get("categories/");
      const menu = await api.get("menu/");
      setStats({
        categories: cat.data.length,
        items: menu.data.length,
        specials: menu.data.filter(i => i.is_special).length
      });
    }
    load();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-serif text-[var(--gold)]">Dashboard Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-[var(--muted-text)] text-sm">Categories</p>
          <p className="text-4xl font-serif">{stats.categories}</p>
        </div>

        <div className="card">
          <p className="text-[var(--muted-text)] text-sm">Menu Items</p>
          <p className="text-4xl font-serif">{stats.items}</p>
        </div>

        <div className="card">
          <p className="text-[var(--muted-text)] text-sm">Specials</p>
          <p className="text-4xl font-serif">{stats.specials}</p>
        </div>
      </div>

      {/* ✅ ADMIN ACTION BUTTON */}
      <div className="mt-6">
        <button
          className="btn-primary"
          onClick={() => navigate("/admin/orders")}
        >
          View Orders
        </button>
      </div>

    </div>
  );
}
