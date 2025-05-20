import { Drawer, Autocomplete, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateSubject,
  useUpdateSubject,
  useSubjectList, // để lấy danh sách làm prerequisite
} from "../../../hooks/useSubjects";

/* ---------- validate ---------- */
const schema = yup.object({
  subject_name: yup
    .string()
    .max(200, "Tối đa 200 ký tự")
    .matches(/^[\p{L}\d\s]+$/u, "Không chứa ký tự đặc biệt")
    .required("Tên môn bắt buộc"),
  credits: yup.number().min(1, "≥ 1").max(20, "≤ 20").required("Số tín chỉ?"),
  term: yup.number().oneOf([1, 2, 3], "Chỉ 1, 2 hoặc 3").required("Học kỳ?"),
  theory: yup.number().min(0).required(),
  practice: yup.number().min(0).required(),
  isRequired: yup.boolean(),
  prerequisites: yup.array().of(yup.number()),
});

/* ---------- component ---------- */
export default function SubjectForm({ open, onClose, defaultValues }) {
  const isEdit = !!defaultValues;

  const { data: subList = [] } = useSubjectList();

  /* react-hook-form */
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subject_name: "",
      credits: 3,
      term: "",
      theory: 3,
      practice: 0,
      isRequired: false,
      ...defaultValues,
      /* backend trả mảng đối tượng → map sang id */
      prerequisites:
        defaultValues?.prerequisites?.map((p) => p.prerequisite_subject_id) ||
        [],
    },
  });

  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();

  /* reset form mỗi lần mở/sửa */
  useEffect(() => {
    reset({
      ...defaultValues,
      prerequisites:
        defaultValues?.prerequisites?.map((p) => p.prerequisite_subject_id) ||
        [],
    });
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    const body = {
      subject: {
        subject_name: data.subject_name,
        credits: data.credits,
        term: data.term,
        isRequired: data.isRequired,
        theory: data.theory,
        practice: data.practice,
      },
      prerequisites: data.prerequisites.map((id) => ({
        prerequisite_subject_id: id,
      })),
    };

    const mutate = isEdit
      ? updateSubject.mutateAsync({ id: defaultValues.subject_id, ...body })
      : createSubject.mutateAsync(body);

    mutate
      .then(() => {
        toast.success(isEdit ? "Đã cập nhật!" : "Đã tạo môn!");
        onClose();
      })
      .catch(() => toast.error("Không thành công"));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[420px] p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-2">
          {isEdit ? "Cập nhật môn học" : "Thêm môn học"}
        </h2>

        {/* Tên môn */}
        <div>
          <input
            {...register("subject_name")}
            placeholder="Tên môn"
            className="border p-2 rounded w-full"
          />
          <p className="text-red-600 text-sm">{errors.subject_name?.message}</p>
        </div>

        {/* Credits & Term */}
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              {...register("credits")}
              type="number"
              placeholder="Tín chỉ"
              className="border p-2 rounded w-full"
            />
            <p className="text-red-600 text-sm">{errors.credits?.message}</p>
          </div>
          <div className="flex-1">
            <select
              {...register("term")}
              className="border p-2 rounded w-full"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Chọn học kỳ
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">Học kỳ hè</option>
            </select>
            <p className="text-red-600 text-sm">{errors.term?.message}</p>
          </div>
        </div>

        {/* Theory / Practice */}
        <div className="flex gap-3">
          <input
            {...register("theory")}
            type="number"
            placeholder="Số tiết lý thuyết"
            className="border p-2 rounded flex-1"
          />
          <input
            {...register("practice")}
            type="number"
            placeholder="Số tiết thực hành"
            className="border p-2 rounded flex-1"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isRequired")}
            className="w-4 h-4"
          />
          <span>Môn bắt buộc</span>
        </label>

        <div>
          <label className="block text-sm mb-1 font-medium">
            Môn tiên quyết
          </label>

          <Controller
            control={control}
            name="prerequisites"
            render={({ field }) => (
              <Autocomplete
                multiple
                options={subList.filter(
                  (s) => s.subject_id !== defaultValues?.subject_id
                )}
                getOptionLabel={(o) => o.subject_name}
                value={subList.filter((s) =>
                  field.value?.includes(s.subject_id)
                )}
                onChange={(_, newValue) =>
                  field.onChange(newValue.map((v) => v.subject_id))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Chọn môn..."
                    size="small"
                  />
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <span
                      key={option.subject_id}
                      {...getTagProps({ index })}
                      className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {option.subject_name}
                    </span>
                  ))
                }
              />
            )}
          />
        </div>

        {/* Nút */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded"
          >
            {isEdit ? "Lưu" : "Tạo"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Huỷ
          </button>
        </div>
      </form>
    </Drawer>
  );
}
