import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as SubjectAPI from "../api/subject";

export const useSubjectList = () =>
  useQuery({ queryKey: ["subjects"], queryFn: () => SubjectAPI.getSubjects().then(r=>r.data.data) });

export const useCreateSubject = () => {
  const qc = useQueryClient();
  return useMutation({
   mutationFn: SubjectAPI.createSubject,
     onSuccess: () =>
         qc.invalidateQueries({ queryKey: ["subjects"] }),
     });
};

export const useUpdateSubject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) => SubjectAPI.updateSubject(id, body),
        onSuccess: () =>
          qc.invalidateQueries({ queryKey: ["subjects"] }),
      });
};

export const useDeleteSubject = () => {
  const qc = useQueryClient();
  return useMutation({
     mutationFn: SubjectAPI.deleteSubject,
     onSuccess: () =>
    qc.invalidateQueries({ queryKey: ["subjects"] }),
    });
};
