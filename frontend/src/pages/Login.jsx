import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("login/", { username, password });

      if (res.data.username) {
        setUser({ username: res.data.username });
        navigate("/dashboard"); // Redirect on success
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Check credentials.");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-serif text-[var(--gold)] mb-4 text-center">
          Admin Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[var(--muted-text)] text-sm mb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button className="btn-primary w-full">Login</button>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-[var(--danger)] text-sm text-center">
              {error}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
