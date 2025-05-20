import { useEffect, useState } from "react";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [admin] = useState(null); // giữ state để không lỗi
  /* ---------- menu định sẵn ---------- */
  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Môn học", path: "/admin/subject" },
    { name: "Lớp HP", path: "/admin/class" },
    { name: "Sinh viên", path: "/admin/student" },
    { name: "Chat hỗ trỡ", path: "/admin/chat" },
  ];

  /* ---------- lấy profile admin ---------- */
  useEffect(() => {
    // if (!token) return;
    // (async () => {
    //   try {
    //     const res = await fetch("http://localhost:3000/admin/profile", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await res.json();
    //     if (res.ok) setAdmin(data.data);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // })();
  }, [token]);

  /* ---------- logout ---------- */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Đăng xuất!");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 h-screen bg-indigo-700 text-white p-5 flex flex-col">
      {/* info */}
      <div className="flex items-center gap-3 mb-6">
        <FaUserShield size={28} />
        <div>
          <h2 className="font-semibold">{admin?.full_name || "Admin"}</h2>
          <p className="text-xs text-gray-300">{admin?.email || ""}</p>
        </div>
      </div>

      {/* menu */}
      <nav className="flex-1">
        <ul className="space-y-2 text-sm">
          {menu.map(({ name, path }) => (
            <li key={path}>
              <button
                onClick={() => navigate(path)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-600"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 bg-indigo-800 hover:bg-indigo-600 px-4 py-2 rounded-lg"
      >
        <FaSignOutAlt /> Đăng xuất
      </button>
    </aside>
  );
};

export default AdminSidebar;
