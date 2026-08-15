import { useState } from "react";
import ComplaintForm from "../components/complaints/ComplaintForm";
import ComplaintList from "../components/complaints/ComplaintList";

export default function Complaints() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleComplaintCreated = () => {
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <div className="min-h-screen">

      <ComplaintForm
        onComplaintCreated={handleComplaintCreated}
      />

      <ComplaintList
        refreshKey={refreshKey}
      />

    </div>
  );
}