import { useMemo } from "react";
import { useClassList } from "../../hooks/useClasses";     
import { useSubjectList } from "../../hooks/useSubjects"; 
import { useStudentList } from "../../hooks/useStudents"; 

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  /* ---------- fetch ---------- */
  const { data: classes = [] }  = useClassList({}); 
  const { data: subjects = [] } = useSubjectList();
  const { data: students = [] } = useStudentList();

  /* ---------- widget data ---------- */
  const widget = [
    { label: "Môn học",   value: subjects.length },
    { label: "Lớp HP",    value: classes.length },
    { label: "Sinh viên", value: students.length },
    { label: "Thông báo", value: 0 },          
  ];

  /* ---------- chart data ---------- */
  const chartData = useMemo(() => {
    const map = {};
    classes.forEach((c) => {
      const key = `HK${c.term}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([k, v]) => ({ term: k, count: v }));
  }, [classes]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>

      {/* Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {widget.map((w) => (
          <div
            key={w.label}
            className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center"
          >
            <p className="text-3xl font-bold text-indigo-600">{w.value}</p>
            <span className="text-sm text-gray-500">{w.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-4">Lớp học phần theo học kỳ</h3>
        {chartData.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có dữ liệu.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
