import { useState, useRef, useEffect } from "react";

export const TimeComponent = () => {
  const [time, setTime] = useState<number>(0);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() - startTime.current);
    }, 10);

    return () => clearInterval(interval);
  }, []);

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
