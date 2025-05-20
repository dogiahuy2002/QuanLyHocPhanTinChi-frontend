import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as StudentAPI from "../api/student";

export const useStudentList = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: () => StudentAPI.getStudents().then((r) => r.data),
  });

export const useUpdateStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) => StudentAPI.updateStudent(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
};

export const useDeleteStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: StudentAPI.deleteStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
};
