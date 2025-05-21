import { io } from "socket.io-client";
import { baseURL } from "./api/index";

export const socket = io(baseURL, {
  transports: ["websocket"],
});
