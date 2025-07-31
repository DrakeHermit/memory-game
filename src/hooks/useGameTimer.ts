import { useState, useEffect, useRef } from 'react';
import GameStateStore from '../store/gameStateStore';

export const useGameTimer = () => {
  const [time, setTime] = useState(0);
  const { setGameTimer } = GameStateStore();
  const startTime = useRef(Date.now());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setGameTimer(formatTime(time));
  }, [time, setGameTimer]);


  const start = () => {
    if (intervalRef.current) return; 
    
    startTime.current = Date.now();
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime.current);
    }, 10);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return { time, start, stop, reset, formatTime };
};