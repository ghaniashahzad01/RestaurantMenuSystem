import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin({ setAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("admin/login/", { email, password });

      console.log("ADMIN LOGIN RESPONSE:", res.data);

      if (res.data.is_staff) {
        setAdmin(res.data);
        navigate("/dashboard");
      } else {
        setError("Not an admin account.");
      }

    } catch (err) {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md">

        <h2 className="text-2xl font-serif text-[var(--gold)] mb-4 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <button className="btn-primary w-full">Login</button>

          {error && <div className="text-[var(--danger)] text-sm text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}
