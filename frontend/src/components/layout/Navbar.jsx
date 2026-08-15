import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="h-16 px-5 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/home"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            S
          </div>

          <div>
            <h1 className="font-bold text-xl text-gray-800">
              SCMS
            </h1>

            <p className="text-xs text-gray-400">
              Smart Complaint Management
            </p>
          </div>
        </Link>


        {/* Right side */}

        <div className="flex items-center gap-3">

          <Link
            to="/complaints"
            className="hidden sm:block text-gray-600 hover:text-blue-600 font-medium"
          >
            My Complaints
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}