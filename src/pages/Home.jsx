import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfileCard from "../components/Home/ProfileCard";
import GPAChart from "../components/Home/GPAChart";
import CreditStats from "../components/Home/CreditStats";
import FilterBar from "../components/Home/FilterBar";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("all");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const [profileRes, gradesRes] = await Promise.all([
        fetch("http://localhost:3000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/grades", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const profileData = await profileRes.json();
      const gradesData = await gradesRes.json();

      if (profileRes.ok && gradesRes.ok) {
        setProfile(profileData.data);
        setGrades(gradesData.data);
        setFilteredGrades(gradesData.data);
      } else {
        toast.error("Không thể lấy dữ liệu từ server!");
      }
    } catch (error) {
      toast.error("Lỗi khi gọi API!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTerm === "all") {
      setFilteredGrades(grades);
    } else {
      const filtered = grades.filter((g) => `${g.term}/${g.year}` === selectedTerm);
      setFilteredGrades(filtered);
    }
  }, [selectedTerm, grades]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 bg-white shadow-md px-6 py-3 border-t-4 border-purple-500">
        <div>
          {profile && <ProfileCard profile={profile} />}
          <div className="mt-2"><FilterBar grades={grades} setSelectedTerm={setSelectedTerm} /></div>
        </div>
        <CreditStats grades={filteredGrades} />
      </div>
        <GPAChart grades={filteredGrades} />
    </div>
  );
};

export default Home;