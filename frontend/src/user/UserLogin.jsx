import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function UserLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("user/login/", { email, password });
      setUser(res.data); // backend returns serialized user
      // optional: fetch /api/user/me/ to confirm
      navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-xl mb-4">User Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="btn-primary">Login</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
