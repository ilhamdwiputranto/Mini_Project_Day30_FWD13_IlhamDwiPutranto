import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Baca keranjang yang tersimpan, kalau belum ada: kosong
  const [cart] = useState(() => {
    const saved = localStorage.getItem("dibitech_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return <CartContext.Provider value={{ totalItems }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
