import { Link } from "react-router-dom";

export default function Sidebar() {
  const active = (path) =>
    window.location.pathname === path
      ? "bg-[var(--gold)] text-black font-semibold"
      : "text-[var(--warm-text)] hover:bg-[#2A2622] transition-all duration-200";

  return (
    <aside
      className="hidden md:flex flex-col w-72 min-h-screen p-6 border-r border-[#2A2622]"
      style={{ background: "#14110F" }}
    >
      <h2 className="text-2xl font-serif text-[var(--gold)] mb-8">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2 text-lg">
        <Link className={`p-3 rounded-md ${active("/dashboard")}`} to="/dashboard">
          Dashboard
        </Link>

        <Link className={`p-3 rounded-md ${active("/categories")}`} to="/categories">
          Categories
        </Link>

        <Link className={`p-3 rounded-md ${active("/menu-items")}`} to="/menu-items">
          Menu Items
        </Link>

        <Link className={`p-3 rounded-md ${active("/add-menu-item")}`} to="/add-menu-item">
          Add Item
        </Link>

        <Link className={`p-3 rounded-md ${active("/specials")}`} to="/specials">
          Specials
        </Link>

        <Link className={`p-3 rounded-md ${active("/analytics")}`} to="/analytics">
          Analytics
        </Link>

        <Link
          className={`p-3 rounded-md ${active("/admin/notifications")}`}
          to="/admin/notifications"
        >
          Notifications
        </Link>
        <Link to="/admin/orders">Orders</Link>

      </nav>

      <div className="mt-auto text-[var(--muted-text)] text-sm pt-6 border-t border-[#2A2622]">
        © {new Date().getFullYear()} Royal Dine <br />
        <span className="text-xs opacity-60">Admin Dashboard</span>
      </div>
    </aside>
  );
}
