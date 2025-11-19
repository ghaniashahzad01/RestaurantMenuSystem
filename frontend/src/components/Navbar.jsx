import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("logout/");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header className="w-full shadow-md" style={{ background: "#1A1714" }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-[var(--gold)] text-2xl font-serif">
          🍽 Royal Dine
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/menu-items" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Menu</Link>
          <Link to="/specials" className="text-[var(--warm-text)] hover:text-[var(--gold)]">Specials</Link>

          {user ? (
            <>
              <span className="text-[var(--muted-text)]">Hi, <strong>{user.username}</strong></span>
              <button className="btn-primary" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link className="btn-primary" to="/login">Admin Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
