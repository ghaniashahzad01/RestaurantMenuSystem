import { Link } from "react-router-dom";

export default function Sidebar() {
  const active = (path) =>
    window.location.pathname === path
      ? "bg-[var(--gold)] text-[var(--dark-bg)]"
      : "text-[var(--warm-text)] hover:bg-[#2A2622]";

  return (
    <aside className="hidden md:flex flex-col w-72 min-h-screen p-6" style={{ background: "#1A1714" }}>
      <h2 className="text-xl font-serif text-[var(--gold)] mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <Link className={`p-3 rounded-md ${active("/dashboard")}`} to="/dashboard">Dashboard</Link>
        <Link className={`p-3 rounded-md ${active("/categories")}`} to="/categories">Categories</Link>
        <Link className={`p-3 rounded-md ${active("/menu-items")}`} to="/menu-items">Menu Items</Link>
        <Link className={`p-3 rounded-md ${active("/add-menu-item")}`} to="/add-menu-item">Add Item</Link>
        <Link className={`p-3 rounded-md ${active("/specials")}`} to="/specials">Specials</Link>
        <Link className={`p-3 rounded-md ${active("/analytics")}`} to="/analytics">Analytics</Link>
      </nav>

      <div className="mt-auto text-[var(--muted-text)] text-sm">
        © {new Date().getFullYear()} Royal Dine
      </div>
    </aside>
  );
}
