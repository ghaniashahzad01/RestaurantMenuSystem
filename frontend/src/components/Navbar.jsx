import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import api from "../services/api";
import { useUser } from "../context/UserContext";

export default function Navbar({ admin, setUser, setAdmin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // Hide navbar *ONLY* on login/register pages
  const hideNavbar = [
    "/user-login",
    "/register",
    "/admin-login"
  ];

  if (hideNavbar.includes(location.pathname)) {
    return (
      <header
        className="w-full shadow-md sticky top-0 z-50"
        style={{ background: "#1A1714" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-[var(--gold)] text-2xl font-serif">
            🍽 Royal Dine
          </Link>

          {/* Show Login + Register on these pages */}
          <nav className="flex items-center gap-6">
            <Link className="btn-primary" to="/user-login">Login</Link>
            <Link className="btn-secondary" to="/register">Register</Link>
          </nav>
        </div>
      </header>
    );
  }

  // ============ LOGOUTS ============
  async function handleUserLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/user-login", {
      state: { message: "Logged out successfully." },
    });
  }

  async function handleAdminLogout() {
  try {
    await api.post("user/logout/");
    setAdmin(null);

    navigate("/admin-login", {
      state: { message: "Admin logged out successfully." },
    });
  } catch (err) {
    console.error("ADMIN LOGOUT FAILED:", err);
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

          {/* ======================= ADMIN NAVBAR ======================= */}
          {admin ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/categories" className="nav-link">Categories</Link>
              <Link to="/menu-items" className="nav-link">Menu Items</Link>
              <Link to="/analytics" className="nav-link">Analytics</Link>

              <span className="text-[var(--muted-text)]">
                Admin: <strong>{admin.full_name || admin.email}</strong>
              </span>

              <button className="btn-danger" onClick={handleAdminLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* ======================= USER NAVBAR ======================= */}
              <Link to="/menu" className="nav-link">Menu</Link>

              {user && (
                <>
                  <Link to="/cart" className="nav-link flex items-center gap-1">
                    <FaShoppingCart size={18} /> Cart
                  </Link>

                  <Link to="/orders" className="nav-link">My Orders</Link>

                  <span className="text-[var(--muted-text)]">
                    Hi, <strong>{user.full_name}</strong>
                  </span>

                  <button className="btn-primary" onClick={handleUserLogout}>
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <>
                  <Link className="btn-primary" to="/user-login">Login</Link>
                  <Link className="btn-secondary" to="/register">Register</Link>
                </>
              )}
            </>
          )}

        </nav>
      </div>
    </header>
  );
}
