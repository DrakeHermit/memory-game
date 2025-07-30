import { create } from "zustand";
import type { Coin } from "../types/game";

interface GameStateStore {
  gamePhase: 'waitingForTurn' | 'firstCoinFlipped' | 'matchingCoins' | 'clearingCoins' | 'gameOver';
  flippedCoins: number[];
  coins: Coin[];
  moves: number;
  gameTimer: string;
  matchedPairs: number[];
  currentTurn: string;
  resetGameState: () => void;
  flipCoin: (coinId: number) => void;
  setCoins: (coins: Coin[]) => void; 
  setGameTimer: (time: string) => void;
}

const GameStateStore = create<GameStateStore>((set) => ({
  gameStarted: false,
  gamePhase: 'waitingForTurn',
  flippedCoins: [],
  coins: [],
  moves: 0,
  gameTimer: '',
  matchedPairs: [],
  currentTurn: 'player1',
  resetGameState: () => set({ flippedCoins: [], matchedPairs: [], currentTurn: 'player1', gamePhase: 'waitingForTurn', moves: 0, gameTimer: '00:00' }),
  setCoins: (coins: Coin[]) => set({ coins }),
  setGameTimer: (time: string) => set({ gameTimer: time }),
  flipCoin: (coinId: number) => set((state) => {
    if (state.gamePhase !== 'waitingForTurn' && state.gamePhase !== 'firstCoinFlipped') {
      return state; 
    }
    
    if (state.gamePhase === 'waitingForTurn') {
      return { ...state, flippedCoins: [coinId], gamePhase: 'firstCoinFlipped', moves: state.moves + 1, gameStarted: true };
    }
    
    if (state.gamePhase === 'firstCoinFlipped') {
      const newFlippedCoins = [...state.flippedCoins, coinId];      
      const coin1 = state.coins.find(c => c.id === newFlippedCoins[0]);
      const coin2 = state.coins.find(c => c.id === newFlippedCoins[1]);
      
      const isMatch = coin1?.value === coin2?.value; 
    
      if (isMatch) {
  if (coin1 && coin2) {
    const newMatchedPairs = [...state.matchedPairs, coin1.id, coin2.id];
    
    if (state.coins.length === newMatchedPairs.length) {
      return { 
        ...state, 
        flippedCoins: [],
        matchedPairs: newMatchedPairs,
        gamePhase: 'gameOver',
        moves: state.moves + 1
      };
    }
    
    return { 
      ...state, 
      flippedCoins: [],
      matchedPairs: newMatchedPairs,
      gamePhase: 'waitingForTurn',
      moves: state.moves + 1
    };
  }
} else {
        if (coin1 && coin2) {
          setTimeout(() => {
            set((state) => ({
              ...state,
              flippedCoins: [],
              gamePhase: 'waitingForTurn',
            }));
          }, 500);
    
          return { 
            ...state, 
            flippedCoins: newFlippedCoins, 
            gamePhase: 'clearingCoins',
            moves: state.moves + 1
          };
      }
      }
    }
 
    return state;
  }),
}));

export default GameStateStore;