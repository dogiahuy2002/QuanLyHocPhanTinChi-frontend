import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ClassAPI from "../api/class";     // ← nếu chưa dùng alias, đổi thành "../../api/class"

export const useClassList = (filters) =>
  useQuery({
    queryKey: ["classes", filters],
    queryFn: () => ClassAPI.getClasses(filters).then((r) => r.data),
  });

export const useCreateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.createClass,
    onSuccess: () => qc.invalidateQueries(["classes"]),
  });
};

export const useUpdateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) => ClassAPI.updateClass(id, body),
    onSuccess: () => qc.invalidateQueries(["classes"]),
  });
};

export const useDeleteClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.deleteClass,
    onSuccess: () => qc.invalidateQueries(["classes"]),
  });
};

/* get every subject that currently HAS class in a given year + term */
export const useSubjectsHaveClass = (year, term) =>
  useQuery({
    queryKey: ["subjects-has-class", year, term],
    queryFn: () =>
      ClassAPI.getClasses({ year, term }).then((r) => {
        // unique subjects only
        const map = new Map();
        r.data.forEach((c) => map.set(c.subject_id, c.subject));
        return Array.from(map.values());
      }),
  });

/* classes of ONE subject (pane #2) */
export const useClassListBySubject = (subjectId) =>
  useQuery({
    enabled: !!subjectId,
    queryKey: ["classes-by-subject", subjectId],
    queryFn: () =>
      ClassAPI.getClassesBySubject(subjectId).then((r) => r.data),
  });
