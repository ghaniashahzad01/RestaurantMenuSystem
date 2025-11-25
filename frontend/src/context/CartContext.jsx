import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();   // ⭐ Required to redirect to cart

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

  // ⭐ UPDATED addToCart — add item + go to cart page
  async function addToCart(menu_item_id, quantity = 1) {
    try {
      const exists = cart.some((item) => item.menu_item === menu_item_id);

      if (exists) {
        console.log("Item already in cart");
        navigate("/cart");    // ⭐ Redirect if item already exists
        return;
      }

      await api.post("user/cart/add/", {
        item_id: menu_item_id,
        quantity,
      });

      await loadCart();

      navigate("/cart");      // ⭐ Redirect after adding item

    } catch (err) {
      console.error("Failed to add:", err);
    }
  }

  async function removeFromCart(menu_item_id) {
    try {
      await api.post("user/cart/remove/", {
        item_id: menu_item_id,
      });
      loadCart();
    } catch (err) {
      console.error("Failed to remove:", err);
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, reload: loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
