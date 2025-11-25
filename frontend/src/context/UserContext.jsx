import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // ⭐ NEW FIX

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser();
    } else {
      setLoading(false);  // ⭐ No token = no user
    }
  }, []);

  async function loadUser() {
    try {
      const res = await api.get("user/me/");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);   // ⭐ VERY IMPORTANT
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
