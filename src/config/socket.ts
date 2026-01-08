import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

let io: IOServer | null = null;

export function initSocket(server: HttpServer) {
  io = new IOServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket: Socket) => {
    console.log('Socket connected:', socket.id);
    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket not initialized. Call initSocket(server) first.');
  return io;
}
