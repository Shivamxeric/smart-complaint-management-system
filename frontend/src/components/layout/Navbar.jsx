import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-5 md:px-7 sticky top-0 z-40">

      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          SC
        </div>

        <div>
          <h1 className="text-base font-bold text-gray-800 leading-tight">
            Smart Complaint
          </h1>

          <p className="text-xs text-gray-400">
            Management System
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate("/home")}
          className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
        >
          Home
        </button>

        <button
          onClick={() => navigate("/complaints")}
          className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
        >
          My Complaints
        </button>

        <div className="h-7 w-px bg-gray-200 hidden sm:block" />

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}