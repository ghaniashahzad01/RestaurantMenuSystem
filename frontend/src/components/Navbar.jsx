import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("logout/");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Restaurant Menu</Link>

        <div className="flex items-center gap-4">
          <Link to="/menu-items" className="hover:underline">Menu</Link>
          <Link to="/categories" className="hover:underline">Categories</Link>
          <Link to="/analytics" className="hover:underline">Analytics</Link>

          {user ? (
            <>
              <span className="text-sm">Hi, {user.username}</span>
              <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
