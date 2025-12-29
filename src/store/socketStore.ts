import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import type { Player } from '../types/game';

const PLAYER_ID_KEY = 'memory_game_player_id';
const ROOM_ID_KEY = 'memory_game_room_id';
const IS_HOST_KEY = 'memory_game_is_host';

const getOrCreatePlayerId = (): string => {
  let playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  if (!playerId) {
    playerId = uuidv4();
    sessionStorage.setItem(PLAYER_ID_KEY, playerId);
  }
  return playerId;
};

const getStoredRoomId = (): string => {
  return sessionStorage.getItem(ROOM_ID_KEY) || '';
};

const setStoredRoomId = (roomId: string): void => {
  if (roomId) {
    sessionStorage.setItem(ROOM_ID_KEY, roomId);
  } else {
    sessionStorage.removeItem(ROOM_ID_KEY);
  }
};

const clearPlayerId = (): void => {
  sessionStorage.removeItem(PLAYER_ID_KEY);
};

const getStoredIsHost = (): boolean => {
  return sessionStorage.getItem(IS_HOST_KEY) === 'true';
};

const setStoredIsHost = (isHost: boolean): void => {
  if (isHost) {
    sessionStorage.setItem(IS_HOST_KEY, 'true');
  } else {
    sessionStorage.removeItem(IS_HOST_KEY);
  }
};

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
  playerId: string;
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
  getPlayerId: () => string;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  playerId: getOrCreatePlayerId(),
  roomId: getStoredRoomId(),
  gameState: null,
  isRoomCreator: getStoredIsHost(),
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
      set({ isConnected: true });
      
      const playerId = get().playerId;
      const storedRoomId = getStoredRoomId();
      
      socket.emit('register', { playerId, roomId: storedRoomId });
    });

    socket.on('registered', (data: { success: boolean; reconnected: boolean }) => {
      if (data.reconnected) {
        console.log('[Socket] Successfully reconnected to existing session');
      }
    });

    socket.on('roomCreated', (data: { roomId: string, room: string }) => {
      setStoredRoomId(data.roomId);
      setStoredIsHost(true);
      set({ roomId: data.roomId, isConnected: true, isRoomCreator: true });
    });

    socket.on('joinRoom', (roomId: string) => {
      setStoredRoomId(roomId);
      setStoredIsHost(false);
      set({ roomId, isConnected: true, isRoomCreator: false });
    });

    socket.on('playerLeftRoom', (data: { playerId: string; playerLeftDuringGame: boolean; leftPlayerName: string }) => {
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
      set((state) => ({
        ...state,
        currentPlayers: data.currentPlayers,
        maxPlayers: data.maxPlayers
      }));
      
      const playerId = get().playerId;
      socket.emit('getGameState', { roomId: get().roomId, playerId });
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

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('connect_error', () => {
      set({ isConnected: false });
    });
    set({ socket });
  },
  createRoom: (roomId: string, maxPlayers: string, theme: string, gridSize: number, playerName: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('createRoom', { roomId, maxPlayers, theme, gridSize, playerName, playerId });
    }
  },
  joinRoom: (roomId: string, playerName: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('joinRoom', { roomId, playerName, playerId });
    }
  },
  leaveRoom: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('leaveRoom', { roomId, playerId });
    }
    setStoredRoomId('');
    setStoredIsHost(false);
    set({ roomId: '', isRoomCreator: false });
  },
  removeRoom: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('removeRoom', { roomId, playerId });
    }
    setStoredRoomId('');
    setStoredIsHost(false);
    set({ roomId: '', isRoomCreator: false, players: []});
  },
  changeName: (roomId: string, newName: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('changePlayerName', { roomId, newName, playerId });
    }
  },
  toggleReady: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('togglePlayerReady', { roomId, playerId });
    }
  },
  startGame: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('startGame', { roomId, playerId });
    }
  },
  resetGame: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('resetGame', { roomId, playerId });
    }
    setStoredRoomId('');
    setStoredIsHost(false);
  },
  pauseGame: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('pauseGame', { roomId, playerId });
    }
  },
  resumeGame: (roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('resumeGame', { roomId, playerId });
    }
  },
  flipCoin: (coinId: number, roomId: string) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.emit('flipCoin', { coinId, roomId, playerId });
    }
    if (get().gameState?.flippedCoins.length === 2) { 
      return
     }
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      clearPlayerId();
      setStoredRoomId('');
      setStoredIsHost(false);
      set({ socket: null, isConnected: false, roomId: '', players: [], playerId: '', isRoomCreator: false });
    }
  },
  clearPlayerLeftInfo: () => {
    set({ playerLeftInfo: null });
  },
  getPlayerId: () => {
    return get().playerId;
  },
}));
