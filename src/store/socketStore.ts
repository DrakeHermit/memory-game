import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import type { Player } from '../types/game';

interface ServerGameState {
  roomId: string;
  players: Player[];
  gameStarted: boolean;
  gameOver: boolean;
  gamePaused: boolean;
  pausedBy: Player | null;
  playerId: string;
  flippedCoins: number[];
  matchedPairs: number[];
  winner: Player | null;
  winners: Player[];
  isTie: boolean | null;
  isProcessing: boolean;
  theme: string;
  gridSize: number;
  coins: Array<{
    id: number;
    value: number | string;
  }>;
}

interface PlayerLeftInfo {
  playerLeftDuringGame: boolean;
  leftPlayerName: string;
}

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  roomId: string;
  gameState: ServerGameState | null;
  isRoomCreator: boolean;
  players: Player[];
  gameOver: boolean;
  winner: Player | null;
  winners: Player[];
  isTie: boolean | null;
  playerLeftInfo: PlayerLeftInfo | null;
  connect: () => void;
  disconnect: () => void; 
  createRoom: (roomId: string, maxPlayers: string, theme: string, gridSize: number, playerName: string) => void;
  joinRoom: (roomId: string, playerName: string) => void;
  leaveRoom: (roomId: string) => void;
  removeRoom: (roomId: string) => void;
  changeName: (roomId: string, playerName: string) => void;
  toggleReady: (roomId: string) => void;
  startGame: (roomId: string) => void;
  resetGame: (roomId: string) => void;
  pauseGame: (roomId: string) => void;
  resumeGame: (roomId: string) => void;
  flipCoin: (coinId: number, roomId: string) => void;
  clearPlayerLeftInfo: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  roomId: '',
  gameState: null,
  isRoomCreator: false,
  players: [],
  winner: null,
  winners: [],
  isTie: null,
  gameOver: false,
  playerLeftInfo: null,
  connect: () => {
    if (get().socket?.connected) {
    return; 
  }
    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id);
      set({ isConnected: true });
      
      // Rejoin room if we were in one (handles reconnection)
      const currentRoomId = get().roomId;
      if (currentRoomId) {
        console.log('[Socket] Rejoining room after connect:', currentRoomId);
        socket.emit('rejoinRoom', { roomId: currentRoomId });
      }
    });

    socket.on('roomCreated', (data: { roomId: string, room: string }) => {
      console.log('[Socket] Room created:', data.roomId);
      set({ roomId: data.roomId, isConnected: true, isRoomCreator: true });
    });

    socket.on('joinRoom', (roomId: string) => {
      set({ roomId, isConnected: true, isRoomCreator: false });
    });

    socket.on('playerLeftRoom', (data: { playerId: string; playerLeftDuringGame: boolean; leftPlayerName: string }) => {
      console.log('[Socket] Player left room:', data);
      set((state) => ({
        ...state,
        players: state.players.filter(player => player.id !== data.playerId),
        playerLeftInfo: data.playerLeftDuringGame ? {
          playerLeftDuringGame: data.playerLeftDuringGame,
          leftPlayerName: data.leftPlayerName
        } : null
      }));
    });

    socket.on('gameState', (data) => {
      console.log('[Socket] Game state received, players:', data.gameState?.players?.length);
      set({ 
      gameState: data.gameState,
      players: data.gameState?.players || []
      });
      if (data.gameState?.gameOver) {
        set({
          gameOver: data.gameState?.gameOver,
          winner: data.gameState?.winner || null,
          winners: data.gameState?.winners || [],
          isTie: data.gameState?.isTie || null
        });
      }
    });

    socket.on('playerJoined', (data) => {
      console.log('[Socket] Player joined:', data);
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
      console.log('[Socket] Player name changed:', data);
      set((state) => ({
        ...state,
        players: state.players.map(player => 
          player.id === data.playerId 
            ? { ...player, name: data.newName }
            : player
        )
      }));
    });

     socket.on('flipCoinsBack', (coinsToFlipBack: number[]) => {
      set((state) => ({
        gameState: state.gameState ? {
          ...state.gameState,
          flippedCoins: state.gameState.flippedCoins.filter(
            coinId => !coinsToFlipBack.includes(coinId)
          )
        } : null
      }));
     });
    
    socket.on('gamePaused', () => {
      set((state) => ({
        gameState: state.gameState ? {
          ...state.gameState,
          gamePaused: true
        } : null
      }));
    });
    socket.on('gameResumed', () => {
      set((state) => ({
        gameState: state.gameState ? {
          ...state.gameState,
          gamePaused: false
        } : null
      }));
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
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
  leaveRoom: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('leaveRoom', { roomId });
    }
  },
  removeRoom: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('removeRoom', { roomId });
    }
    set({ roomId: '', isRoomCreator: false, players: []});
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
  resetGame: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('resetGame', { roomId });
    }
    console.log('Game reset')
  },
  pauseGame: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('pauseGame', { roomId });
    }
  },
  resumeGame: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('resumeGame', { roomId });
    }
  },
  flipCoin: (coinId: number, roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('flipCoin', { coinId, roomId });
    }
    if (get().gameState?.flippedCoins.length === 2) { 
      return
     }
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false, roomId: '', players: [] });
    }
  },
  clearPlayerLeftInfo: () => {
    set({ playerLeftInfo: null });
  },
}));