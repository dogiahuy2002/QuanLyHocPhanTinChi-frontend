import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useClassList, useDeleteClass } from "../../../hooks/useClasses"; // bạn sẽ tạo ở hooks
import FormDrawer from "./FormDrawer";
import ConfirmDelete from "./ConfirmDelete";

export default function AdminClassList() {
  /* ----- filter ----- */
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [subject, setSubject] = useState("");

  const filters = {
    year: year || undefined,
    term: term || undefined,
    subject_id: subject || undefined,
  };

  /* ----- query ----- */
  const { data = [], isLoading } = useClassList(filters);

  const rows = useMemo(
    () =>
      data.map((c) => ({
        ...c,
        subjectDisplay: c.subject_name || c.subject?.subject_name || "—",
        capacityDisplay: `${c.current_capacity}/${c.max_capacity}`,
      })),
    [data]
  );

  /* ----- drawer / delete ----- */
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delId, setDelId] = useState(null);
  const { mutate: deleteClass } = useDeleteClass();

  /* ----- datagrid columns ----- */
  const columns = [
    { field: "class_id", headerName: "ID", width: 90 },
    { field: "class_name", headerName: "Tên lớp", flex: 1 },
    {
      field: "subjectDisplay",
      headerName: "Môn học",
      flex: 1.2,
    },
    { field: "professor_name", headerName: "Giảng viên", flex: 1 },
    { field: "year", headerName: "Năm", width: 80 },
    { field: "term", headerName: "HK", width: 70 },
    {
      field: "capacityDisplay",
      headerName: "Sĩ số",
      width: 110,
    },
    {
      field: "isEnrolling",
      headerName: "Đang DK?",
      width: 120,
      renderCell: ({ value }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {value ? "Mở" : "Đóng"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600"
            onClick={() => {
              setEditing(row);
              setOpenDrawer(true);
            }}
          >
            Sửa
          </button>
          <button
            className="text-red-600"
            onClick={() => setDelId(row.class_id)}
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];

  /* ----- render ----- */
  return (
    <div className="flex flex-col gap-4">
      {/* Filter bar */}
      <div className="flex gap-4">
        <select
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Năm</option>
          {[2021, 2022, 2023, 2024].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        >
          <option value="">Học kỳ</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <input
          placeholder="Subject ID"
          className="border p-2 rounded w-40"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => setOpenDrawer(true)}
        >
          + Thêm lớp
        </button>
      </div>

      {/* Bảng dữ liệu */}
      <div style={{ height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.class_id}
          loading={isLoading}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>

      {/* Drawer tạo / sửa */}
      {openDrawer && (
        <FormDrawer
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            setEditing(null);
          }}
          defaultValues={editing}
        />
      )}

      {/* Modal xoá */}
      {delId && (
        <ConfirmDelete
          onConfirm={() =>
            deleteClass(delId, {
              onSuccess: () => {
                toast.success("Đã xoá lớp!");
                setDelId(null);
              },
              onError: () => toast.error("Xoá thất bại"),
            })
          }
          onCancel={() => setDelId(null)}
        />
      )}
    </div>
  );
}
