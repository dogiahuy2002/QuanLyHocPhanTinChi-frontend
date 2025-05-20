import { DataGrid } from "@mui/x-data-grid";

export default function SubjectTable({ rows, onSelect, selectedId }) {
  const cols = [
    {
      field: "pick",
      headerName: "",
      width: 40,
      renderCell: ({ row }) => (
        <input
          type="radio"
          checked={row.subject_id === selectedId}
          onChange={() => onSelect(row)}
        />
      ),
    },
    {
      field: "idx",
      headerName: "STT",
      width: 60,
      valueGetter: (p) => (p ? p.api.getRowIndex(p.id) + 1 : ""),
    },
    { field: "subject_id", headerName: "Mã HP", width: 120 },
    { field: "subject_name", headerName: "Tên môn học", flex: 1.3 },
    { field: "credits", headerName: "TC", width: 60 },
    {
      field: "isRequired",
      headerName: "Bắt buộc",
      width: 90,
      renderCell: ({ value }) => (value ? "✔" : "—"),
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={cols}
      getRowId={(r) => r.subject_id}
      hideFooter
      onRowClick={(p) => onSelect(p.row)}
      getRowClassName={(p) =>
        p.row.subject_id === selectedId ? "bg-indigo-50" : ""
      }
    />
  );
}
