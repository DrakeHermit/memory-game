import { useState } from "react";
import { useSocketStore } from "../store/socketStore";
import { Icon } from "./Icon";

interface MultiplayerGameBoardProps {
  coin: {
    id: number;
    value: number | string;
  };
}

export const MultiplayerGameBoard = ({ coin }: MultiplayerGameBoardProps) => {
  const { gameState, flipCoin } = useSocketStore();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const size = gameState?.gridSize || 4;

  const isMatched = false;

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    flipCoin(coin.id, gameState?.roomId || "");
  };

  return (
    <button
      onClick={handleFlip}
      className={`flex justify-center items-center fill-white rounded-full cursor-pointer disabled:cursor-auto text-white font-bold text-[44px] ${
        isFlipped || isMatched ? "bg-blue-300" : "bg-blue-800"
      } ${
        size === 4
          ? "w-[73px] h-[73px] md:w-[118px] md:h-[118px]"
          : "w-[46px] h-[46px] md:w-[82px] md:h-[82px]"
      } ${isFlipped || isMatched ? "pointer-events-none" : ""} ${
        isMatched ? "opacity-0 transition-opacity duration-800" : ""
      }`}
    >
      {isFlipped || isMatched ? (
        gameState?.theme === "numbers" ? (
          <p className="text-[28px] md:text-[50px]">{coin.value}</p>
        ) : (
          <Icon iconName={coin.value.toString()} />
        )
      ) : (
        ""
      )}
    </button>
  );
};
