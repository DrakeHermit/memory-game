import { useNavigate } from "react-router-dom";
import { useSocketStore } from "../store/socketStore";

const PlayerLeftModal = () => {
  const {
    playerLeftInfo,
    clearPlayerLeftInfo,
    resetGame,
    gameState,
  } = useSocketStore();
  const navigate = useNavigate();
  const roomId = gameState?.roomId || "";

  const handleBackToMenu = () => {
    clearPlayerLeftInfo();
    resetGame(roomId);
    navigate("/");
  };

  if (!playerLeftInfo) return null;

  return (
    <div className="absolute top-0 left-0 z-1000 w-screen flex min-h-screen justify-center items-center bg-black/50">
      <div className="flex flex-col justify-center bg-gray-100 px-[24px] md:px-[55px] md:py-[55px] py-[28px] rounded-lg shadow-lg text-center w-[327px] md:w-[654px]">
        <h3 className="text-blue-950 text-[24px] md:text-[48px] font-bold mb-[8px] md:mb-200">
          Player Left
        </h3>
        <p className="text-blue-400 text-[14px] md:text-[18px] font-bold mb-300 md:my-500">
          {playerLeftInfo.leftPlayerName} has left the game
        </p>

        <div className="flex flex-col items-center gap-200 mt-4">
          <button
            onClick={handleBackToMenu}
            className="bg-orange-400 text-[18px] md:text-[20px] text-white rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] font-bold cursor-pointer hover:bg-orange-300 transition-colors"
            type="button"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerLeftModal;
