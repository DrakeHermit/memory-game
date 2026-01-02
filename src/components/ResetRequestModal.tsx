import { useSocketStore } from "../store/socketStore";

const ResetRequestModal = () => {
  const {
    gameState,
    resetRequest,
    voteReset,
    playerId,
    players,
  } = useSocketStore();
  const roomId = gameState?.roomId || "";
  const requestedBy = resetRequest?.requestedBy;
  const votes = resetRequest?.votes || {};

  const currentPlayerName = players.find((player) => player.id === playerId)
    ?.name;

  const isRequester = requestedBy?.id === playerId;
  const hasVoted = votes[playerId] !== undefined;

  const handleAccept = () => {
    if (roomId) {
      voteReset(roomId, true);
    }
  };

  const handleDecline = () => {
    if (roomId) {
      voteReset(roomId, false);
    }
  };

  const totalPlayers = players.length;
  const votedCount = Object.keys(votes).length;
  const acceptedCount = Object.values(votes).filter((v) => v === true).length;

  return (
    <div className="absolute top-0 left-0 z-1000 w-screen flex min-h-screen justify-center items-center bg-black/50">
      <div className="flex flex-col justify-center bg-gray-100 px-[24px] md:px-[55px] md:py-[55px] py-[28px] rounded-lg shadow-lg text-center w-[327px] md:w-[654px]">
        <h3 className="text-blue-950 text-[24px] md:text-[48px] font-bold mb-[8px] md:mb-200">
          Restart Requested
        </h3>
        <p className="text-blue-400 text-[14px] md:text-[18px] font-bold mb-300 md:my-500">
          {requestedBy?.name === currentPlayerName
            ? "You"
            : requestedBy?.name || "A player"}{" "}
          {requestedBy?.name === currentPlayerName ? "have" : "has"} requested
          to restart the game
        </p>

        <div className="mb-4">
          <p className="text-blue-800 text-[14px] md:text-[16px] font-bold mb-2">
            Votes: {acceptedCount} accepted / {votedCount} of {totalPlayers}{" "}
            voted
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {players.map((player) => {
              const vote = votes[player.id];
              const hasPlayerVoted = vote !== undefined;
              return (
                <span
                  key={player.id}
                  className={`px-3 py-1 rounded-full text-[12px] md:text-[14px] font-bold ${
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

        <div className="flex flex-col items-center gap-200 mt-4">
          {isRequester ? (
            <p className="text-blue-800 text-[14px] md:text-[16px] font-bold bg-blue-100 rounded-full px-5 py-4">
              Waiting for other players to respond...
            </p>
          ) : hasVoted ? (
            <p className="text-blue-800 text-[14px] md:text-[16px] font-bold bg-blue-100 rounded-full px-5 py-4">
              Waiting for other players...
            </p>
          ) : (
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="bg-orange-400 text-[18px] md:text-[20px] text-white rounded-full w-full md:w-auto md:py-[13px] py-[12px] px-[28px] font-bold cursor-pointer hover:bg-orange-300 transition-colors"
                type="button"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="bg-blue-100 text-[18px] md:text-[20px] text-blue-800 rounded-full w-full md:w-auto md:py-[13px] py-[12px] px-[28px] font-bold cursor-pointer hover:bg-blue-200 transition-colors"
                type="button"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetRequestModal;
