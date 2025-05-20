import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const menu = [
    { name: "Trang chủ", path: "/" },
    { name: "Môn học", path: "/subject" },
    { name: "Lịch học", path: "/schedule" },
    { name: "Điểm", path: "/grades" },
    { name: "Chat yêu cầu hỗ trợ", path: "/student/chat" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.status === 200) {
          setUser(data.data);
        } else {
          toast.error("Không thể lấy thông tin người dùng");
        }
      } catch (error) {
        console.error("Lỗi hệ thống:", error);
        toast.error("Lỗi máy chủ");
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        document.cookie = "token=; Max-Age=0"; // dọn sạch cookie phía client
        localStorage.removeItem("token");
        toast.success("Đăng xuất thành công!");
        setUser(null); // reset user state
        navigate("/login");
      } else {
        toast.error("Đăng xuất thất bại!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi đăng xuất.");
    }
  };

  return (
    <aside className="w-64 h-screen bg-purple-700 text-white p-5 flex flex-col shadow-md">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-6">
        <FaUser className="text-3xl text-white" />
        <div>
          <h2 className="font-semibold text-lg">
            {user?.student_name || "Đang tải..."}
          </h2>
          <p className="text-sm text-gray-300">{user ? "Sinh viên" : ""}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menu.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center gap-2 py-2 px-4 bg-purple-800 hover:bg-purple-600 rounded-lg transition-colors"
      >
        <FaSignOutAlt />
        <span>Đăng xuất</span>
      </button>
    </aside>
  );
};

export default Sidebar;
