import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function UserProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="text-center p-10 text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/user-login" replace />;
  }

  return children;
}
