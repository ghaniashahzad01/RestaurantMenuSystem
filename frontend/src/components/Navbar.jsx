import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import api from "../services/api";

export default function Navbar({ admin, user, setUser, setAdmin }) {
  const navigate = useNavigate();

  async function handleAdminLogout() {
    try {
      await api.post("logout/");
      setAdmin(null);
      navigate("/admin-login");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUserLogout() {
    try {
      await api.post("user/logout/");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header
      className="w-full shadow-md sticky top-0 z-50"
      style={{ background: "#1A1714" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-[var(--gold)] text-2xl font-serif">
          🍽 Royal Dine
        </Link>

        <nav className="flex items-center gap-6">

          {!admin && (
            <>
              <Link to="/menu" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Menu</Link>

              <Link to="/cart" className="flex items-center gap-1 text-[var(--warm-text)] hover:text-[var(--gold)]">
                <FaShoppingCart size={18} /> Cart
              </Link>

              <Link to="/orders" className="text-[var(--warm-text)] hover:text-[var(--gold)]">
                My Orders
              </Link>

              {user ? (
                <>
                  <span className="text-[var(--muted-text)]">
                    Hi, <strong>{user.full_name}</strong>
                  </span>
                  <button className="btn-primary" onClick={handleUserLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn-dark" to="/register">
                    Register
                  </Link>
                  <Link className="btn-primary" to="/user-login">
                    Login
                  </Link>
                </>
              )}
            </>
          )}

          {admin && (
            <>
              <Link to="/dashboard" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Dashboard</Link>
              <Link to="/categories" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Categories</Link>
              <Link to="/menu-items" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Menu Items</Link>
              <Link to="/analytics" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Analytics</Link>

              <span className="text-[var(--muted-text)]">
                Admin: <strong>{admin.full_name || admin.email}</strong>
              </span>

              <button className="btn-danger" onClick={handleAdminLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
