import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ComplaintForm from "../components/complaints/ComplaintForm";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  setUser("Manage and track your complaints easily.");
}, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Welcome Section */}
      <div className="px-4 pt-6">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome 👋
          </h1>

          <p className="text-gray-500 mt-2">
            {user}
          </p>
        </div>

        {/* Complaint Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          {/* <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Submit a Complaint
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Tell us about the issue you are facing.
            </p>
          </div> */}

          <ComplaintForm />

        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

          <button
            onClick={() => navigate("/complaints")}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:border-blue-200 transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                📋
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  My Complaints
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  View your submitted complaints
                </p>
              </div>

            </div>
          </button>

          <button
            onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth",
            })}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:border-blue-200 transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                📝
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  New Complaint
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Submit another complaint
                </p>
              </div>

            </div>
          </button>

        </div>

      </div>

    </div>
  );
}