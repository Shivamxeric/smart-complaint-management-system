import { useState } from "react";
import { deleteComplaint } from "../../services/complaintService";
import { toast } from "react-toastify";

export default function ComplaintCard({ complaint, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteComplaint(complaint.id);

      toast.success("Complaint deleted successfully");

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to delete complaint");
    } finally {
      setDeleting(false);
    }
  };

  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    in_progress: {
      label: "In Progress",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },
    resolved: {
      label: "Resolved",
      className: "bg-green-50 text-green-700 border-green-200",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const status =
    statusConfig[complaint.status] || {
      label: complaint.status || "Unknown",
      className: "bg-gray-50 text-gray-600 border-gray-200",
    };

  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* Top section */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <p className="text-xs font-medium text-gray-400 mb-1">
              Complaint #{complaint.id}
            </p>

            <h2 className="text-lg font-bold text-gray-800 break-words">
              {complaint.title}
            </h2>

          </div>

          <span
            className={`flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-semibold ${status.className}`}
          >
            {status.label}
          </span>

        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 leading-6 break-words">
            {complaint.description}
          </p>
        </div>

        {/* Image */}
        {complaint.image && (
          <div className="mt-4">
            <img
              src={complaint.image}
              alt="Complaint"
              className="w-full max-h-64 object-cover rounded-xl border border-gray-100"
            />
          </div>
        )}

      </div>

      {/* Bottom section */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">

        <div>
          <p className="text-xs text-gray-400">
            Submitted
          </p>

          <p className="text-sm font-medium text-gray-600 mt-0.5">
            {complaint.created_at
              ? new Date(complaint.created_at).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "—"}
          </p>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 rounded-lg border border-red-200 text-red-600 bg-white text-sm font-semibold hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>

      </div>

    </article>
  );
}