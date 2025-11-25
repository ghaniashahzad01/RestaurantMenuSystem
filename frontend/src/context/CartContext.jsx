import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

  // ⭐ ADD ITEM + REDIRECT
  async function addToCart(menu_item_id, quantity = 1) {
    try {
      const exists = cart.some((item) => item.menu_item === menu_item_id);

      if (exists) {
        navigate("/cart");
        return;
      }

      await api.post("user/cart/add/", {
        item_id: menu_item_id,
        quantity,
      });

      await loadCart();
      navigate("/cart");

    } catch (err) {
      console.error("Failed to add:", err);
    }
  }

  // ⭐ NEW — UPDATE QUANTITY (+ / -)
  async function updateQuantity(menu_item_id, quantity) {
    if (quantity < 1) return; // STOP below 1

    try {
      await api.post("user/cart/update/", {
        item_id: menu_item_id,
        quantity,
      });

      await loadCart();

    } catch (err) {
      console.error("Failed to update quantity:", err);
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
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        reload: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
