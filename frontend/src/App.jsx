import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./services/api";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import MenuItems from "./pages/MenuItems";
import AddCategory from "./pages/AddCategory";
import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";
import Specials from "./pages/Specials";
import Analytics from "./pages/Analytics";

export default function App() {
  const [user, setUser] = useState(null);

  // Try to detect session (optional)
  useEffect(() => {
    // You may implement a /me endpoint; for now, no auto-check.
    // If you create /api/me/ to return current logged-in user, call it here and setUser.
  }, []);

  return (
    <BrowserRouter>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/categories" element={
            <ProtectedRoute user={user}>
              <Categories />
            </ProtectedRoute>
          } />

          <Route path="/add-category" element={
            <ProtectedRoute user={user}>
              <AddCategory />
            </ProtectedRoute>
          } />

          <Route path="/menu-items" element={<MenuItems />} />

          <Route path="/add-menu-item" element={
            <ProtectedRoute user={user}>
              <AddMenuItem />
            </ProtectedRoute>
          } />

          <Route path="/edit-menu-item/:id" element={
            <ProtectedRoute user={user}>
              <EditMenuItem />
            </ProtectedRoute>
          } />

          <Route path="/specials" element={<Specials />} />
          <Route path="/analytics" element={
            <ProtectedRoute user={user}>
              <Analytics />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
