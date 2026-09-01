import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_BASE_URL } from "../constants/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/home");
      return;
    }

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/complaints/admin/complaints/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await res.json();

      if (data.status !== "success") {
        toast.error(data.message || "Access denied");
        navigate("/home");
        return;
      }

      setComplaints(data.complaints || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (complaintId, newStatus) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/complaints/admin/complaints/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            complaint_id: complaintId,
            status: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Status updated");

        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.id === complaintId
              ? {
                  ...complaint,
                  status: newStatus,
                }
              : complaint
          )
        );
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/home");
  };

  const pending = complaints.filter(
    (c) => c.status === "pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "in_progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "resolved"
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading complaints...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and monitor complaints
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
        >
          Admin Logout
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-gray-500 text-sm">
            Total
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {complaints.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-gray-500 text-sm">
            Pending
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {pending}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-gray-500 text-sm">
            In Progress
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {inProgress}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-gray-500 text-sm">
            Resolved
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {resolved}
          </h2>
        </div>

      </div>

      {/* Complaints */}
      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">
            All Complaints
          </h2>
        </div>

        {complaints.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No complaints found.
          </div>

        ) : (

          <div className="divide-y">

            {complaints.map((complaint) => (

              <div
                key={complaint.id}
                className="p-5"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3 className="font-semibold text-lg text-gray-800">
                      {complaint.title}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {complaint.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      Complaint #{complaint.id}
                    </p>

                  </div>

                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      updateStatus(
                        complaint.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="in_progress">
                      In Progress
                    </option>

                    <option value="resolved">
                      Resolved
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>
                  </select>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}