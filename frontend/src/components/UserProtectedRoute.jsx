import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/user-login" replace />;
  }
  return children;
}
