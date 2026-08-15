import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Complaints from "./Pages/Complaints";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AppLayout() {

  const location = useLocation();

  const publicPages = [
    "/",
    "/register",
  ];

  const isPublicPage =
    publicPages.includes(location.pathname);


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

        </Routes>
      </>
    );
  }


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


function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}


export default App;