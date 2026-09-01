import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../constants/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminId || !password) {
      toast.error("Enter admin ID and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/admin-login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: adminId,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("adminToken", data.token);

        toast.success("Admin access granted");

        setTimeout(() => {
          navigate("/admin");
        }, 500);
      } else {
        toast.error(data.message || "Invalid admin credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
  if (sessionStorage.getItem("adminShortcut") !== "true") {
    navigate("/home");
  }
}, [navigate]);

  return (
    <div className="bg">
      <div className="card">

        <h2>Admin Access</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Access"}
          </button>

        </form>

      </div>
    </div>
  );
}