import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ClassAdmin() {
  // --- state lọc ---
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [classes, setClasses] = useState([]);

  const token = localStorage.getItem("adminToken");

  // --- call API ---
  const fetchClasses = async () => {
    try {
      const params = new URLSearchParams();
      if (year) params.append("year", year);
      if (term) params.append("term", term);
      if (subjectId) params.append("subject_id", subjectId);

      const res = await fetch(
        `http://localhost:3000/admin/class?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      if (res.ok) setClasses(data.data);
      else toast.error(data.message || "Không lấy được lớp");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi máy chủ");
    }
  };

  // --- đầu tiên & mỗi khi filter đổi ---
  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, term, subjectId]);

  /* ========================= render ========================= */
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-indigo-700">Quản lý Lớp học phần</h1>

      {/* --- Filter Bar --- */}
      <div className="flex flex-wrap items-end gap-4 bg-white p-4 shadow rounded-lg">
        <div>
          <label className="block text-sm text-gray-600">Năm</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded w-32"
            placeholder="2025"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Học kỳ</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="border p-2 rounded w-32"
          >
            <option value="">Tất cả</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600">Mã môn</label>
          <input
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border p-2 rounded w-32"
            placeholder="VD: 101"
          />
        </div>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={fetchClasses}
        >
          <FaSearch /> Tìm
        </button>
      </div>

      {/* --- Bảng lớp --- */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-3 py-2">Mã lớp</th>
              <th className="px-3 py-2">Tên lớp</th>
              <th className="px-3 py-2">Mã môn</th>
              <th className="px-3 py-2">Giảng viên</th>
              <th className="px-3 py-2">Sức chứa</th>
              <th className="px-3 py-2">Đang đăng ký</th>
              <th className="px-3 py-2">Năm</th>
              <th className="px-3 py-2">Học kỳ</th>
              <th className="px-3 py-2">Trạng thái</th>
              {/* thêm nút Sửa/Xoá sau này */}
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr key={c.class_id} className="border-b">
                  <td className="px-3 py-2">{c.class_id}</td>
                  <td className="px-3 py-2">{c.class_name}</td>
                  <td className="px-3 py-2">{c.subject_id}</td>
                  <td className="px-3 py-2">{c.professor_name}</td>
                  <td className="px-3 py-2">
                    {c.current_capacity}/{c.max_capacity}
                  </td>
                  <td className="px-3 py-2">
                    {c.isEnrolling ? "Mở" : "Đóng"}
                  </td>
                  <td className="px-3 py-2">{c.year}</td>
                  <td className="px-3 py-2">{c.term}</td>
                  <td className="px-3 py-2">
                    {c.status ? "Hoạt động" : "Đã đóng"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
