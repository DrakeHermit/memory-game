import { useSocketStore } from "../store/socketStore";

const PausedGameModal = () => {
  const { gameState, resumeGame, socket } = useSocketStore();
  const roomId = gameState?.roomId || "";
  const pausedBy = gameState?.pausedBy;
  const currentPlayerId = socket?.id;

  const canResume = pausedBy?.id === currentPlayerId;

  const handleResume = () => {
    if (canResume && roomId) {
      resumeGame(roomId);
    }
  };

  return (
    <div className="absolute top-0 left-0 z-1000 w-screen flex min-h-screen justify-center items-center bg-black/50">
      <div className="flex flex-col justify-center bg-gray-100 px-[24px] md:px-[55px] md:py-[55px] py-[28px] rounded-lg shadow-lg text-center w-[327px] md:w-[654px]">
        <h3 className="text-blue-950 text-[24px] md:text-[48px] font-bold mb-[8px] md:mb-200">
          Game Paused
        </h3>
        <p className="text-blue-400 text-[14px] md:text-[18px] font-bold mb-300 md:my-500">
          {pausedBy?.name || "A player"} has paused the game
        </p>

        <div className="flex flex-col items-center gap-200 mt-4">
          {canResume ? (
            <button
              onClick={handleResume}
              className="bg-orange-400 text-[18px] md:text-[20px] text-white rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] font-bold cursor-pointer hover:bg-orange-300 transition-colors"
              type="button"
            >
              Resume Game
            </button>
          ) : (
            <p className="text-blue-800 text-[14px] md:text-[16px] font-bold bg-blue-100 rounded-full px-5 py-4">
              Waiting for {pausedBy?.name || "the player"} to resume...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PausedGameModal;
