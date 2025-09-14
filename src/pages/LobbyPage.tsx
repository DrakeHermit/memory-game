import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLobbyStore from "../store/useLobbyStore";
import { Header } from "../components/Header";
import { useSocketStore } from "../store/socketStore";

const LobbyPage = () => {
  const { roomId } = useParams();
  const { formData } = useLobbyStore();
  const navigate = useNavigate();
  const {
    isRoomCreator,
    socket,
    roomId: storeRoomId,
    joinRoom,
    players,
  } = useSocketStore();

  const isJoiningViaLink = roomId !== storeRoomId && !isRoomCreator;

  useEffect(() => {
    if (socket && roomId && isJoiningViaLink) {
      const defaultName = `Guest-${Math.random().toString(36).substr(2, 4)}`;
      joinRoom(roomId, defaultName);
    }
  }, [socket, roomId, isJoiningViaLink, joinRoom]);

  useEffect(() => {
    if (socket && roomId && isRoomCreator) {
      socket.emit("getGameState", { roomId });
    }
  }, [socket, roomId, isRoomCreator]);

  useEffect(() => {
    if (socket && roomId && isJoiningViaLink) {
      const timer = setTimeout(() => {
        socket.emit("getGameState", { roomId });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [socket, roomId, isJoiningViaLink]);

  return (
    <div className="bg-blue-950 min-h-screen text-center pt-[4.5rem] md:pt-[7rem] text-white">
      <div className="md:mb-700 mb-600 text-center">
        <Header />
      </div>
      <main className="text-white text-left max-w-[327px] mx-auto md:max-w-[654px]">
        <div className="bg-white rounded-2xl p-[1.5rem] md:p-[3.5rem] shadow-2xl">
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gray-100 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-blue-800 mb-3 text-center text-lg md:text-xl">
                Game Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                <div className="text-center">
                  <p className="text-blue-400 mb-1">Theme</p>
                  <p className="font-semibold text-blue-800 capitalize">
                    {formData.theme}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 mb-1">Grid Size</p>
                  <p className="font-semibold text-blue-800">
                    {formData.gridSize}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isRoomCreator && (
            <div className="mt-4 pt-4 border-t border-blue-300">
              <p className="text-sm font-bold text-left text-blue-800 mb-2 md:text-base">
                Share this link with friends:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={
                    roomId
                      ? `${window.location.origin}/join/${roomId}`
                      : "Room link will appear here"
                  }
                  readOnly
                  className="flex-1 text-center text-sm text-blue-950 bg-white px-3 py-2 rounded border border-blue-300"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(roomId || "")}
                  disabled={!roomId}
                  className="w-full sm:w-auto bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-950 transition-colors cursor-pointer text-sm md:text-base"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-semibold text-blue-800 text-center md:text-left text-lg md:text-xl">
              Players ({players.length}/{formData.players})
            </h3>
            <div className="space-y-2">
              <div className="text-center text-blue-400 text-sm md:text-base py-4">
                {players.length === 0
                  ? "Waiting for players to join..."
                  : players.map((player) => player.id).join(", ")}
              </div>
            </div>
          </div>
          {isRoomCreator && (
            <button
              onClick={() => navigate(`/game/${roomId}`)}
              className="w-full sm:flex-1 bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-300 cursor-pointer"
            >
              Start Game
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default LobbyPage;
