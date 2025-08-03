import { create } from 'zustand';
import type { User } from '../types/game';

interface UserStore {
  currentUser: User;
  connectedPlayers: string[]
  roomId: string;
  connectionStatus: 'connected' | 'disconnected';
  setCurrentUser: (user: User) => void;
  setConnectedPlayers: (players: string[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: {
    id: 'player1',
    score: 0,
    moves: 0,
    isCurrentTurn: true,
  },
  connectedPlayers: [],
  roomId: '',
  connectionStatus: 'disconnected',
  setCurrentUser: (user: User) => set({ currentUser: user }),
  setConnectedPlayers: (players: string[]) => set({ connectedPlayers: players }),
}));