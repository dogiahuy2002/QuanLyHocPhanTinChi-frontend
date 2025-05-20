import { api } from "./index";

// Enum SenderType (nếu không import từ @prisma/client)
export const SenderType = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
};

// Tạo phòng chat mới
export const createChatRoom = async (student_code, admin_id) => {
  const res = await api.post("/chat/create-room", { student_code, admin_id });
  return res.data;
};

// Gửi tin nhắn
export const sendMessage = async (content, sender_type, chat_room_id) => {
  const res = await api.post("/chat/message", {
    content,
    sender_type,
    chat_room_id,
  });
  return res.data;
};

// Lấy tất cả tin nhắn theo chatRoomId
export const getMessages = async (chatRoomId) => {
  const res = await api.get(`/chat/messages/${chatRoomId}`);
  return res.data;
};

// Lấy danh sách phòng chat theo student
export const getStudentChatRooms = async (studentCode) => {
  const res = await api.get(`/chat/rooms/student/${studentCode}`);
  return res.data;
};

// Lấy tất cả phòng chat (dành cho admin)
export const getAllChatRooms = async () => {
  const res = await api.get(`/chat/rooms`);
  return res.data;
};
