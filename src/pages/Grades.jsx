import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GradeTable from "../components/GradeTable";
import GradeSummary from "../components/GradeSummary";
import GradeFilter from "../components/GradeFilter";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    term: "",
    options: { years: [], terms: [] }
  });

  useEffect(() => {
    const fetchGrades = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/grades", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          setGrades(data.data);
          const years = [...new Set(data.data.map((g) => g.year))];
          const terms = [...new Set(data.data.map((g) => g.term))];
          setFilters((f) => ({ ...f, options: { years, terms } }));
          setFiltered(data.data);
        } else toast.error("Không thể lấy thông tin điểm!");
      } catch {
        toast.error("Có lỗi xảy ra khi lấy thông tin!");
      }
    };

    fetchGrades();
  }, []);

  useEffect(() => {
    let result = [...grades];
    if (filters.year) result = result.filter((g) => g.year == filters.year);
    if (filters.term) result = result.filter((g) => g.term == filters.term);
    setFiltered(result);
  }, [filters.year, filters.term, grades]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bảng điểm</h1>
      <GradeFilter filters={filters} onFilterChange={setFilters} />
      {filtered.length === 0 ? (
        <p>Không có dữ liệu phù hợp.</p>
      ) : (
        filtered.map((grade, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">
              Học kỳ {grade.term} - Năm {grade.year}
            </h2>
            <GradeTable subjects={grade.grade} />
            <GradeSummary grade={grade} />
          </div>
        ))
      )}
    </div>
  );
};

export default Grades;
