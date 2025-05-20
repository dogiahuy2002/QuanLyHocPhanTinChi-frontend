import { useState } from "react";
import {
  useSubjectsHaveClass,
  useClassListBySubject,
  useDeleteClass,
} from "../../../hooks/useClasses";
import SubjectTable from "./SubjectTable";
import ClassTable from "./ClassTable";
import DetailTable from "./DetailTable";
import FormDrawer from "./FormDrawer";
import ConfirmDelete from "./ConfirmDelete";
import { toast } from "react-toastify";

export default function ClassPage() {
  /* ---------------- filter bar ---------------- */
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [term, setTerm] = useState(1);

  /* ---------------- pane #1 ---------------- */
  const { data: subjects = [], isLoading: loadingSub } = useSubjectsHaveClass(
    year,
    term
  );
  const [selectedSubject, setSelectedSubject] = useState(null);

  /* ---------------- pane #2 ---------------- */
  const { data: classes = [] } = useClassListBySubject(
    selectedSubject?.subject_id
  );
  const [selectedClass, setSelectedClass] = useState(null);

  /* ---------------- CRUD ---------------- */
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutate: deleteClass } = useDeleteClass();
  const [delId, setDelId] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Filter */}
      <div className="flex gap-4 items-center">
        <select
          className="border p-2 rounded"
          value={year}
          onChange={(e) => {
            setYear(+e.target.value);
            setSelectedSubject(null);
          }}
        >
          {[currentYear, currentYear + 1].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={term}
          onChange={(e) => {
            setTerm(+e.target.value);
            setSelectedSubject(null);
          }}
        >
          <option value="1">Kỳ 1</option>
          <option value="2">Kỳ 2</option>
          <option value="3">Kỳ hè</option>
        </select>
        <button
          onClick={() => setOpenDrawer(true)}
          className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Thêm lớp
        </button>
      </div>

      {/* ---------------- Pane 1 ---------------- */}
      <section>
        <h3 className="font-semibold mb-2">Môn học có lớp học phần</h3>
        <SubjectTable
          rows={subjects}
          selectedId={selectedSubject?.subject_id}
          onSelect={(row) => {
            setSelectedSubject(row);
            setSelectedClass(null);
          }}
        />
      </section>

      {/* ---------------- Pane 2 ---------------- */}
      {selectedSubject && (
        <section>
          <h3 className="font-semibold mb-2">
            Lớp học phần của {selectedSubject.subject_name}
          </h3>
          <ClassTable
            rows={classes}
            selectedId={selectedClass?.class_id}
            onSelect={(row) => setSelectedClass(row)}
          />
        </section>
      )}

      {/* ---------------- Pane 3 ---------------- */}
      {selectedClass && (
        <section>
          <h3 className="font-semibold mb-2">Chi tiết lớp học phần</h3>
          <DetailTable details={selectedClass.details} />
        </section>
      )}

      {/* Drawer tạo / sửa */}
      {openDrawer && (
        <FormDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          defaultValues={null}
        />
      )}

      {/* Modal xoá (sử dụng lại) */}
      {delId && (
        <ConfirmDelete
          onConfirm={() =>
            deleteClass(delId, {
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
