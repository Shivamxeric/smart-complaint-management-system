import { useEffect, useState } from "react";
import { getComplaints } from "../../services/complaintService";
import ComplaintCard from "./ComplaintCard";

export default function ComplaintList({ refreshKey }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const data = await getComplaints();

      if (data.status === "success") {
        setComplaints(data.complaints);
      }
    } catch (error) {
      console.error(
        "Error loading complaints:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [refreshKey]);

  const handleDeleted = (deletedId) => {
    setComplaints((previous) =>
      previous.filter(
        (complaint) => complaint.id !== deletedId
      )
    );
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          Loading complaints...
        </p>
      </div>
    );
  }

  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold mb-6 text-center">
        My Complaints
      </h2>

      {complaints.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No complaints to display!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onDeleted={handleDeleted}
            />
          ))}

        </div>
      )}

    </section>
  );
}