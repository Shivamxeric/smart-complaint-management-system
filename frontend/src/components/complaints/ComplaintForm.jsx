import { useState } from "react";
import fight from "../../assets/hero.png";
import { createComplaint } from "../../services/complaintService";

export default function ComplaintForm({ onComplaintCreated }) {
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [media, setMedia] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Current backend supports images.
    if (!file.type.startsWith("image/")) {
      alert("Currently only image files are supported.");
      return;
    }

    setMedia(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading.trim() || !paragraph.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await createComplaint(
        heading,
        paragraph
      );

      if (data.status === "success") {
        alert("Complaint submitted successfully! 👍");

        // Send newly created complaint to parent
        if (onComplaintCreated) {
          onComplaintCreated(data.complaint);
        }

        setHeading("");
        setParagraph("");
        setMedia(null);

        // Reset file input
        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 relative">

      {/* Heading */}

      <h2 className="font-extrabold text-3xl mb-4 text-center">
        Submit a Complaint
      </h2>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-6 rounded-3xl"
      >

        {/* Complaint Heading */}

        <div className="mb-4">

          <label className="block font-bold mb-2">
            Complain Heading
          </label>

          <input
            type="text"
            value={heading}
            onChange={(e) =>
              setHeading(e.target.value)
            }
            className="w-full border rounded px-4 py-2"
            placeholder="Enter heading"
            required
          />

        </div>

        {/* Complaint Description */}

        <div className="mb-4">

          <label className="block font-bold mb-2">
            Complain about
          </label>

          <textarea
            value={paragraph}
            onChange={(e) =>
              setParagraph(e.target.value)
            }
            className="w-full border rounded px-4 py-2"
            placeholder="Enter a complaint about all things"
            rows="5"
            required
          />

        </div>

        {/* Image */}

        <div className="mb-4">

          <label className="block font-bold mb-2">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleMediaUpload}
            className="w-full border rounded px-4 py-2"
          />

        </div>

        {/* Image Preview */}

        {media && (
          <div className="mb-4">

            <p className="text-gray-600 mb-2">
              Preview:
            </p>

            <img
              src={URL.createObjectURL(media)}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded"
            />

          </div>
        )}

        {/* Submit */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Complaint"}
        </button>

      </form>

      {/* How To Submit */}
{/* 
      <button
        className="fixed bottom-4 mb-11 right-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
        onClick={() => setShowPreview(true)}
      >
        How to submit Complaint
      </button> */}

      {/* Help Modal */}

      {/* {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">

          <div className="relative w-3/4 h-3/4 bg-white rounded-lg overflow-hidden">

            <button
              className="absolute top-2 mt-11 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setShowPreview(false)}
            >
              ✖
            </button>

            <img
              src={fight}
              alt="How to submit complaint"
              className="w-full h-full object-contain"
            />

          </div>

        </div>
      )} */}

    </div>
  );
}