import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";         // ADMIN
import UserProtectedRoute from "./components/UserProtectedRoute"; // USER
import { Toaster } from "react-hot-toast";

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
import AdminOrders from "./pages/AdminOrders";

import StripeSuccess from "./user/StripeSuccess";
import PaymentFailed from "./user/PaymentFailed";

export default function App() {

  // ⭐ ADMIN STATE (ADMIN CONTEXT NAHI HAI → THIS IS OK)
  const [admin, setAdmin] = useState(null);

  // ⭐ Restore admin from storage
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* ⭐ REMOVE user + setUser — USER CONTEXT WILL HANDLE IT */}

      <Layout admin={admin} setAdmin={setAdmin}>
        <Routes>

          {/* ======================= PUBLIC ROUTES ======================= */}
          <Route path="/" element={<Landing admin={admin} />} />

          {/* ======================= ADMIN AUTH ======================= */}
          <Route path="/admin-login" element={<AdminLogin setAdmin={setAdmin} />} />

          {/* ======================= USER AUTH ======================= */}
          {/* ⭐ UserLogin no longer receives setUser */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

          {/* ======================= USER ROUTES ======================= */}
          <Route path="/menu" element={<UserMenu />} />

          <Route path="/cart" element={
            <UserProtectedRoute>
              <Cart />
            </UserProtectedRoute>
          } />

          <Route path="/checkout" element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          } />

          <Route path="/order-success/:id" element={
            <UserProtectedRoute>
              <OrderSuccess />
            </UserProtectedRoute>
          } />

          <Route path="/orders" element={
            <UserProtectedRoute>
              <OrderHistory />
            </UserProtectedRoute>
          } />

          {/* ======================= ADMIN ROUTES ======================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute admin={admin}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/categories" element={
            <ProtectedRoute admin={admin}>
              <Categories />
            </ProtectedRoute>
          } />

          <Route path="/add-category" element={
            <ProtectedRoute admin={admin}>
              <AddCategory />
            </ProtectedRoute>
          } />

          <Route path="/menu-items" element={
            <ProtectedRoute admin={admin}>
              <MenuItems />
            </ProtectedRoute>
          } />

          <Route path="/add-menu-item" element={
            <ProtectedRoute admin={admin}>
              <AddMenuItem />
            </ProtectedRoute>
          } />

          <Route path="/edit-menu-item/:id" element={
            <ProtectedRoute admin={admin}>
              <EditMenuItem />
            </ProtectedRoute>
          } />

          <Route path="/specials" element={
            <ProtectedRoute admin={admin}>
              <Specials />
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute admin={admin}>
              <Analytics />
            </ProtectedRoute>
          } />

          <Route path="/admin/orders" element={
            <ProtectedRoute admin={admin}>
              <AdminOrders />
            </ProtectedRoute>
          } />

          <Route path="/admin/notifications" element={
            <ProtectedRoute admin={admin}>
              <AdminNotifications />
            </ProtectedRoute>
          } />

          {/* ======================= PAYMENT ROUTES ======================= */}
          <Route path="/stripe-success" element={<StripeSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />

        </Routes>
      </Layout>
    </>
  );
}
