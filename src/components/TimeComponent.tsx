import gameStateStore from "../store/gameStateStore";
import { useGameTimer } from "../hooks/useGameTimer";
import { useEffect } from "react";

export const TimeComponent = () => {
  const { gamePhase, moves } = gameStateStore();
  const { time, start, stop, reset, formatTime } = useGameTimer();

  useEffect(() => {
    if (gamePhase === "waitingForTurn") {
      if (moves === 0) {
        reset();
      }
      start();
    } else if (gamePhase === "gameOver") {
      stop();
    }
  }, [gamePhase, moves]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md">
      Time <span className="text-[32px] text-blue-800">{formatTime(time)}</span>
    </div>
  );
};
