import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <aside className="hidden md:block w-64 min-h-[calc(100vh-64px)] bg-white border-r">

      <div className="p-4">

        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
          Menu
        </p>

        <nav className="space-y-2">

          <NavLink
            to="/home"
            className={linkClass}
          >
            <span>🏠</span>
            <span>Home</span>
          </NavLink>


          <NavLink
            to="/complaints"
            className={linkClass}
          >
            <span>📋</span>
            <span>My Complaints</span>
          </NavLink>

        </nav>


        <div className="mt-8 pt-6 border-t">

          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
            Support
          </p>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            onClick={() =>
              alert(
                "For help, please contact the support team."
              )
            }
          >
            <span>❓</span>
            <span>Help & Support</span>
          </button>

        </div>

      </div>

    </aside>
  );
}