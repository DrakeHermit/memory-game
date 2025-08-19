import { create } from 'zustand';
import type { User } from '../types/game';

interface UserStore {
  currentUser: User;
  connectedPlayers: User[]
  roomId: string;
  connectionStatus: 'connected' | 'disconnected';
  setCurrentUser: (user: User) => void;
  setConnectedPlayers: (players: User[]) => void;
  updatePlayer: (playerId: string, updates: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: {
    id: '',
    score: 0,
    moves: 0,
    hasTurn: true,
  },
  connectedPlayers: [],
  roomId: '',
  connectionStatus: 'disconnected',
  setCurrentUser: (user: User) => set({ currentUser: user }),
  setConnectedPlayers: (players: User[]) => set({ connectedPlayers: players }),

  updatePlayer: (playerId: string, updates: Partial<User>) => set((state) => {
    const updatedConnectedPlayers = state.connectedPlayers.map(player => 
      player.id === playerId 
        ? { ...player, ...updates }
        : player
    );
    
    const updatedCurrentUser = state.currentUser.id === playerId 
      ? { ...state.currentUser, ...updates }
      : state.currentUser;
    
    return {
      connectedPlayers: updatedConnectedPlayers,
      currentUser: updatedCurrentUser
    };
  }),
}));