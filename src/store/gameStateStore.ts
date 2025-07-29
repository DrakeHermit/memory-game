import { create } from "zustand";

interface Coin {
  id: number;
  value: number;
}

interface GameStateStore {
  gameStarted: boolean;
  gamePhase: 'waitingForTurn' | 'firstCoinFlipped' | 'matchingCoins' | 'clearingCoins' | 'gameOver';
  flippedCoins: number[];
  coins: Coin[];
  moves: number;
  matchedPairs: number[];
  currentTurn: string;
  setGameStarted: (started: boolean) => void;
  resetGameState: () => void;
  flipCoin: (coinId: number) => void;
  setCoins: (coins: Coin[]) => void; 
}

const GameStateStore = create<GameStateStore>((set) => ({
  gameStarted: false,
  gamePhase: 'waitingForTurn',
  flippedCoins: [],
  coins: [],
  moves: 0,
  matchedPairs: [],
  currentTurn: 'player1',
  setGameStarted: (started: boolean) => set({ gameStarted: started }),
  resetGameState: () => set({ gameStarted: false, flippedCoins: [], matchedPairs: [], currentTurn: 'player1', gamePhase: 'waitingForTurn', moves: 0, coins: [] }),
  setCoins: (coins: Coin[]) => set({ coins }), 
  flipCoin: (coinId: number) => set((state) => {
    if (state.gamePhase !== 'waitingForTurn' && state.gamePhase !== 'firstCoinFlipped') {
      return state; 
    }
    
    if (state.gamePhase === 'waitingForTurn') {
      return { ...state, flippedCoins: [coinId], gamePhase: 'firstCoinFlipped', moves: state.moves + 1 };
    }
    
    if (state.gamePhase === 'firstCoinFlipped') {
      const newFlippedCoins = [...state.flippedCoins, coinId];      
      const coin1 = state.coins.find(c => c.id === newFlippedCoins[0]);
      const coin2 = state.coins.find(c => c.id === newFlippedCoins[1]);
      
      const isMatch = coin1?.value === coin2?.value; 
    
      if (isMatch) {
        if (coin1 && coin2) {
          return { 
            ...state, 
            flippedCoins: [],
            matchedPairs: [...state.matchedPairs, coin1.id, coin2.id], 
            gamePhase: 'waitingForTurn',
            moves: state.moves + 1,
          };
        };
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