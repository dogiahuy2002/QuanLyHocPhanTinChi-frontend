const ProfileCard = ({ profile }) => {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">📘 Thông tin sinh viên</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Họ tên:</p>
            <p>{profile.student_name}</p>
          </div>
          <div>
            <p className="font-semibold">Mã sinh viên:</p>
            <p>{profile.code}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{profile.email}</p>
          </div>
          <div>
            <p className="font-semibold">Giới tính:</p>
            <p>{profile.gender}</p>
          </div>
          <div>
            <p className="font-semibold">Lớp:</p>
            <p>{profile.education.identifier_class}</p>
          </div>
          <div>
            <p className="font-semibold">Ngành:</p>
            <p>{profile.education.major}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  