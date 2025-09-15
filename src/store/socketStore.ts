import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import type { GameState, Player } from '../types/game';

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  roomId: string;
  gameState: GameState;
  isRoomCreator: boolean;
  players: Player[];
  connect: () => void;
  disconnect: () => void; 
  createRoom: (roomId: string, maxPlayers: string, theme: string, gridSize: number, playerName: string) => void;
  joinRoom: (roomId: string, playerName: string) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  roomId: '',
  gameState: {
    gamePhase: 'waitingForTurn',
    flippedCoins: [],
    coins: [],
    moves: 0,
    gameTimer: '',
    matchedPairs: [],
    currentTurn: '',
    restartCounter: 0,
    players: [],
  },
  isRoomCreator: false,
  players: [],
  connect: () => {
    if (get().socket?.connected) {
    console.log('Socket already connected, skipping...');
    return; 
  }

    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Connected to backend server');
      set({ isConnected: true });
    });

    socket.on('roomCreated', (data: { roomId: string, room: string }) => {
      set({ roomId: data.roomId, isConnected: true, isRoomCreator: true });
    });

    socket.on('joinRoom', (roomId: string) => {
      set({ roomId, isConnected: true, isRoomCreator: false });
    });

    socket.on('gameState', (data) => {
    set({ 
      gameState: data.gameState,
      players: data.gameState?.players || []
      });
    });

    socket.on('playerJoined', (data) => {
      
      set((state) => ({
        ...state,
        currentPlayers: data.currentPlayers,
        maxPlayers: data.maxPlayers
      }));
      
      socket.emit('getGameState', { roomId: get().roomId });
    })

    socket.on('roomError', (error: {message: string}) => {
      console.error('Room error:', error.message);
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
  createRoom: (roomId: string, maxPlayers: string, theme: string, gridSize: number, playerName: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('createRoom', { roomId, maxPlayers, theme, gridSize, playerName });
    }
  },

  joinRoom: (roomId: string, playerName: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('joinRoom', { roomId, playerName });
    }
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false, roomId: '', players: [] });
    }
  },
}));