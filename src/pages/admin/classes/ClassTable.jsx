import { DataGrid } from "@mui/x-data-grid";

export default function ClassTable({ rows, onSelect, selectedId }) {
  const cols = [
    {
      field: "pick",
      headerName: "",
      width: 40,
      renderCell: ({ row }) => (
        <input
          type="radio"
          checked={row.class_id === selectedId}
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
    { field: "class_id", headerName: "Mã LHP", width: 120 },
    { field: "class_name", headerName: "Tên lớp học phần", flex: 1.2 },
    { field: "max_capacity", headerName: "Sĩ số tối đa", width: 110 },
    { field: "current_capacity", headerName: "Đã ĐK", width: 90 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: ({ row }) => (row.status ? "Mở lớp" : "Đóng"),
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={cols}
      getRowId={(r) => r.class_id}
      hideFooter
      onRowClick={(p) => onSelect(p.row)}
      getRowClassName={(p) =>
        p.row.class_id === selectedId ? "bg-indigo-50" : ""
      }
    />
  );
}
