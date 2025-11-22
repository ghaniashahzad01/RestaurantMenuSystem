import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const res = await api.get("user/cart/");
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }

  async function addToCart(menu_item, quantity = 1) {
    try {
      await api.post("user/cart/add/", { item_id: menu_item, quantity });
      loadCart();
    } catch (err) {
      console.error("Failed to add:", err);
    }
  }

  async function removeFromCart(menu_item) {
    try {
      await api.post("user/cart/remove/", { item_id: menu_item });
      loadCart();
    } catch (err) {
      console.error("Failed to remove:", err);
    }
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    reload: loadCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
