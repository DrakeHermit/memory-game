export const getGridSize = (gridSize: string): number => {
  return parseInt(gridSize.split('x')[0]);
}

export const generateGrid = (gridSize: string) => {
  const size = getGridSize(gridSize);
  const totalCoins = size * size;
  
  return Array.from({ length: totalCoins }, (_, index) => ({
    id: index,
    value: Math.floor(index / 2), 
    isFlipped: false,
    isMatched: false
  }));
}