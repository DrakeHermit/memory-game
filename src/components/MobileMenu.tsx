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
  const {
    isRoomCreator,
    resetGame,
    roomId,
    disconnect,
    pauseGame,
  } = useSocketStore();

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
    if (roomId) {
      pauseGame(roomId);
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center px-6 bg-black/50">
      <div className="bg-gray-100 py-[24px] px-[24px] rounded-xl shadow-lg text-center w-full max-w-[280px]">
        {!isMultiplayer && (
          <>
            <button
              className="bg-orange-400 text-[16px] text-white w-full font-bold py-[12px] mb-3 rounded-full cursor-pointer"
              onClick={handleSinglePlayerRestart}
            >
              Restart
            </button>
            <button
              className="bg-blue-100 text-[16px] rounded-full w-full py-[12px] mb-3 text-blue-800 font-bold cursor-pointer"
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
        {isMultiplayer && (
          <>
            {isRoomCreator && (
              <button
                className="bg-orange-400 text-[16px] text-white w-full font-bold py-[12px] mb-3 rounded-full cursor-pointer"
                onClick={handleMultiplayerRestart}
              >
                Restart
              </button>
            )}
            <button
              className="bg-blue-100 text-[16px] rounded-full w-full py-[12px] mb-3 text-blue-800 font-bold cursor-pointer"
              type="button"
              onClick={handlePauseGame}
            >
              Pause Game
            </button>
            <button
              className="bg-blue-100 text-[16px] rounded-full w-full py-[12px] mb-3 text-blue-800 font-bold cursor-pointer"
              type="button"
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="bg-blue-100 text-[16px] rounded-full w-full py-[12px] text-blue-800 font-bold cursor-pointer"
        >
          Resume Game
        </button>
      </div>
    </div>
  );
};
