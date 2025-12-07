import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import api from "../services/api";
import { useUser } from "../context/UserContext";
import { toast } from "react-hot-toast";

export default function Navbar({ admin, setAdmin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, loading } = useUser();

  // Wait until user is loaded
  if (loading) return null;

  // ⭐ SMART FIX:
  // Hide navbar on ANY path that starts with these
  const authPaths = ["/user-login", "/register", "/admin-login"];
  const isAuthScreen = authPaths.some(path =>
    location.pathname.startsWith(path)
  );

  if (isAuthScreen) {
    return (
      <header className="bg-[var(--dark-bg)] py-4 px-6 flex justify-between items-center">
        <span
          onClick={() => toast.error("Please login first")}
          className="text-[var(--gold)] font-serif text-xl cursor-pointer hover:opacity-80"
        >
          🍽 Royal Dine
        </span>

        <div className="flex gap-3 items-center">
          <Link
            className="bg-[var(--gold)] text-black px-4 py-1 rounded hover:opacity-90"
            to="/user-login"
          >
            Login
          </Link>

          <Link
            className="border border-[var(--gold)] text-[var(--gold)] px-4 py-1 rounded hover:bg-[var(--gold)] hover:text-black transition"
            to="/register"
          >
            Register
          </Link>
        </div>
      </header>
    );
  }

  // USER LOGOUT
  function handleUserLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/user-login");
  }

  // ADMIN LOGOUT
  async function handleAdminLogout() {
    try {
      await api.post("admin/logout/");
    } catch {}

    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    setAdmin(null);
    navigate("/admin-login");
  }

  return (
    <header className="bg-[var(--dark-bg)] px-6 py-4 flex justify-between items-center shadow-md">

      {/* LOGO */}
      {admin ? (
        <span className="text-[var(--gold)] font-serif text-xl cursor-default">🍽 Royal Dine</span>
      ) : user ? (
        <Link to="/" className="text-[var(--gold)] font-serif text-xl hover:opacity-80">
          🍽 Royal Dine
        </Link>
      ) : (
        <span
          onClick={() => toast.error("Please login first")}
          className="text-[var(--gold)] font-serif text-xl cursor-pointer hover:opacity-80"
        >
          🍽 Royal Dine
        </span>
      )}

      <nav className="flex gap-4 items-center">

        {/* ADMIN NAVBAR */}
        {admin ? (
          <>
            <Link className="text-[var(--gold)] hover:underline" to="/dashboard">Dashboard</Link>
            <Link className="text-[var(--gold)] hover:underline" to="/categories">Categories</Link>
            <Link className="text-[var(--gold)] hover:underline" to="/menu-items">Menu Items</Link>
            <Link className="text-[var(--gold)] hover:underline" to="/analytics">Analytics</Link>

            <span className="text-[var(--muted-text)] text-sm">
              Admin: <b>{admin.full_name || admin.email}</b>
            </span>

            <button
              className="bg-red-600 text-white px-4 py-1 rounded hover:opacity-90"
              onClick={handleAdminLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* USER NAVBAR */}
            <Link className="text-[var(--gold)] hover:underline" to="/menu">Menu</Link>

            {user && (
              <>
                <Link className="text-[var(--gold)]" to="/cart">
                  <FaShoppingCart />
                </Link>

                <Link className="text-[var(--gold)] hover:underline" to="/orders">My Orders</Link>

                <span className="text-[var(--muted-text)]">
                  Hi, <b>{user.full_name}</b>
                </span>

                <button
                  className="bg-[var(--gold)] text-black px-4 py-1 rounded hover:opacity-90"
                  onClick={handleUserLogout}
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link className="text-[var(--gold)] hover:underline" to="/user-login">Login</Link>
                <Link className="text-[var(--gold)] hover:underline" to="/register">Register</Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
