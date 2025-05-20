import { io } from "socket.io-client";

export const socket = io("https://quanlyhocphantinchi-backend.onrender.com", {
  transports: ["websocket"],
});
