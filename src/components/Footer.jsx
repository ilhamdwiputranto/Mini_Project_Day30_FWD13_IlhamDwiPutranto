import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#1e293b] pt-10 pb-8 text-center text-[#94a3b8] text-[0.85rem] bg-[#0f172a] mt-16">
      <div className="container-main">
        <ul className="flex justify-center gap-6 sm:gap-10 mb-6 list-none flex-wrap">
          <li>
            <Link to="/" className="hover:text-white transition">
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-white transition">
              Users
            </Link>
          </li>
          <li>
            <Link to="/manage-products" className="hover:text-white transition">
              Seller Center
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-white transition">
              Account Access
            </Link>
          </li>
        </ul>

        <div className="flex justify-center gap-[15px] mb-5">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="group w-8 h-8 rounded-full border border-[#334155] bg-[#1e293b] flex items-center justify-center hover:border-[#6366f1] hover:bg-[#6366f1] transition">
            <img src="https://cdn.simpleicons.org/x/94a3b8" alt="x" className="w-3.5 h-3.5 group-hover:brightness-0 group-hover:invert transition" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="group w-8 h-8 rounded-full border border-[#334155] bg-[#1e293b] flex items-center justify-center hover:border-[#6366f1] hover:bg-[#6366f1] transition">
            <img
              src="https://cdn.simpleicons.org/instagram/94a3b8"
              alt="instagram"
              className="w-3.5 h-3.5 group-hover:brightness-0 group-hover:invert transition"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="group w-8 h-8 rounded-full border border-[#334155] bg-[#1e293b] flex items-center justify-center hover:border-[#6366f1] hover:bg-[#6366f1] transition">
            <img
              src="https://cdn.simpleicons.org/facebook/94a3b8"
              alt="facebook"
              className="w-3.5 h-3.5 group-hover:brightness-0 group-hover:invert transition"
            />
          </a>
        </div>

        <p className="text-[0.78rem] text-[#64748b]">&copy; 2026 DibiTech. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
