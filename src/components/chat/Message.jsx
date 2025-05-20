export default function Message({ message, isOwn }) {
  return (
    <div
      className={`p-3 rounded-lg max-w-[70%] ${
        isOwn ? "bg-blue-300 self-end ml-8" : "bg-gray-200 self-start"
      }`}
    >
      <div className="text-sm font-semibold">{message.sender_type}</div>
      <div>{message.content}</div>
      <div className="text-xs text-right text-gray-500">
        {message.timestamp}
      </div>
    </div>
  );
}
