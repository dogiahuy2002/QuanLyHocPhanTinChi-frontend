import { DataGrid } from "@mui/x-data-grid";

export default function DetailTable({ details = [], selectedId, onSelect }) {
  const cols = [
    {
      field: "idx",
      headerName: "STT",
      width: 60,
      valueGetter: (p) => (p ? p.api.getRowIndex(p.id) + 1 : ""),
    },
    { field: "study_time", headerName: "Lịch học", flex: 1.4 },
    { field: "group_practice", headerName: "Nhóm TH", width: 90 },
    { field: "room_name", headerName: "Phòng", width: 100 },
    { field: "towner", headerName: "Dãy", width: 70 },
  ];

  return (
    <DataGrid
      autoHeight
      rows={details}
      columns={cols}
      getRowId={(r) => r.class_detail_id}
      hideFooter
      onRowClick={(p) => onSelect?.(p.row)}
      getRowClassName={(p) =>
        p.row.class_detail_id === selectedId ? "bg-indigo-50" : ""
      }
    />
  );
}
