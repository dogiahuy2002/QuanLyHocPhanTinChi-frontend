import { api } from "../api";          // axios instance

export const getSubjects   = () => api.get("/subject");
export const createSubject = (body) => api.post("/subject", body);
export const updateSubject = (id, body) => api.patch(`/subject/${id}`, body);
export const deleteSubject = (id)      => api.delete(`/subject/${id}`);
