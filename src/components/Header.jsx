import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Users, PackagePlus, LogOut, LogIn, UserCheck, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const [navActive, setNavActive] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setNavActive(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 font-medium transition ${isActive ? "text-indigo-400" : "text-[#94a3b8] hover:text-white"}`;

  return (
    <header className="bg-[#0f172a] border-b border-[#1e293b] sticky top-0 z-50">
      <div className="container-main flex justify-between items-center h-[70px] relative">
        <Link to="/" onClick={() => setNavActive(false)} className="flex items-center gap-[10px] font-bold text-[1.2rem]">
          <img src="/images/logo.png" alt="Logo DibiTech" className="w-8 h-8 rounded-lg object-contain" />
          <span className="text-white tracking-[-0.5px]">DibiTech</span>
        </Link>

        <button
          onClick={() => setNavActive(!navActive)}
          aria-label="Toggle Menu"
          className="md:hidden text-white p-2 rounded-lg hover:bg-slate-800 transition">
          {navActive ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          className={`${
            navActive ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 list-none text-[0.9rem] absolute md:static top-[70px] left-0 w-full md:w-auto bg-[#0f172a] md:bg-transparent border-b md:border-none border-[#1e293b] p-5 md:p-0 shadow-xl md:shadow-none`}>
          <li className="w-full md:w-auto">
            <NavLink to="/" onClick={() => setNavActive(false)} className={navLinkClass}>
              Marketplace
            </NavLink>
          </li>

          <li className="w-full md:w-auto">
            <NavLink to="/users" onClick={() => setNavActive(false)} className={navLinkClass}>
              <Users size={16} />
              <span>Users</span>
              {!isAuthenticated && <Lock size={12} className="text-slate-500" />}
            </NavLink>
          </li>

          <li className="w-full md:w-auto">
            <NavLink to="/manage-products" onClick={() => setNavActive(false)} className={navLinkClass}>
              <PackagePlus size={16} />
              <span>Seller Center</span>
              {!isAuthenticated && <Lock size={12} className="text-slate-500" />}
            </NavLink>
          </li>

          <li className="w-full md:w-auto">
            <NavLink to="/cart" onClick={() => setNavActive(false)} className={navLinkClass}>
              <div className="relative flex items-center gap-1.5">
                <ShoppingBag size={17} />
                <span>Cart</span>
                {totalItems > 0 && <span className="bg-indigo-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">{totalItems}</span>}
              </div>
            </NavLink>
          </li>

          {isAuthenticated ? (
            <li className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 pt-2 md:pt-0 border-t md:border-none border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-800/80 border border-slate-700 px-2.5 py-1.5 rounded-lg">
                <UserCheck size={14} className="text-indigo-400" />
                <span className="font-semibold">{user?.username || "Member"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/40 px-3 py-1.5 rounded-lg transition">
                <LogOut size={14} />
                Logout
              </button>
            </li>
          ) : (
            <li className="w-full md:w-auto pt-2 md:pt-0 border-t md:border-none border-slate-800">
              <Link to="/login" onClick={() => setNavActive(false)} className="btn-primary !py-1.5 !px-4 !text-xs w-full md:w-auto">
                <LogIn size={14} />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
