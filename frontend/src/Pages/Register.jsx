import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../constants/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Please enter username");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter email");
      return;
    }

    if (!form.password) {
      toast.error("Please enter password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/register/`, {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Account created successfully 🎉");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg fun">
      <div className="card glow">

        <h2>Create Account ✨</h2>

        <p className="text-sm text-gray-500 mb-5">
          Create your SCMS account to submit and track complaints.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            name="username"
            placeholder="👤 Username"
            value={form.username}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="email"
            type="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="password"
            type="password"
            placeholder="🔐 Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Join Now 🎉"}
          </button>

        </form>

        <div className="mt-4">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            Already user? Login 🔐
          </span>
        </div>

      </div>
    </div>
  );
}