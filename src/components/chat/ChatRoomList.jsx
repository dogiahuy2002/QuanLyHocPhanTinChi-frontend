export default function ChatRoomList({ chatRooms, onSelect, selectedRoomId }) {
  return (
    <div className="space-y-2 overflow-y-auto">
      {chatRooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelect(room.id)}
          className={`p-3 border rounded cursor-pointer ${
            selectedRoomId === room.id ? "bg-blue-100" : "hover:bg-gray-100"
          }`}
        >
          <div className="font-semibold">{room.name}</div>
        </div>
      ))}
    </div>
  );
}
