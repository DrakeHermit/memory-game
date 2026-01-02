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
  const {
    winner,
    resetGame,
    gameState,
    requestReset,
    voteReset,
    resetRequest,
    playerId,
  } = useSocketStore();
  const roomId = gameState?.roomId || "";
  const navigate = useNavigate();

  const maxPairs = Math.max(...players.map((p) => p.pairsFound));

  const isResetRequested = resetRequest?.requested;
  const isResetDisabled = resetRequest?.isDisabled || gameState?.resetUsed;
  const votes = resetRequest?.votes || {};
  const requestedBy = resetRequest?.requestedBy;
  const isRequester = requestedBy?.id === playerId;
  const hasVoted = votes[playerId] !== undefined;

  const totalPlayers = players.length;
  const votedCount = Object.keys(votes).length;
  const acceptedCount = Object.values(votes).filter((v) => v === true).length;

  const handleRequestReset = () => {
    if (roomId && !isResetDisabled) {
      requestReset(roomId);
    }
  };

  const handleAcceptReset = () => {
    if (roomId) {
      voteReset(roomId, true);
    }
  };

  const handleDeclineReset = () => {
    if (roomId) {
      voteReset(roomId, false);
    }
  };

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
        <div className="mt-[32px] md:mt-[40px]">
          {isResetRequested ? (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 text-[14px] md:text-[16px] font-bold mb-3">
                {isRequester ? "You" : requestedBy?.name} requested a restart
              </p>

              <div className="mb-4">
                <p className="text-blue-600 text-[12px] md:text-[14px] font-bold mb-2">
                  Votes: {acceptedCount} accepted / {votedCount} of{" "}
                  {totalPlayers} voted
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {players.map((player) => {
                    const vote = votes[player.id];
                    const hasPlayerVoted = vote !== undefined;
                    return (
                      <span
                        key={player.id}
                        className={`px-3 py-1 rounded-full text-[11px] md:text-[13px] font-bold ${
                          hasPlayerVoted
                            ? vote
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {player.name}
                        {hasPlayerVoted ? (vote ? " ✓" : " ✗") : " ..."}
                      </span>
                    );
                  })}
                </div>
              </div>

              {isRequester ? (
                <p className="text-blue-600 text-[12px] md:text-[14px] font-bold">
                  Waiting for other players...
                </p>
              ) : hasVoted ? (
                <p className="text-blue-600 text-[12px] md:text-[14px] font-bold">
                  Waiting for other players...
                </p>
              ) : (
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleAcceptReset}
                    className="bg-orange-400 text-[14px] md:text-[16px] text-white rounded-full py-[10px] px-[20px] font-bold cursor-pointer hover:bg-orange-300 transition-colors"
                    type="button"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDeclineReset}
                    className="bg-blue-200 text-[14px] md:text-[16px] text-blue-800 rounded-full py-[10px] px-[20px] font-bold cursor-pointer hover:bg-blue-300 transition-colors"
                    type="button"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleRequestReset}
              className={`text-[18px] self-center md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] font-bold transition-colors ${
                isResetDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-400 text-white cursor-pointer hover:bg-orange-300"
              }`}
              disabled={isResetDisabled || !roomId}
              type="button"
            >
              {isResetDisabled ? "Restart Unavailable" : "Restart Game"}
            </button>
          )}
        </div>

        <button
          onClick={() => {
            resetGame(roomId);
            navigate("/");
          }}
          className="bg-blue-100 text-[18px] mt-[16px] self-center md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] text-blue-800 font-bold cursor-pointer hover:bg-blue-200 transition-colors"
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
