import { api } from "./index";

export const getClasses = (params) =>
  api.get("/admin/class", { params });        // year, term, subject_id

export const createClass = (body) =>
  api.post("/admin/class", body);

export const updateClass = (id, body) =>
  api.patch(`/admin/class/${id}`, body);

export const deleteClass = (id) =>
  api.delete(`/admin/class/${id}`);

export const getClassesBySubject = (subjectId) =>
  api.get(`/classes/subject/${subjectId}`); 