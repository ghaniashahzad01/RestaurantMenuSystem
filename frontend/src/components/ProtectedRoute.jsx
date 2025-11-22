import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ admin, children }) {
  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}