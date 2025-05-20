import { api } from "../api";          // axios instance dùng adminToken

export const getStudents   = () => api.get("/admin/students");
export const updateStudent = (id, body) => api.patch(`/admin/students/${id}`, body);
export const deleteStudent = (id) => api.delete(`/admin/students/${id}`);
