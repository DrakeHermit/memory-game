import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import type { Player } from '../types/game';

interface ServerGameState {
  roomId: string;
  players: Player[];
  gameStarted: boolean;
  playerId: string;
  flippedCoins: number[];
  matchedPairs: number[];
  isProcessing: boolean;
  theme: string;
  gridSize: number;
  coins: Array<{
    id: number;
    value: number | string;
  }>;
}

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  roomId: string;
  gameState: ServerGameState | null;
  isRoomCreator: boolean;
  players: Player[];
  connect: () => void;
  disconnect: () => void; 
  createRoom: (roomId: string, maxPlayers: string, theme: string, gridSize: number, playerName: string) => void;
  joinRoom: (roomId: string, playerName: string) => void;
  changeName: (roomId: string, playerName: string) => void;
  toggleReady: (roomId: string) => void;
  startGame: (roomId: string) => void;
  flipCoin: (coinId: number, roomId: string) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  roomId: '',
  gameState: null,
  isRoomCreator: false,
  players: [],
  connect: () => {
    if (get().socket?.connected) {
    return; 
  }
    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
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

    socket.on('playerNameChanged', (data: { playerId: string; newName: string }) => {
      set((state) => ({
        ...state,
        players: state.players.map(player => 
          player.id === data.playerId 
            ? { ...player, name: data.newName }
            : player
        )
      }));
    });

    socket.on('disconnect', () => {
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
  changeName: (roomId: string, newName: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('changePlayerName', { roomId, newName });
    }
  },
  toggleReady: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('togglePlayerReady', { roomId });
    }
  },
  startGame: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('startGame', { roomId });
    }
  },
  flipCoin: (coinId: number, roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('flipCoin', { coinId, roomId });
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