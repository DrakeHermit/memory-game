import type { Coin } from '../types/game';

export const getGridSize = (gridSize: string): number => {
  return parseInt(gridSize.split('x')[0]);
}

export const generateGrid = (gridSize: string): Coin[] => {
  const size = getGridSize(gridSize);
  const totalCoins = size * size;
  
  const coins = Array.from({ length: totalCoins }, (_, index) => ({
    id: `coin-${index}`,
    value: Math.floor(index / 2), 
  }));

  const shuffled = coins.sort(() => Math.random() - 0.5);
  
  return shuffled.map((coin, index) => ({
    ...coin,
    id: index  
  }));
}