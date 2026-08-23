import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <aside className="hidden md:flex w-64 flex-shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">

      <div className="w-full p-5">

        {/* Menu title */}
        <div className="mb-4 px-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          <NavLink
            to="/home"
            className={linkClass}
          >
            <span className="w-6 text-center text-lg">
              🏠
            </span>

            <span>
              Home
            </span>
          </NavLink>

          <NavLink
            to="/complaints"
            className={linkClass}
          >
            <span className="w-6 text-center text-lg">
              📋
            </span>

            <span>
              My Complaints
            </span>
          </NavLink>

        </nav>


        {/* Bottom information */}
        <div className="mt-8 pt-6 border-t border-gray-100">

          <div className="bg-blue-50 rounded-xl p-4">

            <div className="text-lg mb-2">
              💡
            </div>

            <h3 className="text-sm font-semibold text-gray-800">
              Need help?
            </h3>

            <p className="text-xs text-gray-500 mt-1 leading-5">
              Submit your complaint and track its status from your complaints page.
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}