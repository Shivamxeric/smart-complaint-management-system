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

    fetch("https://auth-ye7t.onrender.com/home/", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((res) => res.json())

      .then((data) => {

        if (data.status !== "success") {

          localStorage.removeItem("token");

          navigate("/");

        } else {

          setUser(data.message);

        }

      })

      .catch(() => {

        navigate("/");

      });

  }, [navigate]);


  return (

    <div className="min-h-screen bg-gray-100">

      {/* Welcome */}

      <div className="px-6 pt-6">

        <h1 className="text-3xl font-bold">
          Welcome 🎉
        </h1>

        <p className="text-gray-600 mt-1">
          {user}
        </p>

      </div>


      {/* Complaint Form */}

      <ComplaintForm />

    </div>

  );
}