import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm import này

const RegistrationNavigate = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Simulated API response
    setStudentData({
      name: 'Huỳnh Võ Công Lĩnh',
      gender: 'Nam',
      mssv: '20060611',
      status: 'Đang học',
      avatar: '/portrait.jpg',
      studentInfo: {
        course: '2020 - 2021',
        educationLevel: 'Đại học',
        major: 'Kỹ thuật phần mềm',
        department: 'Khoa Công nghệ Thông tin',
        class: 'Đại học Kỹ thuật phần mềm 16B - 7480103',
        trainingType: 'Chính quy',
        specializedMajor: 'Kỹ thuật phần mềm - 7480103',
        campus: 'Cơ sở 1 (Thành phố Hồ Chí Minh)',
      },
    });
  }, []);

  const handleLogout = () => {
    // Thêm các xử lý đăng xuất ở đây nếu cần
    // Ví dụ: xóa token, clear localStorage...
    // localStorage.removeItem('token');
    // localStorage.removeItem('userData');
    
    // Điều hướng về trang login
    navigate('/login');
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  const { name, gender, mssv, status, avatar, studentInfo } = studentData;

  return (
    <div id="contain" className="p-6">
      <section className="content py-4">
        <div className="max-w-6xl mx-auto">
          <div id="sec_thongtin" className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center border p-4 rounded shadow bg-white">
              <div className="w-full md:w-1/3 flex">
                <div className="flex-1">
                  <p className="text-sm">Xin chào!</p>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p>
                    <span className="font-semibold">Giới tính:</span>
                    <span className="ml-1">{gender}</span>
                  </p>
                  <p>
                    <span className="font-semibold">MSSV:</span>
                    <span className="ml-1">{mssv}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Trạng thái:</span>
                    <span className="ml-1">{status}</span>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  >
                    Đăng xuất
                  </button>
                </div>
                <div className="w-1/3 flex justify-center items-center ml-4">
                  <div className="avatar">
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 mt-4 md:mt-0 flex justify-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="/DangKyHocPhan/ThongTinPortal"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <span className="mr-1">&#x25B6;</span>
                    Thông tin sinh viên
                  </a>
                  <a
                    href="/DangKyHocPhan"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <span className="mr-1">&#x25B6;</span>
                    Đăng ký học phần
                  </a>
                  <a
                    href="/ChuongTrinhKhung"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <span className="mr-1">&#x25B6;</span>
                    Chương trình khung
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="sec_hososv">
            <div className="info-account border p-4 rounded shadow bg-white">
              <h2 className="text-2xl font-bold mb-4">Thông tin sinh viên</h2>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <p>
                    Khóa: <b>{studentInfo.course}</b>
                  </p>
                  <p>
                    Bậc đào tạo: <b>{studentInfo.educationLevel}</b>
                  </p>
                  <p>
                    Ngành: <b>{studentInfo.major}</b>
                  </p>
                  <p>
                    Khoa: <b>{studentInfo.department}</b>
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <p>
                    Lớp: <b>{studentInfo.class}</b>
                  </p>
                  <p>
                    Loại hình đào tạo: <b>{studentInfo.trainingType}</b>
                  </p>
                  <p>
                    Chuyên ngành: <b>{studentInfo.specializedMajor}</b>
                  </p>
                  <p>
                    Cơ sở: <b>{studentInfo.campus}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationNavigate;