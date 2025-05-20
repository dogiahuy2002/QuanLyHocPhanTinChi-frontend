import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");       // backend thường login bằng email
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();            // { access_token: "…" }

      if (res.ok && data.access_token) {
        localStorage.setItem("adminToken", data.access_token);
        toast.success("Admin login thành công!");
        navigate("/admin");                     // sang dashboard admin
      } else {
        toast.error(`Đăng nhập thất bại: ${data.message || "Sai thông tin"}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi hệ thống");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center w-3/4 max-w-4xl">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-full mt-1"
                placeholder="admin@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Mật khẩu</label>
              <input
                type="password"
                className="w-full p-3 border rounded-full mt-1"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-full font-bold hover:bg-indigo-700 transition"
            >
              Đăng nhập
            </button>
          </form>
        </div>

        <div className="w-1/2 hidden md:flex justify-center">
        <img
            src="/loginBG.png"
            alt="Login Illustration"
            className="w-3/4"
          />
        </div>
      </div>
    </div>
  );
}
