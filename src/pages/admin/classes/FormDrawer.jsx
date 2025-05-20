import { Drawer, TextField, MenuItem, Autocomplete } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateClass,
  useUpdateClass,
  useClassList,
} from "../../../hooks/useClasses";
import { useSubjectList } from "../../../hooks/useSubjects";

const BLOCK_LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const FLOORS = [1, 2, 3];
const ROOMS = Array.from({ length: 15 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const TYPES = [
  { v: "LT", label: "Lý thuyết" },
  { v: "TH", label: "Thực hành" },
];
const today = new Date();
const currentYear = today.getFullYear();
function isTermPast(term, year) {
  const start = new Date(
    year,
    term === 1 ? 7 : term === 2 ? 0 : 4, // 7 = Aug, 0 = Jan, 4 = May
    1
  );
  return start < today;
}
const detailSchema = yup.object({
  type: yup.string().oneOf(["LT", "TH"]).required(),
  day: yup.string().oneOf(DAYS).required(),
  start: yup.number().min(1).max(16).required(),
  end: yup
    .number()
    .min(1)
    .max(16)
    .moreThan(yup.ref("start"), "Tiết kết thúc > bắt đầu")
    .required(),
  block: yup.string().oneOf(BLOCK_LETTERS).required(),
  floor: yup.number().oneOf(FLOORS).required(),
  room_no: yup.string().oneOf(ROOMS).required(),
  group_practice: yup.number().min(1).required(),
});
const schema = yup.object({
  class_name: yup
    .string()
    .max(100)
    .matches(/^[\p{L}\d\s\-]+$/u)
    .required(),
  subject_id: yup.number().required(),
  professor_name: yup.string().max(100).required(),
  year: yup
    .number()
    .min(currentYear, `Không nhỏ hơn ${currentYear}`)
    .max(2100)
    .required(),
  term: yup
    .number()
    .oneOf([1, 2, 3])
    .required()
    .test("term-not-past", "Học kỳ đã trôi qua", function (value) {
      const y = this.parent.year || currentYear;
      return !isTermPast(value, y);
    }),
  max_capacity: yup.number().min(1).max(500).required(),
  details: yup.array().of(detailSchema).min(1, "Thêm ít nhất 1 lịch học"),
});

export default function FormDrawer({ open, onClose, defaultValues }) {
  const isEdit = !!defaultValues;
  const { data: subjects = [] } = useSubjectList();
  const { data: allClasses = [] } = useClassList({});
  const professorSuggest = [
    ...new Set(allClasses.map((c) => c.professor_name)),
  ];

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      year: currentYear,
      term: 1,
      details: [
        {
          type: "LT",
          day: "Thứ 2",
          start: 1,
          end: 3,
          block: "A",
          floor: 1,
          room_no: "01",
          group_practice: 1,
        },
      ],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });
  const create = useCreateClass();
  const update = useUpdateClass();

  const onSubmit = (raw) => {
    const classDetails = raw.details.map((d) => {
      const room_name = `${d.block}${d.floor}.${d.room_no}`;
      const study_time = `${d.type} - ${d.day}(T${d.start} -> T${d.end})`;
      return {
        study_time,
        group_practice: d.group_practice,
        room_name,
        towner: d.block,
      };
    });

    const payload = {
      ...raw,
      classDetails,
      status: true,
      isEnrolling: true,
    };
    delete payload.details;

    const action = isEdit
      ? update.mutateAsync({
          id: defaultValues.class_id,
          ...payload,
          details: classDetails,
        })
      : create.mutateAsync(payload);

    action.then(() => {
      toast.success(isEdit ? "Đã cập nhật lớp!" : "Đã tạo lớp!");
      reset();
      onClose();
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[46vw] p-6 flex flex-col gap-4 overflow-y-auto"
      >
        <h2 className="text-xl font-bold">
          {isEdit ? "Cập nhật lớp" : "Thêm lớp"}
        </h2>

        {/* -------- Thông tin chung -------- */}
        <TextField
          label="Tên lớp"
          size="small"
          {...register("class_name")}
          error={!!errors.class_name}
          helperText={errors.class_name?.message}
        />

        <Controller
          name="subject_id"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Môn học" size="small">
              {subjects.map((s) => (
                <MenuItem key={s.subject_id} value={s.subject_id}>
                  {s.subject_name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="professor_name"
          control={control}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={professorSuggest}
              value={field.value || null}
              onChange={(_, v) => field.onChange(v)}
              onInputChange={(_, v) => field.onChange(v)}
              renderInput={(params) => (
                <TextField {...params} label="Giảng viên" size="small" />
              )}
            />
          )}
        />

        <div className="flex gap-3">
          <TextField
            label="Năm"
            type="number"
            size="small"
            {...register("year")}
          />
          <TextField {...register("term")} select label="Học kỳ" size="small">
            {[1, 2, 3].map((t) => (
              <MenuItem
                key={t}
                value={t}
                disabled={isTermPast(t, watch("year") || currentYear)}
              >
                {t === 3 ? "3 (Hè)" : t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Sĩ số tối đa"
            type="number"
            size="small"
            {...register("max_capacity")}
          />
        </div>

        {/* -------- Lịch học -------- */}
        <h4 className="font-semibold mt-3">Lịch học</h4>

        {fields.map((item, idx) => {
          /* helpers */
          const blockPath = `details.${idx}.block`;
          const floorPath = `details.${idx}.floor`;
          const roomPath = `details.${idx}.room_no`;
          return (
            <div
              key={item.id}
              className="border p-3 rounded-md bg-gray-50 flex flex-col gap-3"
            >
              {/* row 1: Type + Day + Tiết */}
              <div className="flex gap-2">
                <Controller
                  name={`details.${idx}.type`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Loại" size="small">
                      {TYPES.map((t) => (
                        <MenuItem key={t.v} value={t.v}>
                          {t.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name={`details.${idx}.day`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Ngày" size="small">
                      {DAYS.map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <TextField
                  label="Từ tiết"
                  type="number"
                  size="small"
                  {...register(`details.${idx}.start`)}
                  sx={{ width: 90 }}
                />
                <TextField
                  label="Đến tiết"
                  type="number"
                  size="small"
                  {...register(`details.${idx}.end`)}
                  sx={{ width: 90 }}
                />
              </div>

              {/* row 2: Block - Floor - Room + group */}
              <div className="flex gap-2">
                <Controller
                  name={blockPath}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={BLOCK_LETTERS}
                      value={field.value || null}
                      onChange={(_, v) =>
                        field.onChange(v?.toUpperCase() || "")
                      }
                      onInputChange={(_, v) => field.onChange(v.toUpperCase())}
                      renderInput={(p) => (
                        <TextField {...p} label="Tòa" size="small" />
                      )}
                    />
                  )}
                />

                <Controller
                  name={floorPath}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Tầng" size="small">
                      {FLOORS.map((f) => (
                        <MenuItem key={f} value={f}>
                          {f}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name={roomPath}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Phòng" size="small">
                      {ROOMS.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <TextField
                  label="Nhóm TH"
                  type="number"
                  size="small"
                  {...register(`details.${idx}.group_practice`)}
                  sx={{ width: 100 }}
                />

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="text-red-600 text-sm"
                  >
                    Xoá
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              type: "LT",
              day: "Thứ 2",
              start: 1,
              end: 3,
              block: "A",
              floor: 1,
              room_no: "01",
              group_practice: 0,
            })
          }
          className="text-indigo-600"
        >
          + Thêm lịch
        </button>

        {errors.details && (
          <p className="text-red-600 text-sm">{errors.details.message}</p>
        )}

        {/* ---- action ---- */}
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
