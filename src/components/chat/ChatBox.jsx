import { useEffect, useState, useRef } from "react";
import { socket } from "../../socket";
import dayjs from "dayjs";
import classNames from "classnames";
import { getMessages, sendMessage as sendMessageApi } from "../../api/chatApi"; // ✅ Import API

export default function ChatBox({
  chatRoomId,
  currentUserType,
  currentUserName,
  studentName,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", chatRoomId);
    fetchMessages();

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receive_message");
  }, [chatRoomId]);

  const fetchMessages = async () => {
    try {
      const data = await getMessages(chatRoomId);
      setMessages(data);
    } catch (err) {
      console.error("Lỗi khi lấy tin nhắn:", err);
    }
  };
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const message = {
      content: input,
      sender_type: currentUserType,
      chat_room_id: chatRoomId,
      sender_name: currentUserName,
    };

    socket.emit("send_message", message); // ✅ chỉ emit socket
    setInput(""); // clear input
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="border rounded-xl p-4 h-[500px] flex flex-col bg-white shadow-md">
      <div className="overflow-y-auto flex-1 space-y-2">
        {messages.map((msg, idx) => {
          const isCurrentUserSender =
            msg.sender_type.toLowerCase() === currentUserType.toLowerCase();

          return (
            <div
              key={idx}
              className={classNames(
                "flex w-full",
                isCurrentUserSender ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={classNames(
                  "max-w-[70%] p-3 rounded-lg",
                  isCurrentUserSender
                    ? "bg-yellow-300 text-right"
                    : "bg-gray-200 text-left"
                )}
              >
                <div className="text-sm font-semibold">
                  {msg.sender_type === "ADMIN"
                    ? "Admin"
                    : msg.sender_name || studentName || "Student"}
                </div>
                <div>{msg.content}</div>
                <div className="text-xs text-gray-500">
                  {dayjs(msg.timestamp).format("HH:mm")}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
