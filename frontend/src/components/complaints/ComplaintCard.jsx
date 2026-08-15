import { useState } from "react";
import { deleteComplaint } from "../../services/complaintService";

export default function ComplaintCard({
  complaint,
  onDeleted,
}) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const data = await deleteComplaint(complaint.id);

      if (data.status === "success") {
        onDeleted(complaint.id);
      }
    } catch (error) {
      console.error("Delete complaint error:", error);

      alert(
        error.message ||
          "Unable to delete complaint."
      );
    } finally {
      setDeleting(false);
    }
  };

  const description = complaint.description || "";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Complaint content */}

      <div className="p-5">

        <div className="flex justify-between items-start gap-3">

          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {complaint.title}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Complaint #{complaint.id}
            </p>
          </div>

          {/* Delete */}

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-500 hover:text-red-700 text-lg disabled:opacity-50"
            title="Delete complaint"
          >
            {deleting ? "..." : "🗑️"}
          </button>

        </div>

        {/* Description */}

        <div className="mt-4 text-gray-600">

          <p>
            {expanded
              ? description
              : description.length > 120
              ? `${description.slice(0, 120)}...`
              : description}
          </p>

          {description.length > 120 && (
            <button
              onClick={() =>
                setExpanded((previous) => !previous)
              }
              className="text-blue-600 hover:text-blue-800 text-sm mt-2"
            >
              {expanded
                ? "Show Less"
                : "Read More"}
            </button>
          )}

        </div>

        {/* Status */}

        <div className="mt-4">

          <span
            className={`
              inline-block
              px-3
              py-1
              rounded-full
              text-sm
              font-medium
              ${
                complaint.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : complaint.status === "in_progress"
                  ? "bg-blue-100 text-blue-700"
                  : complaint.status === "resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {complaint.status
              ?.replace("_", " ")
              .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
              )}
          </span>

        </div>

        {/* Date */}

        {complaint.created_at && (
          <p className="text-xs text-gray-400 mt-3">
            {new Date(
              complaint.created_at
            ).toLocaleString()}
          </p>
        )}

      </div>

    </div>
  );
}