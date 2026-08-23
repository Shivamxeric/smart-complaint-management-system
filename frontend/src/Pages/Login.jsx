import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

import { API_BASE_URL } from "../constants/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= EMAIL LOGIN =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://127.0.0.1:8000/login/", {
        const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE");
      console.log(data);

      if (data.status === "success" && data.token) {
        localStorage.setItem("token", data.token);

        console.log("TOKEN SAVED");
        console.log(localStorage.getItem("token"));

        toast.success("Login Successful 🎉");

        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        toast.error(data.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  // ================= GOOGLE LOGIN =================

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        // "http://127.0.0.1:8000/google-login/",
        // "https://auth-ye7t.onrender.com/google-login/",
        `${API_BASE_URL}/google-login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();

      console.log("GOOGLE RESPONSE");
      console.log(data);

      if (data.status === "success" && data.token) {
        localStorage.setItem("token", data.token);

        console.log("GOOGLE TOKEN SAVED");
        console.log(localStorage.getItem("token"));

        toast.success("Google Login Successful 🎉");

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error(data.message || "Google Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="bg">
      <div className="card">
        <h2>Welcome Back 🔐</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Login 🚀</button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error("Google Login Failed");
            }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            New user? Register 😎
          </span>
        </div>
      </div>
    </div>
  );
}