import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  roomId: string;
  
  connect: () => void;
  disconnect: () => void; 
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  roomId: '',

  connect: () => {
    const existingSocket = get().socket;
    if (existingSocket?.connected) return;

    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Connected to backend server');
      set({ isConnected: true });
    });

    socket.on('roomCreated', (data: { roomId: string, room: string }) => {
      set({ roomId: data.roomId, isConnected: true });
    });

    socket.on('roomError', (error: {message: string}) => {
      console.error('Room error:', error.message);
    });

    socket.on('joinRoom', (roomId: string) => {
      set({ roomId, isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend server');
      set({ isConnected: false });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      set({ isConnected: false });
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false, roomId: '' });
    }
  },
}));