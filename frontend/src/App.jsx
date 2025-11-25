import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";        // ADMIN
import UserProtectedRoute from "./components/UserProtectedRoute"; // USER

// USER MODULE
import UserRegister from "./user/UserRegister";
import UserLogin from "./user/UserLogin";
import UserMenu from "./user/UserMenu";
import Cart from "./user/Cart";
import Checkout from "./user/Checkout";
import OrderSuccess from "./user/OrderSuccess";
import OrderHistory from "./user/OrderHistory";

// ADMIN MODULE
import Landing from "./pages/Landing";
import AdminLogin from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import MenuItems from "./pages/MenuItems";
import AddCategory from "./pages/AddCategory";
import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";
import Specials from "./pages/Specials";
import Analytics from "./pages/Analytics";
import AdminNotifications from "./pages/AdminNotifications";

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Layout 
      admin={admin} 
      setAdmin={setAdmin} 
      user={user} 
      setUser={setUser}
    >
      <Routes>
        <Route path="/" element={<Landing admin={admin} />} />
        
        <Route path="/admin-login" element={<AdminLogin setAdmin={setAdmin} />} />

        <Route path="/user-login" element={<UserLogin setUser={setUser} />} />
        <Route path="/register" element={<UserRegister />} />

        <Route path="/dashboard" element={<ProtectedRoute admin={admin}><Dashboard /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute admin={admin}><Categories /></ProtectedRoute>} />
        <Route path="/add-category" element={<ProtectedRoute admin={admin}><AddCategory /></ProtectedRoute>} />
        <Route path="/menu-items" element={<ProtectedRoute admin={admin}><MenuItems /></ProtectedRoute>} />
        <Route path="/add-menu-item" element={<ProtectedRoute admin={admin}><AddMenuItem /></ProtectedRoute>} />
        <Route path="/edit-menu-item/:id" element={<ProtectedRoute admin={admin}><EditMenuItem /></ProtectedRoute>} />
        <Route path="/specials" element={<ProtectedRoute admin={admin}><Specials /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute admin={admin}><Analytics /></ProtectedRoute>} />
        
 
       <Route path="/admin/notifications" element={<AdminNotifications />} />

        <Route path="/menu" element={<UserMenu />} />
        <Route path="/cart" element={<UserProtectedRoute user={user}><Cart /></UserProtectedRoute>} />
        <Route path="/checkout" element={<UserProtectedRoute user={user}><Checkout /></UserProtectedRoute>} />
        <Route path="/order-success/:id" element={<UserProtectedRoute user={user}><OrderSuccess /></UserProtectedRoute>} />
        <Route path="/orders" element={<UserProtectedRoute user={user}><OrderHistory /></UserProtectedRoute>} />
      </Routes>
    </Layout>
  );
}
