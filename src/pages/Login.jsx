import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code, password }), // gửi code thay vì email
      });

      const data = await res.json();

      if (res.ok && data?.data?.token) {
        localStorage.setItem("token", data.data.token); // lưu token nếu dùng Bearer Auth
        toast.success("Đăng nhập thành công!", { position: "top-right" });
        navigate("/"); // về trang chủ
      } else {
        toast.error("Đăng nhập thất bại: " + data.message, { position: "top-right" });
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      toast.error("Lỗi hệ thống", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center w-3/4 max-w-4xl">
        {/* Form đăng nhập */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
            Đăng Nhập
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Mã số sinh viên</label>
              <input
                type="text"
                className="w-full p-3 border rounded-full mt-1"
                placeholder="Nhập mã số sinh viên"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
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
              className="w-full bg-purple-600 text-white py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-4 text-center">
            Quên mật khẩu? <a href="#" className="text-purple-600">Khôi phục</a>
          </p>
          <p className="text-gray-600 text-sm mt-4 text-center">
            Chưa có tài khoản? <a href="#" className="text-purple-600">Đăng ký</a>
          </p>
          <p className="text-gray-600 text-sm mt-4 text-center">
        <span>Quản trị viên? </span>
       <a
           href="/admin/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Đăng nhập Admin
          </a>
        </p>
        </div>

        {/* Hình ảnh minh họa */}
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
};

export default Login;
