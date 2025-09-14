export interface Coin {
  id: number;
  value: number | string;
}

export interface Player {
  id: string;
  score: number;
  moves: number;
  hasTurn: boolean;
}

export interface GameState {
  gamePhase: 'waitingForTurn' | 'firstCoinFlipped' | 'matchingCoins' | 'clearingCoins' | 'gameOver';
  flippedCoins: number[];
  coins: Coin[];
  moves: number;
  gameTimer: string;
  matchedPairs: number[];
  currentTurn: string;
  restartCounter: number;
  players: Player[];
}