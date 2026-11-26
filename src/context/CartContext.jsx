import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("dibitech_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [toastProduct, setToastProduct] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("dibitech_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });

    // Tampilkan notifikasi toast
    setToastProduct(product);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToastProduct(null);
    }, 1000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)).filter((item) => item.qty > 0));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}

      {/* Floating Toast Notification */}
      {toastProduct && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-[calc(100%-2.5rem)] bg-[#0f172a] text-white border border-slate-700 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 animate-bounce-once">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-emerald-400">Ditambahkan ke Keranjang</p>
              <p className="text-xs text-slate-200 truncate">{toastProduct.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/cart"
              onClick={() => setToastProduct(null)}
              className="text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1.5 rounded-lg transition">
              Lihat
            </Link>
            <button onClick={() => setToastProduct(null)} aria-label="Tutup notifikasi" className="text-slate-400 hover:text-white p-1">
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
