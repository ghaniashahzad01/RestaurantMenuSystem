import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Utility to highlight active link
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <Link className={`px-3 py-2 rounded ${isActive("/dashboard")}`} to="/dashboard">Dashboard</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/categories")}`} to="/categories">Categories</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/menu-items")}`} to="/menu-items">Menu Items</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/add-menu-item")}`} to="/add-menu-item">Add Item</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/specials")}`} to="/specials">Today's Specials</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/analytics")}`} to="/analytics">Analytics</Link>
      </nav>
    </div>
  );
}
