import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSubjectList, useDeleteSubject } from "../../../hooks/useSubjects";
import SubjectForm from "./SubjectForm";
import ConfirmDelete from "../classes/ConfirmDelete";

export default function AdminSubjectList() {
  const { data: rows = [], isLoading } = useSubjectList();
  const { mutate: deleteSub } = useDeleteSubject();

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delId, setDelId] = useState(null);

  const columns = [
    { field: "subject_id", headerName: "ID", width: 90 },
    { field: "subject_name", headerName: "Tên môn", flex: 1 },
    { field: "credits", headerName: "TC", width: 80 },
    { field: "term", headerName: "Kỳ", width: 100 },
    {
      field: "isRequired",
      headerName: "Bắt buộc",
      width: 110,
      renderCell: ({ value }) => (value ? "✔" : "—"),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      renderCell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600"
            onClick={() => { setEditing(row); setOpenForm(true); }}
          >
            Sửa
          </button>
          <button
            className="text-red-600"
            onClick={() => setDelId(row.subject_id)}
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setOpenForm(true)}
        className="self-start px-4 py-2 bg-indigo-600 text-white rounded"
      >
        + Thêm môn
      </button>

      <div style={{ height: 550 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.subject_id}
          loading={isLoading}
        />
      </div>

      {openForm && (
        <SubjectForm
          open={openForm}
          onClose={() => { setOpenForm(false); setEditing(null); }}
          defaultValues={editing}
        />
      )}

      {delId && (
        <ConfirmDelete
          onConfirm={() =>
            deleteSub(delId, {
              onSuccess: () => { toast.success("Đã xoá!"); setDelId(null); },
            })
          }
          onCancel={() => setDelId(null)}
        />
      )}
    </div>
  );
}
