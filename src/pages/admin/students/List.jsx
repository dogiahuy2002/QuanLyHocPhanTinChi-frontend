import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useStudentList,
  useDeleteStudent,
} from "../../../hooks/useStudents";
import StudentForm from "./StudentForm";
import ConfirmDelete from "../classes/ConfirmDelete";

export default function StudentList() {
  const { data: rows = [], isLoading } = useStudentList();
  const { mutate: deleteStu } = useDeleteStudent();

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delId, setDelId] = useState(null);

  const columns = [
    { field: "student_id", headerName: "ID", width: 90 },
    { field: "code", headerName: "MSSV", width: 120 },
    { field: "student_name", headerName: "Họ tên", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.3 },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 100,
      valueGetter: (p) => (p?.value ? "Nam" : "Nữ"),
    },
    { field: "total_credits", headerName: "TC tích luỹ", width: 120 },
    { field: "status", headerName: "Trạng thái", width: 110 },
    {
      field: "actions",
      headerName: "",
      width: 120,
      renderCell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600"
            onClick={() => {
              setEditing(row);
              setOpenForm(true);
            }}
          >
            Sửa
          </button>
          <button
            className="text-red-600"
            onClick={() => setDelId(row.student_id)}
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* chỉ có sửa, chưa hỗ trợ thêm mới */}
      <div style={{ height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.student_id}
          loading={isLoading}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>

      {openForm && (
        <StudentForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditing(null);
          }}
          defaultValues={editing}
        />
      )}

      {delId && (
        <ConfirmDelete
          onConfirm={() =>
            deleteStu(delId, {
              onSuccess: () => {
                toast.success("Đã xoá!");
                setDelId(null);
              },
            })
          }
          onCancel={() => setDelId(null)}
        />
      )}
    </div>
  );
}
