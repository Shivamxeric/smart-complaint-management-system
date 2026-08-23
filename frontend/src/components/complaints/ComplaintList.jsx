import { useEffect, useState } from "react";
import ComplaintCard from "./ComplaintCard";
import { getComplaints } from "../../services/complaintService";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getComplaints();

      setComplaints(data.complaints || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading complaints...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Complaints
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage your submitted complaints.
        </p>
      </div>

      {complaints.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">📋</div>

          <h2 className="text-lg font-semibold text-gray-700">
            No complaints yet
          </h2>

          <p className="text-gray-500 mt-1">
            Your submitted complaints will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onDeleted={loadComplaints}
            />
          ))}
        </div>
      )}

    </section>
  );
}