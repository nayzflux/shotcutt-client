import { io } from "socket.io-client";

const HOST = process.env.NEXT_PUBLIC_API_HOST!;

const socket = io(HOST, {
  withCredentials: true,
});

export default socket;
