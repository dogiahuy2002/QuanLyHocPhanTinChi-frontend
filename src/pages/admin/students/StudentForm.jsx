import { Drawer } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateStudent } from "../../../hooks/useStudents";
import { toast } from "react-toastify";

const schema = yup.object({
  student_name: yup.string().required(),
  email: yup.string().email().required(),
  status: yup.string().required(),
}).required();

export default function StudentForm({ open, onClose, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const update = useUpdateStudent();

  const onSubmit = (data) => {
    update.mutate(
      { id: defaultValues.student_id, ...data },
      {
        onSuccess: () => {
          toast.success("Đã lưu!");
          onClose();
        },
      }
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Cập nhật sinh viên</h2>

        <input
          {...register("student_name")}
          placeholder="Họ tên"
          className="border p-2 rounded"
        />
        <p className="text-red-600 text-sm">{errors.student_name?.message}</p>

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <p className="text-red-600 text-sm">{errors.email?.message}</p>

        <select {...register("status")} className="border p-2 rounded">
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>

        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white py-2 rounded"
        >
          Lưu
        </button>
      </form>
    </Drawer>
  );
}
