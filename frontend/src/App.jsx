import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect } from "react";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Complaints from "./Pages/Complaints";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// ================= ADMIN SHORTCUT =================

function AdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.code === "KeyX"
      ) {
        e.preventDefault();

        console.log("ADMIN SHORTCUT DETECTED");

        sessionStorage.setItem(
          "adminShortcut",
          "true"
        );

        navigate("/admin-login");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [navigate]);

  return null;
}


// ================= APP LAYOUT =================

function AppLayout() {

  const location = useLocation();

  // Pages without Navbar / Sidebar / Footer
  const publicPages = [
    "/",
    "/register",
    "/admin-login",
  ];

  const isPublicPage =
    publicPages.includes(location.pathname);


  // ================= PUBLIC PAGES =================

  if (isPublicPage) {

    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
        />

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

        </Routes>
      </>
    );
  }


  // ================= LOGGED-IN PAGES =================

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 min-w-0">

          <Routes>

            <Route
              path="/home"
              element={<Home />}
            />

            <Route
              path="/complaints"
              element={<Complaints />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

          </Routes>

        </main>

      </div>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

    </div>
  );
}


// ================= APP =================

function App() {

  return (
    <BrowserRouter>

      <AdminShortcut />

      <AppLayout />

    </BrowserRouter>
  );
}


export default App;