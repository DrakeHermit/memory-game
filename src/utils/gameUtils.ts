import type { Coin } from '../types/game';
import type { User } from '../types/game';

export const getGridSize = (gridSize: string): number => {
  return parseInt(gridSize.split('x')[0]);
}

export const generateGrid = (gridSize: string, theme: 'numbers' | 'icons'): Coin[] => {
  const size = getGridSize(gridSize);
  const totalCoins = size * size;
  const maxIcons = 10; 
  
  const coins = Array.from({ length: totalCoins }, (_, index) => {
    const pairIndex = Math.floor(index / 2);
    
    return {
      id: index,
      value: theme === 'numbers' 
        ? pairIndex 
        : `icon-${pairIndex % maxIcons}`,
    };
  });

  return coins.sort(() => Math.random() - 0.5);
}

export const generateUsers =(users: string): User[] => {
  const usersArray = Array.from({ length: parseInt(users) }, (_, index) => ({
    id: `player${index + 1}`,
    score: 0,
    moves: 0,
    hasTurn: false,
  }));

  return usersArray;
}