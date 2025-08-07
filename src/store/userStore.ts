import { create } from 'zustand';
import type { User } from '../types/game';

interface UserStore {
  currentUser: User;
  connectedPlayers: User[]
  roomId: string;
  connectionStatus: 'connected' | 'disconnected';
  setCurrentUser: (user: User) => void;
  setConnectedPlayers: (players: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: {
    id: 'player1',
    score: 0,
    moves: 0,
    hasTurn: true,
  },
  connectedPlayers: [],
  roomId: '',
  connectionStatus: 'disconnected',
  setCurrentUser: (user: User) => set({ currentUser: user }),
  setConnectedPlayers: (players: User[]) => set({ connectedPlayers: players }),
}));