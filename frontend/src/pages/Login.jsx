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
      // backend returns username on success
      if (res.data.username) {
        setUser({ username: res.data.username });
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Check credentials.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
}
