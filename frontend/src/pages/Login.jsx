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

      if (!res.data.is_staff) {
        setError("Not an admin account.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data));
      setAdmin(res.data);
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--dark-bg)] px-4">

      <div className="w-full max-w-md bg-[var(--dark-card)] p-8 rounded-xl shadow-lg border border-[rgba(212,165,116,0.2)]">

        <h2 className="text-3xl font-serif text-[var(--gold)] text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-[var(--muted-text)] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2A2521] text-[var(--warm-text)] 
                         border border-[#3a332d] focus:outline-none focus:ring-2 
                         focus:ring-[var(--gold)] transition"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--muted-text)] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-[#2A2521] text-[var(--warm-text)] 
                         border border-[#3a332d] focus:outline-none focus:ring-2 
                         focus:ring-[var(--gold)] transition"
            />
          </div>

          <button
            className="w-full mt-4 py-2 rounded-md bg-[var(--gold)] text-black font-semibold 
                       hover:opacity-90 transition"
          >
            Login
          </button>

          {error && (
            <div className="text-[var(--danger)] text-sm text-center mt-2">
              {error}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
