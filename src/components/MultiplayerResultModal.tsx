import type { Player } from "../types/game";
import { useSocketStore } from "../store/socketStore";
import { useNavigate } from "react-router-dom";
const MultiplayerResultModal = ({
  playerName,
  players,
}: {
  playerName: string;
  players: Player[];
}) => {
  const { winner, resetGame, gameState } = useSocketStore();
  const roomId = gameState?.roomId || "";
  const navigate = useNavigate();

  const maxPairs = Math.max(...players.map((p) => p.pairsFound));
  const isHighlighted = (player: Player) => {
    if (gameState?.isTie) {
      return player.pairsFound === maxPairs;
    }
    return player.id === winner?.id;
  };

  return (
    <div className="absolute top-0 left-0 z-1000 w-screen flex min-h-screen justify-center items-center bg-black/50">
      <div className="flex flex-col justify-center bg-gray-100 px-[24px] md:px-[55px] md:py-[55px] py-[28px] rounded-lg shadow-lg text-center w-[327px] md:w-[654px]">
        <h3 className="text-blue-950 text-[24px] md:text-[48px] font-bold mb-[8px] md:mb-200">
          {gameState?.isTie ? "It's a tie!" : `${playerName} wins!`}
        </h3>
        <p className="text-blue-400 text-[14px] md:text-[18px] font-bold mb-300 md:my-500">
          Game over! Here are the results...
        </p>
        <div className="flex flex-col gap-200">
          {players.map((player) => (
            <div
              className={`flex justify-between items-center p-200 rounded-md ${
                isHighlighted(player) ? "bg-blue-800" : "bg-blue-100"
              }`}
              key={player.id}
            >
              <p
                className={`text-blue-400 text-[14px] md:text-[20px] font-bold ${
                  isHighlighted(player) ? "text-white" : "text-blue-400"
                }`}
              >
                {player.name}
                {player.id === winner?.id ? " (Winner!)" : ""}
              </p>
              <p
                className={`text-blue-800 text-[20px] md:text-[32px] font-bold ${
                  isHighlighted(player) ? "text-white" : "text-blue-800"
                }`}
              >
                {player.pairsFound} Pairs
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            resetGame(roomId);
            navigate("/");
          }}
          className="bg-blue-100 text-[18px] mt-[56px] self-center md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] text-blue-800 font-bold cursor-pointer"
          disabled={!roomId}
          type="button"
        >
          Setup New Game
        </button>
      </div>
    </div>
  );
};

export default MultiplayerResultModal;
