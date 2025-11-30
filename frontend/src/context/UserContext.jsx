import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ RESTORE USER FROM STORAGE ON REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
}
