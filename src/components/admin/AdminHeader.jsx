import { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUserShield } from "react-icons/fa";

const AdminHeader = () => {
  const [admin, setAdmin] = useState(null);
  const token = localStorage.getItem("adminToken");

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

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-3 border-t-4 border-indigo-600">
      {/* search */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          className="ml-2 bg-transparent outline-none flex-1"
          placeholder="Tìm kiếm..."
        />
      </div>

      {/* bell */}
      <div className="relative p-2 bg-gray-200 rounded-full">
        <FaBell className="text-gray-500" />
        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          3
        </span>
      </div>

      {/* admin info */}
      <div className="flex items-center gap-2 bg-gray-200 rounded-full pl-2 pr-6">
        <FaUserShield className="text-indigo-600" size={22} />
        <div>
          <p className="font-semibold text-sm">
            {admin?.full_name || "Admin"}
          </p>
          <p className="text-xs text-gray-500">{admin?.email || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
