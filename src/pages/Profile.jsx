import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.data);
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="text-center mt-10 text-lg">Đang tải...</div>;

  return (
    <div className="px-10 py-2 bg-white shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 border-b pb-2">
        Hồ sơ sinh viên
      </h2>

      <div className="grid grid-cols-2 gap-6 text-gray-800">
        <div>
          <p className="font-semibold">Họ và tên:</p>
          <p>{user.student_name}</p>
        </div>
        <div>
          <p className="font-semibold">Mã số sinh viên:</p>
          <p>{user.code}</p>
        </div>

        <div>
          <p className="font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Trạng thái:</p>
          <p>{user.status === "active" ? "Đang học" : "Không hoạt động"}</p>
        </div>

        <div>
          <p className="font-semibold">Giới tính:</p>
          <p>{user.gender ? "Nam" : "Nữ"}</p>
        </div>
        <div>
          <p className="font-semibold">Tổng tín chỉ đã tích lũy:</p>
          <p>{user.total_credits}</p>
        </div>

        <div>
          <p className="font-semibold">Số môn đã qua:</p>
          <p>{user.numberSubjectPass}</p>
        </div>

        <div>
          <p className="font-semibold">Khóa học:</p>
          <p>{user.education.course}</p>
        </div>
        <div>
          <p className="font-semibold">Trình độ đào tạo:</p>
          <p>{user.education.training_level}</p>
        </div>
        <div>
          <p className="font-semibold">Hệ đào tạo:</p>
          <p>{user.education.training_type}</p>
        </div>

        <div>
          <p className="font-semibold">Ngành:</p>
          <p>{user.education.major}</p>
        </div>
        <div>
          <p className="font-semibold">Khoa:</p>
          <p>{user.education.faculty}</p>
        </div>

        <div>
          <p className="font-semibold">Cơ sở:</p>
          <p>{user.education.facility}</p>
        </div>
        <div>
          <p className="font-semibold">Lớp:</p>
          <p>{user.education.identifier_class}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
