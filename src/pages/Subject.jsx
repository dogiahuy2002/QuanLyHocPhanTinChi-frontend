import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage (hoặc nơi bạn lưu)
  
        const res = await fetch("http://localhost:3000/subject", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token lên server
          },
        });
  
        const data = await res.json();
  
        if (res.ok) {
          setSubjects(data.data);
        } else {
          console.error("Lỗi API:", data.message || res.statusText);
        }
      } catch (err) {
        console.error("Lỗi lấy danh sách môn học:", err);
      }
    };
  
    fetchSubjects();
  }, []);

  const columns = [
    { field: "subject_id", headerName: "ID", width: 100 },
    { field: "subject_name", headerName: "Tên môn học", width: 250 },
    { field: "credits", headerName: "Số tín chỉ", width: 120 },
    {
      field: "isRequired",
      headerName: "Bắt buộc",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Bắt buộc" color="primary" />
        ) : (
          <Chip label="Tự chọn" variant="outlined" />
        ),
    },
    { field: "term", headerName: "Học kỳ", width: 110 },
    { field: "theory", headerName: "LT", width: 80 },
    { field: "practice", headerName: "TH", width: 80 },
    {
      field: "status",
      headerName: "Đã qua",
      width: 110,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Đã qua" color="success" />
        ) : (
          <Chip label="Chưa qua" color="warning" />
        ),
    },
    {
        field: "prerequisites",
        headerName: "Học phần tiên quyết",
        width: 200,
        valueGetter: (params) => {
          const prerequisites = params.row?.prerequisites || [];
          return prerequisites.length > 0
            ? prerequisites.map(p => p.prerequisite_subject_id).join(", ")
            : "Không";
        }
    }
  ];

  return (
    <Box p={3}>
      <h2 className="text-2xl font-bold mb-4">Danh sách môn học</h2>
      <Box height={600}>
        <DataGrid
          rows={subjects.map((s) => ({ id: s.subject_id, ...s }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default Subject;
