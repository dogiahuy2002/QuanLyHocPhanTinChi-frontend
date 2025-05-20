import { useEffect, useState } from "react";
import ChatBox from "../components/chat/ChatBox";
import { getStudentChatRooms, createChatRoom } from "../api/chatApi";

export default function StudentChatPage() {
  const [chatRoomId, setChatRoomId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.data); // lấy user từ API
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
      }
    };

    fetchUser();
  }, []);
  console.log("user", user);

  useEffect(() => {
    const initChat = async () => {
      if (!user) return;
      try {
        const studentCode = Number(user.code);
        console.log("code", studentCode);
        const rooms = await getStudentChatRooms(studentCode);
        console.log("room", rooms);
        if (rooms.length > 0) {
          setChatRoomId(rooms[0].chat_room_id);
        } else {
          console.log("creating room with:", studentCode);
          const newRoom = await createChatRoom(parseInt(studentCode), 1);
          console.log("newroom", newRoom);
          setChatRoomId(newRoom.chat_room_id);
        }
      } catch (err) {
        console.error("Lỗi khởi tạo chat", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [user]);

  if (loading) return <div>Đang tải phòng chat...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chat với Admin</h1>
      {chatRoomId ? (
        <ChatBox
          chatRoomId={chatRoomId}
          currentUserType="STUDENT"
          currentUserName={user.student_name}
          studentName={user.student_name}
        />
      ) : (
        <div>Không thể khởi tạo phòng chat</div>
      )}
    </div>
  );
}
