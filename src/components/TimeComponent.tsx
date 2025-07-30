import { useState, useRef, useEffect } from "react";
import gameStateStore from "../store/gameStateStore";

export const TimeComponent = () => {
  const { setGameTimer, gamePhase, moves } = gameStateStore();
  const [time, setTime] = useState<number>(0);
  const startTime = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      gamePhase === "waitingForTurn" ||
      gamePhase === "firstCoinFlipped" ||
      gamePhase === "clearingCoins"
    ) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime.current);
      }, 10);
    } else if (gamePhase === "gameOver") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === "waitingForTurn" && moves === 0) {
      startTime.current = Date.now();
      setTime(0);
    }
  }, [gamePhase, moves]);

  useEffect(() => {
    setGameTimer(formatTime(time));
  }, [time, setGameTimer]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md">
      Time <span className="text-[32px] text-blue-800">{formatTime(time)}</span>
    </div>
  );
};
