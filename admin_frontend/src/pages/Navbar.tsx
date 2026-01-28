import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogOut } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="h-14 w-full flex items-center justify-between border-b border-border px-10 text-white shadow-md"
      style={{ backgroundColor: "var(--brand-red)" }}
    >
      <h1 className="text-2xl font-semibold">Admin Portal</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 bg-white text-red-700 rounded-full hover:bg-red-200 transition-colors"
        >
          <FiUser size={20} />
        </button>

      {open && (
  <div className="absolute left-1/2 mt-3 w-25 -translate-x-1/2 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-2  px-3 py-2 w-full hover:bg-red-600 hover:text-white transition-colors font-medium"
    >
      <FiLogOut size={16} />
      Logout
    </button>
  </div>
)}


      </div>
    </header>
  );
}
