import { useEffect, useState } from "react";
import ChatBox from "../../components/chat/ChatBox";
import { getAllChatRooms } from "../../api/chatApi";

export default function AdminChatPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const data = await getAllChatRooms();
        setChatRooms(data);
        if (data.length > 0) setSelectedRoomId(data[0].chat_room_id);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách phòng chat", err);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Chat hỗ trợ sinh viên
      </h1>

      <div className="flex gap-4">
        {/* Danh sách phòng chat */}
        <div className="w-1/3 border rounded p-2 bg-gray-100 max-h-[500px] overflow-y-auto">
          <p className="text-lg font-bold mb-4 text-green-600">
            Danh sách sinh viên cần hỗ trợ
          </p>
          {chatRooms.map((room) => {
            const lastMessage = room.messages.length
              ? room.messages[room.messages.length - 1]
              : null;

            const isAdminSender = lastMessage?.sender_type === "ADMIN";

            return (
              <div
                key={room.chat_room_id}
                className={`p-2 cursor-pointer rounded ${
                  selectedRoomId === room.chat_room_id
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedRoomId(room.chat_room_id)}
              >
                <div className="font-semibold">
                  {room.student?.student_name || "Không rõ tên"}
                </div>
                <div className="text-sm text-gray-600 truncate max-w-full">
                  {lastMessage
                    ? isAdminSender
                      ? `Bạn: ${lastMessage.content}`
                      : lastMessage.content
                    : "Chưa có tin nhắn"}
                </div>
                <div className="text-xs text-gray-400">
                  {lastMessage
                    ? new Date(lastMessage.timestamp).toLocaleString()
                    : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat box */}
        <div className="flex-1">
          {selectedRoomId ? (
            <>
              {(() => {
                const selectedRoom = chatRooms.find(
                  (room) => room.chat_room_id === selectedRoomId
                );
                return (
                  <ChatBox
                    chatRoomId={selectedRoomId}
                    currentUserType="ADMIN"
                    currentUserName="Admin"
                    studentName={
                      selectedRoom?.student?.student_name || "Không rõ tên"
                    }
                  />
                );
              })()}
            </>
          ) : (
            <div>Chọn phòng chat</div>
          )}
        </div>
      </div>
    </div>
  );
}
