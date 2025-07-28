import { create } from "zustand";

interface GameStateStore {
  gameStarted: boolean;
  flippedCoins: string[];
  matchedPairs: string[];
  currentTurn: string;
  setGameStarted: (started: boolean) => void;
  resetGameState: () => void;
}

const GameStateStore = create<GameStateStore>((set) => ({
  gameStarted: false,
  flippedCoins: [],
  matchedPairs: [],
  currentTurn: 'player1',
  setGameStarted: (started: boolean) => set({ gameStarted: started }),
  resetGameState: () => set({ gameStarted: false, flippedCoins: [], matchedPairs: [], currentTurn: 'player1' }),
}));

export default GameStateStore;