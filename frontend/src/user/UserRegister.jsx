import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function UserRegister() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("user/register/", { full_name, email, password });
      navigate("/user-login");
    } catch (err) {
      setError(JSON.stringify(err.response?.data || err.message));
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={full_name} onChange={e=>setFullName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="btn-primary">Register</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
