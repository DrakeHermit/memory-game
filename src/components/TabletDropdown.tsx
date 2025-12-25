import { useNavigate } from "react-router-dom";
import gameStateStore from "../store/gameStateStore";
import { useSocketStore } from "../store/socketStore";

interface TabletDropdownProps {
  onClose: () => void;
  isMultiplayer?: boolean;
}

export const TabletDropdown = ({
  onClose,
  isMultiplayer = false,
}: TabletDropdownProps) => {
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
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="flex flex-col absolute top-full right-0 mt-2 z-50 bg-white rounded-xl shadow-lg border border-blue-100 min-w-[200px] overflow-hidden divide-y divide-blue-100">
        {!isMultiplayer && (
          <>
            <button
              className="w-full text-center px-4 py-3 text-[16px] text-blue-800 font-bold hover:bg-orange-400 hover:text-white transition-colors cursor-pointer"
              onClick={handleSinglePlayerRestart}
            >
              Restart
            </button>
            <button
              className="w-full text-center px-4 py-3 text-[16px] text-blue-800 font-bold hover:bg-orange-400 hover:text-white transition-colors cursor-pointer"
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
                className="w-full text-center px-4 py-3 text-[16px] text-blue-800 font-bold hover:bg-orange-400 hover:text-white transition-colors cursor-pointer"
                onClick={handleMultiplayerRestart}
              >
                Restart
              </button>
            )}
            <button
              className="w-full text-center px-4 py-3 text-[16px] text-blue-800 font-bold hover:bg-orange-400 hover:text-white transition-colors cursor-pointer"
              type="button"
              onClick={handlePauseGame}
            >
              Pause Game
            </button>
            <button
              className="w-full text-center px-4 py-3 text-[16px] text-blue-800 font-bold hover:bg-orange-400 hover:text-white transition-colors cursor-pointer"
              type="button"
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </>
        )}
      </div>
    </>
  );
};
