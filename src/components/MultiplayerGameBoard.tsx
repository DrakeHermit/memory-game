import { memo } from "react";
import { useSocketStore } from "../store/socketStore";
import { Icon } from "./Icon";
import MultiplayerResultModal from "./MultiplayerResultModal";

interface MultiplayerGameBoardProps {
  coin: {
    id: number;
    value: number | string;
  };
}

const MultiplayerGameBoardComponent = ({ coin }: MultiplayerGameBoardProps) => {
  const { gameState, flipCoin, players, socket } = useSocketStore();
  const isFlipped = gameState?.flippedCoins.includes(coin.id);
  const isMatched = gameState?.matchedPairs.includes(coin.id);
  const size = gameState?.gridSize || 4;

  const currentPlayerId = socket?.id;
  const playerWithTurn = players.find((player) => player.hasTurn === true);
  const currentPlayerHasTurn = playerWithTurn?.id === currentPlayerId;
  const currentPlayer = gameState?.players.find(
    (player) => player.id === currentPlayerId
  );

  const handleFlip = () => {
    flipCoin(coin.id, gameState?.roomId as string);
  };

  return (
    <>
      {gameState?.gameOver && (
        <MultiplayerResultModal
          playerName={currentPlayer?.name || ""}
          players={gameState?.players || []}
        />
      )}
      <button
        onClick={handleFlip}
        disabled={!currentPlayerHasTurn}
        className={`flex justify-center items-center fill-white rounded-full cursor-pointer disabled:cursor-auto text-white font-bold text-[44px] disabled:opacity-50 ${
          isFlipped || isMatched ? "bg-blue-300" : "bg-blue-800"
        } ${
          size === 4
            ? "w-[73px] h-[73px] md:w-[118px] md:h-[118px]"
            : "w-[46px] h-[46px] md:w-[82px] md:h-[82px]"
        } ${isFlipped || isMatched ? "pointer-events-none" : ""}`}
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
    </>
  );
};

// Memo wrapper to prevent unnecessary re-renders when props haven't changed
export const MultiplayerGameBoard = memo(MultiplayerGameBoardComponent);
