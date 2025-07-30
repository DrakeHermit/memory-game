import useLobbyStore from "../store/useLobbyStore";
import gameStateStore from "../store/gameStateStore";
import { getGridSize } from "../utils/gameUtils";
import type { Coin } from "../types/game";
import { Icon } from "./Icon";

interface GameBoardProps {
  coin: Coin;
}

export const GameBoard = ({ coin }: GameBoardProps) => {
  const { formData } = useLobbyStore();
  const { gamePhase, flipCoin, flippedCoins, matchedPairs } = gameStateStore();
  const size = getGridSize(formData.gridSize);

  const isFlipped = flippedCoins.includes(coin.id);
  const isMatched = matchedPairs.includes(coin.id);

  return (
    <button
      onClick={() => flipCoin(coin.id)}
      disabled={
        gamePhase !== "waitingForTurn" && gamePhase !== "firstCoinFlipped"
      }
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
        formData.theme === "numbers" ? (
          coin.value
        ) : (
          <Icon iconName={coin.value.toString()} />
        )
      ) : (
        ""
      )}
    </button>
  );
};
