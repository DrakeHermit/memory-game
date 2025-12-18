import { useNavigate } from "react-router-dom";
import gameStateStore from "../store/gameStateStore";
import { useSocketStore } from "../store/socketStore";

interface MobileMenuProps {
  onClose: () => void;
  isMultiplayer?: boolean;
}

export const MobileMenu = ({
  onClose,
  isMultiplayer = false,
}: MobileMenuProps) => {
  const navigate = useNavigate();
  const { resetGameState } = gameStateStore();
  const { isRoomCreator, resetGame, roomId, disconnect } = useSocketStore();

  const handleSinglePlayerRestart = () => {
    resetGameState();
    onClose();
  };

  const handleMultiplayerRestart = () => {
    if (isRoomCreator && roomId) {
      resetGame(roomId);
    }
    onClose();
  };

  const handleLeaveGame = () => {
    disconnect();
    navigate("/");
  };

  const handlePauseGame = () => {
    // TODO: Implement pause game functionality via socket
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black/50">
      <div className="bg-gray-100 py-[28px] px-[24px] md:px-300 md:p-[55px] rounded-lg shadow-lg text-center md:min-w-[654px]">
        {/* Single-player menu options */}
        {!isMultiplayer && (
          <>
            <button
              className="bg-orange-400 text-[18px] md:text-[20px] text-white w-full md:w-1/2 font-bold py-[12px] mb-200 md:py-[13px] md:px-[28px] rounded-full cursor-pointer"
              onClick={handleSinglePlayerRestart}
            >
              Restart
            </button>
            <button
              className="bg-blue-100 text-[18px] md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] mb-200 md:px-[28px] text-blue-800 font-bold cursor-pointer"
              type="button"
              onClick={() => {
                navigate("/");
                resetGameState();
              }}
            >
              New Game
            </button>
          </>
        )}
        {/* Multiplayer menu options */}
        {isMultiplayer && (
          <>
            {isRoomCreator && (
              <button
                className="bg-orange-400 text-[18px] md:text-[20px] text-white w-full md:w-1/2 font-bold py-[12px] mb-200 md:py-[13px] md:px-[28px] rounded-full cursor-pointer"
                onClick={handleMultiplayerRestart}
              >
                Restart
              </button>
            )}
            <button
              className="bg-blue-100 text-[18px] md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] mb-200 md:px-[28px] text-blue-800 font-bold cursor-pointer"
              type="button"
              onClick={handlePauseGame}
            >
              Pause Game
            </button>
            <button
              className="bg-blue-100 text-[18px] md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] mb-200 md:px-[28px] text-blue-800 font-bold cursor-pointer"
              type="button"
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="bg-blue-100 text-[18px] md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] text-blue-800 font-bold cursor-pointer"
        >
          Resume Game
        </button>
      </div>
    </div>
  );
};
