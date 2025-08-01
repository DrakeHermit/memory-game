export interface Coin {
  id: number;
  value: number | string;
}

export interface User {
  id: string
  score: number
  isCurrentTurn: boolean
}