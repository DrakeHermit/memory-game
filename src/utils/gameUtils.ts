import type { Coin } from '../types/game';

export const getGridSize = (gridSize: string): number => {
  return parseInt(gridSize.split('x')[0]);
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; 
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
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

  return shuffleArray(coins);
}
